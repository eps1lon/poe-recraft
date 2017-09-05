// @flow
import type { BaseItemTypeProps, MetaDataMap, TagProps } from '../data/schema';
import type { ValueRange } from '../ValueRange';

import ApplicableMod from '../Mod/ApplicableMod';
import ItemImplicits from './ItemImplicits';
import MetaData from '../MetaData';
import Mod from '../Mod/';
import ModContainer from './';
import Stat from '../Stat';

export type Rarity = 'normal' | 'magic' | 'rare' | 'unique' | 'showcase';

export type LocalStats = {
  [string]: ValueRange | string
};

/**
 * 
 * Item Class extends @link ModContainer
 * 
 * represents an ingame item (boots, maps, rings for example)
 * the class only represents the explicits and is a fascade for an 
 * additional implicit container
 */
export default class Item extends ModContainer {
  static MAX_ILVL = 100;

  static build(props: BaseItemTypeProps, meta_datas: MetaDataMap) {
    const clazz = props.inherits_from.split(/[\\/]/).pop();
    const meta_data = MetaData.build(clazz, meta_datas);

    if (meta_data == null) {
      throw new Error(`meta_data for ${clazz} not found`);
    } else {
      return new Item(props, meta_data);
    }
  }

  static applyStat(
    value: ValueRange | number,
    stat: Stat,
    precision: number
  ): ValueRange {
    throw new Error('not implemented');
  }

  corrupted: boolean;
  implicits: ModContainer;
  item_level: number;
  meta_data: MetaData;
  mirrored: boolean;
  props: BaseItemTypeProps;
  random_name: string;
  rarity: Rarity;

  constructor(props: BaseItemTypeProps, meta_data: MetaData) {
    super([]);

    // default
    this.corrupted = false;
    this.item_level = Item.MAX_ILVL;
    this.mirrored = false;
    this.random_name = 'Random Name';
    this.rarity = 'normal';

    this.meta_data = meta_data;
    this.props = props;

    this.implicits = new ItemImplicits([]);
    for (const implicit of this.props.implicit_mods) {
      if (!this.implicits.addMod(new ApplicableMod(implicit))) {
        console.log(implicit, 'addMod returned false');
      }
    }
  }

  /**
   * adds a mod if theres room for it
   * no sophisticated domain check. only if affix type is full or not
   */
  addMod(mod: Mod) {
    const has_room_for_affix =
      (mod.isPrefix() && this.getPrefixes().length < this.maxPrefixes()) ||
      (mod.isSuffix() && this.getSuffixes().length < this.maxSuffixes());

    if (has_room_for_affix) {
      return super.addMod(mod);
    } else {
      return false;
    }
  }

  addImplicit(mod: Mod): boolean {
    return this.implicits.addMod(mod);
  }

  removeAllImplicits(): void {
    return this.implicits.removeAllMods();
  }

  removeImplicit(mod: Mod): boolean | number {
    return this.implicits.removeMod(mod);
  }

  getImplicit(primary: number): ?Mod {
    return this.implicits.getMod(primary);
  }

  getImplicitIndexOfModWithPrimary(primary: number) {
    return this.implicits.indexOfModWithPrimary(primary);
  }

  hasTag(other: TagProps) {
    return this.tags.find(tag => tag.primary === other.primary) === undefined;
  }

  /**
   * adds a new tag to the item if its not already presen
   */
  addTag(tag: TagProps) {
    if (this.hasTag(tag)) {
      this.tags.push(tag);
      return true;
    } else {
      return false;
    }
  }

