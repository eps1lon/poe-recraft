import { deserialize, serialize } from '../Semantic';
import item_fixtures from '../__fixtures__/items';

describe('Semantic', () => {
  for (const item of item_fixtures) {
    const snapshot_id = item.name.lines().join(' ');
    const serialized = serialize(item);
    test(`serialization matches snapshot ${snapshot_id}`, () => {
      expect(serialized).toMatchSnapshot();
    });
    test('deserialize() is the inverse of serialize()', () => {
      const deserialized = deserialize(serialized);
      expect(item.builder()).toMatchObject(deserialized.builder());
    });
  }
});
