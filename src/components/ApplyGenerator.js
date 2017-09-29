// @flow
import React from 'react';
import { Button } from 'reactstrap';

type GeneratorId = string;

export type Props = {
  active: GeneratorId,
  onClick: () => void
};

const default_props = {
  onClick: () => {}
};

const ApplyGenerator = (props: Props) => {
  return <Button onClick={props.onClick}>Use {props.active}</Button>;
};

ApplyGenerator.defaultProps = default_props;

export default ApplyGenerator;
