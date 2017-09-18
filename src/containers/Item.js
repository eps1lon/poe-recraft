// @flow
import type { BaseItemTypeProps, MetaDataMap, TagProps } from '../schema';
import type { ValueRange } from '../util/ValueRange';

import Implicits from './Implicits';
import MetaData from '../util/MetaData';
import { Mod, metaMods as META_MODS } from '../mods';
import Container from './Container';
import Stat from '../util/Stat';

export type Rarity = 'normal' | 'magic' | 'rare' | 'unique' | 'showcase';

export type LocalStats = {
  [string]: ValueRange | string,
};

export type ItemProps = {
  +corrupted: boolean,
  +item_level: number,
  +mirrored: boolean,
  +random_name: string,
  +rarity: Rarity,
};

export type ItemProperty = $Keys<ItemProps>; // eslint-disable-line no-undef

export type ItemBuilder = {
  affixes: Mod[],
  baseitem: BaseItemTypeProps,
  implicits: Mod[],
  meta_data: MetaData,
  props: ItemProps,
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
export default class Item extends Container {
  static MAX_ILVL = 100;

  static default_props: ItemProps = {
    corrupted: false,
    item_level: Item.MAX_ILVL,
    mirrored: false,
    random_name: 'Random Name',
    rarity: 'normal',
  };

  static build(props: BaseItemTypeProps, meta_datas: MetaDataMap): Item {
    const clazz = props.inherits_from.split(/[\\/]/).pop();
    const meta_data = MetaData.build(clazz, meta_datas);

    if (meta_data == null) {
      throw new Error(`meta_data for ${clazz} not found`);
    } else {
      return new Item(
        props,
        meta_data,
        Item.default_props,
        props.implicit_mods.map(mod_props => new Mod(mod_props)),
        [],
      );
    }
  }

  static withBuilder(builder: ItemBuilder) {
    const { affixes, baseitem, implicits, meta_data, props } = builder;

    return new Item(baseitem, meta_data, props, implicits, affixes);
  }

  static applyStat(
    value: ValueRange | number,
    stat: Stat,
    precision: number, // eslint-disable-line no-unused-vars
  ): ValueRange {
    throw new Error('not implemented');
  }

  +baseitem: BaseItemTypeProps;
  +implicits: Container;
  +meta_data: MetaData;
  +props: ItemProps;

  constructor(
    baseitem: BaseItemTypeProps,
    meta_data: MetaData,
    props: ItemProps = Item.default_props,
    implicits: Mod[] = [],
    affixes: Mod[] = [],
  ) {
    super(affixes);

    (this: any).baseitem = baseitem;
    (this: any).meta_data = meta_data;
    (this: any).props = props;

    (this: any).implicits = new Implicits(implicits);
  }

  builder(): ItemBuilder {
    return {
      affixes: this.mods,
      baseitem: this.baseitem,
      implicits: this.implicits.mods,
      meta_data: this.meta_data,
      props: this.props,
    };
  }

  // batch mutations
  withMutations(mutate: ItemBuilder => ItemBuilder): Item {
    const builder = mutate(this.builder());

    return Item.withBuilder(builder);
  }

  addMod(other: Mod): Item {
    if (other.isAffix()) {
      return this.addAffix(other);
    } else if (other.implicitCandidate()) {
      return this.addImplicit(other);
    } else {
      return this;
    }
  }

  /**
   * truncates mods
   */
  removeAllMods(): Item {
    if (this.affixes.mods.length > 0) {
      return this.withMutations(builder => {
        return {
          ...builder,
          affixes: [],
        };
      });
    } else {
      return this;
    }
  }

  /**
   * removes an existing mod
   */
  removeMod(other: Mod): Item {
    if (this.hasMod(other)) {
      return this.withMutations(builder => {
        return {
          ...builder,
          affixes: builder.affixes.filter(
            mod => mod.props.primary !== other.props.primary,
          ),
        };
      });
    } else {
      return this;
    }
  }

  /**
   * adds a mod if theres room for it
   * no sophisticated domain check. only if affix type is full or not
   */
  addAffix(other: Mod): Item {
    if (this.hasRoomFor(other)) {
      return this.withMutations(builder => {
        return {
          ...builder,
          affixes: new Container(builder.affixes).addMod(other).mods,
        };
      });
    } else {
      return this;
    }
  }

  addImplicit(mod: Mod): Item {
    const builder = this.builder();

    return Item.withBuilder({
      ...builder,
      implicits: this.implicits.addMod(mod).mods,
    });
  }

  removeAllImplicits(): Item {
    const builder = this.builder();

    return Item.withBuilder({
      ...builder,
      implicits: this.implicits.removeAllMods().mods,
    });
  }

  get affixes(): Item {
    return this;
  }

  getPrefixes() {
    return this.affixes.mods.filter(mod => mod.isPrefix());
  }

  getSuffixes() {
    return this.affixes.mods.filter(mod => mod.isSuffix());
  }

  /**
   * returns tags of item + tags from mods
   */
  getTags(): TagProps[] {
    return super
      .getTags()
      .concat(this.meta_data.props.tags, this.baseitem.tags);
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
        return 1;
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

  lockedPrefixes(): boolean {
    return this.indexOfModWithPrimary(META_MODS.LOCKED_PREFIXES) !== -1;
  }

  lockedSuffixes(): boolean {
    return this.indexOfModWithPrimary(META_MODS.LOCKED_SUFFIXES) !== -1;
  }

  nameLines(): string[] {
    const { rarity } = this.props;
    if (rarity === 'normal') {
      return [this.baseitem.name];
    } else if (rarity === 'magic') {
      const prefix = this.getPrefixes()[0];
      const suffix = this.getSuffixes()[0];

      return [
        [
          prefix && prefix.props.name,
          this.baseitem.name,
          suffix && suffix.props.name,
        ]
          .filter(Boolean)
          .join(' '),
      ];
    } else if (rarity === 'rare' || rarity === 'showcase') {
      return [this.props.random_name, this.baseitem.name];
    } else if (rarity === 'unique') {
      return ['TODO unique name?', this.baseitem.name];
    } else {
      throw new Error(`unrecognized rarity ${rarity}`);
    }
  }

  requirements() {
    const requirements = {
      level: this.requiredLevel(),
      str: 0,
      dex: 0,
      int: 0,
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
      ...this.getAllMods().map(mod => mod.requiredLevel()),
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
    return this.getAllMods().reduce((stats, mod: Mod) => {
      // flattened
      return mod.statsJoined().reduce((joined, stat) => {
        const { id } = stat.props;
        const existing = joined[id];

        // TODO fix typing
        // group by stat.Id
        if (existing instanceof Stat) {
          return {
            ...joined,
            [id]: existing.add(stat.values),
          };
        } else {
          return {
            ...joined,
            [id]: stat,
          };
        }
      }, stats);
    }, {});
  }

  /**
   * TODO
   */
  localStats(): LocalStats {
    if (this.baseitem.component_armour != null) {
      return {
        physical_damage_reduction: String(
          this.baseitem.component_armour.armour,
        ),
      };
    } else {
      return { error: 'could not  build' };
    }
  }

  corrupt(): Item {
    if (this.props.corrupted) {
      throw new Error('invalid state: is already corrupted');
    } else {
      return this.setProperty('corrupted', true);
    }
  }

  mirror(): Item {
    if (this.props.mirrored) {
      throw new Error('invalid state: is already mirrored');
    } else {
      return this.setProperty('mirrored', true);
    }
  }

  setRarity(rarity: Rarity): Item {
    return this.setProperty('rarity', rarity);
  }

  // private
  setProperty(prop: ItemProperty, value: any): Item {
    return this.withMutations(builder => {
      return {
        ...builder,
        props: {
          ...builder.props,
          [prop]: value,
        },
      };
    });
  }
}
