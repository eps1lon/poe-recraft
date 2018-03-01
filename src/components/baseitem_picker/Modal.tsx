import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Filter from 'containers/baseitem_picker/Filter';
import Picker from 'containers/baseitem_picker/Picker';
import { BaseItemTypeProps } from 'selectors/schema';

export type Props = {
  active: BaseItemTypeProps | undefined;
  is_open: boolean;
  onToggle: () => any;
};

const default_props = {
  onToggle: () => {}
};

const BaseItemModal: SFC<Props> = props => {
  const { active } = props;
  const toggle = props.onToggle;

  // set autofocus to false because
  // FIXME: https://github.com/reactstrap/reactstrap/issues/532
  return (
    <div className="baseitems">
      <Button onClick={toggle}>
        Baseitem:{' '}
        {active != null ? (
          <FormattedMessage id={`poe.baseitemtypes.${active.id}.name`} />
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
