// @flow
import MasterBench from '../MasterBench';
import { Item } from '../../containers/';
import { MasterMod } from '../../mods/';
import { findByPrimary } from '../../__fixtures__/util';

const craftingbenchoptions = require('../../__fixtures__/craftingbenchoptions.json');
const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');

it('should build with master mods', () => {
  const haku = MasterBench.build(craftingbenchoptions, 6);

  expect(haku).toBeInstanceOf(MasterBench);
  expect(haku.mods.length).toBeGreaterThan(0);
  expect(haku.mods.every(mod => mod instanceof MasterMod)).toBe(true);
});

it('should throw when picking an unavailable option', () => {
  const haku = MasterBench.build(craftingbenchoptions, 6);

  expect(() => haku.chooseOption(1111111)).toThrow();
});

it('should require to choose an option', () => {
  const haku = MasterBench.build(craftingbenchoptions, 6);
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

  expect(haku.applyTo(greaves)).toBe(greaves);
});

it('should apply the chosen option', () => {
  const haku = MasterBench.build(craftingbenchoptions, 6);
  const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

  const crafted = haku.applyOptionTo(greaves, 1);

  expect(crafted).not.toBe(greaves);
  expect(crafted.props.rarity).toBe('magic');
  expect(crafted.mods[0].props.name).toEqual('Stalwart');
});
