// @flow
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import GeneratorPicker from './GeneratorPicker';

type GeneratorId = string;

export type Props = {
  active: GeneratorId,
  is_open: boolean,
  onChange: GeneratorId => void,
  onToggle: () => void
};

const default_props = {
  onChange: () => {},
  onToggle: () => {}
};

const GeneratorModal = (props: Props) => {
  const toggle = props.onToggle;
  const onChange = (id: GeneratorId) => {
    toggle();
    props.onChange(id);
  };

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="generators">
      <Button onClick={toggle}>Generator: {props.active}</Button>

      <Modal isOpen={props.is_open} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <GeneratorPicker active={props.active} onChange={onChange} />
        </ModalBody>
      </Modal>
    </div>
  );
};

GeneratorModal.defaultProps = default_props;

export default GeneratorModal;
