// takes an unprocesses file and splits it into files for each language
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const readdir = promisify(fs.readdir);

const in_dir = path.join(__dirname, '../tmp/unprocessed');
const out_dir = path.join(__dirname, '../locale-data');

const codes = {
  English: 'en',
  French: 'fr',
  German: 'de',
  Portuguese: 'pt',
  Russian: 'ru',
  'Simplified Chinese': 'zh-Hans',
  Spanish: 'es',
  Spasnish: 'es',
  Spansih: 'es',
  Thai: 'th',
  'Traditional Chinese': 'zh-Hant'
};

const isUnprocessed = file => file.endsWith('.json'); // === 'stat_descriptions_dev.json';

readdir(in_dir).then(files => {
  files.filter(isUnprocessed).forEach(file => {
    const unprocessed_file = fs.readFileSync(path.join(in_dir, file));

    let unprocessed = [];
    try {
      unprocessed = JSON.parse(unprocessed_file);
    } catch (err) {
      console.warn(`could not parse ${file}`);
    }

    const processed = unprocessed.reduce((partial, [id, description]) => {
      const { stats, languages } = description;

      languages.forEach(([language, translations]) => {
        const code = codes[language];

        try {
          partial.get(code)[id] = { stats, translations };
        } catch (err) {
          console.log(code, language);
          throw err;
        }
      });

      return partial;
    }, new Map(Object.values(codes).map(code => [code, {}])));

    for (const [code, descriptions] of processed) {
      try {
        fs.writeFileSync(
          path.join(out_dir, code, file),
          JSON.stringify(descriptions, null, 2)
        );
        console.log(`sieved ${file} into ${code}`);
      } catch (err) {
        console.warn(
          `could not write. probabyl didnt create the language dirs`
        );
        console.error(err);
      }
    }
  });
});
