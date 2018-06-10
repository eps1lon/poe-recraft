import { rollRequirementBiasedStable } from '../util';
import { createTables } from '../../../../../__fixtures__/util';

const tables = createTables();
const { items } = tables;

describe('rollRequirementBiased()', () => {
  it('rolls the color according to highest stat requirement', () => {
    const str_item = items.fromName('Iron Greaves');
    expect(rollRequirementBiasedStable(str_item)).toEqual({ color: 'r' });
    const dex_item = items.fromName('Slink Boots');
    expect(rollRequirementBiasedStable(dex_item)).toEqual({ color: 'g' });
    const int_item = items.fromName('Sorcerer Boots');
    expect(rollRequirementBiasedStable(int_item)).toEqual({ color: 'b' });
    const int_str_item = items.fromName('Quartz Sceptre');
    expect(rollRequirementBiasedStable(int_str_item)).toEqual({ color: 'b' });
  });
  it('rolls a stable color if requirements are equal', () => {
    const dex_str = items.fromName('Fishscale Gauntlets');
    expect(rollRequirementBiasedStable(dex_str)).toEqual({ color: 'g' });
    const str_int = items.fromName('Bronze Sceptre');
    expect(rollRequirementBiasedStable(str_int)).toEqual({ color: 'r' });
    const dex_str_int = items.fromName('Sacrificial Garb');
    expect(rollRequirementBiasedStable(dex_str_int)).toEqual({ color: 'g' });
  });
});
