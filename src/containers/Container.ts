import { Taggable } from '../interfaces/Taggable';
import Mod from '../mods/Mod';
import Stat from '../calculator/Stat';

/**
 * a Container in poe-mods is a container of Mods
 */
export default interface Container<T extends Mod> extends Taggable {
  mods: ReadonlyArray<T>;

  addMod(mod: T): this;
  removeMod(mod: T): this;
  removeAllMods(): this;
  hasMod(mod: T): boolean;
  /**
   * already has a mod of this group?
   * @param mod 
   */
  hasModGroup(mod: T): boolean;
  /**
   * will addMod actually add this mod
   * @param mod 
   */
  hasRoomFor(mod: T): boolean;
  /** 
   * does this container have any displayable properties? 
   */
  any(): boolean;

  indexOfModWithId(id: string): number;

  maxModsOfType(mod: T): number;
  inDomainOf(domain: number): boolean;
  level(): number;

  stats(): { [key: string]: Stat };

  asArray(): T[];
};
