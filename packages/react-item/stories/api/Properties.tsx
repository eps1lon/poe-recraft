import classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Properties, {
  Props as PropertiesProps,
} from '../../src/item/popup/ApiBody/Properties';
import FrameType from '../../src/item/FrameType';

export interface Props extends PropertiesProps {
  frameType: FrameType;
}

const Story: React.SFC<Props> = ({ frameType, ...props }) => {
  return (
    <div className={classnames('poe-item', FrameType[frameType])}>
      <section className="body">
        <Properties {...props} />
      </section>
    </div>
  );
};

storiesOf('api/properties', module)
  .add('shield armour', () => (
    <Story
      frameType={FrameType.rare}
      properties={[
        { name: 'Armour', displayMode: 0, values: [['1', 0]] },
        { name: 'Block', displayMode: 0, values: [['3%', 0]] },
      ]}
    />
  ))
  .add('sacrifical garb', () => (
    <Story
      frameType={FrameType.rare}
      properties={[
        { name: 'Quality', values: [['5%', 1]], displayMode: 0 },
        { name: 'Armour', values: [['100', 1]], displayMode: 0 },
        { name: 'Energy Shield', values: [['10', 1]], displayMode: 0 },
        { name: 'Evasion', values: [['50', 1]], displayMode: 0 },
      ]}
    />
  ))
  .add('dagger', () => (
    <Story
      frameType={FrameType.rare}
      properties={[
        { name: 'Quality', values: [['5%', 1]], displayMode: 0 },
        { name: 'Physical Damage', values: [['6', 1]], displayMode: 0 },
        {
          name: 'Elemental Damage',
          values: [
            ['10-13', 5],
            ['6', 4],
            ['1-400', 6],
          ],
          displayMode: 0,
        },
        { name: 'Critical Chance', values: [['7.50%', 1]], displayMode: 0 },
        { name: 'Attacks per Second', values: [['1.33', 0]], displayMode: 0 },
      ]}
    />
  ))
  .add('claw', () => (
    <Story
      frameType={FrameType.rare}
      properties={[
        { name: 'Elemental Damage', values: [['10-13', 5]], displayMode: 0 },
        { name: 'Chaos Damage', values: [['500-600', 7]], displayMode: 0 },
        { name: 'Critical Chance', values: [['7.50%', 1]], displayMode: 0 },
        { name: 'Attacks per Second', values: [['1.33', 0]], displayMode: 0 },
      ]}
    />
  ));
