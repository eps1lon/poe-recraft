import React, { PureComponent } from 'react';

export interface Props {
  level: number;
  onChange: (level: number) => void;
}

export default class Level extends PureComponent<Props> {
  private id: string = 'modifieable-level-';

  public render() {
    const { level } = this.props;
    const id = this.id;

    return (
      <>
        <label htmlFor={id}>Item Level: </label>
        <input
          id={id}
          type="number"
          value={level}
          onChange={this.handleLevelChange}
        />
      </>
    );
  }

  private handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.valueAsNumber;
    this.props.onChange(value);
  };
}
