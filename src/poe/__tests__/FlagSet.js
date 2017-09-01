// @flow
import FlagSet from '../FlagSet';

var initial_value = 3;
var flag_set = new FlagSet(['bit1', 'bit2', 'bit3']);
flag_set.value = initial_value;

it('should know which flags exists', () => {
  expect(flag_set.exists('bit2')).toBe(true);
  expect(flag_set.exists('bit4')).toBe(false);
});

it('should add flags', () => {
  flag_set.add('bit4');
  expect(flag_set.exists('bit4')).toBe(true);
});

it('should know which flags are set', () => {
  expect(flag_set.isSet('bit1')).toBe(true);
  expect(flag_set.isSet('bit2')).toBe(true);
  expect(flag_set.isSet('bit3')).toBe(false);
});

it('should enable flags', () => {
  // test enable
  flag_set.enable('bit3');
  expect(flag_set.isSet('bit1')).toBe(true);
  expect(flag_set.isSet('bit2')).toBe(true);
  expect(flag_set.isSet('bit3')).toBe(true);
  expect(flag_set.value).toBe(7);

  flag_set.value = initial_value;
});

it('should disable flags', () => {
  // test enable
  flag_set.disable('bit2');

  expect(flag_set.isSet('bit1')).toBe(true);
  expect(flag_set.isSet('bit2')).toBe(false);
  expect(flag_set.isSet('bit3')).toBe(false);
  expect(flag_set.value).toBe(1);

  flag_set.value = initial_value;
});

it('should generate set maps', () => {
  expect(flag_set.setMap()).toMatchObject({
    bit1: true,
    bit2: true,
    bit3: false,
    bit4: false
  });
});
