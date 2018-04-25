import { BaseError } from 'make-error';

import Container from '../Container';
import { Mod } from '../../mods';
import { Tag, BaseItemTypeProps } from '../../schema';
import MetaData from '../../util/MetaData';
import Stat from '../../calculator/Stat';
import Value from '../../calculator/Value';

import atlasModifier, {
  AtlasModifier,
  tagsWithModifier as tagsWithAtlasModifier,
} from './atlasModifier';
import Component from './Component';
import ItemAffixes from './components/Affixes';
import ItemSockets, {
  Sockets,
  Builder as SocketsBuilder,
} from './components/Sockets';
import ItemName, { Name, Builder as NameBuilder } from './components/Name';
import ItemRarity, {
  Builder as RarityBuilder,
  Rarity,
  RarityKind,
} from './components/Rarity';
import Implicits from './components/Implicits';
import ItemRequirements, {
  Requirements,
  Builder as RequirementsBuilder,
} from './components/Requirements';
import {
  Properties,
  Builder as PropertiesBuilder,
  build as buildProperties,
} from './components/properties';
import { AugmentableValue } from './util';

export interface ItemProps {
  readonly atlas_modifier: AtlasModifier;
  readonly corrupted: boolean;
  readonly item_level: number;
  readonly mirrored: boolean;
}

export class UnacceptedMod extends BaseError {
  constructor() {
    super('Unacceptable mods passed to this Container');
  }
}

export interface Builder {
  /** 
   * explicits of the item 
   */
  affixes: Mod[];
  baseitem: BaseItemTypeProps;
  implicits: Mod[];
  /** 
   * reflection of the baseitem
   */
  meta_data: MetaData;
  name: NameBuilder;
  props: ItemProps;
  properties: PropertiesBuilder;
  rarity: RarityBuilder;
  requirements: RequirementsBuilder;
  sockets: SocketsBuilder;
}

const shallowEqual = (a: { [key: string]: any }, b: { [key: string]: any }) => {
  return a === b || Object.keys(a).every(key => a[key] === b[key]);
};

/** 
 * an Item in Path of Exile
 */
export default class Item implements Container<Mod> {
  /**
   * creates a new item from the baseitem
   * @param baseitem 
   */
  public static build(baseitem: BaseItemTypeProps): Item {
    const clazz = String(baseitem.inherits_from.split(/[\\/]/).pop());
    const meta_data = MetaData.build(clazz);

    const implicits = baseitem.implicit_mods.map(
      mod_props => new Mod(mod_props),
    );

    return new Item({
      affixes: [],
      baseitem,
      implicits,
      meta_data,
      name: 'Random Name',
      /**
       * miscellaneous props
       */
      props: {
        atlas_modifier: atlasModifier(baseitem),
        corrupted: false,
        item_level: 100,
        mirrored: false,
      },
      /**
       * calculation related props
       */
      properties: { quality: 0 },
      rarity: RarityKind.normal,
      requirements: baseitem.component_attribute_requirement,
      /**
       * the sockets of the item
       */
      sockets: 0,
    });
  }

  public static fromBuilder(builder: Builder): Item {
    return new Item(builder);
  }

  public affixes: ItemAffixes;
  public baseitem: BaseItemTypeProps;
  public implicits: Implicits;
  public meta_data: MetaData;
  public name: Name & Component<Item, NameBuilder>;
  public props: ItemProps;
  public properties: Properties & Component<Item, any>;
  public rarity: Rarity<Item> & Component<Item, RarityBuilder>;
  public requirements: Requirements & Component<Item, RequirementsBuilder>;
  public sockets: Sockets & Component<Item, SocketsBuilder>;

  /**
   * Use Item#build
   * 
   * @private
   * @param builder 
   */
  constructor(builder: Builder) {
    this.baseitem = builder.baseitem;
    this.props = builder.props;
    this.meta_data = builder.meta_data;

    // components
    this.name = new ItemName(this, builder.name);
    this.properties = buildProperties(this, builder.properties);
    this.rarity = new ItemRarity(this, builder.rarity);
    this.requirements = new ItemRequirements(this, builder.requirements);
    this.sockets = new ItemSockets(this, builder.sockets);
    this.affixes = new ItemAffixes(this, builder.affixes);
    this.implicits = new Implicits(this, builder.implicits);
  }

