
// ts needs this for declarations otherwise "using private name React.*"
// ts is only emitting this import for declaration files and stripping it
// for regular files
// tslint:disable-next-line: asd
import * as React from 'react';

import ApiPopupIntl from './ApiPopupIntl';
import withIntlProvider from './withIntlProvider';

export interface Messages {
  'poe.popup.corrupted': string;
  'poe.popup.requires': string;
}
export type Props = PropsType<typeof ApiPopupIntl>;

/**
 * Component for items from poe official apis with the ability
 * to provide translations. However most words are already translated
 * in the API response so the popup might not be fully translated
 */
const ApiPopup = withIntlProvider<Props, Messages>(ApiPopupIntl);
export default ApiPopup;
