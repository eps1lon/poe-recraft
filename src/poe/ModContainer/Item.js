// @flow
import type { BaseItemTypeProps, MetaDataMap, TagProps } from '../data/schema';
import type { ValueRange } from '../ValueRange';

import ItemImplicits from './ItemImplicits';
import MetaData from '../MetaData';
import Mod from '../Mod/';
import ModContainer from './';
import Stat from '../Stat';

export type Rarity = 'normal' | 'magic' | 'rare' | 'unique' | 'showcase';

export type LocalStats = {
  [string]: ValueRange | string
};

export type ItemProps = {
  +corrupted: boolean,
  +item_level: number,
  +mirrored: boolean,
  +random_name: string,
  +rarity: Rarity
};

export type ItemProperty = $Keys<ItemProps>;

export type ItemBuilder = {
  affixes: Mod[],
  baseitem: BaseItemTypeProps,
  implicits: Mod[],
  meta_data: MetaData,
  props: ItemProps,
  tags: TagProps[]
};

/**
 * 
 * Item Class extends ModContainer
 * class Item mixins ModContainer, BaseItem
 * 
 * represents an ingame item (boots, maps, rings for example)
 * the class only represents the explicits and is a fascade for an 
 * additional implicit container
 */
export default class Item extends ModContainer {
  static MAX_ILVL = 100;

  static default_props: ItemProps = {
    corrupted: false,
    item_level: Item.MAX_ILVL,
    mirrored: false,
    random_name: 'Random Name',
    rarity: 'normal'
  };

  static build(props: BaseItemTypeProps, meta_datas: MetaDataMap) {
    const clazz = props.inherits_from.split(/[\\/]/).pop();
    const meta_data = MetaData.build(clazz, meta_datas);

    if (meta_data == null) {
      throw new Error(`meta_data for ${clazz} not found`);
    } else {
      return new Item(props, meta_data);
    }
  }

  static withBuilder(builder: ItemBuilder) {
    const { affixes, baseitem, implicits, meta_data, props, tags } = builder;

    return new Item(baseitem, meta_data, props, implicits, affixes, tags);
  }

  static applyStat(
    value: ValueRange | number,
    stat: Stat,
    precision: number
  ): ValueRange {
    throw new Error('not implemented');
  }

  +baseitem: BaseItemTypeProps;
  +implicits: ModContainer;
  +meta_data: MetaData;
  +props: ItemProps;
  +tags: TagProps[];

  constructor(
    baseitem: BaseItemTypeProps,
    meta_data: MetaData,
    props: ItemProps = Item.default_props,
    implicits: Mod[] = [],
    affixes: Mod[] = [],
    tags: TagProps[] = []
  ) {
    super(affixes);

    (this: any).baseitem = baseitem;
    (this: any).meta_data = meta_data;
    (this: any).props = props;
    (this: any).tags = tags;

    (this: any).implicits = new ItemImplicits(implicits);
    // TODO implicits
  }

  builder(): ItemBuilder {
    return {
      affixes: this.mods,
      baseitem: this.baseitem,
      implicits: this.implicits.mods,
      meta_data: this.meta_data,
      props: this.props,
      tags: this.tags
    };
  }

  // batch mutations
  withMutations(mutate: ItemBuilder => ItemBuilder): Item {
    const builder = mutate(this.builder());

    return Item.withBuilder(builder);
  }
  /**
   * adds a mod if theres room for it
   * no sophisticated domain check. only if affix type is full or not
   * 
   * TODO defer to addImplicit if implicit candidate or just silently dont
   * change anything?
   */
  addMod(other: Mod) {
    const has_room_for_affix =
      (other.isPrefix() && this.getPrefixes().length < this.maxPrefixes()) ||
      (other.isSuffix() && this.getSuffixes().length < this.maxSuffixes());

    if (has_room_for_affix) {
      return this.withMutations(builder => {
        return {
          ...builder,
          affixes: builder.affixes.concat(other)
        };
      });
    } else {
      return this;
    }
  }

