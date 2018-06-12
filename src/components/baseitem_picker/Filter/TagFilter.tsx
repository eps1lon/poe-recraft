import React, { SFC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

export type Props = {
  className?: string;
  tag: string;
  onClick: (tag: string) => any;
};

const default_props = {
  onClick: () => {}
};

// attr1_attr2_..._attrN_armour
const defenceTagDefaultMessage = (tag2: string) => {
  const requirements = tag2.replace(/_armour$/, '').split('_');
  return requirements.map(attr => attr.toLocaleUpperCase()).join('/');
};

const TagFilter: SFC<Props> = props => {
  const { className, onClick, tag } = props;
  const i18n_id = `tagfilter.${props.tag}`;
  return (
    <Button className={className} onClick={() => onClick(tag)}>
      <FormattedMessage
        id={i18n_id}
        defaultMessage={defenceTagDefaultMessage(tag)}
      />
    </Button>
  );
};

TagFilter.defaultProps = default_props;

export default TagFilter;
