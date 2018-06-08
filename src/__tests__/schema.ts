// test typings of schema.ts against json
// @see: eps1lon/poe-i18n#56 for further explanation
import * as schema from '../schema';

describe.skip('type definitions matching json files in data', () => {
  type DeepExactify<T, X extends T> = T & {
    [K in keyof X]: K extends keyof T ? DeepExactify<T[K], X[K]> : never
  }

  test('atlas', async () => {
    const json = await import('../../data/atlas.json');
    const checked: DeepExactify<schema.Atlas, typeof json> = json;
  });

  test('craftingbenchoptions', async () => {
    const json = await import('../../data/craftingbenchoptions.json');
    const checked: schema.CraftingBenchOptions = json;
  });

  test('essences', async () => {
    const json = await import('../../data/essences.json');
    const checked: DeepExactify<schema.Essences, typeof json> = json;
  });

  test('items', async () => {
    const json = await import('../../data/items.json');
    const checked: DeepExactify<schema.Items, typeof json> = json;
  });

  test('mods', async () => {
    const json = await import('../../data/mods.json');
    const checked: DeepExactify<schema.Mods, typeof json> = json;
  });
})