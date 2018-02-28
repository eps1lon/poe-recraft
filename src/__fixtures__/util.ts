import * as fs from 'fs';
import * as path from 'path';

import {
  AtlasNodeProps,
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
} from '../schema';

import AtlasNode from '../containers/AtlasNode';
import Item from '../containers/item/Item';
import MasterBenchOption from '../generators/MasterBenchOption';
import Mod from '../mods/Mod';
import PropsTable, { TableProps } from '../helpers/PropsTable';
import { Buildable } from '../interfaces/Buildable';

const json_cache: Partial<Tables> = {};

export const createTable = <P extends TableProps, T>(
  file: keyof Tables,
  constructor: Buildable<P, T>,
) => {
  if (json_cache[file] == null) {
    const body = fs.readFileSync(path.join(__dirname, `./${file}.json`));

    const json = JSON.parse(body.toString());

    // @ts-ignore
    json_cache[file] = new PropsTable(json, constructor);
  }

  return json_cache[file];
};

interface Tables {
  atlas: PropsTable<AtlasNodeProps, AtlasNode>;
  craftingbenchoptions: PropsTable<
    CraftingBenchOptionsProps,
    MasterBenchOption
  >;
  items: PropsTable<BaseItemTypeProps, Item>;
  mods: PropsTable<ModProps, Mod>;
}

export const createTables = () => {
  return {
    atlas: createTable('atlas', AtlasNode),
    craftingbenchoptions: createTable(
      'craftingbenchoptions',
      MasterBenchOption,
    ),
    items: createTable('items', Item),
    mods: createTable('mods', Mod),
  } as Tables;
};

export const byWorldAreaId = (id: string) => (node: AtlasNodeProps) =>
  node.world_area.id === id;

export const fromWorldAreaId = (
  id: string,
  atlas: PropsTable<AtlasNodeProps, AtlasNode>,
): AtlasNode => {
  return atlas.from(node => node.world_area.id === id);
};
