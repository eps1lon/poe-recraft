import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import FillLoading from 'components/FillLoading';
import Filter from 'containers/baseitem_picker/Filter';
import Picker from 'containers/baseitem_picker/Picker';
import { BaseItemTypeProps } from 'state/poe/schema';
import './style.css';

export interface Props {
  active: BaseItemTypeProps | undefined;
  is_open: boolean;
  loading: boolean;
  onToggle: () => any;
}

const default_props = {
  onToggle: () => {}
};

const BaseItemModal: SFC<Props> = props => {
  const { active, loading } = props;
  const toggle = props.onToggle;

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="baseitems wrapper">
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

      <Modal
        className="baseitems"
        isOpen={props.is_open}
        toggle={toggle}
        autoFocus={false}
      >
        <ModalHeader toggle={toggle}>
          <FormattedMessage
            id="baseitem_picker.modal_title"
            defaultMessage="Choose a baseitem"
          />
        </ModalHeader>
        <ModalBody>
          <Filter />
          <Picker onChange={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

BaseItemModal.defaultProps = default_props;

export default BaseItemModal;
