// @flow
import t from 'flow-runtime';

import {
  BaseItemTypeProps,
  CraftingBenchOptionsProps,
  ModProps,
  MetaDataMap
} from '../schema_runtime';
import fs from 'fs';
import path from 'path';

const data: { file: string, type: any }[] = [
  {
    file: 'craftingbenchoptions.json',
    type: t.array(CraftingBenchOptionsProps)
  },
  {
    file: 'baseitemtypes.json',
    type: t.array(BaseItemTypeProps)
  },
  {
    file: 'meta_data.json',
    type: MetaDataMap
  },
  {
    file: 'mods.json',
    type: t.array(ModProps)
  }
];

it('should match the provided props', () => {
  for (const { file, type } of data) {
    const json = fs.readFileSync(
      path.join(__dirname, '../../../../public/data/', file),
      {
        encoding: 'utf8'
      }
    );
    const results = JSON.parse(json);

    try {
      type.assert(results);
    } catch (err) {
      console.log(file);
      console.error(err);
    }
  }
});