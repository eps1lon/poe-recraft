// @flow
import { AbstractMethod } from '../exceptions';
import type { TagProps } from '../schema';
import type Mod from '../mods/Mod';
import Stat from '../calculator/Stat';

import type { Container } from './Container';

export type Builder<T: Mod> = {
  mods: T[],
};

export default class ImmutableContainer<T: Mod, B: Builder<T>>
  implements Container<T> {
  +mods: T[];

  static withBuilder(builder: B): ImmutableContainer<T, B> {
    return new ImmutableContainer(builder.mods);
  }

  constructor(mods: T[]) {
    (this: any).mods = mods;
  }

  builder(): B {
    const builder: $Shape<B> = { mods: this.mods };

    return builder;
  }

  // batch mutations
  withMutations(mutate: B => B): this {
    const builder = mutate(this.builder());

    return this.constructor.withBuilder(builder);
  }

  /**
   *  adds a new non-existing mod
   */
  addMod(mod: T): this {
    if (!this.hasMod(mod)) {
      return this.withMutations(builder => {
        return {
          ...builder,
          mods: builder.mods.concat(mod),
        };
      });
    } else {
      return this;
    }
  }

  /**
   * truncates mods
   */
  removeAllMods(): this {
    if (this.mods.length > 0) {
      return this.withMutations(builder => {
        return {
          ...builder,
          mods: [],
        };
      });
    } else {
      return this;
    }
  }

  /**
   * removes an existing mod
   */
  removeMod(other: T): this {
    if (this.hasMod(other)) {
      return this.withMutations(builder => {
        return {
          ...builder,
          mods: this.mods.filter(
            mod => mod.props.primary !== other.props.primary,
          ),
        };
      });
    } else {
      return this;
    }
  }

  indexOfModWithPrimary(primary: number): number {
    return this.mods.findIndex(mod => mod.props.primary === primary);
  }

  indexOfMod(mod: T): number {
    return this.indexOfModWithPrimary(mod.props.primary);
  }

  hasMod(mod: T): boolean {
    return this.indexOfMod(mod) !== -1;
  }

  /**
   * tags of the mods in the container
   */
  getTags(): TagProps[] {
    return this.mods
      .reduce((tags, mod) => {
        return tags.concat(mod.props.tags);
      }, [])
      .filter(
        // unique by id
        (tag, i, tags) => tags.findIndex(other => other.id === tag.id) === i,
      );
  }

  asArray(): T[] {
    return this.mods;
  }

  /**
   * @param {number} mod_type generation type
   */
  numberOfModsOfType(mod_type: number): number {
    return this.mods.filter(mod => mod.props.generation_type === mod_type)
      .length;
  }

  /**
   * checks if theres more place for a mod with their generationtype
   */
  hasRoomFor(mod: T): boolean {
    return (
      this.numberOfModsOfType(mod.props.generation_type) <
      this.maxModsOfType(mod)
    );
  }

  /**
   * checks if this container has any mods
   */
  any(): boolean {
    return this.mods.length > 0;
  }

  /**
   * lists all the stats that are offered by its mods
   * 
   * mods can have multiple stats so we sum their values grouped by stat id
   */
  stats(): { [string]: Stat } {
    return this.mods.reduce((stats: { [string]: Stat }, mod: Mod) => {
      // flattened
      return mod.statsJoined().reduce((joined, stat) => {
        const { id } = stat.props;
        const existing = joined[id];

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
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  maxModsOfType(mod: T): number {
    throw new AbstractMethod('maxModsOfType');
  }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  inDomainOf(mod_domain: number): boolean {
    throw new AbstractMethod('inDomainOf');
  }

  /**
   * @abstract
   */
  level(): number {
    throw new AbstractMethod('level');
  }
}
