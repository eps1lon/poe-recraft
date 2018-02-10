import React, { SFC } from 'react';
import { Button } from 'reactstrap';

type GeneratorId = string;

export type Props = {
  active: GeneratorId;
  onClick: () => any;
};

const default_props = {
  onClick: () => {}
};

const ApplyGenerator: SFC<Props> = props => {
  return <Button onClick={props.onClick}>Use {props.active}</Button>;
};

ApplyGenerator.defaultProps = default_props;

export default ApplyGenerator;
