// @flow
import type {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from '../schema';

import AtlasNode from '../containers/AtlasNode';
import Item from '../containers/item/Item';
import MasterBenchOption from '../generators/MasterBenchOption';
import { type Buildable } from '../interfaces/Buildable';
import Mod from '../mods/Mod';
import PropsTable, { type PropsWithPrimary } from './PropsTable';

function createTable<P: PropsWithPrimary>(
  props: P[],
  constructor: Class<Buildable<P>>,
) {
  return new PropsTable(props, constructor);
}

export const createAtlasNodes = (props: AtlasNodeProps[]) => {
  return createTable(props, AtlasNode);
};

export const createItems = (props: BaseItemTypeProps[]) => {
  return createTable(props, Item);
};

export const createMasterBenchOptions = (
  props: CraftingBenchOptionsProps[],
) => {
  return createTable(props, MasterBenchOption);
};

export const createMods = (props: ModProps[]) => {
  return createTable(props, Mod);
};
