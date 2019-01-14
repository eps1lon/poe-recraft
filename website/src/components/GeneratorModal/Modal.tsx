import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import FillLoading from 'components/FillLoading';
import { FormattedGenerator } from 'components/i18n';
import GeneratorPicker from './Picker';

type GeneratorId = string;

export interface Props {
  active: GeneratorId;
  is_open: boolean;
  loading: boolean;
  onChange: (id: GeneratorId) => void;
  onToggle: () => void;
}

const styles = createStyles({
  root: {
    position: 'relative',
  },
});
const useClasses = makeStyles(styles);

function GeneratorModal(props: Props) {
  const { onChange, onToggle: toggle } = props;

  const classes = useClasses({});

  const handleChange = React.useCallback(
    (id: GeneratorId) => {
      toggle();
      onChange(id);
    },
    [onChange, toggle],
  );

  return (
    <div className={classes.root}>
      <FillLoading loading={props.loading} />
      <Button onClick={toggle}>
        Generator: <FormattedGenerator id={props.active} />
      </Button>

      <Dialog open={props.is_open} onClose={toggle}>
        <DialogTitle>Pick a generator</DialogTitle>
        <DialogContent>
          <GeneratorPicker active={props.active} onChange={handleChange} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GeneratorModal;