  /**
   * truncates mods
   */
  removeAllMods() {
    return this.withMutations(builder => {
      return {
        ...builder,
        affixes: []
      };
    });
  }

  /**
   * removes an existing mod
   */
  removeMod(other: Mod) {
    if (this.hasMod(other)) {
      return this.withMutations(builder => {
        return {
          ...builder,
          affixes: builder.affixes.filter(
            mod => mod.props.primary !== other.props.primary
          )
        };
      });
    } else {
      return this;
    }
  }

  addImplicit(mod: Mod) {
    const builder = this.builder();

    return Item.withBuilder({
      ...builder,
      implicits: this.implicits.addMod(mod).mods
    });
  }

  removeAllImplicits() {
    const builder = this.builder();

    return Item.withBuilder({
      ...builder,
      implicits: this.implicits.removeAllMods().mods
    });
  }

  removeImplicit(mod: Mod) {
    const builder = this.builder();

    return Item.withBuilder({
      ...builder,
      implicits: this.implicits.removeMod(mod).mods
    });
  }

  getImplicit(primary: number) {
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
      return this.withMutations(builder => {
        return {
          ...builder,
          tags: this.tags.concat(tag)
        };
      });
    } else {
      return this;
    }
  }

  /**
   * removes an existing tag
   */
  removeTag(other: TagProps) {
    if (this.hasTag(other)) {
      return this.withMutations(builder => {
        return {
          ...builder,
          tags: this.tags.filter(tag => tag.primary !== other.primary)
        };
      });
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
    switch (this.props.rarity) {
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
      return this.baseitem.name;
    }
  }

  itemName(): string {
    switch (this.props.rarity) {
      case 'magic':
        var name = '';
        // prefix
        if (this.getPrefixes().length) {
          name += this.getPrefixes()[0].props.name + ' ';
        }
        // + base_name
        name += this.baseitem.name;
        // + suffix
        if (this.getSuffixes().length) {
          name += ' ' + this.getSuffixes()[0].props.name;
        }

        return name;
      case 'rare':
        return this.props.random_name;
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

    if (this.baseitem.component_attribute_requirement != null) {
      requirements.str = this.baseitem.component_attribute_requirement.req_str;
      requirements.dex = this.baseitem.component_attribute_requirement.req_dex;
      requirements.int = this.baseitem.component_attribute_requirement.req_int;
    }

    return requirements;
  }

  requiredLevel() {
    return Math.max(
      this.baseitem.drop_level,
      ...this.getAllMods().map(mod => Math.floor(0.8 * mod.props.level))
    );
  }

  itemclassName(): string {
    return this.baseitem.item_class.name;
  }

  rarityIdent(): string {
    return this.props.rarity;
  }

  /**
   * attempts to upgrade the rarity
   * @returns {Boolean} true on change in rarity
   */
  upgradeRarity(): Item {
    let new_rarity: Rarity;

    switch (this.props.rarity) {
      case 'normal':
      case 'showcase':
        new_rarity = 'magic';
        break;
      case 'magic':
        new_rarity = 'rare';
        break;
      default:
        new_rarity = this.props.rarity;
    }

    if (new_rarity !== this.props.rarity) {
      return this.setRarity(new_rarity);
    } else {
      return this;
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

    if (this.baseitem.component_armour != null) {
      return {
        physical_damage_reduction: String(this.baseitem.component_armour.armour)
      };
    } else {
      return { error: 'could not  build' };
    }
  }

  corrupt(): Item {
    if (this.props.corrupted) {
      throw new Error('invalid state: is already corrupted');
    } else {
      return this._setProperty('corrupted', true);
    }
  }

  mirror(): Item {
    if (this.props.mirrored) {
      throw new Error('invalid state: is already mirrored');
    } else {
      return this._setProperty('mirrored', true);
    }
  }

  setRarity(rarity: Rarity): Item {
    return this._setProperty('rarity', rarity);
  }

  // private
  _setProperty(prop: ItemProperty, value: any): Item {
    return this.withMutations(builder => {
      return {
        ...builder,
        props: {
          ...builder.props,
          [prop]: value
        }
      };
    });
  }
}
