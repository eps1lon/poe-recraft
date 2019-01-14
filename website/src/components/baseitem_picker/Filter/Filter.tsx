import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import TagFilter from './TagFilter';

export interface BaseitemFilter {
  item_class: string;
  tags: string[][];
}

export interface Props {
  item_class: string;
  tags: string[][];
  onChange?: (filter: BaseitemFilter) => void;
}

const styles = createStyles({
  filter: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    fontSize: '80%',
    margin: '0 2px',
    flexBasis: 0,
    flexGrow: 1,
  },
});
const useClasses = makeStyles(styles);

const classes_with_defence_groups = [
  'Helmet',
  'Boots',
  'Gloves',
  'Body Armour',
  'Shield',
];
const defence_combinations = [
  'str_armour',
  'str_dex_armour',
  'dex_armour',
  'dex_int_armour',
  'int_armour',
  'str_int_armour',
];

const Filter: React.SFC<Props> = (props: Props) => {
  const { item_class, onChange } = props;
  const classes = useClasses({});

  const handleTagFilterClick = React.useCallback(
    (clicked_tag: string) => {
      if (onChange == null) {
        return;
      }

      onChange({
        item_class,
        tags: [[clicked_tag]],
      });
    },
    [item_class, onChange],
  );

  if (classes_with_defence_groups.includes(props.item_class)) {
    return (
      <>
        <h4>
          <FormattedMessage
            id="baseitem_defence_filter"
            defaultMessage="filter by requirements"
          />
        </h4>
        <div className={classes.filter}>
          {defence_combinations.map(tag => (
            <TagFilter
              key={tag}
              className={classes.tag}
              tag={tag}
              onClick={handleTagFilterClick}
            />
          ))}
        </div>
      </>
    );
  }
  return null;
};

export default React.memo(Filter);
