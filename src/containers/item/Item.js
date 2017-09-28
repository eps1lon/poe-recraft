// @flow
import { type Container } from '../Container';
import { Mod } from '../../mods';
import type { TagProps, BaseItemTypeProps } from '../../schema';
import MetaData from '../../util/MetaData';
import type Stat from '../../util/Stat';

import BaseItem from './BaseItem';
import type { Component } from './Component';
import Affixes from './components/Affixes';
import ItemSockets, {
  type Sockets,
  type Builder as SocketsBuilder,
} from './components/Sockets';
import ItemName, {
  type Name,
  type Builder as NameBuilder,
} from './components/Name';
import ItemRarity, {
  type Builder as RarityBuilder,
  type Rarity,
  RarityTypes,
} from './components/Rarity';
import Implicits from './components/Implicits';
import ItemRequirements, {
  type Requirements,
  type Builder as RequirementsBuilder,
} from './components/Requirements';
import ItemStats, {
  type Stats,
  type Builder as StatsBuilder,
} from './components/Stats';

export type ItemProps = {
  +corrupted: boolean,
  +item_level: number,
  +mirrored: boolean,
  +sockets?: number,
};

export class UnacceptedMod extends Error {
  type = 'UnacceptedMod';

  constructor() {
    super('Unacceptable mods passed to this Container');
  }
}

type ItemBuilder = {
  affixes: Mod[],
  baseitem: BaseItemTypeProps,
  implicits: Mod[],
  meta_data: MetaData,
  name: NameBuilder,
  props: ItemProps,
  rarity: RarityBuilder,
  requirements: RequirementsBuilder,
  sockets: SocketsBuilder,
};

