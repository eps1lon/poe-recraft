export enum Type {
  prefix,
  suffix,
  unique,
}

export const isPrefix = (mod: Mod) => mod.type === Type.prefix;
export const isSuffix = (mod: Mod) => mod.type === Type.suffix;

export interface Mod {
  id: string;
  type?: Type;
  name?: string;
}
