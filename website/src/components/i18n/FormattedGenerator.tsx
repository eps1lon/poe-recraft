import React from 'react';
import { FormattedMessage } from 'react-intl';

export interface Props {
  id: string;
  children?: (name: React.ReactNode) => React.ReactNode;
}

const FormattedModName: React.SFC<Props> = props => {
  const { children } = props;
  const id =
    props.id.indexOf('Metadata') !== -1
      ? currencyId(props.id)
      : `generators.${props.id}`;

  if (typeof children === 'function') {
    return (
      <FormattedMessage id={id} defaultMessage={id}>
        {name => children(name)}
      </FormattedMessage>
    );
  } else {
    return <FormattedMessage id={id} defaultMessage={id} />;
  }
};

function currencyId(id: string) {
  return `poe.baseitemtypes.${id}.name`;
}

export default FormattedModName;
