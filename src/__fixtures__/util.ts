import * as fs from 'fs';
import * as path from 'path';

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
import Mod from '../mods/Mod';
import PropsTable, { TableProps } from '../helpers/PropsTable';
import { Buildable } from '../interfaces/Buildable';

const json_cache: Partial<Tables> = {};

export const createTable = <P extends TableProps, T, A1>(
  file: keyof Tables,
  constructor: Buildable<P, T, A1>,
  arg1: A1,
) => {
  if (json_cache[file] == null) {
    const body = fs.readFileSync(
      path.join(__dirname, `../../data/${file}.json`),
    );

    const json = JSON.parse(body.toString());

    // @ts-ignore
    json_cache[file] = new PropsTable(json, constructor, arg1);
  }

  return json_cache[file];
};

interface Tables {
  atlas: PropsTable<AtlasNodeProps, AtlasNode, undefined>;
  craftingbenchoptions: PropsTable<
    CraftingBenchOptionsProps,
    MasterBenchOption,
    undefined
  >;
  essences: PropsTable<EssenceProps, Essence, ModProps>;
  items: PropsTable<BaseItemTypeProps, Item, undefined>;
  mods: PropsTable<ModProps, Mod, undefined>;
}

export const createTables = () => {
  const tables = {
    atlas: createTable('atlas', AtlasNode, undefined),
    craftingbenchoptions: createTable(
      'craftingbenchoptions',
      MasterBenchOption,
      undefined,
    ),
    items: createTable('items', Item, undefined),
    mods: createTable('mods', Mod, undefined),
  } as Tables;

  // @ts-ignore: its not undefined though?!
  tables.essences = createTable('essences', Essence, tables.mods.all());

  return tables;
};

export const byWorldAreaId = (id: string) => (node: AtlasNodeProps) =>
  node.world_area.id === id;

export const fromWorldAreaId = (
  id: string,
  atlas: PropsTable<AtlasNodeProps, AtlasNode, undefined>,
): AtlasNode => {
  return atlas.from(node => node.world_area.id === id);
};

export const byEssenceName = (name: string) => (essence: EssenceProps) =>
  essence.base_item_type.name === name;
