// @flow
import React from 'react';
import './AvailableMods.css';

import type Mod from '../../poe/Mod/';

import ModsTable from './ModsTable';

export type Props = {
  implicits: Mod[],
  prefixes: Mod[],
  suffixes: Mod[]
};

// TODO hide implicits by default => toggleable
const AvailableMods = ({ prefixes, suffixes, implicits }: Props) => {
  return (
    <section id="available_mods">
      <h3>
        available Mods
        <a id="expand_mods" href="#available_mods">
          Expand All
        </a>/
        <a id="collapse_mods" href="#available_mods">
          Collapse All
        </a>
      </h3>
      <ModsTable
        className="implicits"
        mods={implicits}
        options={{ grouped: false }}
      />
      <div id="affixes">
        <ModsTable
          className="prefixes"
          mods={prefixes}
          options={{ grouped: true }}
        />
        <ModsTable
          className="suffixes"
          mods={suffixes}
          options={{ grouped: true }}
        />
      </div>
    </section>
  );
};

export default AvailableMods;
