import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import Orb from '../Orb';

export interface Props {
  active: string;
  onChange: (generator: string) => void;
}

const styles = createStyles({
  group: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  groupAction: {
    flexGrow: 0,
    margin: 2,
  },
});
const useClasses = makeStyles(styles);

function Picker(props: Props) {
  const { onChange } = props;

  const classes = useClasses({});

  const handleElderClick = React.useCallback(() => onChange('elder'), [
    onChange,
  ]);
  const handleIncursionClick = React.useCallback(() => onChange('incursion'), [
    onChange,
  ]);
  const handleShapedClick = React.useCallback(() => onChange('shaped'), [
    onChange,
  ]);
  const handleShowcaseClick = React.useCallback(() => onChange('showcase'), [
    onChange,
  ]);

  return (
    <>
      <div key="default" className="group default">
        <Button className={classes.groupAction} onClick={handleShowcaseClick}>
          All
        </Button>
      </div>
      <div key="orbs" className={classes.group}>
        {[
          'transmute',
          'augmentation',
          'alteration',
          'regal',
          'exalted',
          'alchemy',
          'chaos',
          'scouring',
          'vaal',
          'annullment',
        ].map(orb_id => (
          <Orb key={orb_id} id={orb_id} onClick={onChange} />
        ))}
      </div>
      <div key="misc" className={classes.group}>
        <Button className={classes.group} onClick={handleElderClick}>
          Elder Mods
        </Button>
        <Button className={classes.group} onClick={handleShapedClick}>
          Shaped Mods
        </Button>
      </div>
      <div key="leagues" className={classes.group}>
        <Button className={classes.group} onClick={handleIncursionClick}>
          Incursion
        </Button>
      </div>
    </>
  );
}

export default React.memo(Picker);
