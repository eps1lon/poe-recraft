// @flow
import React from 'react';

import RaritySwitcher from 'containers/RaritySwitcher';


export type Props = {
  onToggle: () => void
};

const default_props = {
  onToggle: () => { }
};

const Body = (props: Props) => {
  return <RaritySwitcher available={["normal", "magic", "rare"]} onChange={props.onToggle} />;
};

Body.defaultProps = default_props;

export default Body;
