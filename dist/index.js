System.register("translate/match", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    // does a value match a matcher
    function matchesSingle(value, matcher) {
        return matches([value], [matcher])[0];
    }
    exports_1("matchesSingle", matchesSingle);
    function matches(values, matchers) {
        return matchers.map((matcher, i) => match(values[i], matcher));
    }
    exports_1("matches", matches);
    // interval matching
    function match(value, matcher) {
        if (value === undefined) {
            return Match.none;
        }
        const A = rangeCast(value);
        const B = rangeCast(matcher);
        if (A[0] === B[0] && A[1] === B[1]) {
            return Match.exact;
        }
        else if (A[0] >= B[0] && A[1] <= B[1]) {
            return Match.subset;
        }
        else if (A[0] <= B[0] && A[1] >= B[1]) {
            return Match.superset;
        }
        else if (A[0] >= B[0] && A[0] <= B[1] && A[1] > B[1]) {
            return Match.partial_upper;
        }
        else if (A[1] >= B[0] && A[1] <= B[1] && A[0] < B[0]) {
            return Match.partial_lower;
        }
        else {
            return Match.none;
        }
    }
    function rangeCast(value) {
        const [lower, upper] = isBoundedRange(value) ? value : [value, value];
        return [
            lower === '#' ? Number.NEGATIVE_INFINITY : lower,
            upper === '#' ? Number.POSITIVE_INFINITY : upper
        ];
    }
    function isBoundedRange(matcher) {
        return Array.isArray(matcher) && matcher.length === 2;
    }
    var Match;
    return {
        setters: [],
        execute: function () {
            // types of interval overlap
            (function (Match) {
                Match[Match["exact"] = 0] = "exact";
                Match[Match["subset"] = 1] = "subset";
                Match[Match["superset"] = 2] = "superset";
                Match[Match["partial_upper"] = 3] = "partial_upper";
                Match[Match["partial_lower"] = 4] = "partial_lower";
                Match[Match["none"] = 5] = "none"; // A \minus B = A
            })(Match || (Match = {}));
            exports_1("Match", Match);
        }
    };
});
System.register("types/StatDescription", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("types/StatValue", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var isRange;
    return {
        setters: [],
        execute: function () {
            exports_3("isRange", isRange = (value) => Array.isArray(value) && value.length === 2);
        }
    };
});
System.register("localize/formatters", ["types/StatValue"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function factory(formatter_id) {
        if (!formatters.hasOwnProperty(formatter_id)) {
            throw new Error(`'${formatter_id}' not found`);
        }
        const formatter = formatters[formatter_id];
        return (value) => {
            if (StatValue_1.isRange(value)) {
                if (value[0] === value[1]) {
                    return String(formatter(value[0]));
                }
                else {
                    return `(${formatter(value[0])} - ${formatter(value[1])})`;
                }
            }
            else {
                return String(formatter(value));
            }
        };
    }
    exports_4("default", factory);
    var StatValue_1, formatters;
    return {
        setters: [
            function (StatValue_1_1) {
                StatValue_1 = StatValue_1_1;
            }
        ],
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
                '60%_of_value': n => n * 0.6,
                id: n => n
            };
        }
    };
});
System.register("localize/formatValues", ["localize/formatters"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function formatValues(values, options) {
        const { formatters } = options;
        if (formatters === undefined) {
            throw new Error('formatters not set');
        }
        const formatted = [...values];
        formatters.forEach((formatter, i) => {
            if (typeof formatter.arg === 'number') {
                const target_param = values[+formatter.arg - 1];
                if (target_param !== undefined) {
                    formatted[+formatter.arg - 1] = formatValue(target_param, {
                        formatter
                    });
                }
                else {
                    throw new Error(`no param given for formatter '${formatter.id}'`);
                }
            }
        });
        return formatted.map(value => typeof value === 'string'
            ? value
            : formatValue(value, { formatter: { id: 'id', arg: 1 } }));
    }
    exports_5("formatValues", formatValues);
    function formatValue(value, options) {
        const { formatter } = options;
        if (formatter === undefined) {
            throw new Error('no formatter given');
        }
        return String(formatters_1.default(formatter.id)(value));
    }
    exports_5("formatValue", formatValue);
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
System.register("translate/printf", ["localize/formatValues"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function printf(text, params, formatters = []) {
        const prepared = formatValues_1.formatValues(params, { formatters });
        return prepared
            .reduce((formatted, param, i) => formatted
            .replace(`%${i + 1}%`, String(param))
            .replace(`%${i + 1}$+d`, `+${String(param)}`), text)
            .replace('%%', '%');
    }
    exports_6("default", printf);
    var formatValues_1;
    return {
        setters: [
            function (formatValues_1_1) {
                formatValues_1 = formatValues_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("formatStats", ["translate/match", "translate/printf"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
            const description = find(stat);
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
        return translations.find(translation => {
            return match_1.matches(args, translation.matchers).every(match => match === match_1.Match.subset || match === match_1.Match.exact);
        });
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
            exports_7("Fallback", Fallback);
            initial_options = {
                datas: undefined,
                fallback: Fallback.throw,
                start_file: 'stat_descriptions'
            };
            formatStats = Object.assign((stats, options = {}) => {
                const { datas, fallback, start_file } = Object.assign({}, formatStats.options, options);
                if (datas === undefined) {
                    throw new Error('locale datas not provided. Set it either via passed option or #configure');
                }
                // translated lines
                const lines = [];
                // array of stat_ids for which hash lookup failed
                const untranslated = new Map(stats.map((stat) => [stat.id, stat]));
                let description_file = datas[start_file];
                while (description_file !== undefined) {
                    const data = description_file.data;
                    lines.push(...formatWithFinder(untranslated, ({ id }) => data[id]));
                    lines.push(...formatWithFinder(untranslated, ({ id }) => findDescription(id, data)));
                    description_file = description_file.meta.include
                        ? datas[description_file.meta.include]
                        : undefined;
                }
                lines.push(...formatWithFallback(untranslated, fallback));
                return lines;
            }, {
                options: initial_options,
                configure: (options) => {
                    formatStats.options = Object.assign({}, formatStats.options, options);
                }
            });
            exports_7("default", formatStats);
            NO_DESCRIPTION = 'NO_DESCRIPTION';
        }
    };
});
System.register("loadLocaleDatas", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function loadLocaleDatas(code, files) {
        const datas = {};
        const queued = [...files]; // clone
        while (queued.length > 0) {
            const file = queued.shift();
            if (datas[file] === undefined) {
                const data = require(`../locale-data/${code}/${file}.json`);
                datas[file] = data;
                if (data.meta.include !== undefined) {
                    queued.push(data.meta.include);
                }
            }
        }
        return datas;
    }
    exports_8("default", loadLocaleDatas);
    function loadLocaleDatasFor(code, formatStats) {
        return loadLocaleDatas(code, [formatStats.options.start_file]);
    }
    exports_8("loadLocaleDatasFor", loadLocaleDatasFor);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("formatGemStats", ["formatStats", "loadLocaleDatas"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function formatGemStats(gem_id, stats, options = {}) {
        const filter = findSkill(gem_id);
        const { code } = Object.assign({ code: 'en', options });
        return formatStats_1.default(stats, {
            datas: loadLocaleDatas_1.default(code, [filter.start_file]),
            fallback: formatStats_1.Fallback.skip,
            start_file: filter.start_file
        });
    }
    exports_9("default", formatGemStats);
    function findSkill(id) {
        const skill = meta.skills[id];
        if (skill === undefined) {
            // Fallback to gem_stat
            // most likely for supports
            return {
                filter: [],
                start_file: 'gem_stat_descriptions'
            };
        }
        else if (typeof skill === 'string') {
            return findSkill(skill);
        }
        else {
            return skill;
        }
    }
    var formatStats_1, loadLocaleDatas_1, meta;
    return {
        setters: [
            function (formatStats_1_1) {
                formatStats_1 = formatStats_1_1;
            },
            function (loadLocaleDatas_1_1) {
                loadLocaleDatas_1 = loadLocaleDatas_1_1;
            }
        ],
        execute: function () {
            meta = require('./translate/skill_meta.json');
        }
    };
});
System.register("localize/formatValueRange", ["localize/formatValues"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    function formatValueRange(values, options) {
        return `${formatValues_2.formatValue(values[0], options)} - ${formatValues_2.formatValue(values[1], options)}`;
    }
    exports_10("default", formatValueRange);
    var formatValues_2;
    return {
        setters: [
            function (formatValues_2_1) {
                formatValues_2 = formatValues_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("index", ["formatStats", "formatGemStats", "loadLocaleDatas", "localize/formatValueRange", "localize/formatValues"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (formatStats_2_1) {
                exports_11({
                    "formatStats": formatStats_2_1["default"],
                    "Fallback": formatStats_2_1["Fallback"]
                });
            },
            function (formatGemStats_1_1) {
                exports_11({
                    "formatGemStats": formatGemStats_1_1["default"]
                });
            },
            function (loadLocaleDatas_2_1) {
                exports_11({
                    "loadLocaleDatas": loadLocaleDatas_2_1["default"],
                    "loadLocaleDatasFor": loadLocaleDatas_2_1["loadLocaleDatasFor"]
                });
            },
            function (formatValueRange_1_1) {
                exports_11({
                    "formatValueRange": formatValueRange_1_1["default"]
                });
            },
            function (formatValues_3_1) {
                exports_11({
                    "formatValue": formatValues_3_1["formatValue"]
                });
            }
        ],
        execute: function () {
        }
    };
});
