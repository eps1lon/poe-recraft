import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import { BaseItemTypeProps } from 'state/poe/schema';

export type Props = {
  active?: BaseItemTypeProps;
  baseitems: BaseItemTypeProps[];
  onChange: (item: BaseItemTypeProps) => any;
};

// used in dispatchToProps own_props: typeof default_props
// ts complains
// TODO look for a useable pattern where i pass props to a connected component
// that extends that passed props which also has a default
export const default_props = {
  onChange: (item: BaseItemTypeProps) => {}
};

const GeneratorPicker: SFC<Props> = props => {
  return (
    <div key="items">
      {props.baseitems.map(baseitem => {
        return (
          <Button key={baseitem.id} onClick={() => props.onChange(baseitem)}>
            <FormattedMessage id={`poe.baseitemtypes.${baseitem.id}.name`} />
          </Button>
        );
      })}
    </div>
  );
};

GeneratorPicker.defaultProps = default_props;

export default GeneratorPicker;
