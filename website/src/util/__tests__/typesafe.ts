import { propOrUndefined } from '../typesafe';

describe('propOrUndefined', () => {
  it('works as expected', () => {
    interface Obj {
      foo?: number;
    }
    const obj1: Obj = { foo: 1 };
    const obj2: Obj = {};

    expect(propOrUndefined(obj1, 'foo')).toEqual(1);
    expect(propOrUndefined(obj2, 'foo')).toBeUndefined();
  });
});
