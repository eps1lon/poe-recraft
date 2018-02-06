// @flow
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Body from 'containers/edit_item/Body';

export type Props = {
  is_open: boolean,
  onToggle: () => void
};

const default_props = {
  onChange: () => { },
  onToggle: () => { }
};

const EditModal = (props: Props) => {
  const toggle = props.onToggle;

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="generators">
      <Button onClick={toggle}>Edit</Button>

      <Modal isOpen={props.is_open} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Edit Item</ModalHeader>
        <ModalBody><Body onToggle={toggle} /></ModalBody>
      </Modal>
    </div>
  );
};

EditModal.defaultProps = default_props;

export default EditModal;
