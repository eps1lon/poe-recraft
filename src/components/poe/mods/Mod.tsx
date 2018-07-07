import { Mod as PoeMod } from 'poe-mods';
import React, { PureComponent } from 'react';

export interface Props {
  mod: PoeMod;
  onRemoveClick: (mod: PoeMod) => void;
}

export default class Mod extends PureComponent<Props> {
  public render() {
    const { mod } = this.props;
    // TODO stays empty?
    const stats: any[] = [];

    return (
      <li
        key={mod.props.id}
        className={`mod mod-type-${String(mod.modType())}`}
      >
        <em className="name">{mod.props.name}</em>
        <button className="remove_mod" onClick={this.handleRemoveClick}>
          Remove
        </button>
        <ul className="stats">{stats}</ul>
      </li>
    );
  }

  private handleRemoveClick = () => {
    this.props.onRemoveClick(this.props.mod);
  };
}
