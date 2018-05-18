import {NUMBER} from '../regexp_util';

it('can match hole numbers', () => {
  const regexp =  new RegExp(`^${NUMBER}$`);
  expect(regexp.test(`${5}`)).toBe(true);
  expect(regexp.test(`${-123}`)).toBe(true);
  expect(regexp.test(`${-0}`)).toBe(true);
  expect(regexp.test(`${+0}`)).toBe(true);
  expect(regexp.test(`${-9.5}`)).toBe(false);
  expect(regexp.test(`${13.5}`)).toBe(false);
})