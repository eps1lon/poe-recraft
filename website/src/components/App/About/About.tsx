import React from 'react';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';

import './style.css';

export interface Props {
  game_version: string;
  app_version: string;
}

export interface State {
  is_open: boolean;
}

export default class About extends React.PureComponent<Props, State> {
  public popover_id = 'unmounted-about-opover';
  public state: State = { is_open: false };

  public handleToggle = () => this.setState({ is_open: !this.state.is_open });

  public componentWillMount() {
    this.popover_id = 'about-popover';
  }

  public render() {
    const { app_version, game_version } = this.props;
    return (
      <span className="about">
        <Button
          className="mr-1"
          color="secondary"
          id={this.popover_id}
          onClick={this.handleToggle}
        >
          About
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.is_open}
          target={this.popover_id}
          toggle={this.handleToggle}
        >
          <PopoverHeader>About</PopoverHeader>
          <PopoverBody className="about">
            <ul>
              <li>
                <strong>game client version</strong>
                {game_version}
              </li>
              <li>
                <strong>app version</strong>
                {app_version}
              </li>
            </ul>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}
