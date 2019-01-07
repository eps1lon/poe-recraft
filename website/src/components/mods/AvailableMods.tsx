import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import { GeneratorDetails } from './ModsTable';

import ModsTable from 'containers/mods/ModsTable';

export interface Props {
  implicits: GeneratorDetails[];
  prefixes: GeneratorDetails[];
  suffixes: GeneratorDetails[];
}

const styles = createStyles({
  affixes: {
    display: 'table-row',
    width: '100%',
  },
  affixTable: {
    width: '49%',
    display: 'table-cell',
    verticalAlign: 'top',
  },
  implicits: {},
  prefixes: {
    borderRight: '1px solid white',
  },
  root: {
    display: 'table',
    width: '100%',
  },
  suffixes: {
    borderLeft: '1px solid white',
  },
});
const useClasses = makeStyles(styles);

const implicits_table_exclude = ['name'];

function AvailableMods(props: Props) {
  const { prefixes, suffixes, implicits } = props;
  const classes = useClasses();

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
      <div className={classes.affixes}>
        <ModsTable
          className={classNames(classes.affixTable, classes.prefixes)}
          details={prefixes}
          grouped={true}
          defaultExpanded={true}
          human="prefixes"
        />
        <ModsTable
          className={classNames(classes.affixTable, classes.suffixes)}
          details={suffixes}
          grouped={true}
          defaultExpanded={true}
          human="suffixes"
        />
      </div>
    </section>
  );
}

export default AvailableMods;
