import { formatValue, formatStats } from 'poe-i18n';
// tslint:disable-next-line: no-var-requires
const formatMessage = require('poe-i18n/dist/cjs/format/message');

import { serialize, I18n, Stat } from '../GGGApi';
import item_fixtures from '../__fixtures__/items';

// WIP

const i18n: I18n = {
  name: () => 'Random Name',
  typeLine: item => item.baseitem.name, // TODO
  formatMessage,
  formatValue,
  formatStats(stats: Stat[]): string[] {
    return formatStats(stats);
  },
  messages: {
    'poe.api.Requires': 'Benötigt',
    'poe.api.Level': 'Stufe',
    'poe.api.Dex': 'Ges',
    'poe.api.({min}–{max})': '({min} - {max})',
    'poe.api.{min}–{max}': '{min} - {max}',
    'poe.api.{Range1} to {Range2}': '{Range1} bis {Range2}',
  },
};

describe.skip('GGGApi', () => {
  for (const item of item_fixtures) {
    const snapshot_id = item.name.lines().join(' ');
    const serialized = serialize(item, i18n);
    test(`serialization matches snapshot ${snapshot_id}`, () => {
      expect(serialized).toMatchSnapshot();
    });
  }
});
