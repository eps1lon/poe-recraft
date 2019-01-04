import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Mods as ModsComponent } from 'components/poe/mods/';
import { PartialProps } from 'types/react';
import modHandles from '../handles/mod';

type DispatchProps = PartialProps<typeof ModsComponent, 'onRemoveMod'>;

export const Mods = connect(
  null,
  modHandles as (dispatch: Dispatch) => DispatchProps,
)(ModsComponent);
