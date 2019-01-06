import { createStyles, makeStyles } from '@material-ui/styles';
import { PopupIntl as ItemPopup } from 'poe-components-item';
import React, { SFC } from 'react';

import EditItem from 'containers/edit_item/Modal';
import Generators from 'containers/ItemSection/Generators';

import 'poe-components-item/themes/poe.css';
import './style.css';

export interface Props {
  item?: PropsType<typeof ItemPopup>['item'] | undefined;
  display_generators?: boolean;
}

const useClasses = makeStyles(
  createStyles({
    item: {
      display: 'inline-block',
      position: 'relative',
    },
    editItem: {
      position: 'absolute',
      top: 0,
      right: '0em',
    },
    generators: {
      display: 'flex',
    },
  }),
);

const ItemSection: SFC<Props> = props => {
  const { display_generators, item } = props;
  const classes = useClasses();

  return (
    <section className={classes.item}>
      {item != null && <ItemPopup item={item} />}
      <EditItem className={classes.editItem} />
      {display_generators && (
        <div className={classes.generators}>
          <Generators />
        </div>
      )}
    </section>
  );
};

ItemSection.defaultProps = {
  item: undefined,
  display_generators: true,
};

export default ItemSection;
