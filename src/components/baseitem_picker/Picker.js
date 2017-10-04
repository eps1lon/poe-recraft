// @flow
import React from 'react';
import { Button } from 'reactstrap';

import type { BaseItemTypeProps } from 'selectors/schema';

export type Props = {
  active: ?BaseItemTypeProps,
  baseitems: BaseItemTypeProps[],
  onChange: BaseItemTypeProps => void
};

const default_props = {
  onChange: () => {}
};

const GeneratorPicker = (props: Props) => {
  return (
    <div key="items">
      {props.baseitems.map(baseitem => {
        return (
          <Button onClick={() => props.onChange(baseitem)}>
            {baseitem.name}
          </Button>
        );
      })}
    </div>
  );
};

GeneratorPicker.defaultProps = default_props;

export default GeneratorPicker;
