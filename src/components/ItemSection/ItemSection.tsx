import { PopupIntl as ItemPopup } from 'poe-components-item';
import React, { SFC } from 'react';

import EditItem from 'containers/edit_item/Modal';
import Generators from 'containers/ItemSection/Generators';

import 'poe-components-item/themes/poe.css';
import './style.css';

export type Props = {
  item?: PropsType<typeof ItemPopup>['item'] | undefined;
  display_generators?: boolean;
};

const ItemSection: SFC<Props> = props => {
  const { display_generators, item } = props;

  return (
    <section className="item">
      {item != null && <ItemPopup item={item} />}
      <EditItem />
      {display_generators && (
        <div className="generators">
          <Generators />
        </div>
      )}
    </section>
  );
};

ItemSection.defaultProps = {
  item: undefined,
  display_generators: true
};

export default ItemSection;
