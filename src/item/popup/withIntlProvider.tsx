import * as React from 'react';
import { IntlProvider } from 'react-intl';

export interface WithMessages<M> {
  messages?: Partial<M>;
}
/**
 * HOC to hide react-intl dependency
 * @param Component
 */
export default function withIntlProvider<P extends object, M extends object>(
  Component: React.ComponentType<P>,
): React.SFC<P & WithMessages<M>> {
  return ({ messages, ...props }: WithMessages<M>) => (
    // using anything other that en without providing that (not used) locale data
    // results in messages being empty
    <IntlProvider locale="en" messages={messages}>
      <Component {...props} />
    </IntlProvider>
  );
}
