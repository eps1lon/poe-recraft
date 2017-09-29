// @flow
import React from 'react';
import { Button } from 'reactstrap';

export type Props = {
  active: string,
  onChange: string => void
};

const default_props = {
  onChange: () => {}
};

const GeneratorPicker = (props: Props) => {
  return (
    <div>
      <Button onClick={() => props.onChange('alchemy')}>Alchemy</Button>
      <Button onClick={() => props.onChange('alteration')}>Alteration</Button>
      <Button onClick={() => props.onChange('transmute')}>Transmute</Button>
    </div>
  );
};

GeneratorPicker.defaultProps = default_props;

export default GeneratorPicker;
