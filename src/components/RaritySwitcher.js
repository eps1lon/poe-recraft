// @flow
import React from 'react';

type RarityId = string;

export type Props = {
  available: RarityId[],
  selected: ?RarityId,
  onChange: RarityId => void
};

const default_props = {
  onChange: () => {}
};

const RaritySwitcher = (props: Props) => {
  const { available, selected, onChange } = props;

  const handleChange = (event: SyntheticInputEvent<HTMLSelectElement>) =>
    onChange(event.currentTarget.value);

  return (
    <select onChange={handleChange}>
      {available.map(rarity => (
        <option value={rarity} selected={rarity === selected}>
          {rarity}
        </option>
      ))}
    </select>
  );
};

RaritySwitcher.defaultProps = default_props;

export default RaritySwitcher;
