const fs = require('fs');
const https = require('https');
const path = require('path');
const { URL } = require('url');
const { promisify } = require('util');

const { LOCALES, TMP_DIR, TRANSLATE_FILE_VERSION } = require('./config');
const { mergeAllMessages } = require('./util');

const mkdirp = promisify(require('mkdirp'));
const rimraf = promisify(require('rimraf'));

const MESSAGES_BASE_URL = 'https://web.poecdn.com/js/';

const MESSAGE_KEYS = [
  'Corrupted',
  'Mirrored',
  'Unidentified',
  'Requires',
  '{RANGE1} to {RANGE2}'
];

createCleanTmp()
  .then(async tmp_dir => {
    const downloaded = await downloadTranslations(LOCALES, tmp_dir);
    const all_messages = {};

    for (const locale of downloaded) {
      const messages = require(locale.require_path);
      // filtered_messages = filterObj(messages, key => MESSAGE_KEYS.has(key));
      const needed_messages = {};
      for (const key of MESSAGE_KEYS) {
        needed_messages[key] = messages[key];
      }

      all_messages[locale.short] = needed_messages;
    }

    return all_messages;
  })
  .then(all_messages => {
    return mergeAllMessages(all_messages);
  });

async function createCleanTmp() {
  await mkdirp(TMP_DIR);
  await rimraf(path.join(TMP_DIR, '*'));
  return TMP_DIR;
}

async function downloadTranslations(locales, tmp_dir) {
  const downloads = locales.map(async locale => {
    return {
      ...locale,
      require_path: await loadMessagesFile(locale.code, tmp_dir)
    };
  });

  return await Promise.all(downloads);
}

async function loadMessagesFile(locale, tmp_dir) {
  return await new Promise((resolve, reject) => {
    const url = messagesUrl(locale);
    const filepath = messagesPath(locale, tmp_dir);
    const file = fs
      .createWriteStream(filepath)
      .on('close', () => resolve(filepath))
      .on('error', err => reject(err));

    https
      .get(url, response => {
        // response.pipe(file); but with a write after response finishes
        response.on('data', chunk => file.write(chunk));
        response.on('end', () => {
          file.end('\n\nmodule.exports = __;\n');
        });
        response.on('error', err => reject(err));
      })
      .on('error', err => reject(err));
  });
}

function messagesPath(locale, tmp_dir) {
  return path.join(tmp_dir, `translate.${locale}.js`);
}

function messagesUrl(locale) {
  const url = new URL(`translate.${locale}.js`, MESSAGES_BASE_URL);
  url.search = `v=${TRANSLATE_FILE_VERSION}`;

  return url;
}
