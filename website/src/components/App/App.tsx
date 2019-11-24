import { ThemeProvider } from '@material-ui/core/styles';
import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';

import AppUI from './AppUI';
import { GAME_VERSION } from './settings';
import theme from './theme';

export interface Props {
  locale: string;
  messages: { [key: string]: any };
  init: () => void;
  version: string;
}

class App extends PureComponent<Props> {
  public componentDidMount() {
    this.props.init();
  }

  public render() {
    const { locale, messages, version } = this.props;
    // some key that tells react to rerender
    // injectIntl intl didnt provide the api that was documented so
    // we stick with this crowbar
    const key = `${locale}-#${Object.keys(messages).length}`;

    return (
      <IntlProvider key={key} locale={locale} messages={messages}>
        <ThemeProvider theme={theme}>
          <AppUI {...{ app_version: version, game_version: GAME_VERSION }} />
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default App;
