const path = require('path');

const LOCALE_DATA_DIR = path.join(__dirname, '../../locale-data');
const TMP_DIR = path.join(__dirname, 'tmp/messages');
const TRANSLATE_FILE_VERSION = "9900f175d01f07acf3816b84f6341a38";
const LOCALES = [
  { short: 'pt', code: 'pt_BR', subdomain: 'br' },
  { short: 'ru', code: 'ru_RU' },
  { short: 'th', code: 'th_TH' },
  { short: 'de', code: 'de_DE' },
  { short: 'fr', code: 'fr_FR' },
  { short: 'es', code: 'es_ES' }
];

module.exports = { LOCALE_DATA_DIR, LOCALES, TMP_DIR, TRANSLATE_FILE_VERSION };
