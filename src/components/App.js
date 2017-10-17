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

    return (
      <IntlProvider key={locale} locale={locale} messages={messages}>
        <AppUI {...{ version }} />
      </IntlProvider>
    );
  }
}

export default App;
