import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import { FormattedGenerator } from './i18n';

type GeneratorId = string;

export type Props = {
  active: GeneratorId;
  onClick: () => any;
};

const default_props = {
  onClick: () => {}
};

const ApplyGenerator: SFC<Props> = props => {
  return (
    <Button onClick={props.onClick}>
      Use <FormattedGenerator id={props.active} />
    </Button>
  );
};

ApplyGenerator.defaultProps = default_props;

export default ApplyGenerator;
