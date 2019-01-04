// test typings of schema.ts against json
// @see: eps1lon/poe-i18n#56 for further explanation
import * as schema from '../schema';

describe.skip('type definitions matching json files in data', () => {
  test('atlas', async () => {
    const { default: json } = await import('../../data/atlas.json');
    const checked: schema.Atlas = json;
  });

  test('craftingbenchoptions', async () => {
    const {
      default: json,
    } = await import('../../data/craftingbenchoptions.json');
    const checked: schema.CraftingBenchOptions = json;
  });

  test('essences', async () => {
    const { default: json } = await import('../../data/essences.json');
    const checked: schema.Essences = json;
  });

  test('items', async () => {
    const { default: json } = await import('../../data/items/equipment.json');
    const checked: schema.Items = json;
  });

  test('mods', async () => {
    const { default: json } = await import('../../data/mods/prefixes.json');
    const checked: schema.Mods = json;
  });
});
