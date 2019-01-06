import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import FillLoading from 'components/FillLoading';
import Filter from 'containers/baseitem_picker/Filter';
import Picker from 'containers/baseitem_picker/Picker';
import { BaseItemTypeProps } from 'state/poe/schema';
import './style.css';

export interface Props {
  active: BaseItemTypeProps | undefined;
  is_open: boolean;
  loading: boolean;
  onToggle: () => void;
}

const styles = createStyles({
  root: {
    position: 'relative',
  },
  title: {
    textTransform: 'capitalize',
  },
});
const useClasses = makeStyles(styles);

const default_props = {
  onToggle: () => {},
};

function BaseItemModal(props: Props) {
  const { active, loading, onToggle: toggle } = props;
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <FillLoading loading={loading} />
      <Button onClick={toggle}>
        Baseitem:{' '}
        {active != null ? (
          <FormattedMessage
            id={`poe.baseitemtypes.${active.id}.name`}
            defaultMessage={active.id}
          />
        ) : (
          'undefined'
        )}
      </Button>

      <Dialog className="baseitems" open={props.is_open} onClose={toggle}>
        <DialogTitle className={classes.title}>
          <FormattedMessage
            id="baseitem_picker.modal_title"
            defaultMessage="Choose a baseitem"
          />
        </DialogTitle>
        <DialogContent>
          <Filter />
          <Picker onChange={toggle} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

BaseItemModal.defaultProps = default_props;

export default BaseItemModal;
