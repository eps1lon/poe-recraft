import datas from '../__fixtures__/english';
import Format from '../Format';
import textToStats from '../format/textToStats';

const format = new Format();

it('can be configured to use global local data', () => {
  expect(() =>
    format.stats([{ id: 'base_chance_to_freeze_%', value: 12 }]).sort(),
  ).toThrowError('no descriptions found for base_chance_to_freeze_%');

  format.configure({ datas });

  expect(
    format.stats([{ id: 'base_chance_to_freeze_%', value: 12 }]).sort(),
  ).toEqual(['12% chance to Freeze']);

  expect(format.textToStats('12% chance to Freeze').next().value).toEqual(
    textToStats('12% chance to Freeze', { datas }).next().value,
  );
});
