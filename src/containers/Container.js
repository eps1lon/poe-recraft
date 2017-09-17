// @flow
import { AbstractMethod } from '../exceptions/';
import type { TagProps } from '../data/schema';
import type Mod from '../mods/Mod';

export default class Container {
  +mods: Mod[];

  constructor(mods: Mod[]) {
    (this: any).mods = mods;
  }

  /**
   *  adds a new non-existing mod
   */
  addMod(mod: Mod): Container {
    if (!this.hasMod(mod)) {
      return new this.constructor(this.mods.concat(mod));
    } else {
      return this;
    }
  }

  /**
   * truncates mods
   */
  removeAllMods() {
    return new this.constructor([]);
  }

  /**
   * removes an existing mod
   */
  removeMod(other: Mod) {
    if (this.hasMod(other)) {
      return new this.constructor(
        this.mods.filter(mod => mod.props.primary !== other.props.primary),
      );
    } else {
      return this;
    }
  }

  indexOfModWithPrimary(primary: number): number {
    return this.mods.findIndex(mod => mod.props.primary === primary);
  }

  indexOfMod(mod: Mod): number {
    return this.indexOfModWithPrimary(mod.props.primary);
  }

  hasMod(mod: Mod): boolean {
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

  asArray(): Mod[] {
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
  hasRoomFor(mod: Mod): boolean {
    return (
      this.numberOfModsOfType(mod.props.generation_type) <
      this.maxModsOfType(mod)
    );
  }

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  maxModsOfType(mod: Mod): number {
    throw new AbstractMethod('maxModsOfType');
  }
}
