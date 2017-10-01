// generated format from stat_descriptions.ne
export interface Descriptions {
  [key: string]: Description;
}

export interface Description {
  others?: StatIdentifier[];
  languages: Languages;
}

type StatIdentifier = string;

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

type ArrayIndex = number;
type ReminderIdentifier = string;

type Matcher = Range | Value;
type Range = [Value, Value];
type Value = AnyValue | number;
type AnyValue = '#';
