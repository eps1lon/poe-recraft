// parse PoE MetaData *descriptions into consumeable format
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const readFile = promisify(fs.readFile);

readFile(path.join(__dirname, './tmp/StatDescriptions/stat_descriptions.txt'), {
  encoding: 'utf-16le'
}).then(text => {
  const stat_descriptions = {
    no_desc: Array.from(parseNoDesc(text)),
    desc: Array.from(parsDesc(text))
  };

  //console.log(stat_descriptions.desc);
});

function* parseNoDesc(text) {
  const regex = /^no_description (.*)$/gm;

  let match;
  while ((match = regex.exec(text)) !== null) {
    yield match[1];
  }
}

function* parsDesc(text) {
  const desc_group_regex = /^description/gm;

  let desc_group_match;
  while ((desc_group_match = desc_group_regex.exec(text)) !== null) {
    const slice = text.substr(desc_group_match.index + 'description\n'.length);

    yield parseGroup(slice);

    break;
  }
}

function parseGroup(text) {
  // assert that the pointer is immediately after `description`

  const STATE = {
    start: 0
  };
  let state = STATE.start;

  const line_regex = /^.+$/gm;

  let lang = 'English';
  let identifier = undefined;
  const translations = {};

  while ((line_match = line_regex.exec(text)) !== null) {
    const [line] = line_match;

    // next group
    if (/^description/.test(line)) {
      break;
    }

    if (identifier === undefined) {
      [identifier] = line.match(/\d+ ([_a-z0-9\+\-\%]+)/i);
    } else {
      if (/^\s+\d+\s*$/.test(line)) {
        // noop
      } else {
        const lang_match = line.match(/^\s*lang "([^"]+)"/);

        if (lang_match !== null) {
          [lang] = lang_match;
        } else {
        }
      }
    }

    state++;

    if (state > 100) break;
  }

  return [identifier, translations];
}
