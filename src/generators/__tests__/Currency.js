// @flow
import Currency from '../Currency';
import { Item } from '../../containers/';
import { findByPrimary } from '../../__fixtures__/util';

const baseitemtypes = require('../../__fixtures__/baseitemtypes.json');
const meta_datas = require('../../__fixtures__/meta_data.json');

const greaves = Item.build(findByPrimary(baseitemtypes, 1650), meta_datas);

it('should not apply to corrupted', () => {
  const currency = new Currency([]);

  expect(currency.applicableTo(greaves)).toEqual({
    not_an_item: false,
    corrupted: false,
    mirrored: false,
  });

  expect(greaves.props.corrupted).toBe(false);

  expect(currency.applicableTo(greaves.corrupt())).toEqual({
    not_an_item: false,
    corrupted: true,
    mirrored: false,
  });
});

it('should not apply to mirrored', () => {
  const currency = new Currency([]);

  expect(currency.applicableTo(greaves)).toEqual({
    not_an_item: false,
    corrupted: false,
    mirrored: false,
  });

  expect(greaves.props.mirrored).toBe(false);

  expect(currency.applicableTo(greaves.mirror())).toEqual({
    not_an_item: false,
    corrupted: false,
    mirrored: true,
  });
});
