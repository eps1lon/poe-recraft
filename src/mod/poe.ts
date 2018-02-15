export enum Type {
  prefix,
  suffix,
  unique,
}

export const isPrefix = (mod: Props) => mod.type === Type.prefix;
export const isSuffix = (mod: Props) => mod.type === Type.suffix;

export interface Props {
  id: string;
  type?: Type;
  name?: string;
}
