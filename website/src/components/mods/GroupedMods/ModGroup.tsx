import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import React from 'react';

import CorrectGroup from 'containers/i18n/CorrectGroup';
import UngroupedMods from 'containers/mods/UngroupedMods';
import { GeneratorDetails } from '../ModsTable';

export interface Props {
  className: string;
  details: GeneratorDetails[];
  disabled: boolean;
  exclude?: string[];
  group: string;
  isExpanded: (id: string) => boolean;
  onGroupClick: (id: string) => void;
}

const styles = createStyles({
  title: {
    cursor: 'pointer',
    fontSize: "1.05em",
    '&:$disabled': {
      textDecoration: 'line-through',
    },
  },
  disabled: {},
});
const useClasses = makeStyles(styles);

function ModGroup(props: Props) {
  const {
    className,
    details,
    disabled,
    exclude,
    group,
    isExpanded,
    onGroupClick,
  } = props;

  const classes = useClasses({});
  const mods = React.useMemo(() => details.map(({ mod }) => mod), [details]);
  const handleClick = React.useCallback(() => onGroupClick(group), [
    group,
    onGroupClick,
  ]);

  return (
    <>
      <Typography
        className={classnames(classes.title, { [classes.disabled]: disabled })}
        onClick={handleClick}
        variant="h5"
      >
        <CorrectGroup mods={mods} />
      </Typography>
      {isExpanded(group) && (
        <UngroupedMods
          className={className}
          details={details}
          exclude={exclude}
        />
      )}
    </>
  );
}

export default React.memo(ModGroup);
