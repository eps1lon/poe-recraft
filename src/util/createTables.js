// @flow
import type {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from '../schema';

import { AtlasNode, Item } from '../containers';
import { MasterBenchOption } from '../generators';
import { Buildable } from '../interfaces';
import { Mod } from '../mods';
import PropsTable, { type PropsWithPrimary } from './PropsTable';

function createTable<P: PropsWithPrimary>(
  props: P[],
  constructor: Class<Buildable<P>>,
) {
  return new PropsTable(props, constructor);
}

export const createAtlas = (props: AtlasNodeProps[]) => {
  return createTable(props, AtlasNode);
};

export const createItems = (props: BaseItemTypeProps[]) => {
  return createTable(props, Item);
};

export const createCraftingBenchOptions = (
  props: CraftingBenchOptionsProps[],
) => {
  return createTable(props, MasterBenchOption);
};

export const createMods = (props: ModProps[]) => {
  return createTable(props, Mod);
};
