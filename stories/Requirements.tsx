import classnames from 'classnames';
import * as React from 'react';

import Requirements, {
  Props as RequirementsProps,
} from '../src/item/body/Requirements';

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
export default Story;
