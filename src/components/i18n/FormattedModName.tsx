import { Mod } from 'poe-mods';
import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';

export type Props = {
  inflection: string;
  mod: Mod;
};

const FormattedModName: SFC<Props> = ({ mod, inflection }) => {
  return (
    <FormattedMessage
      id={`poe.mods.${mod.props.primary}.name`}
      values={{ inflection }}
      defaultMessage={mod.props.name}
    />
  );
};

export default FormattedModName;
