import React, { SFC } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

import FillLoading from 'components/FillLoading';
import { FormattedGenerator } from 'components/i18n';
import GeneratorPicker from './Picker';

import './style.css';

type GeneratorId = string;

export interface Props {
  active: GeneratorId;
  is_open: boolean;
  loading: boolean;
  onChange: (id: GeneratorId) => any;
  onToggle: () => any;
}

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
    <div className="generators wrapper">
      <FillLoading loading={props.loading} />
      <Button onClick={toggle}>
        Generator: <FormattedGenerator id={props.active} />
      </Button>

      <Modal isOpen={props.is_open} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Pick a generator</ModalHeader>
        <ModalBody className="generators">
          <GeneratorPicker active={props.active} onChange={onChange} />
        </ModalBody>
      </Modal>
    </div>
  );
};

GeneratorModal.defaultProps = default_props;

export default GeneratorModal;
