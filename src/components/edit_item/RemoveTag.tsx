import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';

export interface Props {
  tag: string;
  onClick: (tag: string) => void;
}

export default class GeneratorPicker extends PureComponent<Props> {
  public render() {
    const { tag } = this.props;

    return (
      <li key={tag}>
        {tag}
        <Button onClick={this.handleClick}>X</Button>
      </li>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.tag);
  };
}