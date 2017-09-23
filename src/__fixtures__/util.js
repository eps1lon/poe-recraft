// @flow
import * as fs from 'fs';
import * as path from 'path';

import type {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from '../schema';

import { AtlasNode, Item } from '../containers';
import { MasterBenchOption } from '../generators';
import { Mod } from '../mods';
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
