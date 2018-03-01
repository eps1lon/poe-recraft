import React, { SFC } from 'react';

import TagFilter from './TagFilter';
import { BaseitemFilter } from 'selectors/baseitemfilter';

export type Props = {
  item_class: string;
  tags: string[][];
  onChange: (filter: BaseitemFilter) => any;
};

export const default_props = {
  onChange: (filter: BaseitemFilter) => {}
};

const classes_with_defence_groups = [
  'Helmet',
  'Boots',
  'Gloves',
  'Body Armour',
  'Shield'
];
const defence_combinations = [
  'dex_armour',
  'str_dex_armour',
  'str_armour',
  'str_int_armour',
  'int_armour',
  'dex_int_armour'
];

const Filter: SFC<Props> = props => {
  if (classes_with_defence_groups.includes(props.item_class)) {
    return (
      <div>
        {defence_combinations.map(tag => (
          <TagFilter
            key={tag}
            tag={tag}
            onClick={clicked_tag =>
              props.onChange({
                item_class: props.item_class,
                tags: [[clicked_tag]]
              })
            }
          />
        ))}
      </div>
    );
  }
  return null;
};

Filter.defaultProps = default_props;

export default Filter;