  public withMutations(mutate: (builder: Builder) => Builder): this {
    const prev = this.builder();
    const mutated = mutate(prev);

    if (shallowEqual(prev, mutated)) {
      return this;
    } else {
      // @ts-ignore
      return this.constructor.fromBuilder(mutated);
    }
  }

  public builder(): Builder {
    return {
      affixes: this.affixes.mods,
      baseitem: this.baseitem,
      implicits: this.implicits.mods,
      meta_data: this.meta_data,
      name: this.name.builder(),
      props: this.props,
      properties: this.properties.builder(),
      rarity: this.rarity.builder(),
      requirements: this.requirements.builder(),
      sockets: this.sockets.builder(),
    };
  }

  // Taggable Implementation
  /**
   * returns tags of item + tags from mods
   */
  public getTags(): Tag[] {
    return [
      ...this.meta_data.props.tags,
      ...this.baseitem.tags,
      ...this.implicits.getTags(),
      ...this.affixes.getTags(),
    ];
  }

  // Container implementtion
  get mods(): Mod[] {
    return [...this.implicits.mods, ...this.affixes.mods];
  }

  public asArray(): Mod[] {
    return this.mods;
  }

  /**
   * decides where to add the mod (explicit, implicit)
   * throws if it could not decide where to put it
   * @param other 
   */
  public addMod(other: Mod): this {
    if (other.isAffix()) {
      return this.addAffix(other);
    } else if (other.implicitCandidate()) {
      return this.addImplicit(other);
    } else {
      throw new UnacceptedMod();
    }
  }

  /**
   * removed this mod either from implicit or explicit
   * 
   * if that mod fiths into neither category it throws
   * @param other 
   */
  public removeMod(other: Mod): this {
    if (other.isAffix()) {
      return this.removeAffix(other);
    } else if (other.implicitCandidate()) {
      return this.removeImplicit(other);
    } else {
      throw new UnacceptedMod();
    }
  }

  /**
   * removes explicits
   */
  public removeAllMods(): this {
    return this.mutateAffixes(affixes => affixes.removeAllMods());
  }

  public hasMod(other: Mod): boolean {
    return this.affixes.hasMod(other) || this.implicits.hasMod(other);
  }

  public hasModGroup(other: Mod): boolean {
    return (
      // isAffix => this.affixes.hasModGroup(other)
      (!other.isAffix() || this.affixes.hasModGroup(other)) &&
      // implicitCandidate => this.implicits.hasModGroup(other)
      (!other.implicitCandidate() || this.implicits.hasModGroup(other))
    );
  }

  public hasRoomFor(other: Mod): boolean {
    return this.affixes.hasRoomFor(other) || this.implicits.hasRoomFor(other);
  }

  public indexOfModWithId(id: string): number {
    const affix_index = this.affixes.indexOfModWithId(id);
    const implicit_index = this.implicits.indexOfModWithId(id);

    if (affix_index !== -1) {
      return affix_index;
    } else if (implicit_index !== -1) {
      return implicit_index;
    } else {
      return -1;
    }
  }

  public maxModsOfType(other: Mod): number {
    if (other.isAffix()) {
      return this.affixes.maxModsOfType(other);
    } else if (other.implicitCandidate()) {
      return this.implicits.maxModsOfType(other);
    } else {
      throw new UnacceptedMod();
    }
  }

  public inDomainOf(mod_domain: number): boolean {
    return this.affixes.inDomainOf(mod_domain);
  }

  public level(): number {
    return this.props.item_level;
  }

  public any(): boolean {
    return this.mods.length > 0;
  }

