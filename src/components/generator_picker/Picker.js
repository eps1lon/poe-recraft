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
  return [
    <div key="default">
      <Button onClick={() => props.onChange('showcase')}>Showcase</Button>
    </div>,
    <div key="orbs">
      <Button onClick={() => props.onChange('transmute')}>Transmute</Button>
      <Button onClick={() => props.onChange('augment')}>Augment</Button>
      <Button onClick={() => props.onChange('alteration')}>Alteration</Button>
      <Button onClick={() => props.onChange('regal')}>Regal</Button>
      <Button onClick={() => props.onChange('exalted')}>Exalted</Button>
      <Button onClick={() => props.onChange('alchemy')}>Alchemy</Button>
      <Button onClick={() => props.onChange('chaos')}>Chaos</Button>
      <Button onClick={() => props.onChange('scouring')}>Scouring</Button>
    </div>
  ];
};

GeneratorPicker.defaultProps = default_props;

export default GeneratorPicker;
