import ListItem from '@material-ui/core/ListItem';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

export interface Props {
  active: string;
  id: string;
  name: string;
  onClick: (primary: string) => void;
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

interface DropdownItemProps {
  active: boolean;
  children: React.ReactElement<unknown>;
  onClick: () => void;
}

function DropdownItem(props: DropdownItemProps) {
  const { children, onClick } = props;
  return (
    <ListItem button onClick={onClick}>
      {children}
    </ListItem>
  );
}
