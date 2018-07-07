import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';

import Orb from './Orb';

export interface Props {
  active: string;
  onChange: (generator: string) => void;
}

export default class GeneratorPicker extends PureComponent<Props> {
  public render() {
    const { onChange } = this.props;

    return (
      <>
        <div key="default" className="group default">
          <Button onClick={this.handleShowcaseClick}>All</Button>
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
            'scouring',
            'vaal',
            'annullment'
          ].map(orb_id => <Orb key={orb_id} id={orb_id} onClick={onChange} />)}
        </div>
        <div key="leagues" className="group leagues">
          <Button onClick={this.handleIncursionClick}>Incursion</Button>
        </div>
      </>
    );
  }

  private handleShowcaseClick = () => {
    this.props.onChange('showcase');
  };
  private handleIncursionClick = () => {
    this.props.onChange('incursion');
  };
}
