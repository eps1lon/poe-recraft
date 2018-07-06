import React from 'react';
import { FormattedMessage } from 'react-intl';

import TagFilter from './TagFilter';

import './style.css';

export interface BaseitemFilter {
  item_class: string;
  tags: string[][];
}

export interface Props {
  item_class: string;
  tags: string[][];
  onChange?: (filter: BaseitemFilter) => any;
}

const classes_with_defence_groups = [
  'Helmet',
  'Boots',
  'Gloves',
  'Body Armour',
  'Shield'
];
const defence_combinations = [
  'str_armour',
  'str_dex_armour',
  'dex_armour',
  'dex_int_armour',
  'int_armour',
  'str_int_armour'
];

export default class Filter extends React.PureComponent<Props> {
  public static defaultProps = {
    onChange: (filter: BaseitemFilter) => {}
  };

  public render() {
    const props = this.props as Props & typeof Filter.defaultProps;
    if (classes_with_defence_groups.includes(props.item_class)) {
      return (
        <>
          <h4>
            <FormattedMessage
              id="baseitem_defence_filter"
              defaultMessage="filter by requirements"
            />
          </h4>
          <div className="filter">
            {defence_combinations.map(tag => (
              <TagFilter
                key={tag}
                className="tag"
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
        </>
      );
    }
    return null;
  }
}
