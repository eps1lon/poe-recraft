// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import t from 'flow-runtime';

import {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from './generated/schema';

export const verifyAtlasNodes = (props: any) => {
  t.array(AtlasNodeProps).assert(props);
};

export const verifyMasterBenchOptions = (props: any) => {
  t.array(CraftingBenchOptionsProps).assert(props);
};

export const verifyItems = (props: any) => {
  t.array(BaseItemTypeProps).assert(props);
};

export const verifyMods = (props: any) => {
  t.array(ModProps).assert(props);
};
