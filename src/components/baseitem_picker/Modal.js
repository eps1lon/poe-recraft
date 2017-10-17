// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Filter from 'containers/baseitem_picker/Filter';
import Picker from 'containers/baseitem_picker/Picker';
import { type BaseItemTypeProps } from 'selectors/schema';

export type Props = {
  active: ?BaseItemTypeProps,
  is_open: boolean,
  onToggle: () => void
};

const default_props = {
  onToggle: () => {}
};

const BaseItemModal = (props: Props) => {
  const { active } = props;
  const toggle = props.onToggle;

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="baseitems">
      <Button onClick={toggle}>
        Baseitem:{' '}
        {active != null ? (
          <FormattedMessage id={`poe.baseitemtypes.${active.primary}.name`} />
        ) : (
          'undefined'
        )}
      </Button>

      <Modal isOpen={props.is_open} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Filter onChange={toggle} />
          <Picker onChange={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

BaseItemModal.defaultProps = default_props;

export default BaseItemModal;
