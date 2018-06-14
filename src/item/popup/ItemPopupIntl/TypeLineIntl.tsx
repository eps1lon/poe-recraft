import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Rarity } from './props';

export interface Props {
  item_id: string;
  prefix_id?: string;
  suffix_id?: string;
  rarity: Rarity;
}

class TypeLineIntl extends React.PureComponent<Props & InjectedIntlProps> {
  render() {
    const { item_id, intl } = this.props;
    const inflection = this.itemInflection();
    const basename = intl.formatMessage({
      id: `poe.baseitemtypes.${item_id}.name`,
    });
    const prefix = this.prefix();
    const suffix = this.suffix();

    return [prefix, basename, suffix].filter(Boolean).join(' ');
  }

  private itemInflection(): string | undefined {
    const { item_id, intl } = this.props;
    const messages = intl.formatMessage;
    return intl.messages[`poe.baseitemtypes.${item_id}.inflection`];
  }

  private prefix(): string | null {
    const { rarity, prefix_id } = this.props;
    if (rarity !== 'magic' || prefix_id === undefined) {
      return null;
    }

    return this.props.intl.formatMessage(
      { id: `poe.mods.${prefix_id}.name` },

      {
        inflection: this.itemInflection(),
      },
    );
  }

  private suffix(): string | null {
    const { rarity, suffix_id } = this.props;
    if (rarity !== 'magic' || suffix_id === undefined) {
      return null;
    }

    return this.props.intl.formatMessage(
      { id: `poe.mods.${suffix_id}.name` },

      {
        inflection: this.itemInflection(),
      },
    );
  }
}

export default injectIntl(TypeLineIntl);
