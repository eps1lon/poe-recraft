import {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from '../schema';

import AtlasNode from '../containers/AtlasNode';
import Item from '../containers/item/Item';
import MasterBenchOption from '../generators/MasterBenchOption';
import { Buildable } from '../interfaces';
import Mod from '../mods/Mod';
import PropsTable, { PropsWithPrimary } from './PropsTable';

function createTable<P extends PropsWithPrimary, T>(
  props: P[],
  constructor: Buildable<P, T>,
): PropsTable<P, T> {
  return new PropsTable(props, constructor);
}

export const createAtlasNodes = (
  props: AtlasNodeProps[],
): PropsTable<AtlasNodeProps, AtlasNode> => {
  return createTable(props, AtlasNode);
};

export const createItems = (
  props: BaseItemTypeProps[],
): PropsTable<BaseItemTypeProps, Item> => {
  return createTable(props, Item);
};

export const createMasterBenchOptions = (
  props: CraftingBenchOptionsProps[],
): PropsTable<CraftingBenchOptionsProps, MasterBenchOption> => {
  return createTable(props, MasterBenchOption);
};

export const createMods = (props: ModProps[]): PropsTable<ModProps, Mod> => {
  return createTable(props, Mod);
};
