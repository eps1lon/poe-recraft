import React, { SFC } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import GeneratorPicker from './Picker';

type GeneratorId = string;

export type Props = {
  active: GeneratorId;
  is_open: boolean;
  onChange: (id: GeneratorId) => any;
  onToggle: () => any;
};

const default_props = {
  onChange: () => {},
  onToggle: () => {}
};

const GeneratorModal: SFC<Props> = props => {
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
        <ModalHeader toggle={toggle}>Pick a generator</ModalHeader>
        <ModalBody>
          <GeneratorPicker active={props.active} onChange={onChange} />
        </ModalBody>
      </Modal>
    </div>
  );
};

GeneratorModal.defaultProps = default_props;

export default GeneratorModal;
