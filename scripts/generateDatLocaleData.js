const fs = require('fs');
const path = require('path');
const { Grammar, Parser } = require('nearley');

const inflection_grammar = Grammar.fromCompiled(
  require('../src/grammars/generated/inflection.js')
);

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

locale_files.filter(isExport).forEach(locale_file => {
  const locale = path.basename(locale_file, '.json');
  const export_json = fs.readFileSync(path.join(export_dir, locale_file));
  const datas = JSON.parse(export_json);

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

    const translation = data.reduce((partial_translation, row, i) => {
      partial_translation[i] = Object.entries(
        output_header
      ).reduce((with_row, [name, info]) => {
        if (info !== undefined) {
          const mapper = fieldValueMapper[info.name] || (value => value);
          with_row[name] = mapper(row[info.rowid]);
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
