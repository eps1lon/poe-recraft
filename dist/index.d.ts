declare module "translate/match" {
    export type Boundary = number | '#';
    export type BoundedRange = [Boundary, Boundary];
    export type Value = Boundary | BoundedRange;
    export enum Match {
        exact = 0,
        subset = 1,
        superset = 2,
        partial_upper = 3,
        partial_lower = 4,
        none = 5,
    }
    export function matchesSingle(value: Value, matcher: Value): Match;
    export function matches(values: Value[], matchers: Value[]): Match[];
}
declare module "types/StatDescription" {
    export interface Descriptions {
        [key: string]: Description;
    }
    export interface StatLocaleData {
        meta: {
            include?: string;
        };
        data: Descriptions;
    }
    export interface StatLocaleDatas {
        [key: string]: StatLocaleData;
    }
    export interface Description {
        stats: string[];
        translations: Translation[];
        no_description?: boolean;
    }
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
}
declare module "types/StatValue" {
    export type StatValue = number | Range;
    export type Range = [number, number];
    export const isRange: (value: StatValue) => value is [number, number];
}
declare module "localize/formatters" {
    import { StatValue } from "types/StatValue";
    export type Formatter = (value: number) => number | string;
    export default function factory<T>(formatter_id: string): (value: StatValue) => string;
}
declare module "localize/formatValues" {
    import { Formatter } from "types/StatDescription";
    import { StatValue } from "types/StatValue";
    export type Options = {
        formatter?: Formatter;
        formatters?: Formatter[];
    };
    export function formatValues(values: StatValue[], options: Options): string[];
    export function formatValue(value: StatValue, options: Options): string;
}
declare module "translate/printf" {
    import { Formatter } from "types/StatDescription";
    export type Params = Array<number | [number, number]>;
    export default function printf(text: string, params: Params, formatters?: Formatter[]): string;
}
declare module "format/stats" {
    import { StatLocaleDatas } from "types/StatDescription";
    export type Stat = {
        id: string;
        value: number | [number, number];
        alias?: string;
    };
    export type Options = {
        datas: StatLocaleDatas;
        fallback: Fallback | FallbackCallback;
        start_file: string;
    };
    export type TranslatedStats = string[];
    export type FallbackCallback = (id: string, stat: Stat) => string | null;
    export enum Fallback {
        throw = 0,
        id = 1,
        skip = 2,
    }
    const formatStats: (stats: Stat[], options?: Partial<Options>) => string[];
    export default formatStats;
}
declare module "translate/descriptions_dependency" {
    const _default: Readonly<{
        [key: string]: string;
    }>;
    export default _default;
}
declare module "requiredLocaleDatas" {
    export default function requiredLocaleDatas(files: string[]): string[];
}
declare module "translate/skill_meta" {
    export type Skill = {
        filter: string[];
        start_file: string;
    };
    export type SkillMeta = {
        skills: {
            [key: string]: string | Skill;
        };
        groups: {
            [key: string]: string[];
        };
    };
    const _default: SkillMeta;
    export default _default;
}
declare module "format/gemStats" {
    import { Options, Stat } from "format/stats";
    export type GemId = string;
    export type Translation = string[];
    export default function formatGemStats(gem_id: GemId, stats: Stat[], options?: Partial<Options>): string[];
    export function requiredLocaleDatas(gem_id: GemId): string[];
}
declare module "Format" {
    import { GemId } from "format/gemStats";
    import { Stat } from "format/stats";
    import { StatLocaleDatas } from "types/StatDescription";
    export enum Fallback {
        throw = 0,
        id = 1,
        skip = 2,
    }
    export type Options = {
        datas: StatLocaleDatas;
        fallback: Fallback;
        start_file: string;
    };
    export class Format {
        private options;
        configure(options: Partial<Options>): void;
        stats(stats: Stat[]): string[];
        gemStats(gem_id: GemId, stats: Stat[]): string[];
    }
    const _default: Format;
    export default _default;
}
declare module "localize/formatValueRange" {
    export type Options = {};
    export default function formatValueRange(values: [number, number], options: Options): string;
}
declare module "util/inflectionIdentifier" {
    export default function inflectionIdentifier(context: {
        inflection?: string;
    }): string;
}
declare module "index" {
    export { default as formatStats, Fallback } from "format/stats";
    export { default as formatGemStats } from "format/gemStats";
    export { default as format, Format } from "Format";
    export { default as requiredLocaleDatas } from "requiredLocaleDatas";
    export { default as formatValueRange } from "localize/formatValueRange";
    export { formatValue } from "localize/formatValues";
    export { default as inflectionIdentifier } from "util/inflectionIdentifier";
}
