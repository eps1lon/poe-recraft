import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import { BaseItemTypeProps } from 'state/poe/schema';
import './style.css';

export interface Props {
  active?: BaseItemTypeProps | undefined;
  baseitems: BaseItemTypeProps[];
  onChange?: (item: BaseItemTypeProps) => any;
}

export default class Picker extends React.PureComponent<Props> {
  public static defaultProps = {
    onChange: (item: BaseItemTypeProps) => {}
  };

  public render() {
    const props = this.props as Props & typeof Picker.defaultProps;

    return (
      <>
        <h4>
          {' '}
          <FormattedMessage
            id="baseitem_picker_filtered"
            defaultMessage="baseitems"
          />
        </h4>
        <div key="items" className="baseitem-picker">
          {props.baseitems.map(baseitem => {
            return (
              <Button
                className="baseitem"
                key={baseitem.id}
                onClick={() => props.onChange(baseitem)}
              >
                <FormattedMessage
                  id={`poe.baseitemtypes.${baseitem.id}.name`}
                />
              </Button>
            );
          })}
        </div>
      </>
    );
  }
}
