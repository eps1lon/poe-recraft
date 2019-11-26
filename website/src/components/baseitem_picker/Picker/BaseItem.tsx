import { Button } from '@material-ui/core';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseItemTypeProps } from 'state/poe/schema';

export interface Props {
  baseitem: BaseItemTypeProps;
  className?: string;
  onClick: (baseitem: BaseItemTypeProps) => void;
}

export default class BaseItem extends PureComponent<Props> {
  public render() {
    const { baseitem, className } = this.props;

    return (
      <Button className={className} key={baseitem.id} onClick={this.handleClick}>
        <FormattedMessage id={`poe.baseitemtypes.${baseitem.id}.name`} />
      </Button>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.baseitem);
  };
}
