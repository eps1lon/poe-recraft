// @flow
import type { Taggable } from '../interfaces/Taggable';
import type Mod from '../mods/Mod';

export interface Container<T: Mod> extends Taggable {
  addMod(T): *,
  removeMod(T): *,
  removeAllMods(): *,
  hasMod(T): boolean,
  hasRoomFor(T): boolean,
  any(): boolean,

  indexOfModWithPrimary(number): number,

  maxModsOfType(T): number,
  inDomainOf(number): boolean,
  level(): number,

  asArray(): T[],
  +mods: T[],
}