  /**
   * removes an existing tag
   */
  removeTag(other: TagProps) {
    const index = this.tags.findIndex(tag => other.primary === tag.primary);

    if (this.hasTag(other)) {
      this.tags.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * returns tags of item + tags from mods
   */
  getTags(): TagProps[] {
    return super.getTags().concat(this.meta_data.props.tags, this.tags);
  }
  /**
   * returns the max possible number of the given generation type
   * @override
   */
  maxModsOfType(mod: Mod): number {
    switch (mod.props.generation_type) {
      case Mod.TYPE.PREFIX:
        return this.maxPrefixes();
      case Mod.TYPE.SUFFIX:
        return this.maxSuffixes();
      case Mod.TYPE.VAAL:
      case Mod.TYPE.ENCHANTMENT:
      case Mod.TYPE.TALISMAN:
        return this.implicits.maxModsOfType(mod);
      default:
        return -1;
    }
  }

  /**
   * maximum number of prefixes
   */
  maxPrefixes(): number {
    switch (this.rarity) {
      case 'normal':
        return 0;
      case 'magic':
        return 1;
      case 'rare':
      case 'showcase':
        if (this.meta_data.isA('AbstractJewel')) {
          return 2;
        }
        return 3;
      case 'unique':
        return Number.POSITIVE_INFINITY;
      default:
        // flow false positve, every possible value of Rarity is covered
        // but it still infers implicit undefined return
        throw new Error('rarity not recognized');
    }
  }

  /**
   * maximum number of suffixes (=prefixes)
   */
  maxSuffixes(): number {
    return this.maxPrefixes();
  }

  modDomainEquiv(): number {
    if (this.meta_data.isA('AbstractJewel')) {
      return Mod.DOMAIN.JEWEL;
    }
    if (this.meta_data.isA('AbstractFlask')) {
      return Mod.DOMAIN.FLASK;
    }
    if (this.meta_data.isA('AbstractMap')) {
      return Mod.DOMAIN.MAP;
    }
    return Mod.DOMAIN.ITEM;
  }

  /**
   *  checks if the domains are equiv
   */
  inDomainOf(mod_domain: number): boolean {
    switch (mod_domain) {
      case Mod.DOMAIN.MASTER:
        return this.inDomainOf(Mod.DOMAIN.ITEM);
      default:
        return mod_domain === this.modDomainEquiv();
    }
  }

  getImplicits() {
    return this.implicits.asArray();
  }

  getAllMods() {
    return this.asArray().concat(this.getImplicits());
  }

  baseName(): string {
    if (this.rarity === 'magic') {
      return '';
    } else {
      return this.props.name;
    }
  }

  itemName(): string {
    switch (this.rarity) {
      case 'magic':
        var name = '';
        // prefix
        if (this.getPrefixes().length) {
          name += this.getPrefixes()[0].props.name + ' ';
        }
        // + base_name
        name += this.props.name;
        // + suffix
        if (this.getSuffixes().length) {
          name += ' ' + this.getSuffixes()[0].props.name;
        }

        return name;
      case 'rare':
        return this.random_name;
      default:
        return '';
    }
  }

  requirements() {
    const requirements = {
      level: this.requiredLevel(),
      str: 0,
      dex: 0,
      int: 0
    };

    if (this.props.component_attribute_requirement != null) {
      requirements.str = this.props.component_attribute_requirement.req_str;
      requirements.dex = this.props.component_attribute_requirement.req_dex;
      requirements.int = this.props.component_attribute_requirement.req_int;
    }

    return requirements;
  }

  requiredLevel() {
    return Math.max(
      this.props.drop_level,
      ...this.getAllMods().map(mod => Math.floor(0.8 * mod.props.level))
    );
  }

  itemclassName(): string {
    return this.props.item_class.name;
  }

  rarityIdent(): string {
    return this.rarity;
  }

  /**
   * attempts to upgrade the rarity
   * @returns {Boolean} true on change in rarity
   */
  upgradeRarity(): boolean {
    switch (this.rarity) {
      case 'normal':
      case 'showcase':
        this.rarity = 'magic';
        return true;
      case 'magic':
        this.rarity = 'rare';
        return true;
      default:
        return false;
    }
  }

  /**
   * stats of mods combined
   */
  stats() {
    return this.asArray()
      .concat(this.getImplicits())
      .reduce((stats, mod) => {
        // flattened
        return mod.statsJoined().reduce((stats, stat) => {
          const { id } = stat.props;

          // group by stat.Id
          if (stats[id] instanceof Stat) {
            stats[id].values.add(stat.values);
          } else {
            stats[id] = stat;
          }

          return stats;
        }, stats);
      }, {});
  }

  /**
   * TODO
   */
  localStats(): LocalStats {
    const stats = this.stats();

    if (this.props.component_armour != null) {
      return {
        physical_damage_reduction: String(this.props.component_armour.armour)
      };
    } else {
      return { error: 'could not  build' };
    }
  }

  corrupt() {
    if (this.corrupted) {
      throw new Error('invalid state: is already corrupted');
    } else {
      this.corrupted = true;
    }
  }

  mirror() {
    if (this.mirrored) {
      throw new Error('invalid state: is already mirrored');
    } else {
      this.mirrored = true;
    }
  }
}
