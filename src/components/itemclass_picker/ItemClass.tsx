import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { DropdownItem } from 'reactstrap';

export interface Props {
  active: string;
  id: string;
  name: string;
  onClick: (primary: string) => any;
}

export default class ItemClassGroup extends PureComponent<Props> {
  public render() {
    const { active, name, id } = this.props;

    return (
      <DropdownItem active={active === id} onClick={this.handleClick}>
        <FormattedMessage
          id={`poe.item_classes.${id}.name`}
          defaultMessage={name}
        />
      </DropdownItem>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.id);
  };
}
