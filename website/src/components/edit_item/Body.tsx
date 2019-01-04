import React, { SFC } from 'react';

import AtlasModifiers from 'containers/edit_item/AtlasModifiers';
import Level from 'containers/edit_item/Level';
import Tags from 'containers/edit_item/Tags';
import RaritySwitcher from 'containers/RaritySwitcher';

export interface Props {
  onToggle: () => void;
}

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
      <div className="item-level">
        <Level />
      </div>
      <div className="atlas-modifier">
        <AtlasModifiers />
      </div>
      <div className="edit-item tags">
        <Tags />
      </div>
    </section>
  );
};

Body.defaultProps = default_props;

export default Body;
