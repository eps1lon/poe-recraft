import React, { SFC, SyntheticEvent } from 'react';

type RarityId = string;

export type Props = {
  available: RarityId[];
  id: string;
  selected: RarityId | undefined;
  onChange: (rarity: RarityId) => any;
};

const default_props = {
  onChange: () => {}
};

const RaritySwitcher: SFC<Props> = props => {
  const { available, selected, onChange } = props;

  const handleChange = (event: SyntheticEvent<HTMLSelectElement>) =>
    onChange(event.currentTarget.value);

  return (
    <select id={props.id} onChange={handleChange} value={selected}>
      {available.map(rarity => (
        <option key={rarity} value={rarity}>
          {rarity}
        </option>
      ))}
    </select>
  );
};

RaritySwitcher.defaultProps = default_props;

export default RaritySwitcher;
