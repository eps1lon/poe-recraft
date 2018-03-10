var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    // match value if for every value in values: value in (min, max)
    function matchesTranslation(translation, values) {
        return matches(values, translation.matchers).every(function (matched) { return matched === Match.subset || matched === Match.exact; });
    }
    exports_2("matchesTranslation", matchesTranslation);
    // does a value match a matcher
    function matchesSingle(value, matcher) {
        return matches([value], [matcher])[0];
    }
    exports_2("matchesSingle", matchesSingle);
    function matches(values, matchers) {
        return matchers.map(function (matcher, i) { return match(values[i], matcher); });
    }
    exports_2("matches", matches);
    // interval matching
    function match(value, matcher) {
        if (value === undefined) {
            return Match.none;
        }
        var A = rangeCast(value);
        var B = rangeCast(matcher);
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
        var _a = __read(isBoundedRange(value) ? value : [value, value], 2), lower = _a[0], upper = _a[1];
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
            exports_2("Match", Match);
        }
    };
});
System.register("types/StatValue", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var isRange, isZero;
    return {
        setters: [],
        execute: function () {
            exports_3("isRange", isRange = function (value) {
                return Array.isArray(value) && value.length === 2;
            });
            exports_3("isZero", isZero = function (value) {
                return isRange(value) ? value[0] === 0 && value[1] === 0 : value === 0;
            });
        }
    };
});
System.register("localize/formatters", ["types/StatValue"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function inverseFactory(formatter_id) {
        if (!formatters.hasOwnProperty(formatter_id)) {
            throw new Error("'" + formatter_id + "' not found");
        }
        var inverse = inverse_formatters[formatter_id];
        // TODO add ranges
        return inverse;
    }
    exports_4("inverseFactory", inverseFactory);
    function regexpFactory(formatter_id) {
        if (!formatters.hasOwnProperty(formatter_id)) {
            throw new Error("'" + formatter_id + "' not found");
        }
        var formatter = formatter_regexp[formatter_id];
        // TODO add ranges
        return formatter;
    }
    exports_4("regexpFactory", regexpFactory);
    function factory(formatter_id) {
        if (!formatters.hasOwnProperty(formatter_id)) {
            throw new Error("'" + formatter_id + "' not found");
        }
        var formatter = formatters[formatter_id];
        return function (value) {
            if (StatValue_1.isRange(value)) {
                if (value[0] === value[1]) {
                    return String(formatter(value[0]));
                }
                else {
                    return "(" + formatter(value[0]) + " - " + formatter(value[1]) + ")";
                }
            }
            else {
                return String(formatter(value));
            }
        };
    }
    exports_4("default", factory);
    var StatValue_1, item_classes, formatters, inverse_formatters, number, formatter_regexp;
    return {
        setters: [
            function (StatValue_1_1) {
                StatValue_1 = StatValue_1_1;
            }
        ],
        execute: function () {
            // TODO howto translate?
            // used in 'mod_value_to_item_class' in Poorjoy's Asylum
            exports_4("item_classes", item_classes = [
                'Amulets',
                'Rings',
                'Claws',
                'Daggers',
                'Wands',
                'One Hand Swords',
                // 'Rings', value: 10 }, thrusting
                'One Hand Axes',
                'One Hand Maces',
                'Bows',
                'Staves',
                'Two Hand Swords',
                'Two Hand Maces',
                'Quivers',
                'Belts',
                'Gloves',
                'Boots',
                'Body Armours',
                'Helmets',
                'Shields',
                'Sceptres'
            ]);
            // usually everything in poe is rounded down but in this case
            // it's done properly
            // evidence: life regen rolls 60 - 120 which would result in (1-2)
            // Alyways rounding down would result in virtually no 2 rolls.
            // but there are currenty ~300 amulets with 2 and ~160 with 1 listed on poe.trade
            // reason beeing that the next tier rolls 121-180.
            exports_4("formatters", formatters = {
                deciseconds_to_seconds: function (n) { return n * 10; },
                divide_by_two_0dp: function (n) { return (n / 2).toFixed(0); },
                divide_by_ten_0dp: function (n) { return (n / 10).toFixed(0); },
                divide_by_fifteen_0dp: function (n) { return (n / 15).toFixed(0); },
                divide_by_twenty_then_double_0dp: function (n) { return Math.floor(n / 20) * 2; },
                divide_by_one_hundred: function (n) { return n / 100; },
                divide_by_one_hundred_2dp: function (n) { return (n / 100).toFixed(2); },
                per_minute_to_per_second: function (n) { return Math.round(n / 60); },
                milliseconds_to_seconds: function (n) { return n / 1000; },
                negate: function (n) { return -n; },
                divide_by_one_hundred_and_negate: function (n) { return -n / 100; },
                old_leech_percent: function (n) { return n / 5; },
                old_leech_permyriad: function (n) { return n / 50; },
                per_minute_to_per_second_0dp: function (n) { return (n / 60).toFixed(0); },
                per_minute_to_per_second_2dp: function (n) { return (n / 60).toFixed(2); },
                per_minute_to_per_second_2dp_if_required: function (n) {
                    return (n / 60).toFixed(2).replace(/\.?0*$/, '');
                },
                milliseconds_to_seconds_0dp: function (n) { return (n / 1000).toFixed(0); },
                milliseconds_to_seconds_2dp: function (n) { return (n / 1000).toFixed(2); },
                multiplicative_damage_modifier: function (n) { return n; },
                '60%_of_value': function (n) { return n * 0.6; },
                id: function (n) { return n; },
                mod_value_to_item_class: function (n) { return item_classes[n % item_classes.length]; },
                canonical_stat: function (n) { return n; },
                placeholder: function () { return '#'; }
            });
            exports_4("inverse_formatters", inverse_formatters = {
                deciseconds_to_seconds: function (s) { return +s / 10; },
                divide_by_two_0dp: function (s) { return +s * 2; },
                divide_by_ten_0dp: function (s) { return +s * 10; },
                divide_by_fifteen_0dp: function (s) { return +s * 15; },
                divide_by_twenty_then_double_0dp: function (s) { return +s * 10; },
                divide_by_one_hundred: function (s) { return +s * 100; },
                divide_by_one_hundred_2dp: function (s) { return +s * 100; },
                per_minute_to_per_second: function (s) { return +s * 60; },
                milliseconds_to_seconds: function (s) { return +s * 1000; },
                negate: function (s) { return -s; },
                divide_by_one_hundred_and_negate: function (s) { return -s * 100; },
                old_leech_percent: function (s) { return +s * 5; },
                old_leech_permyriad: function (s) { return +s * 50; },
                per_minute_to_per_second_0dp: function (s) { return +s * 60; },
                per_minute_to_per_second_2dp: function (s) { return +s * 60; },
                per_minute_to_per_second_2dp_if_required: function (s) { return +s * 60; },
                milliseconds_to_seconds_0dp: function (s) { return +s * 1000; },
                milliseconds_to_seconds_2dp: function (s) { return +s * 1000; },
                multiplicative_damage_modifier: function (s) { return +s; },
                '60%_of_value': function (s) { return +s / 0.6; },
                id: function (s) { return +s; },
                mod_value_to_item_class: function (item_class) { return item_classes.indexOf(item_class); },
                canonical_stat: function (s) { return +s; },
                placeholder: function (s) { return Number.NaN; }
            });
            number = '-?\\d+';
            // "reverse" of {formatters}
            formatter_regexp = {
                deciseconds_to_seconds: number,
                divide_by_two_0dp: number,
                divide_by_ten_0dp: number,
                divide_by_fifteen_0dp: number,
                divide_by_twenty_then_double_0dp: number,
                divide_by_one_hundred: number + "\\.?\\d{0,2}",
                divide_by_one_hundred_2dp: number + "\\.\\d{2}",
                per_minute_to_per_second: number,
                milliseconds_to_seconds: number + "\\.?\\d{0,3}",
                negate: number,
                divide_by_one_hundred_and_negate: number + "\\.?\\d{0,2}",
                old_leech_percent: number + "\\.?\\d{0,2}",
                old_leech_permyriad: number + "\\.?\\d{0,2}",
                per_minute_to_per_second_0dp: number,
                per_minute_to_per_second_2dp: number + "\\.\\d{2}",
                per_minute_to_per_second_2dp_if_required: number + "\\.?\\d{0,2}",
                milliseconds_to_seconds_0dp: number,
                milliseconds_to_seconds_2dp: number + "\\.?\\d{2}",
                multiplicative_damage_modifier: number,
                '60%_of_value': number + "\\.?\\d*",
                id: number,
                mod_value_to_item_class: '.+?',
                // TODO what is this
                canonical_stat: number,
                placeholder: '#'
            };
        }
    };
});
System.register("localize/formatValues", ["localize/formatters"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function formatValues(values, options) {
        var formatters = options.formatters;
        if (formatters === undefined) {
            throw new Error('formatters not set');
        }
        var formatted = __spread(values);
        formatters.forEach(function (formatter, i) {
            if (typeof formatter.arg === 'number') {
                var target_param = values[+formatter.arg - 1];
                if (target_param !== undefined) {
                    formatted[+formatter.arg - 1] = formatValue(target_param, {
                        formatter: formatter
                    });
                }
                else {
                    throw new Error("no param given for formatter '" + formatter.id + "'");
                }
            }
        });
        return formatted.map(function (value) {
            return typeof value === 'string'
                ? value
                : formatValue(value, { formatter: { id: 'id', arg: 1 } });
        });
    }
    exports_5("formatValues", formatValues);
    function formatValue(value, options) {
        var formatter = options.formatter;
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
    function printf(text, params, formatters) {
        if (formatters === void 0) { formatters = []; }
        var prepared = formatValues_1.formatValues(params, { formatters: formatters });
        return prepared
            .reduce(function (formatted, param, i) {
            return formatted
                .replace(new RegExp("%" + (i + 1) + "%", 'g'), String(param))
                .replace("%" + (i + 1) + "$+d", "+" + String(param));
        }, text)
            .replace(/%%/g, '%');
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
System.register("translate/translate", ["translate/match", "translate/printf"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function translate(description, provided, 
        /**
         * @param t
         * @param count {number} number of params
         */
        getFormatters) {
        /**
         * @param t
         * @param count {number} number of params
         */
        if (getFormatters === void 0) { getFormatters = function (t) { return t.formatters; }; }
        var stats = description.stats, no_description = description.no_description, translations = description.translations;
        if (no_description === true) {
            return NO_DESCRIPTION;
        }
        // intersect the required stat_ids from the desc with the provided
        var required_stats = stats
            .map(function (stat_id) {
            var stat = provided.get(stat_id);
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
            .filter(function (stat) { return stat !== null; });
        var translation = matchingTranslation(translations, required_stats);
        if (translation === undefined) {
            return undefined;
        }
        else {
            return printf_1.default(translation.text, required_stats.map(function (_a) {
                var value = _a.value;
                return value;
            }), getFormatters(translation, required_stats.length));
        }
    }
    exports_7("default", translate);
    function matchingTranslation(translations, stats) {
        var args = stats.map(function (_a) {
            var value = _a.value;
            return value;
        });
        return translations.find(function (translation) {
            return match_1.matchesTranslation(translation, args);
        });
    }
    var match_1, printf_1, NO_DESCRIPTION;
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
            exports_7("NO_DESCRIPTION", NO_DESCRIPTION = 'NO_DESCRIPTION');
        }
    };
});
System.register("util/NamedGroupsRegexp", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var NamedGroupsRegexp;
    return {
        setters: [],
        execute: function () {
            NamedGroupsRegexp = /** @class */ (function () {
                function NamedGroupsRegexp(regexp, groups) {
                    this.regexp = regexp;
                    this.groups = groups;
                }
                NamedGroupsRegexp.prototype.match = function (text) {
                    var _this = this;
                    var match = text.match(this.regexp);
                    if (match == null) {
                        return null;
                    }
                    // first element is hole string followed by matches
                    if (match.length - 1 !== this.groups.length) {
                        throw new Error('named groups count did not match matched groups count');
                    }
                    return match.slice(1).reduce(function (named, matched, i) {
                        named[_this.groups[i]] = matched;
                        return named;
                    }, {});
                };
                NamedGroupsRegexp.prototype.toString = function () {
                    return this.regexp;
                };
                return NamedGroupsRegexp;
            }());
            exports_8("default", NamedGroupsRegexp);
        }
    };
});
System.register("translate/asRegexp", ["escape-string-regexp", "localize/formatters", "util/NamedGroupsRegexp"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function asRegexp(translation) {
        var formatters = translation.formatters, text = translation.text;
        var groups = [];
        var regexp = escapeStringRegexp(text)
            .replace(/%(\d+)(\\\$\\\+d|%)/g, function (match, arg, modifier) {
            groups.push(arg);
            var formatter = formatters.find(function (_a) {
                var other = _a.arg;
                return "" + other === arg;
            });
            var prefix = modifier === '\\$\\+d' ? '\\+' : '';
            if (formatter === undefined) {
                return prefix + "(-?\\d+)";
            }
            else {
                return prefix + "(" + formatters_2.regexpFactory(formatter.id) + ")";
            }
        })
            .replace(/%%/g, '%');
        return new NamedGroupsRegexp_1.default(new RegExp("^" + regexp + "$"), groups);
    }
    exports_9("default", asRegexp);
    var escapeStringRegexp, formatters_2, NamedGroupsRegexp_1;
    return {
        setters: [
            function (escapeStringRegexp_1) {
                escapeStringRegexp = escapeStringRegexp_1;
            },
            function (formatters_2_1) {
                formatters_2 = formatters_2_1;
            },
            function (NamedGroupsRegexp_1_1) {
                NamedGroupsRegexp_1 = NamedGroupsRegexp_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("translate/index", ["translate/translate", "translate/asRegexp", "translate/match"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var translate_1;
    return {
        setters: [
            function (translate_1_1) {
                translate_1 = translate_1_1;
                exports_10({
                    "NO_DESCRIPTION": translate_1_1["NO_DESCRIPTION"]
                });
            },
            function (asRegexp_1_1) {
                exports_10({
                    "asRegexp": asRegexp_1_1["default"]
                });
            },
            function (match_2_1) {
                exports_10({
                    "matchesTranslation": match_2_1["matchesTranslation"]
                });
            }
        ],
        execute: function () {
            exports_10("default", translate_1.default);
        }
    };
});
System.register("format/stats", ["translate/index", "types/StatValue"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    /**
     * creates an array of methods that can be used to find a description for a
     * given stat.
     *
     * return value is to be interpreted as a priority queue
     * @param descriptions
     */
    function createDescriptionFindStrategies(descriptions) {
        return [
            function (_a) {
                var id = _a.id;
                return descriptions[id];
            },
            function (_a) {
                var id = _a.id;
                return Object.values(descriptions).find(function (_a) {
                    var stats = _a.stats;
                    return stats.includes(id);
                });
            }
        ];
    }
    exports_11("createDescriptionFindStrategies", createDescriptionFindStrategies);
    function formatWithFinder(stats, find, options) {
        if (options === void 0) { options = {}; }
        var _a = options.ignore_if_zero, ignore_if_zero = _a === void 0 ? false : _a, _b = options.getFormatters, getFormatters = _b === void 0 ? function (t) { return t.formatters; } : _b;
        var lines = [];
        var translated = new Set();
        var _loop_1 = function (stat_id, stat) {
            if (translated.has(stat_id)) {
                return "continue";
            }
            var description = find(stat);
            if (description !== undefined) {
                var translation = translate_2.default(description, stats, function (t, n) {
                    return getFormatters(t, stat, n);
                });
                if (translation === undefined) {
                    var requiredStatsAreZero = requiredStats(description, stats).every(function (_a) {
                        var value = _a.value;
                        return StatValue_2.isZero(value);
                    });
                    if (!ignore_if_zero || !requiredStatsAreZero) {
                        throw new Error("matching translation not found for '" + stat.id + "'");
                    }
                }
                else {
                    // mark as translated
                    description.stats.forEach(function (translated_id) {
                        stats.delete(translated_id);
                        translated.add(translated_id);
                    });
                    if (translation === translate_2.NO_DESCRIPTION) {
                        lines.push(stat_id + " (hidden)");
                    }
                    else {
                        lines.push(translation);
                    }
                }
            }
        };
        try {
            for (var _c = __values(Array.from(stats.entries())), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), stat_id = _e[0], stat = _e[1];
                _loop_1(stat_id, stat);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return lines;
        var e_1, _f;
    }
    function requiredStats(description, provided) {
        // intersect the required stat_ids from the desc with the provided
        return description.stats
            .map(function (stat_id) {
            var stat = provided.get(stat_id);
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
            .filter(function (stat) { return stat !== null; });
    }
    function formatWithFallback(stats, fallback) {
        if (fallback === Fallback.throw) {
            if (stats.size > 0) {
                throw new NoDescriptionFound(Array.from(stats.values()));
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
                .map(function (_a) {
                var _b = __read(_a, 2), id = _b[0], stat = _b[1];
                return fallback(id, stat);
            })
                .filter(function (line) { return typeof line === 'string'; });
        }
        else if (fallback === Fallback.skip_if_zero) {
            var non_zero_stats = Array.from(stats.values()).filter(function (stat) { return !StatValue_2.isZero(stat.value); });
            if (non_zero_stats.length > 0) {
                throw new NoDescriptionFound(non_zero_stats);
            }
            else {
                return [];
            }
        }
        else {
            // should ts recognize that this is unreachable code? enums can prob
            // be extended at runtime an therfore somebody could mess with them
            throw new Error("unrecognized fallback type '" + fallback + "'");
        }
    }
    var translate_2, StatValue_2, NoDescriptionFound, Fallback, initial_options, formatStats;
    return {
        setters: [
            function (translate_2_1) {
                translate_2 = translate_2_1;
            },
            function (StatValue_2_1) {
                StatValue_2 = StatValue_2_1;
            }
        ],
        execute: function () {
            NoDescriptionFound = /** @class */ (function (_super) {
                __extends(NoDescriptionFound, _super);
                function NoDescriptionFound(stats) {
                    return _super.call(this, 'no descriptions found for ' + stats.map(function (_a) {
                        var id = _a.id;
                        return id;
                    }).join(',')) || this;
                }
                return NoDescriptionFound;
            }(Error));
            exports_11("NoDescriptionFound", NoDescriptionFound);
            (function (Fallback) {
                Fallback[Fallback["throw"] = 0] = "throw";
                Fallback[Fallback["id"] = 1] = "id";
                Fallback[Fallback["skip"] = 2] = "skip";
                // ignore if no matching translation is found in stat description
                // if the stat value is equiv to zero (e.g. 0 or [0, 9])
                Fallback[Fallback["skip_if_zero"] = 3] = "skip_if_zero";
            })(Fallback || (Fallback = {}));
            exports_11("Fallback", Fallback);
            initial_options = {
                datas: {},
                fallback: Fallback.throw,
                start_file: 'stat_descriptions',
                getFormatters: function (t) { return t.formatters; }
            };
            formatStats = function (stats, options) {
                if (options === void 0) { options = {}; }
                var _a = Object.assign({}, initial_options, options), datas = _a.datas, fallback = _a.fallback, start_file = _a.start_file, getFormatters = _a.getFormatters;
                // translated lines
                var lines = [];
                // array of stat_ids for which hash lookup failed
                var untranslated = new Map(stats.map(function (stat) { return [stat.id, stat]; }));
                var description_file = datas[start_file];
                while (description_file !== undefined) {
                    var data = description_file.data;
                    try {
                        for (var _b = __values(createDescriptionFindStrategies(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var descriptionFinder = _c.value;
                            lines.push.apply(lines, __spread(formatWithFinder(untranslated, descriptionFinder, {
                                getFormatters: getFormatters,
                                ignore_if_zero: fallback === Fallback.skip_if_zero
                            })));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    description_file = description_file.meta.include
                        ? datas[description_file.meta.include]
                        : undefined;
                }
                lines.push.apply(lines, __spread(formatWithFallback(untranslated, fallback)));
                return lines;
                var e_2, _d;
            };
            exports_11("default", formatStats);
        }
    };
});
System.register("translate/descriptions_dependency", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
            exports_12("default", Object.freeze({
                active_skill_gem_stat_descriptions: 'gem_stat_descriptions',
                atlas_stat_descriptions: 'map_stat_descriptions',
                aura_skill_stat_descriptions: 'skill_stat_descriptions',
                beam_skill_stat_descriptions: 'skill_stat_descriptions',
                curse_skill_stat_descriptions: 'skill_stat_descriptions',
                debuff_skill_stat_descriptions: 'skill_stat_descriptions',
                gem_stat_descriptions: 'stat_descriptions',
                leaguestone_stat_descriptions: 'stat_descriptions',
                map_stat_descriptions: 'stat_descriptions',
                minion_attack_skill_stat_descriptions: 'minion_skill_stat_descriptions',
                minion_skill_stat_descriptions: 'skill_stat_descriptions',
                minion_spell_skill_stat_descriptions: 'minion_skill_stat_descriptions',
                offering_skill_stat_descriptions: 'skill_stat_descriptions',
                passive_skill_aura_stat_descriptions: 'passive_skill_stat_descriptions',
                passive_skill_stat_descriptions: 'stat_descriptions',
                skill_stat_descriptions: 'active_skill_gem_stat_descriptions',
                variable_duration_skill_stat_descriptions: 'skill_stat_descriptions'
            }));
        }
    };
});
System.register("requiredLocaleDatas", ["translate/descriptions_dependency"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function requiredLocaleDatas(files) {
        var datas = __spread(files);
        var queued = __spread(files); // clone
        while (queued.length > 0) {
            var file = queued.shift();
            var include = descriptions_dependency_1.default[file];
            if (include) {
                queued.push(include);
                datas.push(include);
            }
        }
        return datas;
    }
    exports_13("default", requiredLocaleDatas);
    var descriptions_dependency_1;
    return {
        setters: [
            function (descriptions_dependency_1_1) {
                descriptions_dependency_1 = descriptions_dependency_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("translate/skill_meta", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
            exports_14("default", {
                groups: {
                    weapon_damage: [
                        'weapon_physical_damage_range',
                        'weapon_fire_damage_range',
                        'weapon_cold_damage_range',
                        'weapon_lightning_damage_range',
                        'weapon_chaos_damage_range'
                    ],
                    spell_damage: [
                        'spell_physical_damage_range',
                        'spell_fire_damage_range',
                        'spell_cold_damage_range',
                        'spell_lightning_damage_range',
                        'spell_chaos_damage_range'
                    ],
                    secondary_damage: [
                        'secondary_physical_damage_range',
                        'secondary_fire_damage_range',
                        'secondary_cold_damage_range',
                        'secondary_lightning_damage_range',
                        'secondary_chaos_damage_range'
                    ],
                    supports_all: [
                        'blood_magic',
                        'support_arcane_surge_duration',
                        'support_arcane_surge_chance',
                        'support_arcane_surge_damage'
                    ],
                    supports_attack: [
                        'attack_speed_incr',
                        'accuracy_rating',
                        'accuracy_rating_incr',
                        'critical_strike_chance_incr',
                        'additional_crit',
                        'life_gain_per_target',
                        'point_blank',
                        'melee_splash',
                        'melee_splash_radius',
                        'mulitple_attacks',
                        'multiple_attacks_speed',
                        'area_of_effect_incr',
                        'endurance_charge_on_stun',
                        'cast_on_crit',
                        'cast_on_melee_kill',
                        'attack_speed_incr_on_low_life',
                        'always_hit',
                        'counterattack_on_hit',
                        'counterattack_on_block',
                        'triggered_cannot_attack',
                        'attack_on_hit',
                        'chance_to_fortify_on_melee_hit',
                        'poison_on_hit',
                        'poison_chance',
                        'decay_on_hit',
                        'bleeding_chance',
                        'maim_chance',
                        'added_fire_against_burning',
                        'maim_phys_damage',
                        'brutality_phys_damage',
                        'chance_to_bleed_damage_incr'
                    ],
                    supports_spell: [
                        'number_of_totems',
                        'cast_speed_incr',
                        'cast_on_death',
                        'cast_on_stunned',
                        'cast_on_damage_taken',
                        'cast_on_hit',
                        'cast_on_attack',
                        'cast_speed_incr_on_low_life',
                        'multicast_cast_speed_incr',
                        'multicast',
                        'cooldown_incr'
                    ],
                    supports_triggerable_spell: ['triggered_cannot_cast'],
                    supports_totem: [
                        'totem',
                        'totem_duration',
                        'num_totems',
                        'totem_range',
                        'trap',
                        'trap_duration',
                        'num_traps',
                        'mine',
                        'mine_duration',
                        'num_mines',
                        'disable_melee',
                        'summon_fire_resist',
                        'summon_cold_resist',
                        'summon_lightning_resist',
                        'totem_cast_speed',
                        'totem_attack_speed',
                        'totem_summon_speed_incr'
                    ],
                    supports_is_totem: [
                        'summon_fire_resist',
                        'summon_cold_resist',
                        'summon_lightning_resist'
                    ],
                    supports_trap: [
                        'trap',
                        'trap_duration',
                        'trap_radius',
                        'num_traps',
                        'trap_damage',
                        'multithrow_damage',
                        'trap_throw_speed_incr',
                        'trap_mine_damage',
                        'trap_throw_random'
                    ],
                    supports_trappable: [
                        'trap',
                        'trap_duration',
                        'trap_radius',
                        'num_traps',
                        'disable_melee',
                        'trap_damage',
                        'multithrow_damage',
                        'trap_throw_speed_incr',
                        'trap_mine_damage',
                        'trap_throw_random'
                    ],
                    supports_mine: [
                        'mine',
                        'mine_duration',
                        'mine_radius',
                        'num_mines',
                        'mine_laying_speed_incr'
                    ],
                    supports_mineable: [
                        'mine',
                        'mine_duration',
                        'mine_radius',
                        'num_mines',
                        'disable_melee',
                        'mine_laying_speed_incr'
                    ],
                    supports_channelling: ['cast_while_channelling'],
                    supports_variable_duration: [
                        'skill_duration_incr',
                        'skill_and_damaging_ailment_duration_incr',
                        'support_less_duration'
                    ],
                    supports_damage: [
                        'life_leech_from_any',
                        'life_leech_speed',
                        'mana_leech_from_any',
                        'mana_leech_speed',
                        'critical_strike_chance_incr',
                        'additional_crit',
                        'critical_strike_multiplier_incr',
                        'knockback',
                        'knockback_distance',
                        'stun_threshold_reduction_incr',
                        'stun_duration_incr',
                        'killed_monster_dropped_item_rarity_incr',
                        'killed_monster_dropped_item_quantity_incr',
                        'burn_chance',
                        'burn_duration',
                        'chill_duration',
                        'freeze_duration',
                        'shock_duration',
                        'freeze_chance',
                        'freeze_chance_vs_chilled',
                        'shock_chance',
                        'elemental_status_aura',
                        'ignite_aura',
                        'culling_strike',
                        'chance_to_flee',
                        'chance_to_blind',
                        'blind_duration_incr',
                        'fire_penetration',
                        'cold_penetration',
                        'lightning_penetration',
                        'power_charge_on_crit_chance',
                        'burn_damage',
                        'apply_linked_curses_on_hit',
                        'reduce_block',
                        'reduce_dodge',
                        'bloodlust_damage',
                        'bloodlust_damage_incr',
                        'area_damage_incr',
                        'rapid_decay',
                        'support_efficacy_dot',
                        'damage_over_time_incr',
                        'poison_on_hit',
                        'poison_chance',
                        'decay_on_hit',
                        'poison_damage',
                        'poison_duration',
                        'bleeding_damage_incr',
                        'cannot_inflict_ailments',
                        'skill_and_damaging_ailment_duration_incr',
                        'deal_no_elemental',
                        'deal_no_chaos',
                        'support_debilitate_hit_damage',
                        'support_debilitate_poison_damage',
                        'support_poison_poison_damage',
                        'support_ruthless_count',
                        'support_ruthless_damage',
                        'support_ruthless_bleeding_damage',
                        'support_ruthless_stun',
                        'support_scion_chance',
                        'ignite_prolif_damage',
                        'support_ice_bite_damage',
                        'support_innervate_buff',
                        'support_innervate_buff_duration',
                        'support_innervate_damage',
                        'maimed_phys_damage_taken_incr',
                        'ailment_damage_incr'
                    ],
                    supports_burning: ['burn_damage'],
                    supports_damage_over_time: [
                        'killed_monster_dropped_item_rarity_incr',
                        'killed_monster_dropped_item_quantity_incr'
                    ],
                    supports_projectile: [
                        'number_of_projectiles',
                        'projectile_speed_incr',
                        'pierce_chance',
                        'mulpile_projectiles_critical_strike_chance_incr',
                        'chain_num',
                        'split_num',
                        'fork',
                        'return',
                        'support_projectile_attack_phys_incr',
                        'support_projectile_speed_incr'
                    ],
                    supports_curse: [
                        'cannot_cast_curses',
                        'curse_effect',
                        'curse_effect_vs_players',
                        'curse_area',
                        'curse_aura'
                    ],
                    supports_area: [
                        'area_of_effect_incr',
                        'area_of_effect_incr_while_dead',
                        'concentrated_area_of_effect'
                    ],
                    supports_aura: [
                        'area_of_effect_incr',
                        'aura_area_of_effect_incr',
                        'aura_effect_incr'
                    ],
                    supports_minions: [
                        'minion_damage_incr',
                        'minion_movement_speed_incr',
                        'minion_life_incr',
                        'minion_instability',
                        'summon_fire_resist',
                        'summon_cold_resist',
                        'summon_lightning_resist',
                        'burn_damage',
                        'mana_cost_reduc'
                    ],
                    supports_minions_not_life: [
                        'minion_damage_incr',
                        'minion_movement_speed_incr',
                        'minion_instability',
                        'summon_fire_resist',
                        'summon_cold_resist',
                        'summon_lightning_resist',
                        'burn_damage',
                        'mana_cost_reduc'
                    ],
                    supports_minion_damage: [
                        'active_skill_minion_added_damage_final',
                        'added_cold_damage',
                        'added_lightning_damage',
                        'added_chaos_damage',
                        'melee_physical_damage_ince',
                        'physical_damage_to_add_as_fire',
                        'cold_damage_to_convert_to_fire',
                        'physical_damage_to_add_as_lightning',
                        'physical_damage_to_convert_to_lightning',
                        'fire_damage_incr',
                        'cold_damage_incr',
                        'lightning_damage_incr',
                        'chaos_damage_incr',
                        'support_attack_elemental_damage_final',
                        'weapon_elemental_damage_incr',
                        'support_melee_physical_damage_final_incr',
                        'support_melee_physical_damage_ailment_damage_final_incr',
                        'support_damage_full_life_incr',
                        'unused_identifier_physical_damage',
                        'unused_identifier_physical_damage_final',
                        'chance_to_flee',
                        'chance_to_blind',
                        'blind_duration_incr',
                        'stun_threshold_reduction_incr',
                        'killed_monster_dropped_item_rarity_incr',
                        'killed_monster_dropped_item_quantity_incr',
                        'culling_strike',
                        'damage_incr',
                        'fire_penetration',
                        'cold_penetration',
                        'lightning_penetration',
                        'power_charge_on_crit_chance',
                        'area_of_effect_incr',
                        'burn_damage',
                        'burn_chance',
                        'freeze_chance',
                        'freeze_chance_vs_chilled',
                        'shock_chance',
                        'stun_duration_incr',
                        'burn_duration',
                        'chill_duration',
                        'freeze_duration',
                        'shock_duration',
                        'elemental_status_aura',
                        'ignite_aura',
                        'cast_on_death_damage',
                        'cast_on_damage_taken_damage',
                        'critical_strike_chance_incr',
                        'additional_crit',
                        'critical_strike_multiplier_incr',
                        'knockback_chance',
                        'killed_monster_dropped_item_rarity_incr',
                        'killed_monster_dropped_item_quantity_incr',
                        'life_leech_from_any',
                        'mana_leech_from_any',
                        'life_leech_speed',
                        'mana_leech_speed',
                        'multithrow_damage',
                        'area_damage_incr',
                        'support_more_minion_damage',
                        'void_manipulation',
                        'elemental_damage_incr',
                        'controlled_destruction',
                        'support_efficacy_spell_damage',
                        'rapid_decay',
                        'support_efficacy_dot',
                        'damage_over_time_incr',
                        'poison_on_hit',
                        'poison_chance',
                        'decay_on_hit',
                        'poison_damage',
                        'poison_duration',
                        'bleeding_damage_incr',
                        'cannot_inflict_ailments',
                        'elemental_focus_damage',
                        'minion_totem_resistance_support_damage',
                        'support_better_ailments_bonus',
                        'support_better_ailments_malus',
                        'brutality_phys_damage',
                        'maim_phys_damage',
                        'support_chance_to_ignite_damage',
                        'support_debilitate_hit_damage',
                        'support_debilitate_poison_damage',
                        'support_poison_poison_damage',
                        'maimed_phys_damage_taken_incr',
                        'ailment_duration_incr',
                        'deal_no_elemental',
                        'deal_no_chaos',
                        'support_scion_chance',
                        'ignite_prolif_damage',
                        'support_ice_bite_damage',
                        'support_innervate_buff',
                        'support_innervate_buff_duration',
                        'support_innervate_damage',
                        'ailment_damage_incr'
                    ],
                    supports_minions_attack: [
                        'life_gain_per_target',
                        'attack_speed_incr',
                        'accuracy_rating_incr',
                        'accuracy_rating',
                        'melee_mulitple_attacks',
                        'melee_splash',
                        'melee_splash_radius',
                        'area_of_effect_incr',
                        'multiple_attacks_speed',
                        'multiple_attack_damage',
                        'melee_physical_damage_incr',
                        'endurance_charge_on_stun',
                        'attack_speed_incr_on_low_life',
                        'area_concentrate_damage_final',
                        'bloodlust_damage',
                        'bloodlust_damage_incr',
                        'chance_to_fortify_on_melee_hit',
                        'poison_on_hit',
                        'decay_on_hit',
                        'bleeding_chance',
                        'maim_chance',
                        'added_fire_against_burning',
                        'maimed_phys_damage_taken_incr'
                    ],
                    supports_minions_do_anything: [
                        'cast_speed_incr',
                        'projectile_speed_incr',
                        'pierce_chance',
                        'stun_duration_incr',
                        'burn_duration',
                        'multiple_projectile_damage_final',
                        'lesser_multiple_projectile_damage_final',
                        'area_concentrate_damage_final',
                        'additional_projectiles',
                        'chain_num',
                        'split_num',
                        'fork',
                        'return',
                        'skill_duration_incr',
                        'support_less_duration',
                        'skill_and_damaging_ailment_duration_incr',
                        'num_additional_traps',
                        'num_additional_mines',
                        'num_additional_traps_allowed',
                        'num_additional_mines_allowed',
                        'trap_throw_random',
                        'support_projectile_attack_phys_incr',
                        'support_projectile_speed_incr',
                        'projectile_damage_incr',
                        'fork_damage',
                        'split_damage',
                        'chain_damage',
                        'cast_speed_incr_on_low_life',
                        'multicast_cast_speed_incr',
                        'base_multicast',
                        'trap_throw_speed_incr',
                        'mine_laying_speed_incr',
                        'trap_mine_damage',
                        'cannot_inflict_ailments',
                        'elemental_focus_damage',
                        'cluster_trap_damage_incr',
                        'minefield_damage'
                    ]
                },
                skills: {
                    detonate_mines: {
                        filter: [],
                        start_file: 'skill_stat_descriptions'
                    },
                    melee: {
                        filter: ['$weapon_damage'],
                        start_file: 'skill_stat_descriptions'
                    },
                    abyssal_cry: {
                        filter: [
                            '$supports_all',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'abyssal_cry_max_life_as_chaos_on_death',
                            'movement_speed_incr',
                            'movement_speed_incr_per_enemy',
                            'buff_duration',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    ancestor_totem_slam: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'totem',
                            'totem_duration',
                            'num_totems',
                            'totem_life_incr',
                            'melee_range',
                            'attack_speed_more',
                            'ancestor_totem_grants_melee_damage',
                            'ancestor_totem_grants_melee_damage_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    anger: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'attack_added_fire',
                            'spell_added_fire_damage'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    envy: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'attack_added_chaos',
                            'spell_added_chaos_damage'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    animate_armour: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'movement_speed_incr',
                            'item_level_req',
                            'display_minion_life'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    animate_weapon: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'item_level_req',
                            'movement_speed_incr',
                            'minion_duration',
                            'number_of_animated_weapons'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    arc: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            'shock_chance',
                            'shock_effect',
                            'chain_num',
                            'split_num'
                        ],
                        start_file: 'beam_skill_stat_descriptions'
                    },
                    vaal_arc: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            'shock_chance',
                            'shock_duration',
                            'chain_num'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    arctic_armour: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            'mana_degen',
                            'ice_shield_moving_mana_degen',
                            'phys_damage_taken_plus',
                            'fire_damage_taken_plus',
                            'movement_speed_incr',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    new_arctic_armour: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            'arctic_armour_phys_damage',
                            'arctic_armour_fire_damage',
                            'arctic_armour_chill_when_hit_duration',
                            'skill_duration',
                            'skill_buff_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    arctic_breath: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'skill_duration',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    assassins_mark: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_curse',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'curse_duration',
                            'area_of_effect_incr',
                            'self_critical_strike_multiplier_reduction',
                            'chance_to_grant_power_charge_on_death',
                            'chance_to_take_critical_strike',
                            'life_granted_when_killed',
                            'mana_granted_when_killed'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    aura_accuracy_and_crits: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'accuracy_rating_incr',
                            'critical_strike_chance_incr'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    aura_damage: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'physical_damage_incr'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    ball_lightning: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    backstab: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'backstab_damage',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    barrage: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'number_of_arrows',
                            'attack_speed_more'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    blade_flurry: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    new_new_blade_vortex: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_area',
                            'skill_duration',
                            'max_spinning_blades',
                            'blade_vortex_damage_per_blade',
                            'blade_vortex_ailment_damage_per_blade',
                            'blade_vortex_rate_per_blade',
                            'blade_vortex_hit_rate'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    bladefall: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'area_of_effect_incr',
                            'bladefall_damage_per_volley'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    blast_rain: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'projectile_speed_incr',
                            'blast_rain_number'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    blight_channel: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage_over_time',
                            '$supports_channelling',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'chaos_skill_dot_damage_per_minute',
                            'buff_duration',
                            'secondary_buff_duration',
                            'movement_speed_incr',
                            'area_of_effect_incr',
                            'blight_max_stacks',
                            'spell_damage_over_time'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    blink_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_minions_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minion_damage',
                            'skill_duration',
                            'arrow_speed',
                            'display_minion_life',
                            'projectile_speed_incr'
                        ],
                        start_file: 'minion_attack_skill_stat_descriptions'
                    },
                    blood_rage: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            'attack_speed_incr',
                            'life_leech_from_physical',
                            'physical_damage_percent_of_life_per_minute',
                            'physical_damage_percent_of_energy_shield_per_minute',
                            'frenzy_on_kill_chance',
                            'buff_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    bone_offering: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_curse',
                            '$supports_mineable',
                            'skill_duration',
                            'base_block',
                            'base_spell_block',
                            'recover_life_on_block'
                        ],
                        start_file: 'offering_skill_stat_descriptions'
                    },
                    burning_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'burn_chance',
                            'burn_duration',
                            'burn_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_burning_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'burn_chance',
                            'burn_duration',
                            'burn_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    caustic_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_damage_over_time',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            '$supports_projectile',
                            'projectile_damage_over_time',
                            'chaos_skill_dot_area_damage_per_minute',
                            'skill_duration',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    chaos_degen_aura_unique: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'cast_on_equip',
                            'chaos_skill_dot_area_damage_per_minute'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    charged_attack_channel: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_channelling',
                            '$supports_area',
                            'charged_attack_damage_stages',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    clarity: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'mana_regen'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    vaal_clarity: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'no_mana_cost',
                            'buff_duration'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    cleave: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    cold_snap: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'freeze_chance',
                            'chill_duration',
                            'freeze_duration',
                            'chill_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_cold_snap: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'freeze_chance',
                            'chill_duration',
                            'freeze_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    cold_weakness: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_curse',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'cold_resist',
                            'chance_to_be_frozen',
                            'self_freeze_duration'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    consecrate: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_area',
                            'cast_this_spell_on_crit',
                            'skill_duration',
                            'life_regen_per_minute_percent'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    triggered_consecrate: 'consecrate',
                    contagion: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage_over_time',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'chaos_skill_dot_damage_per_minute',
                            'buff_duration',
                            'spell_damage_over_time'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    conversion_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_minions',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'minion_duration',
                            'minion_damage_final',
                            'minion_life_final'
                        ],
                        start_file: 'minion_attack_skill_stat_descriptions'
                    },
                    convocation: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            'skill_duration',
                            'life_regen_per_minute',
                            'skill_buff_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    create_lesser_shrine: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            'cast_on_kill',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    cyclone: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'attack_speed_incr',
                            'area_of_effect_incr',
                            'cyclone_first_hit_damage',
                            'cyclone_movement_speed_incr',
                            'cyclone_first_hit_damage',
                            'melee_range'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_cyclone: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'attack_speed_incr',
                            'area_of_effect_incr',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    damage_infusion: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'damage_infusion'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    dark_pact: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'chain_num',
                            'skeletal_chains_aoe_health_percent',
                            'skeletal_chains_target_self',
                            'skeletal_chains_damage',
                            'skeletal_chains_radius'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    determination: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'base_armour',
                            'determination_armour_incr'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    detonate_dead: {
                        filter: [
                            '$secondary_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'corpse_life_percentage',
                            'cast_speed_incr',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_detonate_dead: {
                        filter: [
                            '$secondary_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'corpse_life_percentage',
                            'cast_speed_incr',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    desecrate: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage_over_time',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'chaos_skill_dot_area_damage_per_minute',
                            'skill_duration',
                            'desecrate_num_corpses',
                            'desecrate_corpse_level'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    discharge: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'lightning_damage_per_power_charge_range',
                            'fire_damage_per_endurance_charge_range',
                            'cold_damage_per_frenzy_charge_range'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    discipline: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'base_energy_shield'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    vaal_discipline: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'base_energy_shield',
                            'energy_shield_no_delay',
                            'buff_duration'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    double_slash: {
                        filter: [
                            '$weapon_damage',
                            '$supports_attack',
                            '$supports_all',
                            '$supports_damage',
                            '$supports_area',
                            'attack_speed_more',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    double_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_attack',
                            '$supports_all',
                            '$supports_damage',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_double_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_attack',
                            '$supports_all',
                            '$supports_damage',
                            'attack_speed_incr',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    dual_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    earthquake: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'earthquake_aftershock_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    elemental_hit: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'elemental_hit_fire_damage',
                            'elemental_hit_cold_damage',
                            'elemental_hit_lightning_damage',
                            'elemental_status_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    elemental_projectiles: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'chain_num',
                            'split_num'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    elemental_weakness: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            '$supports_curse',
                            'curse_duration',
                            'area_of_effect_incr',
                            'elemental_resist',
                            'chance_to_be_shocked',
                            'chance_to_be_frozen',
                            'chance_to_be_ignited'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    enduring_cry: {
                        filter: [
                            '$supports_all',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'enduring_cry_charges',
                            'area_of_effect_incr',
                            'life_regen_per_minute',
                            'buff_duration',
                            'skill_buff_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    enfeeble: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            '$supports_curse',
                            'curse_duration',
                            'area_of_effect_incr',
                            'accuracy_rating_incr',
                            'critical_strike_chance_incr',
                            'enfeeble_damage_scale',
                            'critical_strike_multiplier_incr'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    essence_drain: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_damage_over_time',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'chaos_skill_dot_damage_per_minute',
                            'buff_duration',
                            'spell_damage_over_time',
                            'siphon_life_gain'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    explosive_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'buff_duration',
                            'fuse_arrow_orb_damage',
                            'fuse_arrow_explosion_radius',
                            'burn_chance',
                            'number_of_arrows'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    fire_beam: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage_over_time',
                            '$supports_channelling',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'buff_duration',
                            'fire_beam_add_damage',
                            'fire_beam_resistance_minus',
                            'fire_beam_resistance_cap',
                            'fire_skill_dot_damage_per_minute',
                            'fire_beam_max_stacks',
                            'fire_beam_length_incr',
                            'spell_damage_over_time'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    fire_nova: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_mine',
                            '$supports_damage',
                            '$supports_area',
                            'fire_nova_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    fireball: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'burn_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_fireball: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'burn_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    fire_burst: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    breach_bone_nova_triggered: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_projectile',
                            'attack_on_kill_bleeding_enemy'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    fire_mortar: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'burn_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    fire_storm: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'fire_storm_delay'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    fire_weakness: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_curse',
                            '$supports_mineable',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'fire_resist',
                            'chance_to_be_ignited',
                            'self_burn_duration'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    flameblast: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_channelling',
                            '$supports_area',
                            'charged_blast_damage_per_stack',
                            'charged_blast_ailment_damage_per_stack',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_charged_blast: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'charged_blast_damage_per_stack',
                            'charged_blast_ailment_damage_per_stack',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    flame_dash: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'skill_duration',
                            'fire_skill_dot_area_damage_per_minute'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    flame_whip: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'flame_whip_damage_incr',
                            'never_ignite',
                            'cast_speed_incr',
                            'damage_vs_burning'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    flesh_offering: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_curse',
                            '$supports_mineable',
                            'skill_duration',
                            'attack_speed_incr',
                            'haste_cast_speed_incr',
                            'movement_speed_incr'
                        ],
                        start_file: 'offering_skill_stat_descriptions'
                    },
                    flicker_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'attack_speed_incr',
                            'attack_speed_per_frenzy_charge'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    freezing_pulse: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            'projectile_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    frenzy: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            'attack_speed_per_frenzy_charge',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    frost_blades: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            'melee_weapon_range',
                            'active_skill_projectile_damage_incr',
                            'active_skill_projectile_dot_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    frost_bolt: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    frost_bolt_nova: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'spell_damage_over_time',
                            'cold_skill_dot_area_damage_per_minute',
                            'active_skill_if_used_through_frostbolt_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    frost_bomb: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'skill_duration',
                            'secondary_buff_duration',
                            'life_regen_incr',
                            'cold_resist'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    frost_wall: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            'skill_duration',
                            'wall_delay',
                            'wall_length'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    glacial_cascade: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    glacial_hammer: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'freeze_chance',
                            'chill_duration',
                            'chill_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_glacial_hammer: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'freeze_chance',
                            'chill_duration',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    grace: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'grace_evasion_incr',
                            'base_evasion'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    vaal_grace: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'dodge_chance',
                            'spell_dodge_chance',
                            'buff_duration'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    ground_slam: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'stun_threshold_reduction_incr',
                            'stun_duration_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_ground_slam: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'knockback',
                            'stun'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    haste: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'movement_speed_incr',
                            'attack_speed_incr',
                            'haste_cast_speed_incr'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    vaal_haste: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'movement_speed_incr',
                            'attack_speed_incr',
                            'haste_cast_speed_incr',
                            'buff_duration'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    hatred: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'physical_damage_to_add_as_cold'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    heavy_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'knockback',
                            'stun_threshold_reduction_incr',
                            'stun_duration_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_heavy_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    herald_of_ash: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_area',
                            '$supports_burning',
                            '$supports_damage_over_time',
                            'physical_damage_to_add_as_fire',
                            'herald_of_ash_fire_damage_incr',
                            'herald_of_ash_burning_damage',
                            'buff_duration'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    herald_of_ice: {
                        filter: [
                            '$secondary_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_area',
                            'spell_added_cold',
                            'attack_added_cold',
                            'herald_of_ice_cold_damage_incr',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    herald_of_thunder: {
                        filter: [
                            '$secondary_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_area',
                            'spell_added_lightning',
                            'attack_added_lightning',
                            'herald_of_thunder_lightning_damage_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    ice_crash: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'base_physical_damage_to_convert_to_cold',
                            'ice_crash_second_hit_damage',
                            'ice_crash_third_hit_damage',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    ice_nova: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'active_skill_if_used_through_frostbolt_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_ice_nova: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'ice_nova_repeat_count',
                            'ice_nova_repeat_size'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    ice_shot: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            '$supports_projectile',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    ice_spear: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            'chill_duration',
                            'chill_effect',
                            'projectile_speed_incr',
                            'ice_spear_crit_bonus'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    ice_storm: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'fire_storm_delay',
                            'ice_storm_ground_ice',
                            'cold_damage_per_int'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    immortal_call: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'buff_duration',
                            'buff_duration_incr_per_endurance',
                            'cast_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_immortal_call: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'buff_duration',
                            'buff_duration_incr_per_endurance',
                            'cast_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    incinerate_channel: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_damage',
                            '$supports_channelling',
                            '$supports_projectile',
                            'flamethrower_damage_incr',
                            'incinerate_damage_incr',
                            'projectile_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    infernal_blow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'corpse_life_percentage',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    infernal_swarm: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            'chain_num',
                            'burn_chance',
                            'burn_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    inspiring_cry: {
                        filter: [
                            '$supports_all',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'buff_duration',
                            'inspiring_cry_damage',
                            'damage_incr',
                            'mana_regen',
                            'skill_buff_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    kinetic_blast: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'cluster_burst_spawn_amount'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    leap_slam: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'knockback'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    lightning_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            '$supports_area',
                            'lighnting_arrow_targets',
                            'shock_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    lightning_projectile_trap: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'projectile_speed_incr',
                            'shock_chance',
                            'shock_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_lightning_projectile_trap: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'skill_duration',
                            'projectile_speed_incr',
                            'lightning_trap_shocking_ground',
                            'shocked_ground_stat_override'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    player_lightning_slam: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'shock_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    lightning_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            'active_skill_projectile_damage_incr',
                            'active_skill_projectile_dot_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_lightning_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'vaal_lightning_strike_beam_damage',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    lightning_tendrils: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_totem'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    lightning_weakness: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_curse',
                            '$supports_mineable',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'lightning_resist',
                            'chance_to_be_shocked',
                            'self_shock_duration'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    merveil_warp: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_area',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    mine_freeze: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_mine',
                            'freeze_duration',
                            'freeze_chance',
                            'freeze_mine_damage_incr',
                            'freeze_mine_cold_resist_debuff'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    mirror_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_minions_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minion_damage',
                            'skill_duration',
                            'arrow_speed',
                            'display_minion_life',
                            'projectile_speed_incr'
                        ],
                        start_file: 'minion_attack_skill_stat_descriptions'
                    },
                    molten_shell: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'fire_shield_damage_threshold',
                            'base_armour',
                            'buff_duration',
                            'area_of_effect_incr',
                            'skill_buff_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_molten_shell: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'fire_shield_damage_threshold',
                            'base_armour',
                            'buff_duration',
                            'area_of_effect_incr',
                            'skill_buff_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    molten_burst: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'attack_on_melee_hit'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    molten_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'active_skill_projectile_damage_incr',
                            'active_skill_projectile_dot_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    phase_run: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            'movement_speed_incr',
                            'monster_response_time',
                            'buff_duration',
                            'phase_run_melee_physical_damage_incr_final',
                            'melee_physical_damage_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    new_phase_run: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            'buff_duration',
                            'secondary_buff_duration',
                            'movement_speed_incr',
                            'phase_run_melee_physical_damage_incr_final',
                            'skill_duration_incr_per_frenzy',
                            'phasing',
                            'enemy_ai_weight'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    orb_of_storms: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'chain_num',
                            'skill_duration',
                            'chain_num'
                        ],
                        start_file: 'beam_skill_stat_descriptions'
                    },
                    poachers_mark: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_curse',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'evasion_rating_poachers_mark',
                            'monster_flask_charges_incr',
                            'life_granted_when_hit',
                            'mana_granted_when_hit',
                            'chance_to_grant_frenzy_charge_on_death'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    power_siphon: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'culling_strike'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_power_siphon: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trap',
                            '$supports_mine',
                            '$supports_projectile',
                            'culling_strike'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    projectile_weakness: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_curse',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'be_pierced',
                            'chance_to_be_knocked_back',
                            'projectile_damage_taken_incr'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    puncture: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_damage_over_time',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'bleeding_skill_duration',
                            'bleeding_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    punishment: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_curse',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'punishment_normal',
                            'punishment_magic',
                            'punishment_rare',
                            'punishment_unique'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    new_punishment: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_curse',
                            '$supports_area',
                            'newpunishment_melee_damage',
                            'newpunishment_attack_speed',
                            'newpunishment_applied_buff_duration',
                            'curse_duration',
                            'area_of_effect_incr'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    purity: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'elemental_resist'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    fire_resist_aura: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'fire_resist',
                            'max_fire_resist'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    cold_resist_aura: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'cold_resist',
                            'max_cold_resist'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    lightning_resist_aura: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'lightning_resist',
                            'max_lightning_resist'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    quake_slam: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'quake_slam_aftershock_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    rain_of_arrows: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'projectile_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_rain_of_arrows: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'projectile_speed_incr',
                            'buff_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    raise_spectre: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'number_of_spectres',
                            'minion_damage_final',
                            'minion_life_final',
                            'minion_movement_speed_final',
                            'movement_velocity_cap',
                            'minion_energy_shield_final',
                            'minion_movement_speed_incr',
                            'minion_elemental_resist'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    raise_zombie: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'number_of_zombies',
                            'display_minion_life',
                            'minion_movement_speed_incr',
                            'minion_damage_final'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    repeating_shockwave: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            'cannot_knockback',
                            'cast_on_equip',
                            'burn_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    reave: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'reave_area_incr',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_reave: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'reave_area_incr',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    reckoning: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    righteous_fire: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage_over_time',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'righteous_fire_self_damage_from_life',
                            'righteous_fire_self_damage_from_es',
                            'righteous_fire_damage_to_nearby_from_life',
                            'righteous_fire_damage_to_nearby_from_es',
                            'righteous_fire_spell_damage_incr',
                            'spell_damage_incr',
                            'burn_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_righteous_fire: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    riposte: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    searing_bond: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage_over_time',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'totem_life_incr',
                            'fire_skill_dot_damage_per_minute'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    shadow_projectiles: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            'projectile_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    shield_charge: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'shield_charge_damage',
                            'shield_charge_stun_threshold',
                            'shield_charge_stun',
                            'movement_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    charged_dash: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'charged_dash_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    new_shield_charge: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'shield_charge_damage',
                            'shield_charge_stun_threshold',
                            'movement_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    shock_ground: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_area',
                            'skill_duration',
                            'cast_when_hit'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    shock_nova: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'shock_chance',
                            'shock_duration',
                            'shock_nova_ring_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    new_shock_nova: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'newshocknova_first_ring_damage',
                            'shock_chance',
                            'shock_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    shrapnel_shot: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            '$supports_area',
                            'number_of_arrows',
                            'arrow_pierce_chance',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    siege_ballista: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'totem_summon_speed_incr',
                            'pierce_chance',
                            'number_of_arrows'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    smoke_mine: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_area',
                            '$supports_mine',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    snipe: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'attack_speed_per_frenzy_charge',
                            'arrow_pierce_chance'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    spark: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            'skill_duration',
                            'number_of_projectiles',
                            'projectile_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_spark: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_projectile',
                            'skill_duration',
                            'number_of_projectiles',
                            'projectile_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    split_arrow: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_projectile',
                            'number_of_arrows',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    spirit_offering: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_curse',
                            '$supports_mineable',
                            'skill_duration',
                            'spirit_offering_life_as_es_per_corpse',
                            'physical_damage_to_add_as_chaos',
                            'elemental_resist'
                        ],
                        start_file: 'offering_skill_stat_descriptions'
                    },
                    static_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'static_strike_damage',
                            'shock_chance',
                            'shock_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    storm_burst: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_projectile',
                            'active_skill_area_damage_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    storm_call: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'shock_effect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_storm_call: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    storm_cascade_player: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'cast_on_attack'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    summon_beastial_rhoa: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'number_of_beasts',
                            'display_minion_life'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_beastial_snake: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'number_of_beasts',
                            'display_minion_life'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_beastial_ursa: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'number_of_beasts',
                            'display_minion_life'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_chaos_elemental: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'display_minion_life',
                            'minion_damage_final',
                            'golem_grants_phys_reduction',
                            'number_of_golems'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_essence_spirits: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'minion_damage_final'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_fire_elemental: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'display_minion_life',
                            'minion_damage_final',
                            'golem_grants_damage',
                            'number_of_golems'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_harbinger_of_the_arcane: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            'display_one_harbinger_allowed'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_harbinger_of_time: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            'display_one_harbinger_allowed'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_harbinger_of_focus: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            'display_one_harbinger_allowed'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_harbinger_of_directons: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            'display_one_harbinger_allowed'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_harbinger_of_storms: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            'display_one_harbinger_allowed'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_harbinger_of_brutality: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            'display_one_harbinger_allowed'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_ice_elemental: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'display_minion_life',
                            'minion_damage_final',
                            'golem_grants_accuracy',
                            'golem_grants_crit_chance',
                            'number_of_golems'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_lightning_golem: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_do_anything',
                            'display_minion_life',
                            'minion_damage_incr',
                            'golem_grants_attack_and_cast_speed',
                            'number_of_golems'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_raging_spirit: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'number_of_raging_spirits',
                            'minion_duration',
                            'minion_added_damage'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_rigwalds_pack: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'number_of_wolves_allowed',
                            'generic_minion_duration',
                            'display_minion_life'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_rock_golem: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'display_minion_life',
                            'minion_damage_final',
                            'minion_damage_incr',
                            'golem_grants_life_regen',
                            'number_of_golems'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    summon_skeletons: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'melee_skeletons_to_summon',
                            'number_of_skeletons_allowed',
                            'minion_duration',
                            'unused_identifier_elemental_damage_final',
                            'display_minion_life',
                            'minion_added_damage'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    vaal_summon_skeletons: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            '$supports_minions_do_anything',
                            'melee_skeletons_to_summon',
                            'archer_skeletons_to_summon',
                            'mage_skeletons_to_summon',
                            'leader_skeletons_to_summon',
                            'number_of_skeletons_allowed',
                            'minion_duration',
                            'display_minion_life',
                            'minion_added_damage'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    sunder: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'sunder_explosion_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    sweep: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'attack_speed_more',
                            'knockback',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    teleport_ball: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_variable_duration',
                            'cast_speed_incr'
                        ],
                        start_file: 'variable_duration_skill_stat_descriptions'
                    },
                    vaal_lightning_warp: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_variable_duration',
                            'cast_speed_incr'
                        ],
                        start_file: 'variable_duration_skill_stat_descriptions'
                    },
                    tempest_shield: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            'shield_block',
                            'chain_num',
                            'buff_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    temporal_chains: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_curse',
                            '$supports_mineable',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'action_speed_reduction',
                            'buff_time_passed_reduction'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    thrown_weapon: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_thrown_weapon: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            'attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    tornado_shot: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    totem_consume_corpse: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'corpse_consumption_life',
                            'corpse_consumption_mana',
                            'totem_life_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    totem_earthquake: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'knockback',
                            'totem_life_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    totem_fire_spray: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_is_totem',
                            '$supports_projectile',
                            '$supports_trappable',
                            '$supports_mineable',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'totem_life_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    totem_life_regen: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            '$supports_aura',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'life_regen_per_minute',
                            'aura_area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    totem_melee: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'totem',
                            'totem_duration',
                            'num_totems',
                            'totem_life_incr',
                            'melee_range',
                            'ancestor_totem_grants_attack_speed',
                            'ancestor_totem_grants_attack_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    totem_taunt: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_is_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_area',
                            'totem',
                            'totem_duration',
                            'totem_range',
                            'num_totems',
                            'totem_life_incr',
                            'totems_cannot_evade'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    town_portal: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'cast_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vaal_breach: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            'cast_speed_incr',
                            'display_vaal_breach_no_drops_xp'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    trap_beartrap: {
                        filter: [
                            '$secondary_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_mineable',
                            '$supports_trap',
                            'movement_speed_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    trap_convert: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_mineable',
                            '$supports_trap',
                            'skill_duration'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    trap_ground_fire: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_damage_over_time',
                            '$supports_area',
                            '$supports_mineable',
                            '$supports_trap',
                            'skill_duration',
                            'fire_skill_dot_area_damage_per_minute',
                            'burn_damage'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    trap_ice: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_damage',
                            '$supports_area',
                            '$supports_mineable',
                            '$supports_trap',
                            'area_of_effect_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    triggered_lightning_spell: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            'area_of_effect_incr',
                            'cast_this_spell_on_crit'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    triggered_summon_spider: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'cast_on_kill_target_self',
                            'skill_duration',
                            'number_of_spiders',
                            'display_minions_level_is_corpse_level'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    unique_animate_weapon: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'attack_speed_incr',
                            'attack_damage_incr',
                            'cast_on_rampage',
                            'minion_movement_speed_incr'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    vaal_aura_elemental_damage_healing: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'base_elemental_damage_heals',
                            'buff_duration'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    vengeance: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    vigilant_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            'fortify_duration_incr'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    viper_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_damage_over_time',
                            'poison_chance',
                            'poison_skill_duration',
                            'attack_speed_incr'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    vitality: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'life_regen_per_minute_percent'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    void_gaze: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_area',
                            'buff_duration',
                            'cast_on_skill_use',
                            'chaos_res'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    vulnerability: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_curse',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'physical_damage_taken_incr',
                            'degen_effect_incr'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    warlords_mark: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_curse',
                            '$supports_area',
                            'curse_duration',
                            'area_of_effect_incr',
                            'chance_to_be_stunned',
                            'stun_recovery_incr',
                            'life_leeched_when_hit',
                            'mana_leeched_when_hit',
                            'chance_to_grant_endurance_charge_on_death'
                        ],
                        start_file: 'curse_skill_stat_descriptions'
                    },
                    wild_strike: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_area',
                            '$supports_projectile',
                            'wild_strike_damage_convert'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    wither_channel: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_area',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_channelling',
                            'buff_duration',
                            'area_of_effect_incr',
                            'chaos_damage_taken_incr',
                            'movement_speed_incr'
                        ],
                        start_file: 'debuff_skill_stat_descriptions'
                    },
                    wrath: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_totem',
                            '$supports_area',
                            '$supports_aura',
                            'area_of_effect_incr',
                            'attack_added_lightning',
                            'wrath_spell_lightning_damage'
                        ],
                        start_file: 'aura_skill_stat_descriptions'
                    },
                    word_of_blades: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_projectile',
                            'number_of_projectiles',
                            'chain_num',
                            'cast_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_blades: 'word_of_blades',
                    decree_of_blades: 'word_of_blades',
                    commandment_of_blades: 'word_of_blades',
                    word_of_flames: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            'cast_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_flames: 'word_of_flames',
                    decree_of_flames: 'word_of_flames',
                    commandment_of_flames: 'word_of_flames',
                    word_of_force_on_hit: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'attack_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_force_on_hit: 'word_of_force_on_hit',
                    decree_of_force_on_hit: 'word_of_force_on_hit',
                    commandment_of_force_on_hit: 'word_of_force_on_hit',
                    word_of_frost: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_projectile',
                            'number_of_projectiles',
                            'cast_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_frost: 'word_of_frost',
                    decree_of_frost: 'word_of_frost',
                    commandment_of_frost: 'word_of_frost',
                    word_of_fury_on_hit: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            'number_of_projectiles',
                            'attack_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_fury_on_hit: 'word_of_fury_on_hit',
                    decree_of_fury_on_hit: 'word_of_fury_on_hit',
                    commandment_of_fury_on_hit: 'word_of_fury_on_hit',
                    word_of_inferno_on_kill: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            'cast_on_kill_target_self',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_inferno_on_kill: 'word_of_inferno_on_kill',
                    decree_of_inferno_on_kill: 'word_of_inferno_on_kill',
                    commandment_of_inferno_on_kill: 'word_of_inferno_on_kill',
                    word_of_ire_when_hit: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'counterattack_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_ire_when_hit: 'word_of_ire_when_hit',
                    decree_of_ire_when_hit: 'word_of_ire_when_hit',
                    commandment_of_ire_when_hit: 'word_of_ire_when_hit',
                    word_of_light_when_critically_hit: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'life_regen_per_minute_percent',
                            'counterattack_when_crit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_light_when_critically_hit: 'word_of_light_when_critically_hit',
                    decree_of_light_when_critically_hit: 'word_of_light_when_critically_hit',
                    commandment_of_light_when_critically_hit: 'word_of_light_when_critically_hit',
                    word_of_reflection_when_hit: {
                        filter: [
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_all',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'minion_duration',
                            'cast_when_hit',
                            'display_minion_life',
                            'minion_damage_final'
                        ],
                        start_file: 'minion_skill_stat_descriptions'
                    },
                    edict_of_reflection_when_hit: 'word_of_reflection_when_hit',
                    decree_of_reflection_when_hit: 'word_of_reflection_when_hit',
                    commandment_of_reflection_when_hit: 'word_of_reflection_when_hit',
                    word_of_spite_when_hit: {
                        filter: [
                            '$weapon_damage',
                            '$supports_all',
                            '$supports_attack',
                            '$supports_damage',
                            '$supports_projectile',
                            'number_of_projectiles',
                            'projectile_ground_effect_duration',
                            'counterattack_on_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_spite_when_hit: 'word_of_spite_when_hit',
                    decree_of_spite_when_hit: 'word_of_spite_when_hit',
                    commandment_of_spite_when_hit: 'word_of_spite_when_hit',
                    word_of_tempest_on_hit: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            'skill_duration',
                            'cast_on_kill_target_self',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_tempest_on_hit: 'word_of_tempest_on_hit',
                    decree_of_tempest_on_hit: 'word_of_tempest_on_hit',
                    commandment_of_tempest_on_hit: 'word_of_tempest_on_hit',
                    word_of_the_grave_on_kill: {
                        filter: [
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_totem',
                            '$supports_trappable',
                            '$supports_mineable',
                            '$supports_minions_not_life',
                            '$supports_minion_damage',
                            '$supports_minions_attack',
                            'number_of_raging_spirits',
                            'minion_duration',
                            'display_minion_life',
                            'minion_damage_final'
                        ],
                        start_file: 'minion_spell_skill_stat_descriptions'
                    },
                    edict_of_the_grave_on_kill: 'word_of_the_grave_on_kill',
                    decree_of_the_grave_on_kill: 'word_of_the_grave_on_kill',
                    commandment_of_the_grave_on_kill: 'word_of_the_grave_on_kill',
                    word_of_thunder_on_kill: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_area',
                            'cast_on_kill_target_self',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_thunder_on_kill: 'word_of_thunder_on_kill',
                    decree_of_thunder_on_kill: 'word_of_thunder_on_kill',
                    commandment_of_thunder_on_kill: 'word_of_thunder_on_kill',
                    word_of_war_on_kill: {
                        filter: [
                            '$weapon_damage',
                            '$supports_attack',
                            '$supports_all',
                            '$supports_damage',
                            'attack_speed_incr',
                            'skill_duration',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_war_on_kill: 'word_of_war_on_kill',
                    decree_of_war_on_kill: 'word_of_war_on_kill',
                    commandment_of_war_on_kill: 'word_of_war_on_kill',
                    word_of_winter_when_hit: {
                        filter: [
                            '$spell_damage',
                            '$supports_all',
                            '$supports_spell',
                            '$supports_triggerable_spell',
                            '$supports_damage',
                            '$supports_projectile',
                            '$supports_area',
                            'cast_when_hit',
                            'no_reflect'
                        ],
                        start_file: 'skill_stat_descriptions'
                    },
                    edict_of_winter_when_hit: 'word_of_winter_when_hit',
                    decree_of_winter_when_hit: 'word_of_winter_when_hit',
                    commandment_of_winter_when_hit: 'word_of_winter_when_hit'
                }
            });
        }
    };
});
System.register("format/gemStats", ["requiredLocaleDatas", "translate/skill_meta", "format/stats"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    function formatGemStats(gem_id, stats, options) {
        if (options === void 0) { options = {}; }
        var filter = findSkill(gem_id);
        return stats_1.default(stats, __assign({}, options, { fallback: stats_1.Fallback.skip, start_file: filter.start_file }));
    }
    exports_15("default", formatGemStats);
    function requiredLocaleDatas(gem_id) {
        var filter = findSkill(gem_id);
        return requiredLocaleDatas_1.default([filter.start_file]);
    }
    exports_15("requiredLocaleDatas", requiredLocaleDatas);
    function findSkill(id) {
        var skill = skill_meta_1.default.skills[id];
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
    var requiredLocaleDatas_1, skill_meta_1, stats_1;
    return {
        setters: [
            function (requiredLocaleDatas_1_1) {
                requiredLocaleDatas_1 = requiredLocaleDatas_1_1;
            },
            function (skill_meta_1_1) {
                skill_meta_1 = skill_meta_1_1;
            },
            function (stats_1_1) {
                stats_1 = stats_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("format/groupMods", ["format/stats"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
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
    function groupMod(mods, options) {
        if (options === void 0) { options = {}; }
        // default options
        var _a = options.resolveWordConflict, resolveWordConflict = _a === void 0 ? function () { return '*'; } : _a, format_stats_options = __rest(options, ["resolveWordConflict"]);
        // reduce mods to array
        var translations = [];
        try {
            for (var mods_1 = __values(mods), mods_1_1 = mods_1.next(); !mods_1_1.done; mods_1_1 = mods_1.next()) {
                var mod = mods_1_1.value;
                translations.push(groupStats(mod, format_stats_options).split(' '));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (mods_1_1 && !mods_1_1.done && (_b = mods_1.return)) _b.call(mods_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return collapseTable(translations, resolveWordConflict)
            .join(' ')
            .replace(/\*( \*)*/, '*');
        var e_3, _b;
    }
    exports_16("default", groupMod);
    function groupStats(stats, options) {
        if (options === void 0) { options = {}; }
        var lines = stats_2.default(stats, __assign({}, options, { getFormatters: function (t, s, n) {
                return Array.from({ length: n }, function (_, i) { return ({
                    arg: i + 1,
                    id: 'placeholder'
                }); });
            }, fallback: stats_2.Fallback.skip_if_zero }));
        // collapes value ranges into single placeholder
        return lines.map(function (line) { return line.replace(/\(# - #\)/g, '#'); }).join(' / ');
    }
    function collapseTable(table, resolveColumnConflict) {
        if (table.length < 1) {
            return [];
        }
        var column_count = table[0].length;
        // rows to columns
        var columns = new Array(column_count);
        var _loop_2 = function (j) {
            columns[j] = table.reduce(function (column, row) {
                return column.add(row[j]);
            }, new Set());
        };
        for (var j = 0; j < column_count; ++j) {
            _loop_2(j);
        }
        return columns.map(function (column) {
            if (column.size > 1) {
                return resolveColumnConflict(Array.from(column));
            }
            else {
                return column.values().next().value;
            }
        });
    }
    var stats_2;
    return {
        setters: [
            function (stats_2_1) {
                stats_2 = stats_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("util/symbolicStats", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function deterministicValueForMatcher(matcher) {
        if (Array.isArray(matcher)) {
            var _a = __read(matcher, 2), min = _a[0], max = _a[1];
            if (min === '#' && max === '#') {
                return 0;
            }
            else if (min === '#' && max !== '#') {
                return max;
            }
            else if (min !== '#' && max === '#') {
                return min;
            }
            else if (min !== '#' && max !== '#') {
                return Math.floor((max - min) / 2);
            }
            else {
                throw new Error('ts never');
            }
        }
        else if (matcher === '#') {
            return 0;
        }
        else {
            return matcher;
        }
    }
    exports_17("deterministicValueForMatcher", deterministicValueForMatcher);
    // builds random stats matching every single translation of the description
    function buildRandomStats(description) {
        if (description.no_description) {
            return null;
        }
        return description.translations.map(function (_a) {
            var matchers = _a.matchers;
            return description.stats.map(function (stat_id, i) {
                return {
                    id: stat_id,
                    // division by 60 can produce nasty rounding errors
                    value: randomNumberForMatcher(matchers[i])
                };
            });
        });
    }
    exports_17("buildRandomStats", buildRandomStats);
    function randomNumberForMatcher(matcher, step, precision) {
        if (step === void 0) { step = 1; }
        if (precision === void 0) { precision = 0; }
        if (Array.isArray(matcher)) {
            var _a = __read(matcher, 2), min = _a[0], max = _a[1];
            if (min === '#' && max === '#') {
                return randomNumberForMatcher('#', step, precision);
            }
            else if (min === '#' && max !== '#') {
                return randomNumber({ precision: precision, max: max });
            }
            else if (min !== '#' && max === '#') {
                return randomNumber({ precision: precision, min: min });
            }
            else if (min !== '#' && max !== '#') {
                return randomNumber({ precision: precision, min: min, max: max, step: step });
            }
            else {
                throw new Error('ts never');
            }
        }
        else if (matcher === '#') {
            return randomNumber({ precision: precision, max: -1, step: step });
        }
        else {
            return matcher;
        }
    }
    function randomNumber(domain) {
        if (domain === void 0) { domain = {}; }
        // tslint:disable-next-line: no-bitwise
        var _a = domain.min, min = _a === void 0 ? 1 << 31 : _a, _b = domain.max, max = _b === void 0 ? Math.pow(2, 31) - 1 : _b, _c = domain.precision, precision = _c === void 0 ? 0 : _c, _d = domain.step, step = _d === void 0 ? 1 : _d;
        var range = Math.abs(max - min);
        var rand = Math.random();
        var n = +(rand * range + min);
        return +(n - +(n % step).toFixed(precision)).toFixed(precision);
    }
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("format/util", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    function getDescriptions(datas, start_file) {
        var description_file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    description_file = datas[start_file];
                    _a.label = 1;
                case 1:
                    if (!(description_file !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, description_file.data];
                case 2:
                    _a.sent();
                    description_file = description_file.meta.include
                        ? datas[description_file.meta.include]
                        : undefined;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    }
    exports_18("getDescriptions", getDescriptions);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("format/textToStats", ["localize/formatters", "translate/index", "util/symbolicStats", "format/util"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    /**
     * finds every stat or list of stats that could produce this text with its values
     *
     * use {textToStatsSingle} if you just want the first match
     * use {textToStatsArray} if you want the generator values as an array
     *
     * @param text the stat text
     * @param options see type definition
     */
    function textToStats(text, options) {
        if (options === void 0) { options = {}; }
        var _a, datas, _b, start_file, _c, _d, descriptions, _e, _f, description, _loop_3, _g, _h, translation, e_4_1, e_5_1, e_6_1, e_6, _j, e_5, _k, e_4, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _a = options.datas, datas = _a === void 0 ? {} : _a, _b = options.start_file, start_file = _b === void 0 ? 'stat_descriptions' : _b;
                    _m.label = 1;
                case 1:
                    _m.trys.push([1, 18, 19, 20]);
                    _c = __values(util_1.getDescriptions(datas, start_file)), _d = _c.next();
                    _m.label = 2;
                case 2:
                    if (!!_d.done) return [3 /*break*/, 17];
                    descriptions = _d.value;
                    _m.label = 3;
                case 3:
                    _m.trys.push([3, 14, 15, 16]);
                    _e = __values(Object.values(descriptions)), _f = _e.next();
                    _m.label = 4;
                case 4:
                    if (!!_f.done) return [3 /*break*/, 13];
                    description = _f.value;
                    if (description.no_description) {
                        return [3 /*break*/, 12];
                    }
                    _loop_3 = function (translation) {
                        var regexp, match, stats;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    regexp = translate_3.asRegexp(translation);
                                    match = regexp.match(text);
                                    if (!(match !== null)) return [3 /*break*/, 2];
                                    stats = description.stats.map(function (stat_id, i) {
                                        // arguments are 1-based
                                        var arg_index = String(i + 1);
                                        var matched_value = match[arg_index];
                                        var matcher = translation.matchers[i];
                                        var value = Number.NaN;
                                        if (matched_value !== undefined) {
                                            var formatter = translation.formatters.find(function (_a) {
                                                var arg = _a.arg;
                                                return String(arg) === arg_index;
                                            });
                                            if (formatter === undefined) {
                                                value = +matched_value;
                                            }
                                            else {
                                                value = formatters_3.inverseFactory(formatter.id)(matched_value);
                                                if (Number.isNaN(value)) {
                                                    // otherwise the return value would be equal to the case
                                                    // where the value is not contained in the text
                                                    throw new Error('int parsing returned NaN');
                                                }
                                            }
                                        }
                                        else if (typeof matcher === 'number') {
                                            // value is not contained in the text
                                            // guess (deterministically) a value for this instance
                                            // that would have produced that translation
                                            value = symbolicStats_1.deterministicValueForMatcher(translation.matchers[i]);
                                        }
                                        return {
                                            id: stat_id,
                                            value: value
                                        };
                                    });
                                    if (!translate_3.matchesTranslation(translation, stats.map(function (_a) {
                                        var value = _a.value;
                                        return value;
                                    }))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, stats];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _m.label = 5;
                case 5:
                    _m.trys.push([5, 10, 11, 12]);
                    _g = __values(description.translations), _h = _g.next();
                    _m.label = 6;
                case 6:
                    if (!!_h.done) return [3 /*break*/, 9];
                    translation = _h.value;
                    return [5 /*yield**/, _loop_3(translation)];
                case 7:
                    _m.sent();
                    _m.label = 8;
                case 8:
                    _h = _g.next();
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_4_1 = _m.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (_h && !_h.done && (_l = _g.return)) _l.call(_g);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 12:
                    _f = _e.next();
                    return [3 /*break*/, 4];
                case 13: return [3 /*break*/, 16];
                case 14:
                    e_5_1 = _m.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 16];
                case 15:
                    try {
                        if (_f && !_f.done && (_k = _e.return)) _k.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 16:
                    _d = _c.next();
                    return [3 /*break*/, 2];
                case 17: return [3 /*break*/, 20];
                case 18:
                    e_6_1 = _m.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 20];
                case 19:
                    try {
                        if (_d && !_d.done && (_j = _c.return)) _j.call(_c);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    }
    exports_19("default", textToStats);
    /**
     * @see {textToStats} as array
     *
     * @param text
     * @param options
     */
    function textToStatsArray(text, options) {
        if (options === void 0) { options = {}; }
        return Array.from(textToStats(text, options));
    }
    exports_19("textToStatsArray", textToStatsArray);
    /**
     * only first match of  @see {textToStats} but throws if none was found
     *
     * @param text
     * @param options
     */
    function textToStatsFirst(text, options) {
        if (options === void 0) { options = {}; }
        var _a = textToStats(text, options).next(), done = _a.done, value = _a.value;
        if (done) {
            throw new Error('Could match a single stat');
        }
        return value;
    }
    exports_19("textToStatsFirst", textToStatsFirst);
    var formatters_3, translate_3, symbolicStats_1, util_1;
    return {
        setters: [
            function (formatters_3_1) {
                formatters_3 = formatters_3_1;
            },
            function (translate_3_1) {
                translate_3 = translate_3_1;
            },
            function (symbolicStats_1_1) {
                symbolicStats_1 = symbolicStats_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("Format", ["format/gemStats", "format/groupMods", "format/stats", "format/textToStats"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var gemStats_1, groupMods_1, stats_3, textToStats_1, Fallback, Format;
    return {
        setters: [
            function (gemStats_1_1) {
                gemStats_1 = gemStats_1_1;
            },
            function (groupMods_1_1) {
                groupMods_1 = groupMods_1_1;
            },
            function (stats_3_1) {
                stats_3 = stats_3_1;
            },
            function (textToStats_1_1) {
                textToStats_1 = textToStats_1_1;
            }
        ],
        execute: function () {
            (function (Fallback) {
                Fallback[Fallback["throw"] = 0] = "throw";
                Fallback[Fallback["id"] = 1] = "id";
                Fallback[Fallback["skip"] = 2] = "skip";
            })(Fallback || (Fallback = {}));
            exports_20("Fallback", Fallback);
            Format = /** @class */ (function () {
                function Format() {
                    this.options = {
                        datas: {},
                        fallback: Fallback.throw,
                        start_file: 'stat_descriptions'
                    };
                }
                Format.prototype.configure = function (options) {
                    this.options = __assign({}, this.options, options);
                };
                Format.prototype.stats = function (stats) {
                    return stats_3.default(stats, this.options);
                };
                Format.prototype.gemStats = function (gem_id, stats) {
                    return gemStats_1.default(gem_id, stats, this.options);
                };
                Format.prototype.groupMods = function (mods) {
                    return groupMods_1.default(mods, this.options);
                };
                Format.prototype.textToStats = function (text, options) {
                    if (options === void 0) { options = {}; }
                    var _a = this.options, datas = _a.datas, start_file = _a.start_file;
                    return textToStats_1.default(text, __assign({ datas: datas,
                        start_file: start_file }, options));
                };
                return Format;
            }());
            exports_20("Format", Format);
            exports_20("default", new Format());
        }
    };
});
System.register("localize/formatValueRange", ["localize/formatValues"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    function formatValueRange(values, options) {
        return formatValues_2.formatValue(values[0], options) + " - " + formatValues_2.formatValue(values[1], options);
    }
    exports_21("default", formatValueRange);
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
System.register("util/inflectionIdentifier", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    function inflectionIdentifier(context) {
        var inflection = context.inflection;
        var gender;
        var plural;
        if (inflection != null) {
            _a = __read(inflection.split(''), 2), gender = _a[0], plural = _a[1];
        }
        return [gender || default_gender, plural || default_plural].join('');
        var _a;
    }
    exports_22("default", inflectionIdentifier);
    var default_gender, default_plural;
    return {
        setters: [],
        execute: function () {
            default_gender = 'N';
            default_plural = 'S';
        }
    };
});
System.register("index", ["format/stats", "format/gemStats", "format/groupMods", "format/textToStats", "Format", "requiredLocaleDatas", "localize/formatValueRange", "localize/formatValues", "util/inflectionIdentifier"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (stats_4_1) {
                exports_23({
                    "formatStats": stats_4_1["default"],
                    "Fallback": stats_4_1["Fallback"]
                });
            },
            function (gemStats_2_1) {
                exports_23({
                    "formatGemStats": gemStats_2_1["default"]
                });
            },
            function (groupMods_2_1) {
                exports_23({
                    "groupMods": groupMods_2_1["default"]
                });
            },
            function (textToStats_2_1) {
                exports_23({
                    "textToStats": textToStats_2_1["default"],
                    "textToStatsArray": textToStats_2_1["textToStatsArray"],
                    "textToStatsFirst": textToStats_2_1["textToStatsFirst"]
                });
            },
            function (Format_1_1) {
                exports_23({
                    "format": Format_1_1["default"],
                    "Format": Format_1_1["Format"]
                });
            },
            function (requiredLocaleDatas_2_1) {
                exports_23({
                    "requiredLocaleDatas": requiredLocaleDatas_2_1["default"]
                });
            },
            function (formatValueRange_1_1) {
                exports_23({
                    "formatValueRange": formatValueRange_1_1["default"]
                });
            },
            function (formatValues_3_1) {
                exports_23({
                    "formatValue": formatValues_3_1["formatValue"]
                });
            },
            function (inflectionIdentifier_1_1) {
                exports_23({
                    "inflectionIdentifier": inflectionIdentifier_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
