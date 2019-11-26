import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseItemTypeProps } from 'state/poe/schema';
import BaseItem from './BaseItem';

export interface Props {
  active?: BaseItemTypeProps | undefined;
  baseitems: BaseItemTypeProps[];
  onChange: (item: BaseItemTypeProps) => void;
}

const styles = createStyles({
  picker: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  baseitem: {
    flexGrow: 1,
    margin: 2,
  },
});
const useClasses = makeStyles(styles);

const Picker: React.FunctionComponent<Props> = props => {
  const { baseitems, onChange } = props;
  const classes = useClasses({});

  return (
    <>
      <h4>
        {' '}
        <FormattedMessage
          id="baseitem_picker_filtered"
          defaultMessage="baseitems"
        />
      </h4>
      <div key="items" className={classes.picker}>
        {baseitems.map(baseitem => {
          return (
            <BaseItem
              key={baseitem.id}
              baseitem={baseitem}
              className={classes.baseitem}
              onClick={onChange}
            />
          );
        })}
      </div>
    </>
  );
};

Picker.defaultProps = {
  onChange: () => {},
};

export default Picker;
