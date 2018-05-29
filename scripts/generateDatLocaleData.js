const fs = require('fs');
const path = require('path');
const { Grammar, Parser } = require('nearley');

/**
 * Generates locale data in a lookup map where the key is determined by
 * {getKey()} and the values are determined by {fields}
 * 
 * For usage see docs/patch.md 
 */

const inflection_grammar = Grammar.fromCompiled(
  require('../src/grammars/generated/inflection.js')
);

// "In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code."
// we will make use of this already
process.on('unhandledRejection', up => { throw up })

const export_dir = path.join(__dirname, '../tmp/exports');
const locale_files = fs.readdirSync(export_dir);

const fields = {
  AchievementItems: ['Name'],
  Achievements: ['Description', 'Objective'],
  ActiveSkills: ['DisplayedName', 'Description'],
  Ascendancy: ['Name'],
  BaseItemTypes: ['Name', 'Inflection'],
  BuffDefinitions: ['Name', 'Description'],
  Characters: ['Name', 'Description', 'TraitDescription'],
  CharacterStartStates: ['Description'],
  Chests: ['Name'],
  CraftingBenchOptions: ['Name'],
  Commands: ['Description'],
  CurrencyItems: ['Description', 'Directions'],
  DailyMissions: ['Description'],
  ItemClasses: ['Name'],
  ItemThemes: ['Name'],
  LabyrinthSecrets: ['Name'],
  Labyrinths: ['Name'],
  MapPins: ['Name', 'FlavourText'],
  Mods: ['Name'],
  MonsterVarieties: ['Name'],
  NPCs: ['Name', 'ShortName'],
  PantheonPanelLayout: ['GodName1', 'GodName2', 'GodName3', 'GodName4'],
  PassiveSkills: ['Name', 'FlavourText'],
  Prophecies: ['Name', 'PredictionText', 'FlavourText'],
  Quest: ['Name'],
  Realms: ['Name'],
  // deprecated, newly cloned projects dont need this entry
  // unless they use old tmp/ files
  ShopItem: ['Name', 'Description', 'Description2'],
  ShopToken: ['Description'],
  Shrines: ['Name', 'Description'],
  SkillGems: ['Description'],
  WarbandsPackMonsters: ['Tier1Name', 'Tier2Name', 'Tier3Name', 'Tier4Name'],
  WorldAreas: ['Name']
};

// console.log(Object.keys(fields).join(' '));

const isExport = file => file.endsWith('.json');
const underscore = s => s.toLowerCase();

const fieldValueMapper = {
  // [FieldName]: fieldValue => output
  Name: name => parseInflection(name, inflection_grammar),
  // skip emtpy strings
  Inflection: id => (id === '' ? undefined : id)
};
const fields_with_inflection_rules = ['Name'];

// generate key for object map
const getKey = (row, i) => {
  if (row.Id !== undefined) {
    return row.Id
  } else if (row.primary !== undefined) {
    return row.primary
  } else {
    return i;
  }
}

locale_files.filter(isExport).forEach(locale_file => {
  const locale = path.basename(locale_file, '.json');
  const filepath = path.join(export_dir, locale_file);
  const export_json = fs.readFileSync(filepath);

  let datas;
  try {
    datas = JSON.parse(export_json);
  } catch (err) {
    err.message = `error in ${filepath}:\n${err.message}`;
    throw err;
  }
 

  const locale_data_dir = path.join(__dirname, '../locale-data');

  datas.forEach(exported => {
    const dat_name = path.basename(exported.filename, '.dat');
    const { header, data } = exported;

    const output_header = fields[
      dat_name
    ].reduce((partial_header, col_name) => {
      partial_header[underscore(col_name)] = header.find(
        col => col.name === col_name
      );

      return partial_header;
    }, {});

    const translation = data.reduce((partial_translation, values, i) => {
      const entry = fromEntries(header.map(({name}) => name), values);
      const key = getKey(entry, i);
      
      partial_translation[key] = Object.entries(
        output_header
      ).reduce((with_row, [name, info]) => {
        if (info !== undefined) {
          const mapper = fieldValueMapper[info.name] || (value => value);
          with_row[name] = mapper(values[info.rowid]);
        }

        return with_row;
      }, {});

      return partial_translation;
    }, {});

    fs.writeFileSync(
      path.join(locale_data_dir, locale, `${dat_name}.json`),
      JSON.stringify(translation)
    );
  });
});

function parseInflection(raw, grammar) {
  if (typeof raw !== 'string') return raw;

  const parser = new Parser(grammar);

  try {
    parser.feed(raw);
    const [[matches]] = parser.results;

    if (matches === null) throw new Error('no result');

    // convert to icu message syntax
    return `{inflection, select, ${matches
      .map(({ match, output }) => `${match} {${output}}`)
      .join(' ')}}`;
  } catch (err) {
    return raw;
  }
}

// reverse of Object.entries
function fromEntries(keys, values) {
  return keys.reduce((obj, key, i) => {
    obj[key] = values[i];
    return obj;
  }, {})
}