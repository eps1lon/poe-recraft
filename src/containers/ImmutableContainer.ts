import { TagProps } from '../schema';
import Mod from '../mods/Mod';
import Stat from '../calculator/Stat';

import Container from './Container';

export interface Builder<T extends Mod> {
  mods: T[];
}

export default abstract class ImmutableContainer<
  T extends Mod,
  B extends Builder<T>
> implements Container<T> {
  public mods: T[];

  constructor(mods: T[]) {
    this.mods = mods;
  }

  public builder(): B {
    return { mods: this.mods } as B;
  }

  // batch mutations
  public withMutations(mutate: (builder: B) => B): this {
    const builder = mutate(this.builder());

    // @ts-ignore
    return this.constructor.withBuilder(builder);
  }

  /**
   *  adds a new non-existing mod
   */
  public addMod(mod: T): this {
    if (!this.hasMod(mod)) {
      return this.withMutations(builder => {
        return Object.assign({}, builder, { mods: builder.mods.concat(mod) });
      });
    } else {
      return this;
    }
  }

  /**
   * truncates mods
   */
  public removeAllMods(): this {
    if (this.mods.length > 0) {
      return this.withMutations(builder => {
        return Object.assign({}, builder, { mods: [] });
      });
    } else {
      return this;
    }
  }

  /**
   * removes an existing mod
   */
  public removeMod(other: T): this {
    if (this.hasMod(other)) {
      return this.withMutations(builder => {
        return Object.assign({}, builder, {
          mods: this.mods.filter(
            mod => mod.props.primary !== other.props.primary,
          ),
        });
      });
    } else {
      return this;
    }
  }

  public indexOfModWithPrimary(primary: number): number {
    return this.mods.findIndex(mod => mod.props.primary === primary);
  }

  public indexOfMod(mod: T): number {
    return this.indexOfModWithPrimary(mod.props.primary);
  }

  public hasMod(mod: T): boolean {
    return this.indexOfMod(mod) !== -1;
  }

  public hasModGroup(other: T): boolean {
    return (
      this.mods.find(
        mod => mod.props.correct_group === other.props.correct_group,
      ) !== undefined
    );
  }

  /**
   * tags of the mods in the container
   */
  public getTags(): TagProps[] {
    return this.mods
      .reduce(
        (tags, mod) => {
          return tags.concat(mod.props.tags);
        },
        [] as TagProps[],
      )
      .filter(
        // unique by id
        (tag, i, tags) => tags.findIndex(other => other.id === tag.id) === i,
      );
  }

  public asArray(): T[] {
    return this.mods;
  }

  /**
   * @param {number} mod_type generation type
   */
  public numberOfModsOfType(mod_type: number): number {
    return this.mods.filter(mod => mod.props.generation_type === mod_type)
      .length;
  }

  /**
   * checks if theres more place for a mod with their generationtype
   */
  public hasRoomFor(mod: T): boolean {
    return (
      this.numberOfModsOfType(mod.props.generation_type) <
      this.maxModsOfType(mod)
    );
  }

  /**
   * checks if this container has any mods
   */
  public any(): boolean {
    return this.mods.length > 0;
  }

  /**
   * lists all the stats that are offered by its mods
   * 
   * mods can have multiple stats so we sum their values grouped by stat id
   */
  public stats(): { [key: string]: Stat } {
    return this.mods.reduce((stats: { [key: string]: Stat }, mod: Mod) => {
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

  public abstract maxModsOfType(mod: T): number;

  public abstract inDomainOf(mod_domain: number): boolean;

  public abstract level(): number;
}
