System.register("types/StatDescription", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("translate/match", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function matchesSingle(matcher, arg) {
        return matches([matcher], [arg]);
    }
    exports_2("matchesSingle", matchesSingle);
    function matches(matchers, args) {
        return matchers.every((matcher, i) => match(matcher, args[i]));
    }
    exports_2("matches", matches);
    function match(matcher, target) {
        if (target === undefined) {
            return false;
        }
        if (isRange(matcher)) {
            return matchRange(matcher, target);
        }
        else {
            return matchValue(matcher, target);
        }
    }
    function matchRange(range, target) {
        return lowerBound(range[0], target) && upperBound(range[1], target);
    }
    function matchValue(value, target) {
        if (isAnyValue(value)) {
            return true;
        }
        else {
            return value === target;
        }
    }
    function lowerBound(value, target) {
        if (isAnyValue(value)) {
            return true;
        }
        else {
            return value <= target;
        }
    }
    function upperBound(value, target) {
        if (isAnyValue(value)) {
            return true;
        }
        else {
            return target <= value;
        }
    }
    function isAnyValue(value) {
        return value === '#';
    }
    var isRange;
    return {
        setters: [],
        execute: function () {
            isRange = (matcher) => Array.isArray(matcher) && matcher.length === 2;
        }
    };
});
System.register("localize/formatters", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function factory(formatter_id) {
        const formatter = formatters[formatter_id];
        if (formatter === undefined) {
            throw new Error(`'${formatter_id}' not found`);
        }
        return formatter;
    }
    exports_3("default", factory);
    var formatters;
    return {
        setters: [],
        execute: function () {
            // usually everything in poe is rounded down but in this case
            // it's done properly
            // evidence: life regen rolls 60 - 120 which would result in (1-2)
            // Alyways rounding down would result in virtually no 2 rolls.
            // but there are currenty ~300 amulets with 2 and ~160 with 1 listed on poe.trade
            // reason beeing that the next tier rolls 121-180.
            formatters = {
                deciseconds_to_seconds: n => n * 10,
                divide_by_one_hundred: n => n / 100,
                per_minute_to_per_second: n => Math.round(n / 60),
                milliseconds_to_seconds: n => n / 1000,
                negate: n => -n,
                divide_by_one_hundred_and_negate: n => -n / 100,
                old_leech_percent: n => n / 5,
                old_leech_permyriad: n => n / 50,
                per_minute_to_per_second_0dp: n => (n / 60).toFixed(0),
                per_minute_to_per_second_2dp: n => (n / 60).toFixed(2),
                per_minute_to_per_second_2dp_if_required: n => (n / 60).toPrecision(2),
                milliseconds_to_seconds_0dp: n => (n / 1000).toFixed(0),
                milliseconds_to_seconds_2dp: n => (n / 1000).toFixed(2),
                multiplicative_damage_modifier: n => n,
                '60%_of_value': n => n * 0.6
            };
        }
    };
});
System.register("translate/printf", ["localize/formatters"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function printf(text, params, formatters = []) {
        const prepared = prepareParams(params, formatters);
        // reduce ignoring initial value type. tilted right now...
        let formatted = text;
        prepared.forEach((param, i) => {
            formatted = formatted
                .replace(`%${i + 1}%`, String(param))
                .replace(`%${i + 1}$+d`, `+${String(param)}`);
        });
        return formatted.replace('%%', '%');
    }
    exports_4("default", printf);
    function prepareParams(params, formatters) {
        const prepared = [...params];
        formatters.forEach((formatter, i) => {
            if (typeof formatter.arg === 'number') {
                const target_param = params[+formatter.arg - 1];
                if (target_param !== undefined) {
                    prepared[+formatter.arg - 1] = formatters_1.default(formatter.id)(target_param);
                }
                else {
                    throw new Error(`no param given for formatter '${formatter.id}'`);
                }
            }
            // nothing to to for strings. used in remindestring arg which doesnt alter
            // the params
        });
        return prepared;
    }
    var formatters_1;
    return {
        setters: [
            function (formatters_1_1) {
                formatters_1 = formatters_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("formatStats", ["translate/match", "translate/printf"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    /**
     * O(n) lookup if hash lookup fails
     *
     * @param stat_id
     * @param locale_data
     */
    function findDescription(stat_id, locale_data) {
        return Object.values(locale_data).find(({ stats }) => stats.includes(stat_id));
    }
    // stats will get mutated
    function formatWithFinder(stats, find) {
        const lines = [];
        for (const [stat_id, stat] of stats) {
            const description = find(stat_id);
            if (description !== undefined) {
                const translation = translate(description, stats);
                if (translation === undefined) {
                    throw new Error(`matching translation not found for '${stat.id}'`);
                }
                else {
                    // mark as translated
                    description.stats.forEach(translated_id => stats.delete(translated_id));
                    if (translation === NO_DESCRIPTION) {
                        lines.push(`${stat_id} (hidden)`);
                    }
                    else {
                        lines.push(translation);
                    }
                }
            }
        }
        return lines;
    }
    function translate(description, provided) {
        const { stats, no_description, translations } = description;
        if (no_description === true) {
            return NO_DESCRIPTION;
        }
        // intersect the required stat_ids from the desc with the provided
        const required_stats = stats
            .map(stat_id => {
            const stat = provided.get(stat_id);
            // default the value to 0
            if (stat === undefined) {
                return {
                    id: stat_id,
                    value: 0
                };
            }
            else {
                return stat;
            }
        })
            .filter((stat) => stat !== null);
        const translation = matchingTranslation(translations, required_stats);
        if (translation === undefined) {
            return undefined;
        }
        else {
            return printf_1.default(translation.text, required_stats.map(({ value }) => value), translation.formatters);
        }
    }
    function matchingTranslation(translations, stats) {
        const args = stats.map(({ value }) => value);
        return translations.find(translation => match_1.matches(translation.matchers, args));
    }
    function formatWithFallback(stats, fallback) {
        if (fallback === Fallback.throw) {
            if (stats.size > 0) {
                throw new Error('no descriptions found for ' + Array.from(stats.keys()).join(','));
            }
            else {
                return [];
            }
        }
        else if (fallback === Fallback.id) {
            return Array.from(stats.keys());
        }
        else if (fallback === Fallback.skip) {
            return [];
        }
        else if (typeof fallback === 'function') {
            return Array.from(stats.entries())
                .map(([id, stat]) => fallback(id, stat))
                .filter((line) => typeof line === 'string');
        }
        else {
            // should ts recognize that this is unreachable code? enums can prob
            // be extended at runtime an therfore somebody could mess with them
            throw new Error(`unrecognized fallback type '${fallback}'`);
        }
    }
    var match_1, printf_1, Fallback, initial_options, formatStats, NO_DESCRIPTION;
    return {
        setters: [
            function (match_1_1) {
                match_1 = match_1_1;
            },
            function (printf_1_1) {
                printf_1 = printf_1_1;
            }
        ],
        execute: function () {
            (function (Fallback) {
                Fallback[Fallback["throw"] = 0] = "throw";
                Fallback[Fallback["id"] = 1] = "id";
                Fallback[Fallback["skip"] = 2] = "skip";
            })(Fallback || (Fallback = {}));
            exports_5("Fallback", Fallback);
            initial_options = {
                data: undefined,
                fallback: Fallback.throw
            };
            formatStats = Object.assign((stats, options = {}) => {
                const { data, fallback } = Object.assign({}, formatStats.options, options);
                if (data === undefined) {
                    throw new Error('locale data not provided. Set it either via passed option or #configure');
                }
                // translated lines
                const lines = [];
                // array of stat_ids for which hash lookup failed
                const untranslated = new Map(stats.map((stat) => [stat.id, stat]));
                lines.push(...formatWithFinder(untranslated, id => data[id]));
                lines.push(...formatWithFinder(untranslated, id => findDescription(id, data)));
                lines.push(...formatWithFallback(untranslated, fallback));
                return lines;
            }, {
                options: initial_options,
                configure: (options) => {
                    formatStats.options = Object.assign({}, formatStats.options, options);
                }
            });
            exports_5("default", formatStats);
            NO_DESCRIPTION = 'NO_DESCRIPTION';
        }
    };
});
System.register("localize/formatValue", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function formatValue(value, options) {
        return '';
    }
    exports_6("default", formatValue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("localize/formatValueRange", ["localize/formatValue"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function formatValueRange(values, options) {
        return `${formatValue_1.default(values[0], options)} - ${formatValue_1.default(values[1], options)}`;
    }
    exports_7("default", formatValueRange);
    var formatValue_1;
    return {
        setters: [
            function (formatValue_1_1) {
                formatValue_1 = formatValue_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("index", ["formatStats", "localize/formatValueRange", "localize/formatValue"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (formatStats_1_1) {
                exports_8({
                    "formatStats": formatStats_1_1["default"],
                    "Fallback": formatStats_1_1["Fallback"]
                });
            },
            function (formatValueRange_1_1) {
                exports_8({
                    "formatValueRange": formatValueRange_1_1["default"]
                });
            },
            function (formatValue_2_1) {
                exports_8({
                    "formatValue": formatValue_2_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
