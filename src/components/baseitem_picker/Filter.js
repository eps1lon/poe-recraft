// @flow
import React from 'react';

import TagFilter from './TagFilter';
import type { BaseitemFilter } from 'selectors/baseitemfilter';

export type Props = {
  item_class: number,
  tags: string[],
  onChange: BaseitemFilter => void
};

const default_props = {
  onChange: () => {}
};

const classes_with_defence_groups = [22, 23, 24, 25, 26];
const defence_combinations = [
  'dex_armour',
  'str_dex_armour',
  'str_armour',
  'str_int_armour',
  'int_armour',
  'dex_int_armour'
];

const Filter = (props: Props) => {
  return (
    classes_with_defence_groups.includes(props.item_class) && (
      <div>
        {defence_combinations.map(tag => (
          <TagFilter
            key={tag}
            tag={tag}
            onClick={tag =>
              props.onChange({ item_class: props.item_class, tags: [[tag]] })}
          />
        ))}
      </div>
    )
  );
};

Filter.defaultProps = default_props;

export default Filter;
