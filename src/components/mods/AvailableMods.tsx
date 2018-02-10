import React, { SFC } from 'react';

import './AvailableMods.css';

import { GeneratorDetails } from './ModsTable';

import ModsTable from 'containers/mods/ModsTable';

export type Props = {
  implicits: GeneratorDetails[];
  prefixes: GeneratorDetails[];
  suffixes: GeneratorDetails[];
};

const AvailableMods: SFC<Props> = ({ prefixes, suffixes, implicits }) => {
  return (
    <section id="available_mods">
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
