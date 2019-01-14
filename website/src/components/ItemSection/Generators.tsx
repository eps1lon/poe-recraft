import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import Orb from '../Orb';

const styles = createStyles({
  orbButton: {
    padding: '2px 1px',
    minWidth: 30,
    marginTop: 0,
  },
  orbIcon: {
    height: 30,
    width: 30,
  },
});
const useClasses = makeStyles(styles);

export interface Props {
  className?: string;
  onClick: (generator: string) => void;
}

function Generators(props: Props) {
  const { className, onClick } = props;

  const classes = useClasses({});
  const orbClasses = React.useMemo(
    () => ({
      button: classes.orbButton,
      icon: classes.orbIcon,
    }),
    [classes.orbButton, classes.orbIcon],
  );

  return (
    <div className={className}>
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
        <Orb key={orb_id} classes={orbClasses} id={orb_id} onClick={onClick} />
      ))}
    </div>
  );
}

export default React.memo(Generators);
