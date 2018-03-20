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
    export type Formatter = NullaryFormatter | UnaryFormatter;
    export type NullaryFormatter = string;
    export interface UnaryFormatter {
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
declare module "translate/match" {
    import { Translation } from "types/StatDescription";
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
    export function matchesTranslation(translation: Translation, values: Value[]): boolean;
    export function matchesSingle(value: Value, matcher: Value): Match;
    export function matches(values: Value[], matchers: Value[]): Match[];
}
declare module "types/StatValue" {
    export type StatValue = number | Range;
    export type Range = [number, number];
    export const isRange: (value: StatValue) => value is [number, number];
    export const isZero: (value: StatValue) => boolean;
}
declare module "localize/formatters" {
    import { StatValue } from "types/StatValue";
    export type Formatter = (value: number) => number | string;
    export const item_classes: string[];
    export const formatters: {
        [key: string]: Formatter;
    };
    export const inverse_formatters: {
        [key: string]: (s: string) => number;
    };
    export function inverseFactory(formatter_id: string): (s: string) => number;
    export function regexpFactory(formatter_id: string): string;
    export default function factory(formatter_id: string): (value: StatValue) => string;
}
declare module "localize/formatValues" {
    import { Formatter, UnaryFormatter } from "types/StatDescription";
    import { StatValue } from "types/StatValue";
    export type Options = {
        formatter?: UnaryFormatter;
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
declare module "translate/translate" {
    import { Description, Translation } from "types/StatDescription";
    export type Stat = {
        id: string;
        value: number | [number, number];
        alias?: string;
    };
    export const NO_DESCRIPTION = "NO_DESCRIPTION";
    export default function translate(description: Description, provided: Map<string, Stat>, 
        /**
         * @param t
         * @param count {number} number of params
         */
        getFormatters?: (t: Translation, count: number) => Translation['formatters']): string | undefined;
}
declare module "util/NamedGroupsRegexp" {
    export default class NamedGroupsRegexp {
        private regexp;
        private groups;
        constructor(regexp: RegExp, groups: string[]);
        match(text: string): {
            [key: string]: string;
        } | null;
        toString(): RegExp;
    }
}
declare module "translate/asRegexp" {
    import { Translation } from "types/StatDescription";
    import NamedGroupsRegexp from "util/NamedGroupsRegexp";
    export default function asRegexp(translation: Translation): NamedGroupsRegexp;
}
declare module "translate/index" {
    import translate from "translate/translate";
    export default translate;
    export { default as asRegexp } from "translate/asRegexp";
    export { matchesTranslation } from "translate/match";
    export { NO_DESCRIPTION, Stat } from "translate/translate";
}
declare module "format/stats" {
    import { Stat } from "translate/index";
    import { Description, Descriptions, StatLocaleDatas, Translation } from "types/StatDescription";
    export { Stat } from "translate/index";
    export type Options = {
        datas: StatLocaleDatas;
        fallback: Fallback | FallbackCallback;
        start_file: string;
        getFormatters: (t: Translation, stat: Stat, n: number) => Translation['formatters'];
    };
    export type TranslatedStats = string[];
    export type FallbackCallback = (id: string, stat: Stat) => string | null;
    export class NoDescriptionFound extends Error {
        constructor(stats: Stat[]);
    }
    export enum Fallback {
        throw = 0,
        id = 1,
        skip = 2,
    }
    const formatStats: (stats: Stat[], options?: Partial<Options>) => string[];
    export default formatStats;
    /**
     * creates an array of methods that can be used to find a description for a
     * given stat.
     *
     * return value is to be interpreted as a priority queue
     * @param descriptions
     */
    export function createDescriptionFindStrategies(descriptions: Descriptions): Array<(stat: Stat) => Description | undefined>;
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
declare module "format/groupMods" {
    import { Options as FormatStatsOptions, Stat } from "format/stats";
    export { Stat } from "format/stats";
    export type Options = {
        resolveWordConflict: (words: string[]) => string;
    } & FormatStatsOptions;
    /**
     * tries to find a string that describes the given mods
     *
     * given a list of mods where a mod consists of at least one stat
     * get a translation t of that mod and consider it a row
     * split t into words and consider every word as a column
     * collapse the table into a single row
     * columns with different words get resolved by a given strategy
     *
     *
     *
     * Adds # to Fire Gems
     * Adds # to Cold Gems
     * ----
     * Adds # to * Gems
     *
     * @param mods
     * @param options
     */
    export default function groupMod(mods: Stat[][], options?: Partial<Options>): string;
}
declare module "util/symbolicStats" {
    import { Stat } from "format/stats";
    import { Description, Matcher } from "types/StatDescription";
    export function deterministicValueForMatcher(matcher: Matcher): number;
    export function buildRandomStats(description: Description): Stat[][] | null;
}
declare module "format/util" {
    import { Descriptions, StatLocaleDatas } from "types/StatDescription";
    export function getDescriptions(datas: StatLocaleDatas, start_file: string): IterableIterator<Descriptions>;
}
declare module "format/textToStats" {
    import { Stat } from "translate/index";
    import { StatLocaleDatas } from "types/StatDescription";
    export type Options = {
        datas: StatLocaleDatas;
        start_file: string;
    };
    /**
     * finds every stat or list of stats that could produce this text with its values
     *
     * use {textToStatsSingle} if you just want the first match
     * use {textToStatsArray} if you want the generator values as an array
     *
     * @param text the stat text
     * @param options see type definition
     */
    export default function textToStats(text: string, options?: Partial<Options>): IterableIterator<Stat[]>;
    /**
     * @see {textToStats} as array
     *
     * @param text
     * @param options
     */
    export function textToStatsArray(text: string, options?: Partial<Options>): Stat[][];
    /**
     * only first match of  @see {textToStats} but throws if none was found
     *
     * @param text
     * @param options
     */
    export function textToStatsFirst(text: string, options?: Partial<Options>): Stat[];
}
declare module "Format" {
    import { GemId } from "format/gemStats";
    import { Stat } from "format/stats";
    import { Options as TextToStatsOptions } from "format/textToStats";
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
        groupMods(mods: Stat[][]): string;
        textToStats(text: string, options?: Partial<TextToStatsOptions>): IterableIterator<Stat[]>;
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
    export { default as groupMods } from "format/groupMods";
    export { default as textToStats, textToStatsArray, textToStatsFirst } from "format/textToStats";
    export { default as format, Format } from "Format";
    export { default as requiredLocaleDatas } from "requiredLocaleDatas";
    export { default as formatValueRange } from "localize/formatValueRange";
    export { formatValue } from "localize/formatValues";
    export { default as inflectionIdentifier } from "util/inflectionIdentifier";
}
