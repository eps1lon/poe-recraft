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
            const target_param = params[+formatter.arg - 1];
            if (target_param !== undefined) {
                prepared[+formatter.arg - 1] = formatters_1.default(formatter.id)(target_param);
            }
            else {
                throw new Error(`no param given for formatter ${i}`);
            }
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
    function formatStats(stats, locale_data) {
        // translated lines
        const lines = [];
        // array of stat_ids for which hash lookup failed
        const untranslated = new Map(stats.map((stat) => [stat.id, stat]));
        lines.push(...formatWithFinder(untranslated, id => locale_data[id]));
        lines.push(...formatWithFinder(untranslated, id => findDescription(id, locale_data)));
        if (untranslated.size > 0) {
            throw new Error('no descriptions found for ' + Array.from(untranslated.keys()).join(','));
        }
        return lines;
    }
    exports_5("default", formatStats);
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
                    throw new Error(`matching translation not found for ${stat.id}`);
                }
                else {
                    // mark as translated
                    description.stats.forEach(stat_id => stats.delete(stat_id));
                    lines.push(translation);
                }
            }
        }
        return lines;
    }
    function translate(description, provided) {
        const { stats, translations } = description;
        // intersect the required stat_ids from the desc with the provided
        const required_stats = stats.map(stat_id => {
            const stat = provided.get(stat_id);
            if (stat === undefined) {
                throw new Error(`stat '${stat_id}' required for translation not provided`);
            }
            return stat;
        });
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
    var match_1, printf_1;
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
                    "formatStats": formatStats_1_1["default"]
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
