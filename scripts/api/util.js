const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { LOCALE_DATA_DIR } = require('./config');

const writeFile = promisify(fs.writeFile);

module.exports = { mergeMessages, mergeAllMessages };

async function mergeAllMessages(all_messages) {
  for (const [locale, messages] of Object.entries(all_messages)) {
    await mergeMessages(locale, messages);
  }
}

/**
 * merges the messages into the api_messages.json under the specified locale
 * while sorting the resulting json object by keys
 * @param {*} locale 
 * @param {*} messages 
 */
async function mergeMessages(locale, messages) {
  const data_path = path.join(LOCALE_DATA_DIR, `${locale}/api_messages.json`);
  let old_messages = {};
  try {
    old_messages = require(data_path);
  } catch (err) {
    console.log(`creating new messages for locale ${locale}`);
  }
  const merged_messages = { ...old_messages, ...messages };
  const sorted_messages = Object.entries(merged_messages)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  const json = JSON.stringify(sorted_messages, undefined, 2);
  await writeFile(data_path, json);
}
