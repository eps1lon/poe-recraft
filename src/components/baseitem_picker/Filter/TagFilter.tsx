import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

export interface Props {
  className?: string;
  tag: string;
  onClick: (tag: string) => void;
}

// attr1_attr2_..._attrN_armour
const defenceTagDefaultMessage = (tag2: string) => {
  const requirements = tag2.replace(/_armour$/, '').split('_');
  return requirements.map(attr => attr.toLocaleUpperCase()).join('/');
};

export default class TagFilter extends PureComponent<Props> {
  public render() {
    const { className, tag } = this.props;
    const i18n_id = `tagfilter.${tag}`;

    return (
      <Button className={className} onClick={this.handleClick}>
        <FormattedMessage
          id={i18n_id}
          defaultMessage={defenceTagDefaultMessage(tag)}
        />
      </Button>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.tag);
  };
}
