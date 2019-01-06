import { Button } from '@material-ui/core';
import React, { SFC } from 'react';

import { anySet } from '../util/flags';
import { FormattedGenerator } from './i18n';

type GeneratorId = string;

export interface Props {
  active: GeneratorId;
  applicableTo: { [key: string]: boolean };
  onClick: () => void;
}

const default_props = {
  onClick: () => {},
};

const ApplyGenerator: SFC<Props> = props => {
  const is_applicable_to = !anySet(props.applicableTo);
  return (
    <Button
      disabled={!is_applicable_to}
      onClick={props.onClick}
      variant="contained"
    >
      Use <FormattedGenerator id={props.active} />
    </Button>
  );
};

ApplyGenerator.defaultProps = default_props;

export default ApplyGenerator;
