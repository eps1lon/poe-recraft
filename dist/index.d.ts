declare module "types/StatDescription" {
    export interface StatLocaleData {
        [key: string]: Description;
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
declare module "translate/match" {
    import { Matcher } from "types/StatDescription";
    export function matchesSingle(matcher: Matcher, arg: number): boolean;
    export function matches(matchers: Matcher[], args: number[]): boolean;
}
declare module "localize/formatters" {
    export type Formatter = (value: number) => number | string;
    export default function factory(formatter_id: string): Formatter;
}
declare module "translate/printf" {
    import { Formatter } from "types/StatDescription";
    export type Params = number[];
    export default function printf(text: string, params: Params, formatters?: Formatter[]): string;
}
declare module "formatStats" {
    import { StatLocaleData } from "types/StatDescription";
    export type Stat = {
        id: string;
        value: number;
    };
    export type OptionalOptions = {
        data?: StatLocaleData;
        fallback?: Fallback | FallbackCallback;
    };
    export type TranslatedStats = string[];
    export type FallbackCallback = (id: string, stat: Stat) => string | null;
    export enum Fallback {
        throw = 0,
        id = 1,
        skip = 2,
    }
    export type Options = {
        data?: StatLocaleData;
        fallback: Fallback | FallbackCallback;
    };
    export interface FormatStats {
        (stats: Stat[], options?: OptionalOptions): TranslatedStats;
        options: Options;
        configure(options: OptionalOptions): void;
    }
    const formatStats: FormatStats;
    export default formatStats;
}
declare module "localize/formatValue" {
    export type Options = {};
    export default function formatValue(value: number, options: Options): string;
}
declare module "localize/formatValueRange" {
    export type Options = {};
    export default function formatValueRange(values: [number, number], options: Options): string;
}
declare module "index" {
    export { default as formatStats, Fallback } from "formatStats";
    export { default as formatValueRange } from "localize/formatValueRange";
    export { default as formatValue } from "localize/formatValue";
}
