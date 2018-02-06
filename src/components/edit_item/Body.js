// @flow
import React from 'react';

import RaritySwitcher from 'containers/RaritySwitcher';

export type Props = {
  onToggle: () => void
};

const default_props = {
  onToggle: () => {}
};

const Body = (props: Props) => {
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
    </section>
  );
};

Body.defaultProps = default_props;

export default Body;
