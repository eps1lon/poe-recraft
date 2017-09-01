// @flow
import { AbstractMethod } from '../../exceptions/';
import type { TagProps } from '../data/schema';
import type Mod from '../Mod/';

type Tag = string;

export default class ModContainer {
  mods: Mod[];
  tags: Tag[];

  constructor(mods: Mod[] = []) {
    this.mods = mods;
    this.tags = [];
  }

  /**
   *  adds a new non-existing mod
   */
  addModd(mod: Mod): boolean {
    if (!this.hasMod(mod)) {
      this.mods.push(mod);
      return true;
    } else {
      return false;
    }
  }

  /**
   * truncates mods
   */
  removeAllMods(): void {
    this.mods = [];
  }

  /**
   * removes an existing mod
   */
  removeMod(mod: Mod): number | boolean {
    const index = this.indexOfMod(mod);

    if (index !== -1) {
      this.mods.splice(index, 1);
      return index;
    } else {
      return false;
    }
  }

  /**
   * gets a mod by primary
   */
  getMod(primary: number): ?Mod {
    const index = this.indexOfModWithPrimary(primary);

    if (index !== -1) {
      return this.mods[index];
    }
    return undefined;
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
   * intersects all tags with the ones on the item
   */
  getTagsWithProps(all_tags: TagProps[]): TagProps[] {
    const tags = this.getTags();

    return all_tags.filter(tag => {
      return tags.indexOf(tag.primary) !== -1;
    });
  }

  /**
   * tags of the mods in the container
   */
  getTags(): number[] {
    return this.mods.reduce((tags, mod) => {
      return tags.concat(mod.props.tags.map(tag => tag.primary));
    }, []);
  }

  getPrefixes(): Mod[] {
    return this.mods.filter(mod => mod.isPrefix());
  }

  getSuffixes(): Mod[] {
    return this.mods.filter(mod => mod.isSuffix());
  }

  getAffixes(): Mod[] {
    return [...this.getPrefixes(), ...this.getSuffixes()];
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
  maxModsOfType(mod: Mod): number {
    throw new AbstractMethod('maxModsOfType');
  }
}
