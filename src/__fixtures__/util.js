// @flow
import * as fs from 'fs';
import * as path from 'path';

import type {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from '../schema';

import AtlasNode from '../containers/AtlasNode';
import Item from '../containers/item/Item';
import MasterBenchOption from '../generators/MasterBenchOption';
import Mod from '../mods/Mod';
import PropsTable from '../helpers/PropsTable';

const json_cache = {};

export const createTable = (file: any, constructor: any) => {
  if (json_cache[file] == null) {
    const body = fs.readFileSync(path.join(__dirname, `./${file}.json`));

    const json = JSON.parse(body.toString());

    json_cache[file] = new PropsTable(json, constructor);
  }

  return json_cache[file];
};

type Tables = {
  atlas: PropsTable<AtlasNodeProps, AtlasNode>,
  craftingbenchoptions: PropsTable<
    CraftingBenchOptionsProps,
    MasterBenchOption,
  >,
  items: PropsTable<BaseItemTypeProps, Item>,
  mods: PropsTable<ModProps, Mod>,
};

export const createTables = () => {
  return ({
    atlas: createTable('atlas', AtlasNode),
    craftingbenchoptions: createTable(
      'craftingbenchoptions',
      MasterBenchOption,
    ),
    items: createTable('baseitemtypes', Item),
    mods: createTable('mods', Mod),
  }: Tables);
};
