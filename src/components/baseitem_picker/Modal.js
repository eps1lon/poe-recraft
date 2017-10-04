// @flow
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Picker from './Picker';
import type { BaseItemTypeProps } from 'selectors/schema';

export type Props = {
  active: BaseItemTypeProps,
  baseitems: BaseItemTypeProps[],
  is_open: boolean,
  onChange: BaseItemTypeProps => void,
  onToggle: () => void
};

const default_props = {
  onChange: () => {},
  onToggle: () => {}
};

const BaseItemModal = (props: Props) => {
  const toggle = props.onToggle;
  const onChange = (baseitem: BaseItemTypeProps) => {
    toggle();
    props.onChange(baseitem);
  };

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="baseitems">
      <Button onClick={toggle}>
        Baseitem: {props.active != null ? props.active.name : 'undefined'}
      </Button>

      <Modal isOpen={props.is_open} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Picker
            active={props.active}
            baseitems={props.baseitems}
            onChange={onChange}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

BaseItemModal.defaultProps = default_props;

export default BaseItemModal;
