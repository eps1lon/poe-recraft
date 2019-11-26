import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { GeneratorDetails } from './ModsTable';

import ModsTable from 'containers/mods/ModsTable';

export interface Props {
  implicits: GeneratorDetails[];
  prefixes: GeneratorDetails[];
  suffixes: GeneratorDetails[];
}

const styles = createStyles({
  affixes: {},
  implicits: {
    flex: '0 1 100%',
  },
  prefixes: {
    flex: '1 0 50%',
  },
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  suffixes: {
    flex: '1 0 50%',
  },
});
const useClasses = makeStyles(styles, { name: 'AvailableMods' });

const implicits_table_exclude = ['name'];

function AvailableMods(props: Props) {
  const { prefixes, suffixes, implicits } = props;
  const classes = useClasses({});

  return (
    <section className={classes.root}>
      <ModsTable
        className={classes.implicits}
        details={implicits}
        grouped={false}
        human="Implicits"
        exclude={implicits_table_exclude}
        defaultExpanded={false}
      />
      <ModsTable
        className={classes.prefixes}
        details={prefixes}
        grouped={true}
        defaultExpanded={true}
        human="prefixes"
      />
      <ModsTable
        className={classes.suffixes}
        details={suffixes}
        grouped={true}
        defaultExpanded={true}
        human="suffixes"
      />
    </section>
  );
}

export default AvailableMods;
