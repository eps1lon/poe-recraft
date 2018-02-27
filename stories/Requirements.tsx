import * as classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Requirements, {
  Props as RequirementsProps,
} from '../src/item/popup/body/Requirements';

export interface Props extends RequirementsProps {
  rarity: 'normal' | 'magic' | 'rare';
}

const Story: React.SFC<Props> = ({ rarity, ...props }) => {
  return (
    <div className={classnames('poe-item', rarity)}>
      <section className="body">
        <Requirements {...props} />
      </section>
    </div>
  );
};

storiesOf('requirements', module)
  .add('all', () => (
    <Story
      rarity="rare"
      requirements={{
        level: { value: 5 },
        dexterity: { value: 10 },
        inteliligence: { value: 1 },
        strength: { value: 500, augmented: true },
      }}
    />
  ))
  .add('once', () => (
    <Story
      rarity="rare"
      requirements={{
        level: { value: 5 },
      }}
    />
  ));
