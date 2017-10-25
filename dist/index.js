var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
System.register("translate/match", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    // does a value match a matcher
    function matchesSingle(value, matcher) {
        return matches([value], [matcher])[0];
    }
    exports_1("matchesSingle", matchesSingle);
    function matches(values, matchers) {
        return matchers.map(function (matcher, i) { return match(values[i], matcher); });
    }
    exports_1("matches", matches);
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
        var _a = isBoundedRange(value) ? value : [value, value], lower = _a[0], upper = _a[1];
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
            exports_3("isRange", isRange = function (value) {
                return Array.isArray(value) && value.length === 2;
            });
        }
    };
});
System.register("localize/formatters", ["types/StatValue"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
                deciseconds_to_seconds: function (n) { return n * 10; },
                divide_by_one_hundred: function (n) { return n / 100; },
                per_minute_to_per_second: function (n) { return Math.round(n / 60); },
                milliseconds_to_seconds: function (n) { return n / 1000; },
                negate: function (n) { return -n; },
                divide_by_one_hundred_and_negate: function (n) { return -n / 100; },
                old_leech_percent: function (n) { return n / 5; },
                old_leech_permyriad: function (n) { return n / 50; },
                per_minute_to_per_second_0dp: function (n) { return (n / 60).toFixed(0); },
                per_minute_to_per_second_2dp: function (n) { return (n / 60).toFixed(2); },
                per_minute_to_per_second_2dp_if_required: function (n) { return (n / 60).toPrecision(2); },
                milliseconds_to_seconds_0dp: function (n) { return (n / 1000).toFixed(0); },
                milliseconds_to_seconds_2dp: function (n) { return (n / 1000).toFixed(2); },
                multiplicative_damage_modifier: function (n) { return n; },
                '60%_of_value': function (n) { return n * 0.6; },
                id: function (n) { return n; }
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
        var formatted = values.slice();
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
                .replace("%" + (i + 1) + "%", String(param))
                .replace("%" + (i + 1) + "$+d", "+" + String(param));
        }, text)
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
System.register("format/stats", ["translate/match", "translate/printf"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    /**
     * O(n) lookup if hash lookup fails
     *
     * @param stat_id
     * @param locale_data
     */
    function findDescription(stat_id, locale_data) {
        return Object.values(locale_data).find(function (_a) {
            var stats = _a.stats;
            return stats.includes(stat_id);
        });
    }
    // stats will get mutated
    function formatWithFinder(stats, find) {
        var lines = [];
        var translated = new Set();
        for (var _i = 0, _a = Array.from(stats.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], stat_id = _b[0], stat = _b[1];
            if (translated.has(stat_id)) {
                continue;
            }
            var description = find(stat);
            if (description !== undefined) {
                var translation = translate(description, stats);
                if (translation === undefined) {
                    throw new Error("matching translation not found for '" + stat.id + "'");
                }
                else {
                    // mark as translated
                    description.stats.forEach(function (translated_id) {
                        stats.delete(translated_id);
                        translated.add(translated_id);
                    });
                    if (translation === NO_DESCRIPTION) {
                        lines.push(stat_id + " (hidden)");
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
            }), translation.formatters);
        }
    }
    function matchingTranslation(translations, stats) {
        var args = stats.map(function (_a) {
            var value = _a.value;
            return value;
        });
        return translations.find(function (translation) {
            return match_1.matches(args, translation.matchers).every(function (match) { return match === match_1.Match.subset || match === match_1.Match.exact; });
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
                .map(function (_a) {
                var id = _a[0], stat = _a[1];
                return fallback(id, stat);
            })
                .filter(function (line) { return typeof line === 'string'; });
        }
        else {
            // should ts recognize that this is unreachable code? enums can prob
            // be extended at runtime an therfore somebody could mess with them
            throw new Error("unrecognized fallback type '" + fallback + "'");
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
                datas: {},
                fallback: Fallback.throw,
                start_file: 'stat_descriptions'
            };
            formatStats = function (stats, options) {
                if (options === void 0) { options = {}; }
                var _a = Object.assign({}, initial_options, options), datas = _a.datas, fallback = _a.fallback, start_file = _a.start_file;
                // translated lines
                var lines = [];
                // array of stat_ids for which hash lookup failed
                var untranslated = new Map(stats.map(function (stat) { return [stat.id, stat]; }));
                var description_file = datas[start_file];
                var _loop_1 = function () {
                    var data = description_file.data;
                    lines.push.apply(lines, formatWithFinder(untranslated, function (_a) {
                        var id = _a.id;
                        return data[id];
                    }));
                    lines.push.apply(lines, formatWithFinder(untranslated, function (_a) {
                        var id = _a.id;
                        return findDescription(id, data);
                    }));
                    description_file = description_file.meta.include
                        ? datas[description_file.meta.include]
                        : undefined;
                };
                while (description_file !== undefined) {
                    _loop_1();
                }
                lines.push.apply(lines, formatWithFallback(untranslated, fallback));
                return lines;
            };
            exports_7("default", formatStats);
            NO_DESCRIPTION = 'NO_DESCRIPTION';
        }
    };
});
System.register("translate/descriptions_dependency", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            exports_8("default", Object.freeze({
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
System.register("requiredLocaleDatas", ["translate/descriptions_dependency"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function requiredLocaleDatas(files) {
        var datas = files.slice();
        var queued = files.slice(); // clone
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
    exports_9("default", requiredLocaleDatas);
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
System.register("translate/skill_meta", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            exports_10("default", {
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
System.register("format/gemStats", ["requiredLocaleDatas", "translate/skill_meta", "format/stats"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    function formatGemStats(gem_id, stats, options) {
        if (options === void 0) { options = {}; }
        var filter = findSkill(gem_id);
        return stats_1.default(stats, __assign({}, options, { fallback: stats_1.Fallback.skip, start_file: filter.start_file }));
    }
    exports_11("default", formatGemStats);
    function requiredLocaleDatas(gem_id) {
        var filter = findSkill(gem_id);
        return requiredLocaleDatas_1.default([filter.start_file]);
    }
    exports_11("requiredLocaleDatas", requiredLocaleDatas);
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
System.register("Format", ["format/gemStats", "format/stats"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var gemStats_1, stats_2, Fallback, Format;
    return {
        setters: [
            function (gemStats_1_1) {
                gemStats_1 = gemStats_1_1;
            },
            function (stats_2_1) {
                stats_2 = stats_2_1;
            }
        ],
        execute: function () {
            (function (Fallback) {
                Fallback[Fallback["throw"] = 0] = "throw";
                Fallback[Fallback["id"] = 1] = "id";
                Fallback[Fallback["skip"] = 2] = "skip";
            })(Fallback || (Fallback = {}));
            exports_12("Fallback", Fallback);
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
                    return stats_2.default(stats, this.options);
                };
                Format.prototype.gemStats = function (gem_id, stats) {
                    return gemStats_1.default(gem_id, stats, this.options);
                };
                return Format;
            }());
            exports_12("Format", Format);
            exports_12("default", new Format());
        }
    };
});
System.register("localize/formatValueRange", ["localize/formatValues"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function formatValueRange(values, options) {
        return formatValues_2.formatValue(values[0], options) + " - " + formatValues_2.formatValue(values[1], options);
    }
    exports_13("default", formatValueRange);
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
System.register("util/inflectionIdentifier", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function inflectionIdentifier(context) {
        var inflection = context.inflection;
        var gender;
        var plural;
        if (inflection != null) {
            _a = inflection.split(''), gender = _a[0], plural = _a[1];
        }
        return [gender || default_gender, plural || default_plural].join('');
        var _a;
    }
    exports_14("default", inflectionIdentifier);
    var default_gender, default_plural;
    return {
        setters: [],
        execute: function () {
            default_gender = 'N';
            default_plural = 'S';
        }
    };
});
System.register("index", ["format/stats", "format/gemStats", "Format", "requiredLocaleDatas", "localize/formatValueRange", "localize/formatValues", "util/inflectionIdentifier"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (stats_3_1) {
                exports_15({
                    "formatStats": stats_3_1["default"],
                    "Fallback": stats_3_1["Fallback"]
                });
            },
            function (gemStats_2_1) {
                exports_15({
                    "formatGemStats": gemStats_2_1["default"]
                });
            },
            function (Format_1_1) {
                exports_15({
                    "format": Format_1_1["default"],
                    "Format": Format_1_1["Format"]
                });
            },
            function (requiredLocaleDatas_2_1) {
                exports_15({
                    "requiredLocaleDatas": requiredLocaleDatas_2_1["default"]
                });
            },
            function (formatValueRange_1_1) {
                exports_15({
                    "formatValueRange": formatValueRange_1_1["default"]
                });
            },
            function (formatValues_3_1) {
                exports_15({
                    "formatValue": formatValues_3_1["formatValue"]
                });
            },
            function (inflectionIdentifier_1_1) {
                exports_15({
                    "inflectionIdentifier": inflectionIdentifier_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
