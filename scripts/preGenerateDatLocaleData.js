const child_process = require('child_process');
const { promisify } = require('util');

const exec = promisify(child_process.exec);

const distributor = process.argv[2];

const codes = {
  steam: {
    de: 'German',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    pt: 'Portuguese',
    ru: 'Russian',
    th: 'Thai'
  },
  tencent: {
    'zh-cn': 'Simplified Chinese'
  },
  garena: {
    'zh-tw': 'Traditional Chinese'
  }
};
const dats = [
  'AchievementItems',
  'Achievements',
  'ActiveSkills',
  'Ascendancy',
  'BaseItemTypes',
  'BuffDefinitions',
  'Characters',
  'CharacterStartStates',
  'Chests',
  'CraftingBenchOptions',
  'Commands',
  'CurrencyItems',
  'DailyMissions',
  'ItemClasses',
  'ItemThemes',
  'LabyrinthSecrets',
  'Labyrinths',
  'MapPins',
  'Mods',
  'MonsterVarieties',
  'NPCs',
  'PantheonPanelLayout',
  'PassiveSkills',
  'Prophecies',
  'Quest',
  'Realms',
  'ShopToken',
  'Shrines',
  'SkillGems',
  'WarbandsPackMonsters',
  'WorldAreas'
];

const distributor_codes = codes[distributor];

if (distributor_codes === undefined) {
  throw new Error(`unrecognized distributor '${distributor}'`);
}

(async () => {
  for (const [code, language] of Object.entries(distributor_codes)) {
    const cmd = `pypoe_exporter \
      dat json tmp/exports/${code}.json \
      --files ${dats.join(' ')} \
      --language "${language}"`;

    console.log(`exporting '${code}'...`);
    await exec(cmd);
    console.log('done');
  }
})();
