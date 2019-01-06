import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

import Body from './Body';

export interface Props {
  className?: string;
  is_open: boolean;
  onToggle: () => void;
}

const default_props = {
  onToggle: () => {},
};

function EditModal(props: Props) {
  const { className, onToggle } = props;

  return (
    <div className={className}>
      <Button onClick={onToggle}>Edit</Button>

      <Dialog open={props.is_open} onClose={onToggle}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <Body onToggle={onToggle} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

EditModal.defaultProps = default_props;

export default EditModal;
