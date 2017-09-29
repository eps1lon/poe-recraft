// @flow
import type PropsTable from '../../../../../helpers/PropsTable';
import type { BaseItemTypeProps } from '../../../../../schema';
import { createTables } from '../../../../../__fixtures__/util';

import Item from '../../../Item';

const tables = createTables();

const items = (tables.items: PropsTable<BaseItemTypeProps, Item>);

it('shouldnt have any if there is no property builder', () => {
  const amulet = items.fromPrimary(1341);

  expect(amulet.properties.any()).toBe(false);
  expect(amulet.properties.list()).toEqual({});
});

it('should have some for armour', () => {
  const boots = items.fromPrimary(1650);

  expect(boots.properties.any()).toBe(true);
  expect(boots.properties.list()).not.toEqual({});
});

it.skip('should have some for weapons', () => {
  const weapon = items.fromPrimary(1025);

  expect(weapon.properties.any()).toBe(true);
  expect(weapon.properties.list()).not.toEqual({});
});
