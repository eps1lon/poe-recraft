import React, { SFC } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Body from './Body';

export type Props = {
  is_open: boolean;
  onChange: () => any;
  onToggle: () => any;
};

const default_props = {
  onChange: () => {},
  onToggle: () => {}
};

const EditModal: SFC<Props> = props => {
  const toggle = props.onToggle;

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="generators">
      <Button onClick={toggle}>Edit</Button>

      <Modal isOpen={props.is_open} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Edit Item</ModalHeader>
        <ModalBody>
          <Body onToggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

EditModal.defaultProps = default_props;

export default EditModal;