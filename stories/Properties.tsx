import classnames from 'classnames';
import * as React from 'react';

import Properties, {
  Props as PropertiesProps,
} from '../src/item/body/Properties';

export interface Props extends PropertiesProps {
  rarity: 'normal' | 'magic' | 'rare';
}

const Story: React.SFC<Props> = ({ rarity, ...props }) => {
  return (
    <div className={classnames('poe-item', rarity)}>
      <section className="body">
        <Properties {...props} />
      </section>
    </div>
  );
};
export default Story;
