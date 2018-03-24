import {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  EssenceProps,
  ModProps,
} from '../schema';

import AtlasNode from '../containers/AtlasNode';
import Item from '../containers/item/Item';
import { Essence, MasterBenchOption } from '../generators';
import { Buildable } from '../interfaces';
import Mod from '../mods/Mod';
import PropsTable, { TableProps } from './PropsTable';

function createTable<P extends TableProps, T, A1>(
  props: P[],
  constructor: Buildable<P, T, A1>,
  arg1: A1,
): PropsTable<P, T, A1> {
  return new PropsTable(props, constructor, arg1);
}

export const createAtlasNodes = (
  props: AtlasNodeProps[],
): PropsTable<AtlasNodeProps, AtlasNode, undefined> => {
  return createTable(props, AtlasNode, undefined);
};

export const createItems = (
  props: BaseItemTypeProps[],
): PropsTable<BaseItemTypeProps, Item, undefined> => {
  return createTable(props, Item, undefined);
};

export const createMasterBenchOptions = (
  props: CraftingBenchOptionsProps[],
): PropsTable<CraftingBenchOptionsProps, MasterBenchOption, undefined> => {
  return createTable(props, MasterBenchOption, undefined);
};

export const createMods = (
  props: ModProps[],
): PropsTable<ModProps, Mod, undefined> => {
  return createTable(props, Mod, undefined);
};

export const createEssences = (
  props: EssenceProps[],
  mods: ModProps[],
): PropsTable<EssenceProps, Essence, ModProps[]> => {
  return createTable(props, Essence, mods);
};
