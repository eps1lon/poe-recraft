// @flow
import React from 'react';
import './AvailableMods.css';

import type { GeneratorDetails } from './ModsTable';

import ModsTable from '../../containers/mods/ModsTable';

export type Props = {
  implicits: GeneratorDetails[],
  prefixes: GeneratorDetails[],
  suffixes: GeneratorDetails[]
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
        details={implicits}
        options={{ grouped: false, exclude: ['name'] }}
      />
      <div id="affixes">
        <ModsTable
          className="prefixes"
          details={prefixes}
          options={{ grouped: true }}
        />
        <ModsTable
          className="suffixes"
          details={suffixes}
          options={{ grouped: true }}
        />
      </div>
    </section>
  );
};

export default AvailableMods;
