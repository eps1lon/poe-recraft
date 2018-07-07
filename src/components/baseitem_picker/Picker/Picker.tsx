import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import { BaseItemTypeProps } from 'state/poe/schema';
import BaseItem from './BaseItem';

import './style.css';

export interface Props {
  active?: BaseItemTypeProps | undefined;
  baseitems: BaseItemTypeProps[];
  onChange?: (item: BaseItemTypeProps) => void;
}

export default class Picker extends React.PureComponent<Props> {
  public static defaultProps = {
    onChange: () => {}
  };

  public render() {
    const { baseitems, onChange = Picker.defaultProps.onChange } = this.props;

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
          {baseitems.map(baseitem => {
            return (
              <BaseItem
                key={baseitem.id}
                baseitem={baseitem}
                onClick={onChange}
              />
            );
          })}
        </div>
      </>
    );
  }
}
