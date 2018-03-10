import React from 'react';
import { FormattedMessage } from 'react-intl';

export type Props = {
  id: string;
};

const FormattedModName: React.SFC<Props> = props => {
  const id =
    props.id.indexOf('Metadata') !== -1
      ? currencyId(props.id)
      : `generators.${props.id}`;

  return (
    <FormattedMessage id={id} defaultMessage={id}>
      {props.children}
    </FormattedMessage>
  );
};

function currencyId(id: string) {
  return `poe.baseitemtypes.${id}.name`;
}

export default FormattedModName;
