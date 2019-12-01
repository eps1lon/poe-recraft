import * as React from 'react';
import { IntlProvider, IntlConfig } from 'react-intl';

export interface WithMessages<M> {
  messages?: M;
}
/**
 * HOC to hide react-intl dependency
 * @param Component
 */
export default function withIntlProvider<
  P extends object,
  Messages extends IntlConfig['messages']
>(
  Component: React.ComponentType<P>,
): React.SFC<P & { messages?: Partial<Messages> }> {
  // eslint-disable-next-line react/display-name
  return ({ messages, ...props }: { messages?: Partial<Messages> }) => (
    // using anything other that en without providing that (not used) locale data
    // results in messages being empty
    <IntlProvider locale="en" messages={messages as Record<string, string>}>
      <Component {...(props as any)} />
    </IntlProvider>
  );
}
