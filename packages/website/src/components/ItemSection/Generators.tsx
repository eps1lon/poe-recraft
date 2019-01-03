import React, { PureComponent } from 'react';

import Orb from '../Orb';

export interface Props {
  onClick: (generator: string) => void;
}

export default class Generators extends PureComponent<Props> {
  public render() {
    const { onClick } = this.props;

    return (
      <div className="group orbs">
        {[
          'transmute',
          'augmentation',
          'alteration',
          'regal',
          'exalted',
          'alchemy',
          'chaos',
          'scouring',
          'vaal',
          'annullment'
        ].map(orb_id => <Orb key={orb_id} id={orb_id} onClick={onClick} />)}
      </div>
    );
  }
}
