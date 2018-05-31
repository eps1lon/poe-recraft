import React from 'react';
import { FormattedMessage } from 'react-intl';

export type Props = {
  id: string;
  render?: (name: string | JSX.Element) => React.ReactNode;
};

const FormattedModName: React.SFC<Props> = props => {
  const { render } = props;
  const id =
    props.id.indexOf('Metadata') !== -1
      ? currencyId(props.id)
      : `generators.${props.id}`;

  if (render) {
    return (
      <FormattedMessage id={id} defaultMessage={id}>
        {name => render(name)}
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
