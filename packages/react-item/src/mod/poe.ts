import { ReactNode } from 'react';

export enum Type {
  prefix,
  suffix,
  unique,
}

export const isPrefix = (mod: Mod) => mod.type === Type.prefix;
export const isSuffix = (mod: Mod) => mod.type === Type.suffix;

export interface Mod {
  name?: string;
  type: Type;
  stats: ReactNode[];
}

// runtime type checker
// kept simple, not exhaustive
// should be changed if use cases arise where a ReactNode matches the Mod interface
export function isMod(m: any): m is Mod {
  return (
    m != null &&
    typeof m === 'object' &&
    'type' in m &&
    'stats' in m &&
    Array.isArray(m.stats)
  );
}
