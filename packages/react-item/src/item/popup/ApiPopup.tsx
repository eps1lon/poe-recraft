// ts needs this for declarations otherwise "using private name React.*"
// ts is only emitting this import for declaration files and stripping it
// for regular files
import * as React from 'react';

import ApiPopupIntl from './ApiPopupIntl';
import withIntlProvider from './withIntlProvider';
import { PropsType } from '../../util/types';

export type Messages = Record<
  'poe.api.Corrupted' | 'poe.api.Requires' | 'poe.api.{Range1} to {Range2}',
  string
>;

export type Props = PropsType<typeof ApiPopupIntl>;

/**
 * Component for items from poe official apis with the ability
 * to provide translations. However most words are already translated
 * in the API response so the popup might not be fully translated
 */
const ApiPopup = withIntlProvider<Props, Messages>(ApiPopupIntl);
export default ApiPopup;