export default class Item extends BaseItem<ItemBuilder>
  implements Container<Mod> {
  static build(baseitem: BaseItemTypeProps): Item {
    const clazz = baseitem.inherits_from.split(/[\\/]/).pop();
    const meta_data = MetaData.build(clazz);

    if (meta_data == null) {
      throw new Error(`meta_data for ${clazz} not found`);
    }

    const implicits = baseitem.implicit_mods.map(
      mod_props => new Mod(mod_props),
    );

    return new Item({
      affixes: [],
      baseitem,
      implicits,
      meta_data,
      name: 'Random Name',
      props: {
        corrupted: false,
        item_level: 100,
        mirrored: false,
      },
      rarity: RarityTypes.normal,
      requirements: baseitem.component_attribute_requirement,
      sockets: 0,
    });
  }

  static fromBuilder(builder: ItemBuilder): Item {
    return new Item(builder);
  }

  affixes: Affixes;
  implicits: Container<Mod>;
  meta_data: MetaData;
  name: Name & Component<Item, NameBuilder>;
  props: ItemProps;
  rarity: Rarity<Item> & Component<Item, RarityBuilder>;
  requirements: Requirements & Component<Item, RequirementsBuilder>;
  sockets: Sockets & Component<Item, SocketsBuilder>;

  constructor(builder: ItemBuilder) {
    super(builder.baseitem);

    this.props = builder.props;
    this.meta_data = builder.meta_data;

    // components
    this.affixes = new Affixes(this, builder.affixes);
    this.implicits = new Implicits(this, builder.implicits);
    this.name = new ItemName(this, builder.name);
    this.rarity = new ItemRarity(this, builder.rarity);
    this.requirements = new ItemRequirements(this, builder.requirements);
    this.sockets = new ItemSockets(this, builder.sockets);
  }

  builder(): ItemBuilder {
    return {
      affixes: this.affixes.mods,
      baseitem: this.baseitem,
      implicits: this.implicits.mods,
      meta_data: this.meta_data,
      name: this.name.builder(),
      props: this.props,
      rarity: this.rarity.builder(),
      requirements: this.requirements.builder(),
      sockets: this.sockets.builder(),
    };
  }

  // Taggable Implementation
  /**
   * returns tags of item + tags from mods
   */
  getTags(): TagProps[] {
    return [
      ...this.meta_data.props.tags,
      ...this.baseitem.tags,
      ...this.implicits.getTags(),
      ...this.affixes.getTags(),
    ];
  }

  // Container implementtion
  // $FlowFixMe
  get mods(): Mod[] {
    return [...this.implicits.mods, ...this.affixes.mods];
  }

  asArray(): Mod[] {
    return this.mods;
  }

  addMod(other: Mod): this {
    if (other.isAffix()) {
      return this._addAffix(other);
    } else if (other.implicitCandidate()) {
      return this._addImplicit(other);
    } else {
      throw new UnacceptedMod();
    }
  }

  removeMod(other: Mod): this {
    if (other.isAffix()) {
      return this._removeAffix(other);
    } else if (other.implicitCandidate()) {
      return this._removeImplicit(other);
    } else {
      throw new UnacceptedMod();
    }
  }

  removeAllMods(): this {
    return this._mutateAffixes(affixes => affixes.removeAllMods());
  }

  hasMod(other: Mod): boolean {
    return this.affixes.hasMod(other) || this.implicits.hasMod(other);
  }

  hasRoomFor(other: Mod): boolean {
    return this.affixes.hasRoomFor(other) || this.implicits.hasRoomFor(other);
  }

  indexOfModWithPrimary(primary: number): number {
    const affix_index = this.affixes.indexOfModWithPrimary(primary);
    const implicit_index = this.implicits.indexOfModWithPrimary(primary);

    if (affix_index !== -1) {
      return affix_index;
    } else if (implicit_index !== -1) {
      return implicit_index;
    } else {
      return -1;
    }
  }

  maxModsOfType(other: Mod): number {
    if (other.isAffix()) {
      return this.affixes.maxModsOfType(other);
    } else if (other.implicitCandidate()) {
      return this.implicits.maxModsOfType(other);
    } else {
      throw new UnacceptedMod();
    }
  }

  inDomainOf(mod_domain: number): boolean {
    return this.affixes.inDomainOf(mod_domain);
  }

  level(): number {
    return this.props.item_level;
  }

  any(): boolean {
    return this.mods.length > 0;
  }

  stats(): { [string]: Stat } {
    // merge implicit stats and affix stats by adding its stats
    const a: { [string]: Stat } = this.implicits.stats();
    const b: { [string]: Stat } = this.affixes.stats();

    // assume that keys are unique
    return [
      ...Object.keys(a),
      ...Object.keys(b),
    ].reduce((stats: { [string]: Stat }, key: string) => {
      const left: ?Stat = a[key];
      const right: ?Stat = b[key];

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
        }

        return {
          ...stats,
          [key]: merged,
        };
      }
    }, {});
  }
  // End Container implementation

  removeAllImplicits(): this {
    return this._mutateImplicits(implicits => implicits.removeAllMods());
  }

  // Begin state managment
  setProperty(prop: $Keys<ItemProps>, value: any): this {
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

  corrupt(): this {
    if (this.props.corrupted) {
      throw new Error('invalid state: is already corrupted');
    } else {
      return this.setProperty('corrupted', true);
    }
  }

  mirror(): this {
    if (this.props.mirrored) {
      throw new Error('invalid state: is already mirrored');
    } else {
      return this.setProperty('mirrored', true);
    }
  }
  // End state

  // private
  _mutateAffixes(mutate: (Container<Mod>) => Container<Mod>): this {
    return this.withMutations(builder => {
      return {
        ...builder,
        affixes: mutate(this.affixes).mods,
      };
    });
  }

  _addAffix(other: Mod): this {
    return this._mutateAffixes(affixes => affixes.addMod(other));
  }

  _removeAffix(other: Mod): this {
    return this._mutateAffixes(affixes => affixes.removeMod(other));
  }

  _mutateImplicits(mutate: (Container<Mod>) => Container<Mod>): this {
    return this.withMutations(builder => {
      return {
        ...builder,
        implicits: mutate(this.implicits).mods,
      };
    });
  }

  _addImplicit(other: Mod): this {
    return this._mutateImplicits(implicits => implicits.addMod(other));
  }

  _removeImplicit(other: Mod): this {
    return this._mutateImplicits(implicits => implicits.removeMod(other));
  }
}
