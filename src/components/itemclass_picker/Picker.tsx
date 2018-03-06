import React, { PureComponent } from 'react';
import { Dropdown, DropdownToggle } from 'reactstrap';

import GroupDropdown from './GroupDropdown';

export type Props = {
  active: string | undefined;
  groups: Array<{
    human: string;
    name: string;
    classes: string[];
  }>;
};

export type State = {
  expanded: { [key: string]: boolean };
};

export default class ItemClassGroup extends PureComponent<Props, State> {
  toggle = (name: string) => () => {
    this.setState({
      expanded: {
        ...this.state.expanded,
        [name]: !Boolean(this.state.expanded[name])
      }
    });
    // prettier tslint contradiction
    // tslint:disable: semicolon
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: {}
    };
  }

  render() {
    const { active, groups } = this.props;
    const { expanded } = this.state;

    return groups.map(group => {
      return (
        <Dropdown
          nav={true}
          key={group.name}
          className={active === group.name ? 'active' : ''}
          isOpen={expanded[group.name]}
          toggle={this.toggle(group.name)}
        >
          <DropdownToggle nav={true} caret={true}>
            {group.human}
          </DropdownToggle>
          <GroupDropdown classes={group.classes} />
        </Dropdown>
      );
    });
  }
}
