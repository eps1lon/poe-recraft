export interface StatLocaleData {
  meta: {
    includes: string[];
  };
  data: {
    [key: string]: Description;
  };
}

export interface Description {
  stats: string[];
  translations: Translation[];
  no_description?: boolean;
}

// generated format from stat_descriptions.ne
export interface ParsedDescriptions {
  [key: string]: LanguageDescription;
}

export interface LanguageDescription {
  stats: StatIdentifier[];
  languages: Languages;
}

export type StatIdentifier = string;

export interface Languages {
  [key: string]: Translation[];
}

export interface Translation {
  matchers: Matcher[];
  text: string;
  formatters: Formatter[];
}

export interface Formatter {
  id: string;
  arg: ArrayIndex | ReminderIdentifier;
}

export type ArrayIndex = number;
export type ReminderIdentifier = string;

export type Matcher = Range | Value;
export type Range = [Value, Value];
export type Value = AnyValue | number;
export type AnyValue = '#';
