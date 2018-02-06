// @flow
import React from 'react';

type RarityId = string;

export type Props = {
  available: RarityId[],
  id: string,
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
