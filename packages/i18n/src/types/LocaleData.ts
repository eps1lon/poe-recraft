/* eslint-disable @typescript-eslint/class-name-casing */
/**
 * each interface represents a json file in locale-data/{locale}/{interface}.json
 *
 * Can be used in dependents with typescript < 2.9.
 *
 * The definitions are tested against the imported json
 */

export interface AchievementItems {
  [id: string]: {
    name: string;
  };
}

export interface Achievements {
  [id: string]: {
    description: string;
    objective: string;
  };
}

export interface ActiveSkills {
  [id: string]: {
    displayedname: string;
    description: string;
  };
}

export interface api_messages {
  '{RANGE1} to {RANGE2}': string;
  Armour: string;
  'Attacks per Second': string;
  Bow: string;
  'Chaos Damage': string;
  Claw: string;
  Corrupted: string;
  'Critical Strike Chance': string;
  Dagger: string;
  Dex: string;
  'Elemental Damage': string;
  'Energy Shield': string;
  'Evasion Rating': string;
  Int: string;
  Level: string;
  Mirrored: string;
  'One Handed Axe': string;
  'One Handed Mace': string;
  'One Handed Sword': string;
  'Physical Damage': string;
  Requires: string;
  Staff: string;
  Str: string;
  'Two Handed Axe': string;
  'Two Handed Mace': string;
  'Two Handed Sword': string;
  Unidentified: string;
  Wand: string;
  'Weapon Range': string;
}

export interface Ascendancy {
  [id: string]: {
    name: string;
  };
}

export interface BaseItemTypes {
  [id: string]: {
    name: string;
    inflection?: string;
  };
}

export interface BuffDefinitions {
  [id: string]: {
    name: string;
    description: string;
  };
}

export interface Characters {
  [id: string]: {
    name: string;
    description: string;
    traitdescription: string;
  };
}

export interface CharacterStartStates {
  [id: string]: {
    description: string;
  };
}

export interface Chests {
  [id: string]: {
    name: string;
  };
}

export interface Commands {
  [id: string]: {
    description: string;
  };
}

export interface CraftingBenchOptions {
  [id: string]: {
    name: string;
  };
}

export interface CurrencyItems {
  [row: string]: {
    description: string;
    directions: string;
  };
}

export interface DailyMissions {
  [id: string]: {
    description: string;
  };
}

export interface ItemClasses {
  [id: string]: {
    name: string;
  };
}

export interface ItemThemes {
  [id: string]: {
    name: string;
  };
}

export interface Labyrinths {
  [row: string]: {
    name: string;
  };
}

export interface LabyrinthSecrets {
  [id: string]: {
    name: string;
  };
}

export interface MapPins {
  [id: string]: {
    name: string;
    flavourtext: string;
  };
}

export interface Mods {
  [id: string]: {
    name: string;
  };
}

export interface MonsterVarieties {
  [id: string]: {
    name: string;
  };
}

export interface NPCs {
  [id: string]: {
    name: string;
    shortname: string;
  };
}

export interface PantheonPanelLayout {
  [row: string]: {
    godname1: string;
    godname2: string;
    godname3: string;
    godname4: string;
  };
}

export interface PassiveSkills {
  [id: string]: {
    name: string;
    flavourtext: string;
  };
}

export interface Prophecies {
  [id: string]: {
    name: string;
    predictiontext: string;
    flavourtext: string;
  };
}

export interface Quest {
  [id: string]: {
    name: string;
  };
}

export interface Realms {
  [id: string]: {
    name: string;
  };
}

export interface ShopItem {
  [id: string]: {
    name: string;
    description: string;
    description2: string;
  };
}

export interface ShopToken {
  [id: string]: {
    description: string;
  };
}

export interface Shrines {
  [id: string]: {
    name: string;
    description: string;
  };
}

export interface SkillGems {
  [row: string]: {
    description: string;
  };
}

export interface WarbandsPackMonsters {
  [id: string]: {
    tier1name: string;
    tier2name: string;
    tier3name: string;
    tier4name: string;
  };
}

export interface WorldAreas {
  [id: string]: {
    name: string;
  };
}
