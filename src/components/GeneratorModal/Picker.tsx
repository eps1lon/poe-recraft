import React, { SFC } from 'react';
import { Button } from 'reactstrap';

import Orb from './Orb';

export type Props = {
  active: string;
  onChange: (generator: string) => void;
};

const default_props = {
  onChange: () => {}
};

const GeneratorPicker: SFC<Props> = props => {
  return (
    <>
      <div key="default" className="group default">
        <Button onClick={() => props.onChange('showcase')}>All</Button>
      </div>
      <div key="orbs" className="group orbs">
        {[
          'transmute',
          'augmentation',
          'alteration',
          'regal',
          'exalted',
          'alchemy',
          'chaos',
          'scouring'
        ].map(orb_id => (
          <Orb key={orb_id} id={orb_id} onClick={props.onChange} />
        ))}
      </div>
    </>
  );
};

GeneratorPicker.defaultProps = default_props;

export default GeneratorPicker;
