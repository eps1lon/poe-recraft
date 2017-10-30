import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';

import AppUI from './AppUI';

export type Props = {
  locale: string,
  messages: { [string]: any },
  version: string,
  init: () => void
};

class App extends PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { locale, messages, version } = this.props;
    // some key that tells react to rerender
    // injectIntl intl didnt provide the api that was documented so
    // we stick with this crowbar
    const key = `${locale}-#${Object.keys(messages).length}`;

    return (
      <IntlProvider key={key} locale={locale} messages={messages}>
        <AppUI {...{ version }} />
      </IntlProvider>
    );
  }
}

export default App;