  /**
   * merge of implicit and explicit stats 
   */
  public stats(): { [key: string]: Stat } {
    // merge implicit stats and affix stats by adding its stats
    const a: { [key: string]: Stat } = this.implicits.stats();
    const b: { [key: string]: Stat } = this.affixes.stats();

    // assume that keys are unique
    return [
      ...Object.keys(a),
      ...Object.keys(b),
    ].reduce((stats: { [key: string]: Stat }, key: string) => {
      const left: Stat | undefined = a[key];
      const right: Stat | undefined = b[key];

      if (stats[key] != null) {
        // already merged
        return stats;
      } else {
        let merged: Stat;

        if (left != null && right != null) {
          merged = left.add(right.values);
        } else if (right != null) {
          merged = right;
        } else if (left != null) {
          merged = left;
        } else {
          // unreachable
          throw new Error('unreachable code');
        }

        return {
          ...stats,
          [key]: merged,
        };
      }
    }, {});
  }
  // End Container implementation

  public removeAllImplicits(): this {
    return this.mutateImplicits(implicits => implicits.removeAllMods());
  }

  // Begin state managment
  public setProperty(prop: keyof ItemProps, value: any): this {
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

  /**
   * sets the corrupted property on the item or throws if it is already corrupted
   */
  public corrupt(): this {
    if (this.props.corrupted) {
      throw new Error('invalid state: is already corrupted');
    } else {
      return this.setProperty('corrupted', true);
    }
  }

  /**
   * sets the mirror property on the item or throws if it is already mirrored
   */
  public mirror(): this {
    if (this.props.mirrored) {
      throw new Error('invalid state: is already mirrored');
    } else {
      return this.setProperty('mirrored', true);
    }
  }

  public isElderItem(): boolean {
    return this.props.atlas_modifier === AtlasModifier.ELDER;
  }

  /** 
   * returns an item that can have elder mods
   * 
   * this does not remove existing shaper mods 
   */
  public asElderItem(): this {
    return this.asAtlasModifier(AtlasModifier.ELDER);
  }

  public isSHaperItem(): boolean {
    return this.props.atlas_modifier === AtlasModifier.SHAPER;
  }

  /** 
   * returns an item that can have shaper mods
   * 
   * this does not remove existing elder mods 
   */
  public asShaperItem(): this {
    return this.asAtlasModifier(AtlasModifier.SHAPER);
  }

  // returns an item that cant have elder or shaper mods
  // this does not remove existing elder or shaper mods
  public removeAtlasModifier(): this {
    return this.asAtlasModifier(AtlasModifier.NONE);
  }
  // End state

  /**
   * augments a given {value} with the local stats
   * @param value 
   * @param classification 
   */
  public computeValue(
    value: number,
    classification: string[],
  ): AugmentableValue {
    const base = new Value([value, value], classification);
    return base
      .augmentWith(Object.values(this.stats()))
      .augmentWith([
        new Stat({ id: 'local_quality' }, [
          this.properties.quality,
          this.properties.quality,
        ]),
      ])
      .compute();
  }

  // private
  private mutateAffixes(mutate: (a: ItemAffixes) => ItemAffixes): this {
    return this.withMutations(builder => {
      return {
        ...builder,
        affixes: mutate(this.affixes).mods,
      };
    });
  }

  private addAffix(other: Mod): this {
    return this.mutateAffixes(affixes => affixes.addMod(other));
  }

  private removeAffix(other: Mod): this {
    return this.mutateAffixes(affixes => affixes.removeMod(other));
  }

  private mutateImplicits(mutate: (i: Implicits) => Implicits): this {
    return this.withMutations(builder => {
      return {
        ...builder,
        implicits: mutate(this.implicits).mods,
      };
    });
  }

  private addImplicit(other: Mod): this {
    return this.mutateImplicits(implicits => implicits.addMod(other));
  }

  private removeImplicit(other: Mod): this {
    return this.mutateImplicits(implicits => implicits.removeMod(other));
  }

  private asAtlasModifier(modifier: AtlasModifier): this {
    if (this.props.atlas_modifier === modifier) {
      return this;
    } else {
      return this.withMutations(builder => {
        return {
          ...builder,
          baseitem: {
            ...builder.baseitem,
            tags: tagsWithAtlasModifier(
              builder.baseitem,
              builder.meta_data,
              modifier,
            ),
          },
          props: {
            ...builder.props,
            atlas_modifier: modifier,
          },
        };
      });
    }
  }
}
