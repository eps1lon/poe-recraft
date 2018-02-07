import React, { SFC } from 'react';

import RaritySwitcher from 'containers/RaritySwitcher';
import Tags from 'containers/edit_item/Tags';

export type Props = {
  onToggle: () => void;
};

const default_props = {
  onToggle: () => {}
};

const Body: SFC<Props> = props => {
  return (
    <section className="edit-item body">
      <div className="edit-item rarity">
        <label htmlFor="edit-item-rarity-switcher">Rarity: </label>
        <RaritySwitcher
          id="edit-item-rarity-switcher"
          available={['normal', 'magic', 'rare']}
          onChange={props.onToggle}
        />
      </div>
      <div className="edit-item tags">
        <Tags />
      </div>
    </section>
  );
};

Body.defaultProps = default_props;

export default Body;
