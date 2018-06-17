import * as React from 'react';

import Extended, { Mod, ModGroup, Hash } from './Extended';
import ExtendedStatValues from './ExtendedStatValues';
import ExtendedStatNames from './ExtendedStatNames';

export interface Props {
  className: string;
  extended: Extended;
  group: ModGroup;
  index: number;
  showInfo: boolean;
}

export default class ExtendedStat extends React.PureComponent<Props> {
  public render() {
    const { extended, className, ...props } = this.props;
    const stat_mods = this.statMods();
    const showInfo = true; // DEBUG

    return (
      <div className={className}>
        <span className="lc l">
          <ExtendedStatValues showInfo={showInfo} mods={stat_mods} />
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
      console.warn(`extended '${this.props.group}' mods not set`);
      return [];
    } else {
      return mods;
    }
  }

  private modIndices(): number[] {
    const hashes = this.props.extended.hashes[this.props.group];
    if (hashes == null) {
      console.warn(`extended '${this.props.group}' hashes not set`);
      return [];
    }

    const hash = hashes[this.props.index];
    if (hash == null) {
      console.warn(
        `hash not set for group '${this.props.group}' at index ${
          this.props.index
        }`,
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
        console.warn(`stat is referencing non existent mod`);
      }
      return mod;
    });
  }
}
