import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import { BaseItemTypeProps } from 'state/poe/schema';

export interface Props {
  baseitem: BaseItemTypeProps;
  onClick: (baseitem: BaseItemTypeProps) => void;
}

export default class BaseItem extends PureComponent<Props> {
  public render() {
    const { baseitem } = this.props;

    return (
      <Button className="baseitem" key={baseitem.id} onClick={this.handleClick}>
        <FormattedMessage id={`poe.baseitemtypes.${baseitem.id}.name`} />
      </Button>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.baseitem);
  };
}
