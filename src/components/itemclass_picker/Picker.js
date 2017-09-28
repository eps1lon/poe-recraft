// @flow
import React, { PureComponent } from 'react';
import { Nav, NavDropdown, DropdownToggle } from 'reactstrap';

import GroupDropdown from './GroupDropdown';

export type Props = {
  active: ?string,
  groups: Array<{
    human: string,
    name: string,
    classes: { primary: number, name: string }[]
  }>
};

export type State = {
  expanded: { [string]: boolean }
};

export default class ItemClassGroup extends PureComponent<Props, State> {
  toggle = (name: string) => () =>
    this.setState({
      expanded: {
        ...this.state.expanded,
        [name]: !Boolean(this.state.expanded[name])
      }
    });

  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: {}
    };
  }

  render() {
    const { active, groups } = this.props;
    const { expanded } = this.state;

    return (
      <Nav tabs>
        {groups.map(group => {
          return (
            <NavDropdown
              key={group.name}
              className={active === group.name ? 'active' : ''}
              isOpen={expanded[group.name]}
              toggle={this.toggle(group.name)}
            >
              <DropdownToggle nav caret>
                {group.human}
              </DropdownToggle>
              <GroupDropdown classes={group.classes} />
            </NavDropdown>
          );
        })}
      </Nav>
    );
  }
}
