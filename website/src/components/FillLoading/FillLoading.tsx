import { createStyles, makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

const styles = createStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    backgroundColor: 'darkolivegreen',
    height: ' 100%',
    opacity: 0.4,
    transition: 'width 500ms, opacity 300ms ease-out',
    pointerEvents: 'none',
    '$ + *': {
      zIndex: 1,
    },
  },
  appear: { width: 0 },
  appearActive: { width: '90%' },
  enter: { width: 0 },
  enterActive: { width: '90%' },
  enterDone: { width: '100%' },
  exit: { opacity: 0 },
  exitActive: { opacity: 0 },
  exitDone: { opacity: 0, width: 0 },
});
const useClasses = makeStyles(styles);

export interface Props {
  loading: boolean;
}

const duration = 5000;

function FillLoading(props: Props) {
  const { loading } = props;
  const { root, ...transitionClasses } = useClasses();

  return (
    <CSSTransition
      in={loading}
      classNames={transitionClasses}
      timeout={duration}
    >
      <div className="fill-loading" />
    </CSSTransition>
  );
}

export default FillLoading;
