import { Mod } from 'poe-mods';
import * as React from 'react';

// import './style.css';

export interface Props {
  mod: Mod;
  onClick: (mod: Mod) => any;
}

export default class AddMod extends React.PureComponent<Props> {
  onClick = () => this.props.onClick(this.props.mod);

  render() {
    return (
      <button className="add-mod" onClick={this.onClick}>
        +
      </button>
    );
  }
}
