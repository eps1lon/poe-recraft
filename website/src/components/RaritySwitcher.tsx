import React, { PureComponent, SyntheticEvent } from 'react';

import { isRarityId, RarityId } from 'types/poe';

export interface Props {
  available: RarityId[];
  id: string;
  selected: RarityId | 'unique' | 'showcase' | undefined;
  onChange: (rarity: RarityId) => void;
}

export default class RaritySwitch extends PureComponent<Props> {
  public render() {
    const { available, id, selected } = this.props;

    return (
      <select id={id} onChange={this.handleChange} value={selected}>
        {available.map(rarity => (
          <option key={rarity} value={rarity}>
            {rarity}
          </option>
        ))}
      </select>
    );
  }

  private handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const rarity = event.currentTarget.value;
    if (isRarityId(rarity)) {
      this.props.onChange(rarity);
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(`'${rarity}' is not a valid RarityId`);
    }
  };
}
