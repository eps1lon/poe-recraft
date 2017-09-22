// eslint-disable-next-line import/no-extraneous-dependencies
import t from 'flow-runtime';

import {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from './generated/schema';

export const verifyAtlas = props => {
  t.array(AtlasNodeProps).assert(props);
};

export const verifyCraftingBenchOptions = props => {
  t.array(CraftingBenchOptionsProps).assert(props);
};

export const verifyItems = props => {
  t.array(BaseItemTypeProps).assert(props);
};

export const verifyMods = props => {
  t.array(ModProps).assert(props);
};
