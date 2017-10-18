// @flow
import { type Mod } from 'poe-mods';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export type Props = {
  inflection?: string,
  mod: Mod
};

const FormattedModName = ({ mod, inflection }: Props) => {
  return (
    <FormattedMessage
      id={`poe.mods.${mod.props.primary}.name`}
      values={{ inflection }}
      defaultMessage={mod.props.name}
    />
  );
};

export default FormattedModName;
