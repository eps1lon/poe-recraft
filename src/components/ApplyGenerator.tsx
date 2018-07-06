import React, { SFC } from 'react';
import { Button } from 'reactstrap';

import { FormattedGenerator } from './i18n';
import { anySet } from '../util/flags';

type GeneratorId = string;

export interface Props {
  active: GeneratorId;
  applicableTo: { [key: string]: boolean };
  onClick: () => any;
}

const default_props = {
  onClick: () => {}
};

const ApplyGenerator: SFC<Props> = props => {
  const is_applicable_to = !anySet(props.applicableTo);
  return (
    <Button
      color={is_applicable_to ? 'secondary' : 'danger'}
      onClick={props.onClick}
    >
      Use <FormattedGenerator id={props.active} />
    </Button>
  );
};

ApplyGenerator.defaultProps = default_props;

export default ApplyGenerator;
