import { Taggable } from '../interfaces/Taggable';
import Mod from '../mods/Mod';
import Stat from '../calculator/Stat';

export default interface Container<T extends Mod> extends Taggable {
  addMod(mod: T): this;
  removeMod(mod: T): this;
  removeAllMods(): this;
  hasMod(mod: T): boolean;
  hasModGroup(mod: T): boolean;
  hasRoomFor(mod: T): boolean;
  any(): boolean;

  indexOfModWithPrimary(primary: number): number;

  maxModsOfType(mod: T): number;
  inDomainOf(domain: number): boolean;
  level(): number;

  stats(): { [key: string]: Stat };

  asArray(): T[];
  mods: ReadonlyArray<T>;
};
