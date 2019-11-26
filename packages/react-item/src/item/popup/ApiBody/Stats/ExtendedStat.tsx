import * as React from 'react';

import Extended, { Mod, ModGroup } from './Extended';
import ExtendedStatValues from './ExtendedStatValues';
import ExtendedStatNames from './ExtendedStatNames';
import { warn } from '../../../../util';

export interface Props {
  className: string;
  extended: Extended;
  group: ModGroup;
  index: number;
  showInfo: boolean;
  onMouseOver?: (index: number) => void;
  onMouseOut?: () => void;
}

// allow empty for noop
const noop = () => {};

export default class ExtendedStat extends React.PureComponent<Props> {
  public handleMouseOut = () => (this.props.onMouseOut || noop)();
  public handleMouseOver = () =>
    (this.props.onMouseOver || noop)(this.props.index);

  public render() {
    const { className, showInfo } = this.props;
    const stat_mods = this.statMods();
    const stat_id = this.statHash();

    return (
      <div
        className={className}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
      >
        <span className="lc l">
          <ExtendedStatValues
            showInfo={showInfo}
            mods={stat_mods}
            stat_id={stat_id}
          />
        </span>
        <span className="lc s">{this.props.children}</span>
        {showInfo && (
          <span className="lc r">
            <ExtendedStatNames mods={stat_mods} />
          </span>
        )}
      </div>
    );
  }

  private mods(): Mod[] {
    const mods = this.props.extended.mods[this.props.group];
    if (mods == null) {
      warn(`extended '${this.props.group}' mods not set`);
      return [];
    } else {
      return mods;
    }
  }

  private modIndices(): number[] {
    const hashes = this.props.extended.hashes[this.props.group];
    if (hashes == null) {
      warn(`extended '${this.props.group}' hashes not set`);
      return [];
    }

    const hash = hashes[this.props.index];
    if (hash == null) {
      warn(
        `hash not set for group '${this.props.group}' at index ${this.props.index}`,
      );
      return [];
    }
    return hash[1];
  }

  /**
   * collects the mods from extended that are referenced by the indices
   * warns if it references undefined
   * @param mod_indices
   */
  private statMods(): Mod[] {
    const mod_indices = this.modIndices();
    const mods = this.mods();
    return mod_indices.map(index => {
      const mod = mods[index];
      if (mod == null) {
        warn(`stat is referencing non existent mod`);
      }
      return mod;
    });
  }

  /**
   * the stat_hash for this stat
   */
  private statHash(): string {
    const hashes = this.props.extended.hashes[this.props.group];
    if (hashes == null) {
      warn(`extended '${this.props.group}' hashes not set`);
      return '';
    }

    const stat = hashes[this.props.index];
    if (stat == null) {
      warn(`no hash set for stat ${this.props.index}`);
      return '';
    }

    return stat[0];
  }
}
