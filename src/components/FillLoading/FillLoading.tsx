import * as React from 'react';
import Transition from 'react-transition-group/Transition';
import classnames from 'classnames';

import './style.css';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface Props {
  loading: boolean;
}

const duration = 5000;

// eps1lon: tried to move styles into css but nothing happened
const default_styles = {
  height: '100%',
  width: '0%',
  transition: `width ${duration}ms`
};

const transition_styles = {
  entering: { width: '0%' },
  entered: { width: '100%' },
  // accelerate
  exiting: { width: '100%', transition: `width 1ms` },
  exited: {
    width: '100%',
    opacity: 0,
    transition: `opacity 500ms ease-out`
  }
};

export const FillLoading: React.SFC<Props> = ({ loading }) => {
  return (
    <Transition in={loading} timeout={duration}>
      {(state: TransitionState) => {
        return (
          <div
            className="fill-loading"
            style={{
              ...default_styles,
              ...transition_styles[state]
            }}
          />
        );
      }}
    </Transition>
  );
};
