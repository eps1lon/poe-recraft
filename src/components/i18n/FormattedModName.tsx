import { Mod } from 'poe-mods';
import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';

export interface Props {
  inflection: string;
  mod: Mod;
}

const FormattedModName: SFC<Props> = ({ mod, inflection }) => {
  return (
    <FormattedMessage
      id={`poe.mods.${mod.props.id}.name`}
      values={{ inflection }}
      defaultMessage={mod.props.name || mod.props.id}
    />
  );
};

export default FormattedModName;
