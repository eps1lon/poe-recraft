import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import './style.css';

export interface Props {
  loading: boolean;
}

const duration = 5000;

export const FillLoading: React.SFC<Props> = ({ loading }) => {
  return (
    <CSSTransition in={loading} classNames="" timeout={duration}>
      <div className="fill-loading" />
    </CSSTransition>
  );
};
