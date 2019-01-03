import React, { PureComponent } from 'react';
import { DropdownItem } from 'reactstrap';

import LocaleIcon from './LocaleIcon';

export interface Props {
  active: boolean;
  locale: string;
  onClick: (locale: string) => void;
}

export default class ModGroup extends PureComponent<Props> {
  public render() {
    const { active, locale } = this.props;
    return (
      <DropdownItem key={locale} active={active} onClick={this.handleClick}>
        <LocaleIcon code={locale} />
      </DropdownItem>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.locale);
  };
}
