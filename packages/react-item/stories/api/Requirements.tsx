import classnames from 'classnames';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Requirements, {
  Props as RequirementsProps,
} from '../../src/item/popup/ApiBody/Requirements';
import FrameType from '../../src/item/FrameType';

export interface Props extends RequirementsProps {
  frameType: FrameType;
}

const Story: React.SFC<Props> = ({ frameType, ...props }) => {
  return (
    <div className={classnames('poe-item', FrameType[frameType])}>
      <section className="body">
        <Requirements {...props} />
      </section>
    </div>
  );
};

storiesOf('api/requirements', module)
  .add('all', () => (
    <Story
      frameType={FrameType.rare}
      requirements={[{ name: 'Level', values: [['5', 0]], displayMode: 0 }]}
    />
  ))
  .add('once', () => (
    <Story
      frameType={FrameType.rare}
      requirements={[{ name: 'Level', values: [['5', 0]], displayMode: 0 }]}
    />
  ));
