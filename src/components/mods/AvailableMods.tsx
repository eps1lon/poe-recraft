import React, { SFC } from 'react';

import './AvailableMods.css';

import { GeneratorDetails } from './ModsTable';

import ModsTable from 'containers/mods/ModsTable';

export interface Props {
  implicits: GeneratorDetails[];
  prefixes: GeneratorDetails[];
  suffixes: GeneratorDetails[];
}

const implicits_table_exclude = ['name'];

const AvailableMods: SFC<Props> = ({ prefixes, suffixes, implicits }) => {
  return (
    <section id="available_mods">
      <ModsTable
        className="implicits"
        details={implicits}
        grouped={false}
        exclude={implicits_table_exclude}
        defaultExpanded={false}
      />
      <div id="affixes">
        <ModsTable
          className="prefixes"
          details={prefixes}
          grouped={true}
          defaultExpanded={true}
        />
        <ModsTable
          className="suffixes"
          details={suffixes}
          grouped={true}
          defaultExpanded={true}
        />
      </div>
    </section>
  );
};

export default AvailableMods;
