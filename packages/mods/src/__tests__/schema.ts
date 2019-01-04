// test typings of schema.ts against json
// @see: eps1lon/poe-i18n#56 for further explanation
import * as schema from '../schema';

describe.skip('type definitions matching json files in data', () => {
  // be aware that this causes some issues on optional properties and
  // and inferred never[]
  // @see d8535fa8361e706cfafa8b567b49806062e5b1e4
  type DeepExactify<T, X extends T> = T &
    { [K in keyof X]: K extends keyof T ? DeepExactify<T[K], X[K]> : never };

  test('atlas', async () => {
    const { default: json } = await import('../../data/atlas.json');
    // tslint:disable-next-line: no-unused-variable
    const checked: DeepExactify<schema.Atlas, typeof json> = json;
  });

  test('craftingbenchoptions', async () => {
    const {
      default: json,
    } = await import('../../data/craftingbenchoptions.json');
    // tslint:disable-next-line: no-unused-variable
    const checked: schema.CraftingBenchOptions = json;
  });

  test('essences', async () => {
    const { default: json } = await import('../../data/essences.json');
    // tslint:disable-next-line: no-unused-variable
    const checked: schema.Essences = json;
  });

  test('items', async () => {
    const { default: json } = await import('../../data/items.json');
    // tslint:disable-next-line: no-unused-variable
    const checked: schema.Items = json;
  });

  test('mods', async () => {
    const { default: json } = await import('../../data/mods.json');
    // tslint:disable-next-line: no-unused-variable
    const checked: DeepExactify<schema.Mods, typeof json> = json;
  });
});
