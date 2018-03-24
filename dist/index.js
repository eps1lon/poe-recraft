var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
System.register("schema", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("calculator/ValueRange", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function tuple(value) {
        if (value instanceof ValueRange) {
            return value.asTuple();
        }
        else if (Array.isArray(value)) {
            return value;
        }
        else {
            return [value, value];
        }
    }
    var ValueRange;
    return {
        setters: [],
        execute: function () {
            ValueRange = /** @class */ (function () {
                function ValueRange(range) {
                    var _a = tuple(range), min = _a[0], max = _a[1];
                    this.min = min;
                    this.max = max;
                }
                ValueRange.isZero = function (value) {
                    var _a = tuple(value), min = _a[0], max = _a[1];
                    return min === 0 && max === 0;
                };
                ValueRange.prototype.add = function (other) {
                    if (other instanceof ValueRange && other.isAddIdentity()) {
                        return this;
                    }
                    else {
                        var _a = tuple(other), min = _a[0], max = _a[1];
                        return new ValueRange([this.min + min, this.max + max]);
                    }
                };
                ValueRange.prototype.mult = function (other) {
                    if (other instanceof ValueRange && other.isMultIdentity()) {
                        return this;
                    }
                    else {
                        var _a = tuple(other), min = _a[0], max = _a[1];
                        return new ValueRange([this.min * min, this.max * max]);
                    }
                };
                ValueRange.prototype.map = function (mapFn) {
                    var _a = [mapFn(this.min), mapFn(this.max)], min = _a[0], max = _a[1];
                    if (min !== this.min || max !== this.max) {
                        return new ValueRange([min, max]);
                    }
                    else {
                        return this;
                    }
                };
                ValueRange.prototype.isAddIdentity = function () {
                    return this.min === 0 && this.max === 0;
                };
                ValueRange.prototype.isMultIdentity = function () {
                    return this.min === 1 && this.max === 1;
                };
                /**
                 * +29% => 1.29
                 */
                ValueRange.prototype.percentToFactor = function () {
                    return this.mult(new ValueRange([0.01, 0.01])).add(new ValueRange([1, 1]));
                };
                ValueRange.prototype.asTuple = function () {
                    return [this.min, this.max];
                };
                ValueRange.prototype.valueOf = function () {
                    var range = this.asTuple();
                    if (range[0] === range[1]) {
                        return range[0];
                    }
                    else {
                        return range;
                    }
                };
                return ValueRange;
            }());
            exports_2("default", ValueRange);
            // since ValueRange is immutable we can have this singletons
            // can still be reassigned though :(
            ValueRange.zero = new ValueRange([0, 0]);
            ValueRange.one = new ValueRange([1, 1]);
        }
    };
});
System.register("calculator/Stat", ["calculator/ValueRange"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var ValueRange_1, Stat;
    return {
        setters: [
            function (ValueRange_1_1) {
                ValueRange_1 = ValueRange_1_1;
            }
        ],
        execute: function () {
            Stat = /** @class */ (function () {
                function Stat(props, values) {
                    if (values === void 0) { values = [0, 0]; }
                    this.props = props;
                    this.values =
                        values instanceof ValueRange_1.default
                            ? values
                            : new ValueRange_1.default([values[0], values[1]]);
                }
                Stat.prototype.add = function (other) {
                    return new Stat(this.props, this.values.add(other));
                };
                Stat.prototype.mult = function (other) {
                    return new Stat(this.props, this.values.mult(other));
                };
                return Stat;
            }());
            exports_3("default", Stat);
        }
    };
});
System.register("interfaces/Taggable", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/ts", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    // checks if obj[key] can be accessed
    function isKeyOf(key, obj) {
        return key in obj;
    }
    exports_5("isKeyOf", isKeyOf);
    function filterUndefined(item) {
        return item != null;
    }
    exports_5("filterUndefined", filterUndefined);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("mods/Mod", ["calculator/Stat", "util/ts"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Stat_1, ts_1, Mod;
    return {
        setters: [
            function (Stat_1_1) {
                Stat_1 = Stat_1_1;
            },
            function (ts_1_1) {
                ts_1 = ts_1_1;
            }
        ],
        execute: function () {
            Mod = /** @class */ (function () {
                function Mod(props) {
                    this.props = props;
                }
                Mod.build = function (props) {
                    return new this(props);
                };
                Mod.prototype.isType = function (type) {
                    var t = type.toUpperCase();
                    return t in Mod.TYPE && this.props.generation_type === Mod.TYPE[t];
                };
                Mod.prototype.isPrefix = function () {
                    return this.isType('prefix');
                };
                Mod.prototype.isSuffix = function () {
                    return this.isType('suffix');
                };
                Mod.prototype.isEnchantment = function () {
                    return this.isType('enchantment');
                };
                Mod.prototype.isPremade = function () {
                    return this.isType('premade');
                };
                Mod.prototype.isAffix = function () {
                    return this.isPrefix() || this.isSuffix();
                };
                Mod.prototype.isMasterMod = function () {
                    return this.props.domain === Mod.DOMAIN.MASTER;
                };
                Mod.prototype.implicitCandidate = function () {
                    return (this.isPremade() || this.isType('vaal') || this.isType('enchantment'));
                };
                Mod.prototype.statsJoined = function () {
                    var _this = this;
                    return this.props.stats.map(function (stat_props, i) {
                        return _this.nthStat(stat_props, i);
                    });
                };
                /**
                 * string identifier of the generation type
                 */
                Mod.prototype.modType = function () {
                    var _this = this;
                    var entry = Object.entries(Mod.TYPE).find(function (_a) {
                        var type = _a[1];
                        return _this.props.generation_type === type;
                    });
                    if (entry === undefined) {
                        return undefined;
                    }
                    else {
                        return entry[0].toLowerCase();
                    }
                };
                Mod.prototype.requiredLevel = function () {
                    return Math.floor(this.props.level * 0.8);
                };
                Mod.prototype.spawnweightPropsFor = function (other) {
                    var spawn_weights = this.props.spawn_weights;
                    var other_tags = other.getTags();
                    var match = spawn_weights.find(function (_a) {
                        var tag = _a.tag;
                        return other_tags.find(function (item_tag) { return tag === item_tag; }) != null;
                    });
                    if (match == null) {
                        var default_spawnweight = spawn_weights.find(function (_a) {
                            var tag = _a.tag;
                            return tag === 'default';
                        });
                        return default_spawnweight;
                    }
                    else {
                        return match;
                    }
                };
                Mod.prototype.spawnweightFor = function (other) {
                    var spawnweight = this.spawnweightPropsFor(other);
                    if (spawnweight == null) {
                        return 0;
                    }
                    else {
                        return spawnweight.value;
                    }
                };
                Mod.prototype.nthStat = function (stat_props, n) {
                    var min_key = "stat" + (n + 1) + "_min";
                    var max_key = "stat" + (n + 1) + "_max";
                    if (ts_1.isKeyOf(min_key, this.props) && ts_1.isKeyOf(max_key, this.props)) {
                        var stat = new Stat_1.default(stat_props, [
                            +this.props[min_key],
                            +this.props[max_key],
                        ]);
                        return stat;
                    }
                    throw new Error(min_key + " and " + max_key + " not found in ModProps");
                };
                Mod.DOMAIN = {
                    ITEM: 1,
                    FLASK: 2,
                    MONSTER: 3,
                    STRONGBOX: 4,
                    MAP: 5,
                    STANCE: 9,
                    MASTER: 10,
                    JEWEL: 11,
                    ATLAS: 12,
                };
                Mod.TYPE = {
                    PREFIX: 1,
                    SUFFIX: 2,
                    PREMADE: 3,
                    NEMESIS: 4,
                    VAAL: 5,
                    BLOODLINES: 6,
                    TORMENT: 7,
                    TEMPEST: 8,
                    TALISMAN: 9,
                    ENCHANTMENT: 10,
                };
                return Mod;
            }());
            exports_6("default", Mod);
        }
    };
});
System.register("containers/Container", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("mods/meta_mods", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var META_MODS;
    return {
        setters: [],
        execute: function () {
            META_MODS = {
                // TODO
                LOCKED_PREFIXES: 'StrMasterItemGenerationCannotChangePrefixes',
                LOCKED_SUFFIXES: 'DexMasterItemGenerationCannotChangeSuffixes',
                NO_ATTACK_MODS: 'IntMasterItemGenerationCannotRollAttackAffixes',
                NO_CASTER_MODS: 'StrDexMasterItemGenerationCannotRollCasterAffixes',
                MULTIMOD: 'StrIntMasterItemGenerationCanHaveMultipleCraftedMods',
                LLD_MOD: 'PvPMasterLevel28Crafting',
            };
            exports_8("default", Object.freeze(META_MODS));
        }
    };
});
/*
 
type BaseFlag = "one";

type BaseFlags = Flags<BaseFlag>;

const flags: BaseFlags = {
    one: true, // ok
  two: false, // Error! property `three` is a string. This type is incompatible with string enum
  one: 1, // Error! This type is incompatible with boolean
};

Extension
type ExtendedFlag = BaseFlag | "two";

  type ExtendedFlags = BaseFlags | Flags<BaseFlag>; // Flags<ExtendedFlag> polymorphic error!

 */
System.register("util/Flags", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var anySet;
    return {
        setters: [],
        execute: function () {
            exports_9("anySet", anySet = function (flags, whitelist) {
                if (whitelist === void 0) { whitelist = []; }
                // ignore every key in which is in whitelist and no flag set (===true)
                return Object.entries(flags).some(function (_a) {
                    var key = _a[0], value = _a[1];
                    return !whitelist.includes(key) && value;
                });
            });
        }
    };
});
System.register("generators/Generator", ["mods/meta_mods", "util/Flags"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var meta_mods_1, Flags_1, Generator;
    return {
        setters: [
            function (meta_mods_1_1) {
                meta_mods_1 = meta_mods_1_1;
            },
            function (Flags_1_1) {
                Flags_1 = Flags_1_1;
            }
        ],
        execute: function () {
            /**
             * @abstract
             */
            Generator = /** @class */ (function () {
                function Generator(mods) {
                    this.mods = mods;
                }
                /**
                 * returns a copy of #mods
                 *
                 * we can stick with a shallow copy since Mod are supposed to be immutable
                 */
                Generator.prototype.getAvailableMods = function () {
                    return this.mods.slice();
                };
                Generator.prototype.isApplicableTo = function (container, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    return !Flags_1.anySet(this.applicableTo(container), whitelist);
                };
                Generator.prototype.isModApplicableTo = function (mod, container) {
                    var applicable_flags = {
                        domain_full: false,
                        already_present: false,
                        wrong_domain: false,
                        lower_ilvl: false,
                        above_lld_level: false,
                    };
                    if (!container.inDomainOf(mod.props.domain)) {
                        applicable_flags.wrong_domain = true;
                    }
                    else if (!container.hasRoomFor(mod)) {
                        applicable_flags.domain_full = true;
                    }
                    if (mod.props.level > container.level()) {
                        applicable_flags.lower_ilvl = true;
                    }
                    if (container.hasModGroup(mod)) {
                        applicable_flags.already_present = true;
                    }
                    var has_leo_meta_mod = container.indexOfModWithId(meta_mods_1.default.LLD_MOD) !== -1;
                    if (mod.requiredLevel() > 28 && has_leo_meta_mod) {
                        applicable_flags.above_lld_level = true;
                    }
                    return applicable_flags;
                };
                return Generator;
            }());
            exports_10("default", Generator);
        }
    };
});
System.register("util/meta_data", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
            exports_11("default", {
                AbstractAmulet: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                        tag: ['amulet'],
                    },
                    Mods: {
                        inventory_type: ['Amulet'],
                    },
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractAmulet'],
                    tags: ['default', 'amulet'],
                },
                AbstractSocketableAmulet: {
                    AttributeRequirements: {
                        strength_requirement: ['0'],
                        dexterity_requirement: ['0'],
                        intelligence_requirement: ['0'],
                    },
                    Sockets: {
                        socket_info: [
                            '0:1:1 1:9999:100 2:9999:90 3:9999:80 4:9999:30 5:9999:20 6:9999:5',
                        ],
                    },
                    extends: 'AbstractAmulet',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractAmulet',
                        'AbstractSocketableAmulet',
                    ],
                    tags: ['default', 'amulet'],
                },
                Talisman1_1: {
                    extends: 'AbstractSocketableAmulet',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractAmulet',
                        'AbstractSocketableAmulet',
                        'Talisman1_1',
                    ],
                    tags: ['default', 'amulet'],
                },
                Talisman4: {
                    extends: 'AbstractSocketableAmulet',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractAmulet',
                        'AbstractSocketableAmulet',
                        'Talisman4',
                    ],
                    tags: ['default', 'amulet'],
                },
                AbstractArmour: {
                    Base: {
                        tag: ['armour'],
                    },
                    AttributeRequirements: {},
                    Quality: {
                        max_quality: ['20'],
                    },
                    Armour: {},
                    Sockets: {
                        socket_info: ['1:1:100 2:1:90 3:2:80 4:25:30 5:9999:20 6:9999:5'],
                    },
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractArmour'],
                    tags: ['default', 'armour'],
                },
                AbstractBodyArmour: {
                    Base: {
                        tag: ['body_armour'],
                    },
                    Mods: {
                        inventory_type: ['BodyArmour'],
                    },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:25:30 5:35:5 6:50:1'],
                    },
                    extends: 'AbstractArmour',
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractBodyArmour'],
                    tags: ['default', 'armour', 'body_armour'],
                },
                AbstractBoots: {
                    Base: {
                        x_size: ['2'],
                        y_size: ['2'],
                        tag: ['boots'],
                    },
                    Mods: {
                        inventory_type: ['Boots'],
                    },
                    extends: 'AbstractArmour',
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractBoots'],
                    tags: ['default', 'armour', 'boots'],
                },
                AbstractGloves: {
                    Base: {
                        x_size: ['2'],
                        y_size: ['2'],
                        tag: ['gloves'],
                    },
                    Mods: {
                        inventory_type: ['Gloves'],
                    },
                    extends: 'AbstractArmour',
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractGloves'],
                    tags: ['default', 'armour', 'gloves'],
                },
                AbstractHelmet: {
                    Base: {
                        x_size: ['2'],
                        y_size: ['2'],
                        tag: ['helmet'],
                    },
                    Mods: {
                        inventory_type: ['Helm'],
                    },
                    extends: 'AbstractArmour',
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractHelmet'],
                    tags: ['default', 'armour', 'helmet'],
                },
                AbstractShield: {
                    Base: {
                        x_size: ['2'],
                        y_size: ['2'],
                        tag: ['shield'],
                    },
                    Shield: {
                        block_percentage: ['0'],
                    },
                    Mods: {
                        inventory_type: ['Offhand'],
                    },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    extends: 'AbstractArmour',
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractShield'],
                    tags: ['default', 'armour', 'shield'],
                },
                AbstractBelt: {
                    Base: {
                        x_size: ['2'],
                        y_size: ['1'],
                        tag: ['belt'],
                    },
                    Mods: {
                        inventory_type: ['Belt'],
                    },
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractBelt'],
                    tags: ['default', 'belt'],
                },
                AbstractSocketableBelt: {
                    AttributeRequirements: {
                        strength_requirement: ['0'],
                        dexterity_requirement: ['0'],
                        intelligence_requirement: ['0'],
                    },
                    Sockets: {
                        socket_info: [
                            '0:1:1 1:9999:100 2:9999:90 3:9999:80 4:9999:30 5:9999:20 6:9999:5',
                        ],
                    },
                    extends: 'AbstractBelt',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractBelt',
                        'AbstractSocketableBelt',
                    ],
                    tags: ['default', 'belt'],
                },
                BeltAbyss: {
                    extends: 'AbstractSocketableBelt',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractBelt',
                        'AbstractSocketableBelt',
                        'BeltAbyss',
                    ],
                    tags: ['default', 'belt'],
                },
                Leaguestone: {
                    Base: {
                        description_text: ['LeagueStonePopupHelperText'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/leaguestone_stat_descriptions.txt',
                        ],
                        inventory_type: ['Leaguestone'],
                        enable_rarity: ['normal', 'magic', 'unique'],
                        disable_rarity: ['rare'],
                    },
                    Charges: {
                        max_charges: ['5'],
                        charges_per_use: ['1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Leaguestone'],
                    tags: ['default'],
                },
                MysteryLeaguestone: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryLeaguestone',
                    ],
                    tags: ['default', 'currency'],
                },
                AbstractCurrency: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                    },
                    Usable: {},
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractCurrency'],
                    tags: ['default'],
                },
                AbstractMicrotransaction: {
                    Stack: {},
                    extends: 'AbstractCurrency',
                    inheritance: ['Item', 'AbstractCurrency', 'AbstractMicrotransaction'],
                    tags: ['default'],
                },
                CurrencyImprint: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'CurrencyImprint',
                    ],
                    tags: ['default', 'currency'],
                },
                CurrencyItemisedProphecy: {
                    Base: {
                        description_text: ['ItemDescriptionItemisedProphecy'],
                    },
                    Prophecy: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'CurrencyItemisedProphecy',
                    ],
                    tags: ['default', 'currency'],
                },
                StackableCurrency: {
                    Base: {
                        tag: ['currency'],
                    },
                    Stack: {},
                    extends: 'AbstractCurrency',
                    inheritance: ['Item', 'AbstractCurrency', 'StackableCurrency'],
                    tags: ['default', 'currency'],
                },
                AbstractDivinationCard: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                        tag: ['divination_card'],
                    },
                    Stack: {},
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractDivinationCard'],
                    tags: ['default', 'divination_card'],
                },
                Equipment: {
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        enable_rarity: ['normal', 'magic', 'rare', 'unique'],
                    },
                    Base: {},
                    extends: 'Item',
                    inheritance: ['Item', 'Equipment'],
                    tags: ['default'],
                },
                AbstractFlask: {
                    Base: {
                        tag: ['flask'],
                        x_size: ['1'],
                        y_size: ['2'],
                        description_text: ['ItemDescriptionFlask'],
                    },
                    Quality: {
                        max_quality: ['20'],
                    },
                    LocalStats: {},
                    Charges: {
                        max_charges: ['2\t'],
                    },
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        enable_rarity: ['normal', 'magic', 'unique'],
                        disable_rarity: ['rare'],
                        inventory_type: ['Flask'],
                    },
                    Usable: {
                        use_type: ['Usable'],
                        action: ['flask'],
                    },
                    Flask: {},
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractFlask'],
                    tags: ['default', 'flask'],
                },
                AbstractHybridFlask: {
                    Base: {
                        tag: ['hybrid_flask'],
                    },
                    extends: 'AbstractFlask',
                    inheritance: ['Item', 'AbstractFlask', 'AbstractHybridFlask'],
                    tags: ['default', 'flask', 'hybrid_flask'],
                },
                AbstractLifeFlask: {
                    Base: {
                        tag: ['life_flask'],
                    },
                    extends: 'AbstractFlask',
                    inheritance: ['Item', 'AbstractFlask', 'AbstractLifeFlask'],
                    tags: ['default', 'flask', 'life_flask'],
                },
                AbstractManaFlask: {
                    Base: {
                        tag: ['mana_flask'],
                    },
                    extends: 'AbstractFlask',
                    inheritance: ['Item', 'AbstractFlask', 'AbstractManaFlask'],
                    tags: ['default', 'flask', 'mana_flask'],
                },
                AbstractUtilityFlask: {
                    Base: {
                        tag: ['utility_flask'],
                    },
                    extends: 'AbstractFlask',
                    inheritance: ['Item', 'AbstractFlask', 'AbstractUtilityFlask'],
                    tags: ['default', 'flask', 'utility_flask'],
                },
                CriticalUtilityFlask: {
                    Base: {
                        tag: ['critical_utility_flask'],
                    },
                    extends: 'AbstractUtilityFlask',
                    inheritance: [
                        'Item',
                        'AbstractFlask',
                        'AbstractUtilityFlask',
                        'CriticalUtilityFlask',
                    ],
                    tags: ['default', 'flask', 'utility_flask', 'critical_utility_flask'],
                },
                FlaskUtility1: {
                    Base: {
                        description_text: ['ItemDescriptionFlaskUtility1'],
                    },
                    extends: 'AbstractUtilityFlask',
                    inheritance: [
                        'Item',
                        'AbstractFlask',
                        'AbstractUtilityFlask',
                        'FlaskUtility1',
                    ],
                    tags: ['default', 'flask', 'utility_flask'],
                },
                AbstractSkillGem: {
                    Base: {
                        tag: ['gem'],
                        x_size: ['1'],
                        y_size: ['1'],
                        description_text: ['ItemDescriptionSkillGem'],
                    },
                    SkillGem: {},
                    Quality: {
                        max_quality: ['20'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractSkillGem'],
                    tags: ['default', 'gem'],
                },
                ActiveSkillGem: {
                    Base: {
                        description_text: ['ItemDescriptionActiveSkillGem'],
                    },
                    SkillGem: {},
                    extends: 'AbstractSkillGem',
                    inheritance: ['Item', 'AbstractSkillGem', 'ActiveSkillGem'],
                    tags: ['default', 'gem'],
                },
                SupportSkillGem: {
                    Base: {
                        description_text: ['ItemDescriptionSupportSkillGem'],
                        tag: ['support_gem'],
                    },
                    SkillGem: {},
                    extends: 'AbstractSkillGem',
                    inheritance: ['Item', 'AbstractSkillGem', 'SupportSkillGem'],
                    tags: ['default', 'gem', 'support_gem'],
                },
                AbstractHideoutDoodad: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                    },
                    Usable: {},
                    Stack: {},
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractHideoutDoodad'],
                    tags: ['default'],
                },
                Item: {
                    Base: {
                        base_level: ['1'],
                        tag: ['default'],
                    },
                    extends: 'nothing',
                    inheritance: ['Item'],
                    tags: ['default'],
                },
                AbstractAbyssJewel: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                        description_text: ['ItemDescriptionAbyssJewel'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        enable_rarity: ['magic', 'rare', 'unique'],
                        inventory_type: ['passivejewels'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractAbyssJewel'],
                    tags: ['default'],
                },
                AbstractJewel: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                        description_text: ['ItemDescriptionPassiveJewel'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        enable_rarity: ['magic', 'rare', 'unique'],
                        inventory_type: ['passivejewels'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractJewel'],
                    tags: ['default'],
                },
                AbstractLabyrinthItem: {
                    Stack: {
                        max_stack_size: ['1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractLabyrinthItem'],
                    tags: ['default'],
                },
                BronzeKey: {
                    Base: {
                        description_text: ['TreasureKeyDescription'],
                    },
                    extends: 'AbstractLabyrinthItem',
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'BronzeKey'],
                    tags: ['default'],
                },
                GoldenKey: {
                    Base: {
                        description_text: ['GoldenKeyDescription'],
                    },
                    extends: 'AbstractLabyrinthItem',
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'GoldenKey'],
                    tags: ['default'],
                },
                LabyrinthTrinket: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                    },
                    extends: 'AbstractLabyrinthItem',
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'LabyrinthTrinket'],
                    tags: ['default'],
                },
                OfferingToTheGoddess: {
                    Base: {
                        description_text: ['ItemDescriptionLabyrinthMapItem'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        inventory_type: ['Map'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'OfferingToTheGoddess'],
                    tags: ['default'],
                },
                SilverKey: {
                    Base: {
                        description_text: ['SilverKeyDescription'],
                    },
                    extends: 'AbstractLabyrinthItem',
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'SilverKey'],
                    tags: ['default'],
                },
                AbstractMapFragment: {
                    Base: {
                        description_text: ['ItemDescriptionMapFragment'],
                    },
                    Stack: {},
                    Usable: {},
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'AbstractMapFragment'],
                    tags: ['default'],
                },
                AbstractMiscMapItem: {
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractMiscMapItem'],
                    tags: ['default'],
                },
                BreachFragmentChaos: {
                    Base: {
                        description_text: ['ItemDescriptionBreachMapItemChaos'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'BreachFragmentChaos'],
                    tags: ['default'],
                },
                BreachFragmentCold: {
                    Base: {
                        description_text: ['ItemDescriptionBreachMapItemCold'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'BreachFragmentCold'],
                    tags: ['default'],
                },
                BreachFragmentFire: {
                    Base: {
                        description_text: ['ItemDescriptionBreachMapItemFire'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'BreachFragmentFire'],
                    tags: ['default'],
                },
                BreachFragmentLightning: {
                    Base: {
                        description_text: ['ItemDescriptionBreachMapItemLightning'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'BreachFragmentLightning'],
                    tags: ['default'],
                },
                BreachFragmentPhysical: {
                    Base: {
                        description_text: ['ItemDescriptionBreachMapItemPhysical'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'BreachFragmentPhysical'],
                    tags: ['default'],
                },
                ClassicVaultKey: {
                    Base: {
                        description_text: ['ItemDescriptionClassicVaultKey'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        inventory_type: ['Map'],
                        enable_rarity: ['normal'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'ClassicVaultKey'],
                    tags: ['default'],
                },
                FragmentPantheonFlask: {
                    Base: {
                        description_text: ['ItemDescriptionPantheonVessel'],
                    },
                    extends: 'AbstractMiscMapItem',
                    inheritance: ['Item', 'AbstractMiscMapItem', 'FragmentPantheonFlask'],
                    tags: ['default'],
                },
                AbstractMap: {
                    Base: {
                        tag: ['map'],
                        description_text: ['ItemDescriptionMap'],
                    },
                    LocalStats: {},
                    Mods: {},
                    Quality: {
                        max_quality: ['20'],
                    },
                    Map: {},
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractMap'],
                    tags: ['default', 'map'],
                },
                MysteryBox1x1: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x1',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox1x2: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x2',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox1x3: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x3',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox1x4: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x4',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox2x1: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x1',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox2x2: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x2',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox2x3: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x3',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox2x4: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x4',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox3x2: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox3x2',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBox3x3: {
                    Imprint: {},
                    extends: 'StackableCurrency',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox3x3',
                    ],
                    tags: ['default', 'currency'],
                },
                MysteryBoxCarnage: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxCarnage',
                    ],
                    tags: ['default'],
                },
                MysteryBoxChaosVsOrder: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxChaosVsOrder',
                    ],
                    tags: ['default'],
                },
                MysteryBoxClassic: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxClassic',
                    ],
                    tags: ['default'],
                },
                MysteryBoxDarkness: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxDarkness',
                    ],
                    tags: ['default'],
                },
                MysteryBoxEmber: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxEmber',
                    ],
                    tags: ['default'],
                },
                MysteryBoxLightChaos: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxLightChaos',
                    ],
                    tags: ['default'],
                },
                MysteryBoxRadiant: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxRadiant',
                    ],
                    tags: ['default'],
                },
                MysteryBoxSolaris: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxSolaris',
                    ],
                    tags: ['default'],
                },
                MysteryBoxStormcaller: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxStormcaller',
                    ],
                    tags: ['default'],
                },
                MysteryBoxStPatty: {
                    Imprint: {},
                    extends: 'AbstractMicrotransaction',
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'AbstractMicrotransaction',
                        'MysteryBoxStPatty',
                    ],
                    tags: ['default'],
                },
                AbstactPantheonSoul: {
                    Base: {
                        description_text: ['ItemDescriptionPantheonSoul'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AbstactPantheonSoul'],
                    tags: ['default'],
                },
                AbstractQuestItem: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                    },
                    Quest: {},
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractQuestItem'],
                    tags: ['default'],
                },
                AvariusStaff: {
                    Quest: {
                        grant_flag: ['a10q2minusHaveItem'],
                        remove_flag: ['a10q2minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AvariusStaff'],
                    tags: ['default'],
                },
                'Book-a10q3': {
                    Base: {
                        description_text: ['ItemDescriptionBook2RespecPoints'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunction2PassivePoints'],
                    },
                    Quest: {
                        use_flag: ['a10q3minusUsedRewardBook'],
                        grant_flag: ['a10q3minusHaveRewardBook'],
                        remove_flag: ['a10q3minusUsedRewardBook'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a10q3'],
                    tags: ['default'],
                },
                'Book-a10q4': {
                    Quest: {
                        use_flag: ['a10q4minusUsedRewardBook'],
                        grant_flag: ['a10q4minusHaveRewardBook'],
                        remove_flag: ['a10q4minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveRespecBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveRespecBook',
                        'Book-a10q4',
                    ],
                    tags: ['default'],
                },
                'Book-a10q6': {
                    Quest: {
                        use_flag: ['a10q6minusUsedRewardBook'],
                        grant_flag: ['a10q6minusHaveRewardBook'],
                        remove_flag: ['a10q6minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a10q6',
                    ],
                    tags: ['default'],
                },
                Potion: {
                    Quest: {
                        grant_flag: ['a10q4minusHaveItem'],
                        remove_flag: ['a10q4minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Potion'],
                    tags: ['default'],
                },
                Teardrop: {
                    Quest: {
                        grant_flag: ['a10q5minusHaveItem'],
                        remove_flag: ['a10q5minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Teardrop'],
                    tags: ['default'],
                },
                'Book-a4q6': {
                    Quest: {
                        use_flag: ['a4q6minusUsedRewardBook'],
                        grant_flag: ['a4q6minusHaveRewardBook'],
                        remove_flag: ['a4q6minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillAnd2RespecsBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                        'Book-a4q6',
                    ],
                    tags: ['default'],
                },
                DaressoGem: {
                    Quest: {
                        grant_flag: ['a4q4minusHaveGem'],
                        remove_flag: ['a4q4minusDeliveredGem'],
                        extra_flag: ['a4q1minusGemQuestsReceived'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'DaressoGem'],
                    tags: ['default'],
                },
                KaomGem: {
                    Quest: {
                        grant_flag: ['a4q3minusHaveGem'],
                        remove_flag: ['a4q3minusDeliveredGem'],
                        extra_flag: ['a4q1minusGemQuestsReceived'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'KaomGem'],
                    tags: ['default'],
                },
                Organ1: {
                    Quest: {
                        grant_flag: ['a4q5minusHaveOrgan1'],
                        remove_flag: ['a4q5minusDeliveredOrgan1'],
                        extra_flag: ['a4q5minusSeenOrgan'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Organ1'],
                    tags: ['default'],
                },
                Organ2: {
                    Quest: {
                        grant_flag: ['a4q5minusHaveOrgan2'],
                        remove_flag: ['a4q5minusDeliveredOrgan2'],
                        extra_flag: ['a4q5minusSeenOrgan'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Organ2'],
                    tags: ['default'],
                },
                Organ3: {
                    Quest: {
                        grant_flag: ['a4q5minusHaveOrgan3'],
                        remove_flag: ['a4q5minusDeliveredOrgan3'],
                        extra_flag: ['a4q5minusSeenOrgan'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Organ3'],
                    tags: ['default'],
                },
                RedBanner: {
                    Quest: {
                        grant_flag: ['a4q2minusHaveBanner'],
                        remove_flag: ['a4q2minusUsedBanner'],
                        extra_flag: ['a4q2minusQuestReceived'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'RedBanner'],
                    tags: ['default'],
                },
                'Book-a5q3': {
                    Quest: {
                        use_flag: ['a5q3minusUsedRewardBook'],
                        grant_flag: ['a5q3minusHaveRewardBook'],
                        remove_flag: ['a5q3minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a5q3',
                    ],
                    tags: ['default'],
                },
                'Book-a5q7': {
                    Quest: {
                        use_flag: ['a5q7minusUsedRewardBook'],
                        grant_flag: ['a5q7minusHaveRewardBook'],
                        remove_flag: ['a5q7minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillAnd2RespecsBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                        'Book-a5q7',
                    ],
                    tags: ['default'],
                },
                KitavaKey: {
                    Quest: {
                        grant_flag: ['a5q6minusHaveItem'],
                        extra_flag: ['a5q6minusSeenItem'],
                        remove_flag: ['a5q6minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'KitavaKey'],
                    tags: ['default'],
                },
                Miasmeter: {
                    Quest: {
                        grant_flag: ['a5q3minusHaveItem'],
                        remove_flag: ['a5q3minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Miasmeter'],
                    tags: ['default'],
                },
                TemplarCourtKey: {
                    Quest: {
                        grant_flag: ['a5q2minusHaveKey'],
                        remove_flag: ['a5q2minusUsedKey'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'TemplarCourtKey'],
                    tags: ['default'],
                },
                Torment1: {
                    Quest: {
                        grant_flag: ['a5q7minusHaveItem1'],
                        remove_flag: ['a5q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Torment1'],
                    tags: ['default'],
                },
                Torment2: {
                    Quest: {
                        grant_flag: ['a5q7minusHaveItem2'],
                        remove_flag: ['a5q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Torment2'],
                    tags: ['default'],
                },
                Torment3: {
                    Quest: {
                        grant_flag: ['a5q7minusHaveItem3'],
                        remove_flag: ['a5q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Torment3'],
                    tags: ['default'],
                },
                BestelsManuscript: {
                    Quest: {
                        grant_flag: ['a6q5minusHaveItem'],
                        remove_flag: ['a6q5minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'BestelsManuscript'],
                    tags: ['default'],
                },
                BlackFlag: {
                    Quest: {
                        grant_flag: ['a6q1minusHaveFlag'],
                        remove_flag: ['a6q1minusDeliveredFlag'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'BlackFlag'],
                    tags: ['default'],
                },
                'Book-a6q3': {
                    Quest: {
                        use_flag: ['a6q3minusUsedRewardBook'],
                        grant_flag: ['a6q3minusHaveRewardBook'],
                        remove_flag: ['a6q3minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a6q3',
                    ],
                    tags: ['default'],
                },
                'Book-a6q4': {
                    Quest: {
                        use_flag: ['a6q4minusUsedRewardBook'],
                        grant_flag: ['a6q4minusHaveRewardBook'],
                        remove_flag: ['a6q4minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveRespecBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveRespecBook',
                        'Book-a6q4',
                    ],
                    tags: ['default'],
                },
                'Book-a6q6': {
                    Quest: {
                        use_flag: ['a6q6minusUsedRewardBook'],
                        grant_flag: ['a6q6minusHaveRewardBook'],
                        remove_flag: ['a6q6minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a6q6',
                    ],
                    tags: ['default'],
                },
                'Book-a6q7': {
                    Quest: {
                        use_flag: ['a6q7minusUsedRewardBook'],
                        grant_flag: ['a6q7minusHaveRewardBook'],
                        remove_flag: ['a6q7minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a6q7',
                    ],
                    tags: ['default'],
                },
                KaruiEye: {
                    Quest: {
                        grant_flag: ['a6q3minusHaveItem'],
                        remove_flag: ['a6q3minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'KaruiEye'],
                    tags: ['default'],
                },
                BlackVenom: {
                    Quest: {
                        grant_flag: ['a7q3minusHaveItem'],
                        remove_flag: ['a7q3minusDeliveredItem'],
                        extra_flag: ['a7q3minusSpawnSilk'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'BlackVenom'],
                    tags: ['default'],
                },
                'Book-a7q1': {
                    Quest: {
                        use_flag: ['a7q1minusUsedRewardBook'],
                        grant_flag: ['a7q1minusHaveRewardBook'],
                        remove_flag: ['a7q1minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a7q1',
                    ],
                    tags: ['default'],
                },
                'Book-a7q6': {
                    Quest: {
                        use_flag: ['a7q6minusUsedRewardBook'],
                        grant_flag: ['a7q6minusHaveRewardBook'],
                        remove_flag: ['a7q6minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillAnd2RespecsBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                        'Book-a7q6',
                    ],
                    tags: ['default'],
                },
                'Book-a7q9': {
                    Quest: {
                        use_flag: ['a7q9minusUsedRewardBook'],
                        grant_flag: ['a7q9minusHaveRewardBook'],
                        remove_flag: ['a7q9minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a7q9',
                    ],
                    tags: ['default'],
                },
                Firefly1: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem1'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly1'],
                    tags: ['default'],
                },
                Firefly2: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem2'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly2'],
                    tags: ['default'],
                },
                Firefly3: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem3'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly3'],
                    tags: ['default'],
                },
                Firefly4: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem4'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly4'],
                    tags: ['default'],
                },
                Firefly5: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem5'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly5'],
                    tags: ['default'],
                },
                Firefly6: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem6'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly6'],
                    tags: ['default'],
                },
                Firefly7: {
                    Quest: {
                        grant_flag: ['a7q7minusHaveItem7'],
                        remove_flag: ['a7q7minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Firefly7'],
                    tags: ['default'],
                },
                GreustNecklace: {
                    Quest: {
                        grant_flag: ['a7q8minusHaveItem'],
                        remove_flag: ['a7q8minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'GreustNecklace'],
                    tags: ['default'],
                },
                KisharaStar: {
                    Quest: {
                        grant_flag: ['a7q6minusHaveItem'],
                        remove_flag: ['a7q6minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'KisharaStar'],
                    tags: ['default'],
                },
                MaligaroMap: {
                    Quest: {
                        grant_flag: ['a7q2minusHaveItem'],
                        extra_flag: ['a7q3minusSpawnSilk'],
                        remove_flag: ['a7q3minusDeliveredItem'],
                        is_map: ['true'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'MaligaroMap'],
                    tags: ['default'],
                },
                ObsidianKey: {
                    Quest: {
                        grant_flag: ['a7q1minusHaveKey'],
                        remove_flag: ['a7q1minusUsedKey'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ObsidianKey'],
                    tags: ['default'],
                },
                SilverLocket: {
                    Quest: {
                        grant_flag: ['a7q5minusHaveItem'],
                        remove_flag: ['a7q5minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'SilverLocket'],
                    tags: ['default'],
                },
                AnkhOfEternity: {
                    Quest: {
                        grant_flag: ['a8q6minusHaveItem'],
                        remove_flag: ['a8q6minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AnkhOfEternity'],
                    tags: ['default'],
                },
                'Book-a8q4': {
                    Quest: {
                        use_flag: ['a8q4minusUsedRewardBook'],
                        grant_flag: ['a8q4minusHaveRewardBook'],
                        remove_flag: ['a8q4minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a8q4',
                    ],
                    tags: ['default'],
                },
                'Book-a8q6': {
                    Quest: {
                        use_flag: ['a8q6minusUsedRewardBook'],
                        grant_flag: ['a8q6minusHaveRewardBook'],
                        remove_flag: ['a8q6minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillAnd2RespecsBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                        'Book-a8q6',
                    ],
                    tags: ['default'],
                },
                'Book-a8q7': {
                    Quest: {
                        use_flag: ['a8q7minusUsedRewardBook'],
                        grant_flag: ['a8q7minusHaveRewardBook'],
                        remove_flag: ['a8q7minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a8q7',
                    ],
                    tags: ['default'],
                },
                LunarisOrb: {
                    Quest: {
                        grant_flag: ['a8q2minusHaveItem'],
                        remove_flag: ['a8q23minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'LunarisOrb'],
                    tags: ['default'],
                },
                SolarisOrb: {
                    Quest: {
                        grant_flag: ['a8q3minusHaveItem'],
                        remove_flag: ['a8q23minusDeliveredItems'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'SolarisOrb'],
                    tags: ['default'],
                },
                WingsOfVastiri: {
                    Quest: {
                        grant_flag: ['a8q5minusHaveItem'],
                        remove_flag: ['a8q5minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'WingsOfVastiri'],
                    tags: ['default'],
                },
                'Book-a9q2': {
                    Quest: {
                        use_flag: ['a9q2minusUsedRewardBook'],
                        grant_flag: ['a9q2minusHaveRewardBook'],
                        remove_flag: ['a9q2minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a9q2',
                    ],
                    tags: ['default'],
                },
                'Book-a9q4': {
                    Quest: {
                        use_flag: ['a9q4minusUsedRewardBook'],
                        grant_flag: ['a9q4minusHaveRewardBook'],
                        remove_flag: ['a9q4minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveRespecBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveRespecBook',
                        'Book-a9q4',
                    ],
                    tags: ['default'],
                },
                'Book-a9q5': {
                    Quest: {
                        use_flag: ['a9q5minusUsedRewardBook'],
                        grant_flag: ['a9q5minusHaveRewardBook'],
                        remove_flag: ['a9q5minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a9q5',
                    ],
                    tags: ['default'],
                },
                BottledStorm: {
                    Quest: {
                        grant_flag: ['a9q5minusHaveItem'],
                        remove_flag: ['a9q5minusUsedItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'BottledStorm'],
                    tags: ['default'],
                },
                Calendar: {
                    Quest: {
                        grant_flag: ['a9q4minusHaveItem'],
                        remove_flag: ['a9q4minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Calendar'],
                    tags: ['default'],
                },
                Ingredient1: {
                    Quest: {
                        grant_flag: ['a9q1minusHaveItem1'],
                        remove_flag: ['a9q1minusDeliveredItem1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Ingredient1'],
                    tags: ['default'],
                },
                Ingredient2: {
                    Quest: {
                        grant_flag: ['a9q1minusHaveItem2'],
                        remove_flag: ['a9q1minusDeliveredItem2'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Ingredient2'],
                    tags: ['default'],
                },
                SekhemaFeather: {
                    Quest: {
                        grant_flag: ['a9q2minusHaveItem'],
                        remove_flag: ['a9q2minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'SekhemaFeather'],
                    tags: ['default'],
                },
                StormSword: {
                    Quest: {
                        grant_flag: ['a9q3minusHaveItem'],
                        remove_flag: ['a9q3minusDeliveredItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'StormSword'],
                    tags: ['default'],
                },
                AllFlameLantern1: {
                    Quest: {
                        grant_flag: ['a1q6minusHaveAllFlame'],
                        remove_flag: ['a1q6minusDeliveredAllFlame'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AllFlameLantern1'],
                    tags: ['default'],
                },
                CombinedAmulet: {
                    Quest: {
                        remove_flag: ['a2q8minusPlacedApex'],
                        grant_flag: ['a2q8minusHaveApex'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'CombinedAmulet'],
                    tags: ['default'],
                },
                DexAmulet: {
                    Quest: {
                        remove_flag: ['a2bminusDeliveredAmulets'],
                        grant_flag: ['a2bminusHaveDexAmulet'],
                        extra_flag: ['a2bminusKilledDexBandit'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'DexAmulet'],
                    tags: ['default'],
                },
                IntAmulet: {
                    Quest: {
                        remove_flag: ['a2bminusDeliveredAmulets'],
                        grant_flag: ['a2bminusHaveIntAmulet'],
                        extra_flag: ['a2bminusKilledIntBandit'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'IntAmulet'],
                    tags: ['default'],
                },
                StrAmulet: {
                    Quest: {
                        remove_flag: ['a2bminusDeliveredAmulets'],
                        grant_flag: ['a2bminusHaveStrAmulet'],
                        extra_flag: ['a2bminusKilledStrBandit'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'StrAmulet'],
                    tags: ['default'],
                },
                Bust1: {
                    Quest: {
                        grant_flag: ['a3q11minusHaveBust1'],
                        remove_flag: ['a3q11minusDeliveredBust1'],
                        extra_flag: ['SeenBust1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Bust1'],
                    tags: ['default'],
                },
                Bust2: {
                    Quest: {
                        grant_flag: ['a3q11minusHaveBust2'],
                        remove_flag: ['a3q11minusDeliveredBust2'],
                        extra_flag: ['SeenBust2'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Bust2'],
                    tags: ['default'],
                },
                Bust3: {
                    Quest: {
                        grant_flag: ['a3q11minusHaveBust3'],
                        remove_flag: ['a3q11minusDeliveredBust3'],
                        extra_flag: ['SeenBust3'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Bust3'],
                    tags: ['default'],
                },
                Decanter: {
                    Quest: {
                        grant_flag: ['a3q13minusHaveDecanter'],
                        remove_flag: ['a3q13minusDecanterDelivered'],
                        extra_flag: ['SeenDecanter'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Decanter'],
                    tags: ['default'],
                },
                Fruit: {
                    Quest: {
                        grant_flag: ['a3q13minusHavePlum'],
                        remove_flag: ['a3q13minusPlumDelivered'],
                        extra_flag: ['SeenPlum'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Fruit'],
                    tags: ['default'],
                },
                Glyph1: {
                    Quest: {
                        remove_flag: ['a1q4minusPlacedGlyphs'],
                        grant_flag: ['a1q4minusHaveGlyph1'],
                        extra_flag: ['a1q4minusKnowsAboutGlyphs'],
                        extra_flag2: ['SeenShell1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Glyph1'],
                    tags: ['default'],
                },
                Glyph2: {
                    Quest: {
                        remove_flag: ['a1q4minusPlacedGlyphs'],
                        grant_flag: ['a1q4minusHaveGlyph2'],
                        extra_flag: ['a1q4minusKnowsAboutGlyphs'],
                        extra_flag2: ['SeenShell2'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Glyph2'],
                    tags: ['default'],
                },
                Glyph3: {
                    Quest: {
                        remove_flag: ['a1q4minusPlacedGlyphs'],
                        grant_flag: ['a1q4minusHaveGlyph3'],
                        extra_flag: ['a1q4minusKnowsAboutGlyphs'],
                        extra_flag2: ['SeenShell3'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Glyph3'],
                    tags: ['default'],
                },
                GoldenHand: {
                    Quest: {
                        grant_flag: ['a2q5minusHaveGoldenHand'],
                        remove_flag: ['a2q5minusDeliveredGoldenHand'],
                        extra_flag: ['a2q5minusReceivedQuest'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'GoldenHand'],
                    tags: ['default'],
                },
                Page1: {
                    Quest: {
                        grant_flag: ['a3q12minusHavePage1'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Page1'],
                    tags: ['default'],
                },
                Page2: {
                    Quest: {
                        grant_flag: ['a3q12minusHavePage2'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Page2'],
                    tags: ['default'],
                },
                Page3: {
                    Quest: {
                        grant_flag: ['a3q12minusHavePage3'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Page3'],
                    tags: ['default'],
                },
                Page4: {
                    Quest: {
                        grant_flag: ['a3q12minusHavePage4'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'Page4'],
                    tags: ['default'],
                },
                InfernalTalc: {
                    Quest: {
                        grant_flag: ['a3q5minusHaveTalc'],
                        remove_flag: ['a3q5minusUsedTalc'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'InfernalTalc'],
                    tags: ['default'],
                },
                MapUpgradeTier1_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier1_1'],
                        league_remove_flag: ['UsedMapUpgradeTier1_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier1'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier1_1'],
                    tags: ['default'],
                },
                MapUpgradeTier10_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier10_1'],
                        league_remove_flag: ['UsedMapUpgradeTier10_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier10'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier10_1'],
                    tags: ['default'],
                },
                MapUpgradeTier10_2: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier10_2'],
                        league_remove_flag: ['UsedMapUpgradeTier10_2'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier10'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier10_2'],
                    tags: ['default'],
                },
                MapUpgradeTier10_3: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier10_3'],
                        league_remove_flag: ['UsedMapUpgradeTier10_3'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier10'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier10_3'],
                    tags: ['default'],
                },
                MapUpgradeTier2_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier2_1'],
                        league_remove_flag: ['UsedMapUpgradeTier2_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier2'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier2_1'],
                    tags: ['default'],
                },
                MapUpgradeTier3_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier3_1'],
                        league_remove_flag: ['UsedMapUpgradeTier3_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier3'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier3_1'],
                    tags: ['default'],
                },
                MapUpgradeTier4_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier4_1'],
                        league_remove_flag: ['UsedMapUpgradeTier4_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier4'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier4_1'],
                    tags: ['default'],
                },
                MapUpgradeTier5_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier5_1'],
                        league_remove_flag: ['UsedMapUpgradeTier5_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier5'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier5_1'],
                    tags: ['default'],
                },
                MapUpgradeTier6_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier6_1'],
                        league_remove_flag: ['UsedMapUpgradeTier6_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier6'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier6_1'],
                    tags: ['default'],
                },
                MapUpgradeTier7_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier7_1'],
                        league_remove_flag: ['UsedMapUpgradeTier7_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier7'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier7_1'],
                    tags: ['default'],
                },
                MapUpgradeTier8_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier8_1'],
                        league_remove_flag: ['UsedMapUpgradeTier8_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier8'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier8_1'],
                    tags: ['default'],
                },
                MapUpgradeTier8_2: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier8_2'],
                        league_remove_flag: ['UsedMapUpgradeTier8_2'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier8'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier8_2'],
                    tags: ['default'],
                },
                MapUpgradeTier9_1: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier9_1'],
                        league_remove_flag: ['UsedMapUpgradeTier9_1'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier9'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier9_1'],
                    tags: ['default'],
                },
                MapUpgradeTier9_2: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier9_2'],
                        league_remove_flag: ['UsedMapUpgradeTier9_2'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier9'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier9_2'],
                    tags: ['default'],
                },
                MapUpgradeTier9_3: {
                    Base: {
                        description_text: ['MapUpgradeDescriptionText'],
                    },
                    Quest: {
                        grant_flag: ['GrantMapUpgradeTier9_3'],
                        league_remove_flag: ['UsedMapUpgradeTier9_3'],
                    },
                    Usable: {
                        action: ['upgrade_atlas_map'],
                        use_type: ['ApplyToAtlas'],
                    },
                    Stack: {
                        function_text: ['MapUpgradeFunctionTier9'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'MapUpgradeTier9_3'],
                    tags: ['default'],
                },
                MedicineSet1: {
                    Quest: {
                        grant_flag: ['a1q5minusHaveMedicineChest'],
                        remove_flag: ['a1q5minusNessaCongratulated'],
                        extra_flag: ['SeenMedicineChest'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'MedicineSet1'],
                    tags: ['default'],
                },
                PoisonSkillGem: {
                    Quest: {
                        grant_flag: ['a2q6minusHaveSkillGem'],
                        remove_flag: ['a2q9minusPoisonedTree'],
                        extra_flag: ['a2q6minusHelenaInTown'],
                        extra_flag2: ['SeenBalefulGem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'PoisonSkillGem'],
                    tags: ['default'],
                },
                PoisonSpear: {
                    Quest: {
                        grant_flag: ['a2q4minusHavePoisonSpear'],
                        remove_flag: ['a2q9minusPoisonedTree'],
                        extra_flag: ['a2q4minusReceivedQuest'],
                        extra_flag2: ['a2bminusStartNewQuests'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'PoisonSpear'],
                    tags: ['default'],
                },
                RibbonSpool: {
                    Quest: {
                        grant_flag: ['a3q4minusHaveRibbonSpool'],
                        remove_flag: ['a3q4minusDeliveredSpool'],
                        extra_flag: ['SeenRibbonSpool'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'RibbonSpool'],
                    tags: ['default'],
                },
                SewerKeys: {
                    Quest: {
                        grant_flag: ['a3q11minusHaveSewerKeys'],
                        remove_flag: ['a3q11minusUsedSewerKeys'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'SewerKeys'],
                    tags: ['default'],
                },
                ShaperMemoryFragment1_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment1_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment1_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment1_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment10_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment10_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment10_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment10_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment10_2: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment10_2'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment10_2'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment10_2'],
                    tags: ['default'],
                },
                ShaperMemoryFragment10_3: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment10_3'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment10_3'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment10_3'],
                    tags: ['default'],
                },
                ShaperMemoryFragment2_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment2_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment2_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment2_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment3_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment3_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment3_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment3_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment4_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment4_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment4_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment4_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment5_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment5_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment5_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment5_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment6_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment6_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment6_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment6_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment7_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment7_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment7_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment7_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment8_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment8_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment8_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment8_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment8_2: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment8_2'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment8_2'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment8_2'],
                    tags: ['default'],
                },
                ShaperMemoryFragment9_1: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment9_1'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment9_1'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment9_1'],
                    tags: ['default'],
                },
                ShaperMemoryFragment9_2: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment9_2'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment9_2'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment9_2'],
                    tags: ['default'],
                },
                ShaperMemoryFragment9_3: {
                    Quest: {
                        grant_flag: ['HaveShaperMemoryFragment9_3'],
                        league_remove_flag: ['DeliveredShaperMemoryFragment9_3'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'ShaperMemoryFragment9_3'],
                    tags: ['default'],
                },
                AbstractPassiveRespecBook: {
                    Base: {
                        description_text: ['ItemDescriptionBook2RespecPoints'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunction2RespecPoints'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'AbstractPassiveRespecBook'],
                    tags: ['default'],
                },
                AbstractPassiveSkillAnd2RespecsBook: {
                    Base: {
                        description_text: ['ItemDescriptionBookPassivePointAnd2RespecPoints'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionPassivePointAnd2RespecPoints'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                    ],
                    tags: ['default'],
                },
                AbstractPassiveSkillBook: {
                    Base: {
                        description_text: ['ItemDescriptionBookPassivePoint'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionPassivePoint'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'AbstractPassiveSkillBook'],
                    tags: ['default'],
                },
                BanditRespecAlira: {
                    Base: {
                        description_text: ['ItemDescriptionBanditRespecAlira'],
                    },
                    Quest: {
                        can_sell: ['true'],
                    },
                    Usable: {
                        action: ['respec_alira'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionBanditRespecAlira'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecAlira'],
                    tags: ['default'],
                },
                BanditRespecEramir: {
                    Base: {
                        description_text: ['ItemDescriptionBanditRespecEramir'],
                    },
                    Quest: {
                        can_sell: ['true'],
                    },
                    Usable: {
                        action: ['respec_eramir'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionBanditRespecEramir'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecEramir'],
                    tags: ['default'],
                },
                BanditRespecKraityn: {
                    Base: {
                        description_text: ['ItemDescriptionBanditRespecKraityn'],
                    },
                    Quest: {
                        can_sell: ['true'],
                    },
                    Usable: {
                        action: ['respec_kraityn'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionBanditRespecKraityn'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecKraityn'],
                    tags: ['default'],
                },
                BanditRespecOak: {
                    Base: {
                        description_text: ['ItemDescriptionBanditRespecOak'],
                    },
                    Quest: {
                        can_sell: ['true'],
                    },
                    Usable: {
                        action: ['respec_oak'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionBanditRespecOak'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecOak'],
                    tags: ['default'],
                },
                'Book-a1q6': {
                    Quest: {
                        use_flag: ['a1q6minusUsedRewardBook'],
                        grant_flag: ['a1q6minusHaveRewardBook'],
                        remove_flag: ['a1q6minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a1q6',
                    ],
                    tags: ['default'],
                },
                'Book-a1q7': {
                    Quest: {
                        use_flag: ['a1q7minusUsedRewardBook'],
                        grant_flag: ['a1q7minusHaveRewardBook'],
                        remove_flag: ['a1q7minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a1q7',
                    ],
                    tags: ['default'],
                },
                'Book-a1q8': {
                    Quest: {
                        use_flag: ['a1q8minusUsedRewardBook'],
                        grant_flag: ['a1q8minusHaveRewardBook'],
                        remove_flag: ['a1q8minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveRespecBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveRespecBook',
                        'Book-a1q8',
                    ],
                    tags: ['default'],
                },
                'Book-a1q9': {
                    Quest: {
                        use_flag: ['a1q9minusUsedRewardBook'],
                        grant_flag: ['a1q9minusHaveRewardBook'],
                        remove_flag: ['a1q9minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a1q9',
                    ],
                    tags: ['default'],
                },
                'Book-a2q5': {
                    Quest: {
                        use_flag: ['a2q5minusUsedRewardBook'],
                        grant_flag: ['a2q5minusHaveRewardBook'],
                        remove_flag: ['a2q5minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveRespecBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveRespecBook',
                        'Book-a2q5',
                    ],
                    tags: ['default'],
                },
                'Book-a3q11v0': {
                    Quest: {
                        use_flag: ['a3q11minusUsedRewardBook'],
                        grant_flag: ['a3q11minusHaveRewardBook'],
                        remove_flag: ['a3q11minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a3q11v0',
                    ],
                    tags: ['default'],
                },
                'Book-a3q11v1': {
                    Quest: {
                        use_flag: ['a3q11minusUsedRewardBook'],
                        grant_flag: ['a3q11minusHaveRewardBook'],
                        remove_flag: ['a3q11minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillAnd2RespecsBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                        'Book-a3q11v1',
                    ],
                    tags: ['default'],
                },
                'Book-a3q11v2': {
                    Quest: {
                        use_flag: ['a3q11minusUsedRewardBook'],
                        grant_flag: ['a3q11minusHaveRewardBook'],
                        remove_flag: ['a3q11minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillAnd2RespecsBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillAnd2RespecsBook',
                        'Book-a3q11v2',
                    ],
                    tags: ['default'],
                },
                'Book-a3q9': {
                    Quest: {
                        use_flag: ['a3q9minusUsedRewardBook'],
                        grant_flag: ['a3q9minusHaveRewardBook'],
                        remove_flag: ['a3q9minusUsedRewardBook'],
                    },
                    extends: 'AbstractPassiveSkillBook',
                    inheritance: [
                        'Item',
                        'AbstractQuestItem',
                        'AbstractPassiveSkillBook',
                        'Book-a3q9',
                    ],
                    tags: ['default'],
                },
                DelevelBook: {
                    Base: {
                        description_text: ['ItemDescriptionBookDelevel'],
                    },
                    Quest: {
                        can_sell: ['true'],
                    },
                    Usable: {
                        action: ['delevel_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunctionDelevel'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'DelevelBook'],
                    tags: ['default'],
                },
                Descent2_1: {
                    Base: {
                        description_text: ['ItemDescriptionBook2PassivePoints'],
                    },
                    Quest: {
                        use_flag: ['Descent2Reward1'],
                        remove_flag: ['Descent2Reward1'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunction2PassivePoints'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_1'],
                    tags: ['default'],
                },
                Descent2_2: {
                    Base: {
                        description_text: ['ItemDescriptionBook2PassivePoints'],
                    },
                    Quest: {
                        use_flag: ['Descent2Reward2'],
                        remove_flag: ['Descent2Reward2'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunction2PassivePoints'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_2'],
                    tags: ['default'],
                },
                Descent2_3: {
                    Base: {
                        description_text: ['ItemDescriptionBook2PassivePoints'],
                    },
                    Quest: {
                        use_flag: ['Descent2Reward3'],
                        remove_flag: ['Descent2Reward3'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunction2PassivePoints'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_3'],
                    tags: ['default'],
                },
                Descent2_4: {
                    Base: {
                        description_text: ['ItemDescriptionBook2PassivePoints'],
                    },
                    Quest: {
                        use_flag: ['Descent2Reward4'],
                        remove_flag: ['Descent2Reward4'],
                    },
                    Usable: {
                        action: ['skill_book'],
                        use_type: ['Usable'],
                    },
                    Stack: {
                        function_text: ['ItemFunction2PassivePoints'],
                    },
                    extends: 'AbstractQuestItem',
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_4'],
                    tags: ['default'],
                },
                SpikeSealKey: {
                    Quest: {
                        grant_flag: ['a2q11minusHaveKey'],
                        remove_flag: ['a1q9minusRoadOpened'],
                        extra_flag: ['a2q11minusSeenKey'],
                        extra_flag2: ['a1q9minusRoadBlocked'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'SpikeSealKey'],
                    tags: ['default'],
                },
                SulphiteFlask: {
                    Quest: {
                        grant_flag: ['a3q5minusHaveSulphite'],
                        remove_flag: ['a3q5minusDeliveredSulphite'],
                        extra_flag: ['SeenSulphite'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'SulphiteFlask'],
                    tags: ['default'],
                },
                TolmanBracelet: {
                    Quest: {
                        grant_flag: ['a3q2minusHaveTolmanItem'],
                        remove_flag: ['a3q2minusDeliveredItem'],
                        extra_flag: ['a3q2minusSeenTolmanItem'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'TolmanBracelet'],
                    tags: ['default'],
                },
                TowerKey: {
                    Quest: {
                        grant_flag: ['a3q9minusHaveTowerKey'],
                        remove_flag: ['a3q9minusUsedTowerKey'],
                        extra_flag: ['SeenTowerKey'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'TowerKey'],
                    tags: ['default'],
                },
                AbstractQuiver: {
                    Base: {
                        tag: ['quiver'],
                        x_size: ['2'],
                        y_size: ['3'],
                    },
                    LocalStats: {},
                    Mods: {
                        inventory_type: ['Offhand'],
                    },
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractQuiver'],
                    tags: ['default', 'quiver'],
                },
                AbstractRelic: {
                    Base: {
                        tag: ['relic'],
                    },
                    LocalStats: {},
                    Mods: {},
                    Usable: {},
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractRelic'],
                    tags: ['default', 'relic'],
                },
                AbstractLargeRelic: {
                    Base: {
                        x_size: ['2'],
                        y_size: ['2'],
                    },
                    LocalStats: {},
                    Mods: {
                        inventory_type: ['altar_large'],
                    },
                    Usable: {},
                    extends: 'AbstractRelic',
                    inheritance: ['Item', 'Equipment', 'AbstractRelic', 'AbstractLargeRelic'],
                    tags: ['default', 'relic'],
                },
                AbstractMediumRelic: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['2'],
                    },
                    LocalStats: {},
                    Mods: {
                        inventory_type: ['altar_medium'],
                    },
                    Usable: {},
                    extends: 'AbstractRelic',
                    inheritance: ['Item', 'Equipment', 'AbstractRelic', 'AbstractMediumRelic'],
                    tags: ['default', 'relic'],
                },
                AbstractSmallRelic: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                    },
                    LocalStats: {},
                    Mods: {
                        inventory_type: ['altar_small'],
                    },
                    Usable: {},
                    extends: 'AbstractRelic',
                    inheritance: ['Item', 'Equipment', 'AbstractRelic', 'AbstractSmallRelic'],
                    tags: ['default', 'relic'],
                },
                AbstractRing: {
                    Base: {
                        x_size: ['1'],
                        y_size: ['1'],
                        tag: ['ring'],
                    },
                    Mods: {
                        inventory_type: ['Ring'],
                    },
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractRing'],
                    tags: ['default', 'ring'],
                },
                AbstractSocketableRing: {
                    AttributeRequirements: {
                        strength_requirement: ['0'],
                        dexterity_requirement: ['0'],
                        intelligence_requirement: ['0'],
                    },
                    Sockets: {
                        socket_info: [
                            '0:1:1 1:9999:100 2:9999:90 3:9999:80 4:9999:30 5:9999:20 6:9999:5',
                        ],
                    },
                    extends: 'AbstractRing',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractRing',
                        'AbstractSocketableRing',
                    ],
                    tags: ['default', 'ring'],
                },
                Ring15: {
                    extends: 'AbstractSocketableRing',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractRing',
                        'AbstractSocketableRing',
                        'Ring15',
                    ],
                    tags: ['default', 'ring'],
                },
                AbstractUniqueFragment: {
                    Base: {
                        description_text: ['ItemDescriptionUniqueFragment'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: [
                            'Metadata/StatDescriptions/stat_descriptions.txt',
                        ],
                        enable_rarity: ['"unique"\t'],
                        inventory_type: ['maininventory'],
                    },
                    extends: 'Item',
                    inheritance: ['Item', 'AbstractUniqueFragment'],
                    tags: ['default'],
                },
                AbstractWeapon: {
                    AttributeRequirements: {
                        strength_requirement: ['100'],
                        dexterity_requirement: ['0'],
                        intelligence_requirement: ['0'],
                    },
                    Mods: {
                        inventory_type: ['"Weapon"\t'],
                    },
                    Weapon: {
                        minimum_attack_distance: ['0'],
                        maximum_attack_distance: ['3'],
                        minimum_damage: ['5'],
                        maximum_damage: ['10'],
                        weapon_speed: ['833'],
                        critical_chance: ['500'],
                        accuracy_rating: ['20'],
                    },
                    Quality: {
                        max_quality: ['20'],
                    },
                    Base: {
                        tag: ['weapon'],
                    },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    extends: 'Equipment',
                    inheritance: ['Item', 'Equipment', 'AbstractWeapon'],
                    tags: ['default', 'weapon'],
                },
                AbstractOneHandWeapon: {
                    Base: {
                        tag: ['onehand'],
                    },
                    extends: 'AbstractWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                    ],
                    tags: ['default', 'weapon', 'onehand'],
                },
                AbstractClaw: {
                    Base: {
                        tag: ['claw', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['Claw'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractClaw',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'claw', 'one_hand_weapon'],
                },
                AbstractDagger: {
                    Base: {
                        tag: ['dagger', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['Dagger'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractDagger',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'dagger', 'one_hand_weapon'],
                },
                AbstractOneHandAxe: {
                    Base: {
                        tag: ['axe', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['OneHandAxe'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandAxe',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'axe', 'one_hand_weapon'],
                },
                AbstractOneHandMace: {
                    Base: {
                        tag: ['mace', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['OneHandMace'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandMace',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'mace', 'one_hand_weapon'],
                },
                AbstractSceptre: {
                    Base: {
                        tag: ['sceptre', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['Sceptre'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractSceptre',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'sceptre', 'one_hand_weapon'],
                },
                AbstractOneHandSword: {
                    Base: {
                        tag: ['sword', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['OneHandSword'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandSword',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'sword', 'one_hand_weapon'],
                },
                AbstractOneHandSwordThrusting: {
                    Base: {},
                    Weapon: {
                        weapon_class: ['OneHandSwordThrusting'],
                    },
                    extends: 'AbstractOneHandSword',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandSword',
                        'AbstractOneHandSwordThrusting',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'sword', 'one_hand_weapon'],
                },
                AbstractWand: {
                    Base: {
                        tag: ['wand', 'ranged', 'one_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['Wand'],
                    },
                    extends: 'AbstractOneHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractWand',
                    ],
                    tags: ['default', 'weapon', 'onehand', 'wand', 'ranged', 'one_hand_weapon'],
                },
                AbstractTwoHandWeapon: {
                    Base: {
                        tag: ['twohand'],
                    },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:25:30 5:35:5 6:50:1'],
                    },
                    extends: 'AbstractWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                    ],
                    tags: ['default', 'weapon', 'twohand'],
                },
                AbstractBow: {
                    Base: {
                        tag: ['bow', 'ranged', 'two_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['Bow'],
                    },
                    extends: 'AbstractTwoHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractBow',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'bow', 'ranged', 'two_hand_weapon'],
                },
                AbstractFishingRod: {
                    Base: {
                        remove_tag: ['weapon'],
                        tag: ['fishing_rod'],
                    },
                    Weapon: {
                        weapon_class: ['FishingRod'],
                    },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:25:30 5:9999:20 6:9999:5'],
                    },
                    extends: 'AbstractTwoHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractFishingRod',
                    ],
                    tags: ['default', 'twohand', 'fishing_rod'],
                },
                AbstractStaff: {
                    Base: {
                        tag: ['staff', 'two_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['Staff'],
                    },
                    extends: 'AbstractTwoHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractStaff',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'staff', 'two_hand_weapon'],
                },
                Staff1: {
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    extends: 'AbstractStaff',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractStaff',
                        'Staff1',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'staff', 'two_hand_weapon'],
                },
                AbstractTwoHandAxe: {
                    Base: {
                        tag: ['axe', 'two_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['TwoHandAxe'],
                    },
                    extends: 'AbstractTwoHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandAxe',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'axe', 'two_hand_weapon'],
                },
                AbstractTwoHandMace: {
                    Base: {
                        tag: ['mace', 'two_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['TwoHandMace'],
                    },
                    extends: 'AbstractTwoHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandMace',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'mace', 'two_hand_weapon'],
                },
                AbstractTwoHandSword: {
                    Base: {
                        tag: ['sword', 'two_hand_weapon'],
                    },
                    Weapon: {
                        weapon_class: ['TwoHandSword'],
                    },
                    extends: 'AbstractTwoHandWeapon',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandSword',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'sword', 'two_hand_weapon'],
                },
                TwoHandSword1: {
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    extends: 'AbstractTwoHandSword',
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandSword',
                        'TwoHandSword1',
                    ],
                    tags: ['default', 'weapon', 'twohand', 'sword', 'two_hand_weapon'],
                },
            });
        }
    };
});
System.register("util/MetaData", ["util/meta_data"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var meta_data_1, MetaData;
    return {
        setters: [
            function (meta_data_1_1) {
                meta_data_1 = meta_data_1_1;
            }
        ],
        execute: function () {
            /**
             * class Metadata
             *
             * representation of a .ot file in METADATA
             */
            MetaData = /** @class */ (function () {
                function MetaData(clazz, props) {
                    this.clazz = clazz;
                    this.props = props;
                }
                MetaData.build = function (clazz) {
                    if (meta_data_1.default[clazz] != null) {
                        return new MetaData(clazz, meta_data_1.default[clazz]);
                    }
                    else {
                        throw new Error("meta_data for " + clazz + " not found");
                    }
                };
                MetaData.prototype.isA = function (other) {
                    return other === this.clazz || this.props.inheritance.indexOf(other) !== -1;
                };
                return MetaData;
            }());
            exports_12("default", MetaData);
        }
    };
});
System.register("util/index", ["util/Flags", "util/MetaData"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (Flags_2_1) {
                exports_13({
                    "anySet": Flags_2_1["anySet"]
                });
            },
            function (MetaData_1_1) {
                exports_13({
                    "MetaData": MetaData_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("mods/index", ["mods/meta_mods", "mods/Mod"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (meta_mods_2_1) {
                exports_14({
                    "metaMods": meta_mods_2_1["default"]
                });
            },
            function (Mod_1_1) {
                exports_14({
                    "Mod": Mod_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("calculator/stat_applications", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var applications;
    return {
        setters: [],
        execute: function () {
            applications = {
                accuracy_rating: {
                    classification: [],
                    type: 'flat',
                },
                'accuracy_rating_+%': {
                    classification: [],
                    type: 'inc',
                },
                additional_all_attributes: {
                    classification: [],
                    type: 'flat',
                },
                'additional_block_%': {
                    classification: ['block'],
                    type: 'flat',
                },
                'additional_block_chance_against_projectiles_%': {
                    classification: [],
                    type: 'flat',
                },
                additional_dexterity: {
                    classification: [],
                    type: 'flat',
                },
                additional_intelligence: {
                    classification: [],
                    type: 'flat',
                },
                'additional_maximum_all_resistances_%': {
                    classification: [],
                    type: 'flat',
                },
                'additional_physical_damage_reduction_%_during_flask_effect': {
                    classification: [],
                    type: 'flat',
                },
                additional_strength: {
                    classification: [],
                    type: 'flat',
                },
                arrow_base_number_of_targets_to_pierce: {
                    classification: [],
                    type: 'flat',
                },
                'attack_and_cast_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'attack_and_cast_speed_+%_during_flask_effect': {
                    classification: [],
                    type: 'flat',
                },
                'attack_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                attack_maximum_added_chaos_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_maximum_added_cold_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_maximum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_maximum_added_lightning_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_maximum_added_physical_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_minimum_added_chaos_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_minimum_added_cold_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_minimum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_minimum_added_lightning_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_minimum_added_physical_damage: {
                    classification: [],
                    type: 'flat',
                },
                attack_projectiles_return: {
                    classification: [],
                    type: 'flat',
                },
                'attack_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'avoid_all_elemental_status_%': {
                    classification: [],
                    type: 'flat',
                },
                'avoid_cold_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'avoid_fire_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'avoid_knockback_%': {
                    classification: [],
                    type: 'flat',
                },
                'avoid_lightning_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_additional_physical_damage_reduction_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_avoid_chill_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_avoid_freeze_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_avoid_ignite_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_avoid_shock_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_avoid_stun_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_bleed_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_cast_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_chance_to_dodge_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_chance_to_dodge_spells_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_chance_to_freeze_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_chance_to_ignite_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_chance_to_shock_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_chaos_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_cold_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_critical_strike_multiplier_+': {
                    classification: [],
                    type: 'flat',
                },
                'base_curse_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_damage_removed_from_mana_before_life_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_energy_shield_regeneration_rate_per_minute_%': {
                    classification: [],
                    type: 'flat',
                },
                base_evasion_rating: {
                    classification: [],
                    type: 'flat',
                },
                'base_fire_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_item_found_quantity_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_item_found_rarity_+%': {
                    classification: [],
                    type: 'inc',
                },
                base_life_gain_per_target: {
                    classification: [],
                    type: 'flat',
                },
                base_life_gained_on_enemy_death: {
                    classification: [],
                    type: 'flat',
                },
                base_life_leech_from_chaos_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                base_life_leech_from_cold_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                base_life_leech_from_fire_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                base_life_leech_from_lightning_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                base_life_regeneration_rate_per_minute: {
                    classification: [],
                    type: 'flat',
                },
                'base_lightning_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                base_mana_gained_on_enemy_death: {
                    classification: [],
                    type: 'flat',
                },
                'base_mana_reservation_+%': {
                    classification: [],
                    type: 'inc',
                },
                base_maximum_energy_shield: {
                    classification: [],
                    type: 'flat',
                },
                base_maximum_life: {
                    classification: [],
                    type: 'flat',
                },
                base_maximum_mana: {
                    classification: [],
                    type: 'flat',
                },
                'base_movement_velocity_+%': {
                    classification: [],
                    type: 'inc',
                },
                base_number_of_additional_arrows: {
                    classification: [],
                    type: 'flat',
                },
                base_number_of_essence_spirits_allowed: {
                    classification: [],
                    type: 'flat',
                },
                base_number_of_skeletons_allowed: {
                    classification: [],
                    type: 'flat',
                },
                base_number_of_spectres_allowed: {
                    classification: [],
                    type: 'flat',
                },
                base_number_of_zombies_allowed: {
                    classification: [],
                    type: 'flat',
                },
                'base_physical_damage_%_to_convert_to_cold': {
                    classification: [],
                    type: 'flat',
                },
                'base_physical_damage_%_to_convert_to_fire': {
                    classification: [],
                    type: 'flat',
                },
                'base_physical_damage_%_to_convert_to_lightning': {
                    classification: [],
                    type: 'flat',
                },
                base_physical_damage_reduction_rating: {
                    classification: [],
                    type: 'flat',
                },
                'base_poison_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_poison_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_projectile_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_reduce_enemy_cold_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_reduce_enemy_fire_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_reduce_enemy_lightning_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_resist_all_elements_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_skill_area_of_effect_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_spell_block_%': {
                    classification: [],
                    type: 'flat',
                },
                'base_stun_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_stun_recovery_+%': {
                    classification: [],
                    type: 'inc',
                },
                'base_stun_threshold_reduction_+%': {
                    classification: [],
                    type: 'inc',
                },
                'bleeding_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'block_while_dual_wielding_%': {
                    classification: [],
                    type: 'flat',
                },
                'burn_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                can_catch_corrupted_fish: {
                    classification: [],
                    type: 'flat',
                },
                cannot_be_knocked_back: {
                    classification: [],
                    type: 'flat',
                },
                cannot_be_poisoned: {
                    classification: [],
                    type: 'flat',
                },
                cannot_have_life_leeched_from: {
                    classification: [],
                    type: 'flat',
                },
                'chaos_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'chaos_damage_taken_over_time_+%': {
                    classification: [],
                    type: 'inc',
                },
                'chaos_resistance_+_while_using_flask': {
                    classification: [],
                    type: 'flat',
                },
                'charges_gained_+%': {
                    classification: [],
                    type: 'inc',
                },
                'chill_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'cold_and_lightning_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'cold_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'critical_strike_chance_+%': {
                    classification: [],
                    type: 'inc',
                },
                curse_on_hit_level_elemental_weakness: {
                    classification: [],
                    type: 'flat',
                },
                curse_on_hit_level_temporal_chains: {
                    classification: [],
                    type: 'flat',
                },
                curse_on_hit_level_vulnerability: {
                    classification: [],
                    type: 'flat',
                },
                'damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'damage_+%_during_flask_effect': {
                    classification: [],
                    type: 'flat',
                },
                'damage_over_time_+%': {
                    classification: [],
                    type: 'inc',
                },
                'damage_taken_goes_to_mana_%': {
                    classification: [],
                    type: 'flat',
                },
                deal_1000_chaos_damage_per_second_for_10_seconds_on_hit: {
                    classification: [],
                    type: 'flat',
                },
                'degen_effect_+%': {
                    classification: [],
                    type: 'inc',
                },
                dummy_stat_display_nothing: {
                    classification: [],
                    type: 'flat',
                },
                'elemental_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'elemental_damage_with_attack_skills_+%': {
                    classification: [],
                    type: 'inc',
                },
                'elemental_penetration_%_during_flask_effect': {
                    classification: [],
                    type: 'flat',
                },
                'energy_shield_delay_-%': {
                    classification: [],
                    type: 'flat',
                },
                'essence_buff_elemental_damage_taken_+%': {
                    classification: [],
                    type: 'inc',
                },
                essence_buff_ground_fire_damage_to_deal_per_second: {
                    classification: [],
                    type: 'flat',
                },
                essence_buff_ground_fire_duration_ms: {
                    classification: [],
                    type: 'flat',
                },
                essence_display_drop_burning_ground_while_moving_fire_damage_per_second: {
                    classification: [],
                    type: 'flat',
                },
                'essence_display_elemental_damage_taken_while_not_moving_+%': {
                    classification: [],
                    type: 'inc',
                },
                'evasion_rating_+%': {
                    classification: [],
                    type: 'inc',
                },
                'fire_and_cold_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'fire_and_lightning_damage_resistance_%': {
                    classification: [],
                    type: 'flat',
                },
                'fire_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'fish_quantity_+%': {
                    classification: [],
                    type: 'inc',
                },
                'fish_rarity_+%': {
                    classification: [],
                    type: 'inc',
                },
                fishing_hook_type: {
                    classification: [],
                    type: 'flat',
                },
                'fishing_line_strength_+%': {
                    classification: [],
                    type: 'inc',
                },
                fishing_lure_type: {
                    classification: [],
                    type: 'flat',
                },
                'fishing_pool_consumption_+%': {
                    classification: [],
                    type: 'inc',
                },
                'fishing_range_+%': {
                    classification: [],
                    type: 'inc',
                },
                'flask_charges_used_+%': {
                    classification: [],
                    type: 'inc',
                },
                'flask_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'flask_life_recovery_rate_+%': {
                    classification: [],
                    type: 'inc',
                },
                'flask_mana_recovery_rate_+%': {
                    classification: [],
                    type: 'inc',
                },
                'fortify_effect_on_self_+%': {
                    classification: [],
                    type: 'inc',
                },
                'freeze_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'gain_flask_charge_when_crit_%': {
                    classification: [],
                    type: 'flat',
                },
                gain_flask_charge_when_crit_amount: {
                    classification: [],
                    type: 'flat',
                },
                'gain_onslaught_for_3_seconds_%_chance_when_hit': {
                    classification: [],
                    type: 'flat',
                },
                'global_hit_causes_monster_flee_%': {
                    classification: [],
                    type: 'flat',
                },
                'global_reduce_enemy_block_%': {
                    classification: [],
                    type: 'flat',
                },
                'ignite_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                item_generation_can_have_multiple_crafted_mods: {
                    classification: [],
                    type: 'flat',
                },
                item_generation_cannot_change_prefixes: {
                    classification: [],
                    type: 'flat',
                },
                item_generation_cannot_change_suffixes: {
                    classification: [],
                    type: 'flat',
                },
                item_generation_cannot_roll_attack_affixes: {
                    classification: [],
                    type: 'flat',
                },
                item_generation_cannot_roll_caster_affixes: {
                    classification: [],
                    type: 'flat',
                },
                item_generation_local_maximum_mod_required_level_override: {
                    classification: [],
                    type: 'flat',
                },
                'item_rarity_+%_while_using_flask': {
                    classification: [],
                    type: 'flat',
                },
                'kill_enemy_on_hit_if_under_10%_life': {
                    classification: [],
                    type: 'flat',
                },
                life_gained_on_block: {
                    classification: [],
                    type: 'flat',
                },
                life_leech_from_physical_attack_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                'life_leech_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'life_regeneration_rate_per_minute_%': {
                    classification: [],
                    type: 'flat',
                },
                'light_radius_+%': {
                    classification: [],
                    type: 'inc',
                },
                'lightning_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                local_accuracy_rating: {
                    classification: [],
                    type: 'flat',
                },
                'local_accuracy_rating_+%': {
                    classification: [],
                    type: 'inc',
                },
                'local_additional_block_chance_%': {
                    classification: ['local', 'block'],
                    type: 'flat',
                },
                local_always_hit: {
                    classification: [],
                    type: 'flat',
                },
                'local_armour_and_energy_shield_+%': {
                    classification: ['local', ['armour', 'energy_shield']],
                    type: 'inc',
                },
                'local_armour_and_evasion_+%': {
                    classification: ['local', ['armour', 'evasion']],
                    type: 'inc',
                },
                'local_armour_and_evasion_and_energy_shield_+%': {
                    classification: ['local', ['armour', 'evasion', 'energy_shield']],
                    type: 'inc',
                },
                'local_attack_speed_+%': {
                    classification: ['local', 'attack_speed'],
                    type: 'inc',
                },
                'local_attribute_requirements_+%': {
                    classification: [],
                    type: 'inc',
                },
                local_base_evasion_rating: {
                    classification: ['local', 'evasion'],
                    type: 'flat',
                },
                local_base_physical_damage_reduction_rating: {
                    classification: ['local', 'armour'],
                    type: 'flat',
                },
                'local_chance_to_bleed_on_hit_%': {
                    classification: [],
                    type: 'flat',
                },
                'local_chance_to_bleed_on_hit_25%': {
                    classification: [],
                    type: 'flat',
                },
                'local_critical_strike_chance_+%': {
                    classification: ['local', 'crit_chance'],
                    type: 'inc',
                },
                'local_display_fire_burst_on_hit_%': {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_anger_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_clarity_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_conductivity_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_critical_weakness_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_determination_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_discipline_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_elemental_weakness_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_flammability_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_frostbite_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_grace_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_haste_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_hatred_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_projectile_weakness_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_purity_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_purity_of_cold_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_purity_of_fire_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_purity_of_lightning_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_temporal_chains_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_vitality_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_vulnerability_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_grants_skill_wrath_level: {
                    classification: [],
                    type: 'flat',
                },
                'local_display_socketed_gems_additional_critical_strike_chance_%': {
                    classification: [],
                    type: 'flat',
                },
                'local_display_socketed_gems_attack_and_cast_speed_+%_final': {
                    classification: [],
                    type: 'more',
                },
                'local_display_socketed_gems_damage_over_time_+%_final': {
                    classification: [],
                    type: 'more',
                },
                'local_display_socketed_gems_elemental_damage_+%_final': {
                    classification: [],
                    type: 'more',
                },
                local_display_socketed_gems_get_added_fire_damage_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_additional_accuracy_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_blood_magic_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_cast_on_crit_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_cast_when_stunned_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_elemental_proliferation_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_faster_cast_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_fork_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_increased_area_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_increased_critical_damage_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_life_leech_level: {
                    classification: [],
                    type: 'flat',
                },
                'local_display_socketed_gems_get_mana_multplier_%': {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_melee_splash_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_multistrike_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_stun_level: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_get_weapon_elemental_damage_level: {
                    classification: [],
                    type: 'flat',
                },
                'local_display_socketed_gems_have_%_chance_to_ignite_with_fire_damage': {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_maximum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_display_socketed_gems_minimum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                'local_display_socketed_gems_physical_damage_%_to_add_as_lightning': {
                    classification: [],
                    type: 'flat',
                },
                'local_display_socketed_non_curse_aura_gems_effect_+%': {
                    classification: [],
                    type: 'inc',
                },
                local_energy_shield: {
                    classification: ['local', 'energy_shield'],
                    type: 'flat',
                },
                'local_energy_shield_+%': {
                    classification: ['local', 'energy_shield'],
                    type: 'inc',
                },
                'local_evasion_and_energy_shield_+%': {
                    classification: ['local', ['evasion', 'energy_shield']],
                    type: 'inc',
                },
                'local_evasion_rating_+%': {
                    classification: ['local', 'evasion'],
                    type: 'inc',
                },
                local_item_drops_on_death_if_equipped_by_animate_armour: {
                    classification: [],
                    type: 'flat',
                },
                local_life_gain_per_target: {
                    classification: [],
                    type: 'flat',
                },
                local_life_leech_from_physical_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                local_mana_leech_from_physical_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                local_maximum_added_chaos_damage: {
                    classification: ['local', 'attack_damage', 'chaos', 'max'],
                    type: 'flat',
                },
                local_maximum_added_cold_damage: {
                    classification: ['local', 'attack_damage', 'cold', 'max'],
                    type: 'flat',
                },
                local_maximum_added_fire_damage: {
                    classification: ['local', 'attack_damage', 'fire', 'max'],
                    type: 'flat',
                },
                local_maximum_added_lightning_damage: {
                    classification: ['local', 'attack_damage', 'lightning', 'max'],
                    type: 'flat',
                },
                local_maximum_added_physical_damage: {
                    classification: ['local', 'attack_damage', 'physical', 'max'],
                    type: 'flat',
                },
                local_minimum_added_chaos_damage: {
                    classification: ['local', 'attack_damage', 'chaos', 'min'],
                    type: 'flat',
                },
                local_minimum_added_cold_damage: {
                    classification: ['local', 'attack_damage', 'cold', 'min'],
                    type: 'flat',
                },
                local_minimum_added_fire_damage: {
                    classification: ['local', 'attack_damage', 'fire', 'min'],
                    type: 'flat',
                },
                local_minimum_added_lightning_damage: {
                    classification: ['local', 'attack_damage', 'lightning', 'min'],
                    type: 'flat',
                },
                local_minimum_added_physical_damage: {
                    classification: ['local', 'attack_damage', 'physical', 'min'],
                    type: 'flat',
                },
                'local_physical_damage_+%': {
                    classification: ['local', 'attack_damage', 'physical'],
                    type: 'inc',
                },
                'local_physical_damage_reduction_rating_+%': {
                    classification: ['local', 'armour'],
                    type: 'inc',
                },
                'local_poison_on_hit_%': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_aura_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_bow_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_chaos_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_cold_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_fire_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_lightning_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_melee_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_minion_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_spell_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_support_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_support_gem_quality_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_socketed_vaal_gem_level_+': {
                    classification: [],
                    type: 'flat',
                },
                'local_stun_threshold_reduction_+%': {
                    classification: [],
                    type: 'inc',
                },
                'local_weapon_range_+': {
                    classification: ['local', 'weapon_range'],
                    type: 'flat',
                },
                'mana_%_gained_on_block': {
                    classification: [],
                    type: 'flat',
                },
                mana_gain_per_target: {
                    classification: [],
                    type: 'flat',
                },
                mana_gained_on_block: {
                    classification: [],
                    type: 'flat',
                },
                mana_leech_from_physical_attack_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                'mana_regeneration_rate_+%': {
                    classification: [],
                    type: 'inc',
                },
                'map_item_drop_quantity_+%': {
                    classification: [],
                    type: 'inc',
                },
                map_num_extra_invasion_bosses: {
                    classification: [],
                    type: 'flat',
                },
                map_set_league_category: {
                    classification: [],
                    type: 'flat',
                },
                max_endurance_charges: {
                    classification: [],
                    type: 'flat',
                },
                max_frenzy_charges: {
                    classification: [],
                    type: 'flat',
                },
                max_power_charges: {
                    classification: [],
                    type: 'flat',
                },
                maximum_added_cold_damage_per_frenzy_charge: {
                    classification: [],
                    type: 'flat',
                },
                maximum_added_fire_damage_if_blocked_recently: {
                    classification: [],
                    type: 'flat',
                },
                'maximum_energy_shield_+%': {
                    classification: [],
                    type: 'inc',
                },
                maximum_physical_damage_to_return_on_block: {
                    classification: [],
                    type: 'flat',
                },
                'mine_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'mine_laying_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                minimum_added_cold_damage_per_frenzy_charge: {
                    classification: [],
                    type: 'flat',
                },
                minimum_added_fire_damage_if_blocked_recently: {
                    classification: [],
                    type: 'flat',
                },
                minimum_physical_damage_to_return_on_block: {
                    classification: [],
                    type: 'flat',
                },
                'minion_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'minion_maximum_life_+%': {
                    classification: [],
                    type: 'inc',
                },
                'minion_movement_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'monster_base_block_%': {
                    classification: [],
                    type: 'flat',
                },
                'movement_speed_+%_during_flask_effect': {
                    classification: [],
                    type: 'flat',
                },
                'movement_speed_+%_while_on_burning_chilled_shocked_ground': {
                    classification: [],
                    type: 'flat',
                },
                nearby_enemies_chilled_on_block: {
                    classification: [],
                    type: 'flat',
                },
                number_of_additional_curses_allowed: {
                    classification: [],
                    type: 'flat',
                },
                number_of_additional_traps_allowed: {
                    classification: [],
                    type: 'flat',
                },
                number_of_skeletons_allowed_per_2_old: {
                    classification: [],
                    type: 'flat',
                },
                old_do_not_use_base_life_leech_from_cold_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                old_do_not_use_base_life_leech_from_fire_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                old_do_not_use_base_life_leech_from_lightning_damage_permyriad: {
                    classification: [],
                    type: 'flat',
                },
                'old_do_not_use_life_leech_from_physical_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'old_do_not_use_local_life_leech_from_physical_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'old_do_not_use_local_mana_leech_from_physical_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'old_do_not_use_mana_leech_from_physical_damage_%': {
                    classification: [],
                    type: 'flat',
                },
                'physical_attack_damage_taken_+': {
                    classification: [],
                    type: 'flat',
                },
                'physical_damage_%_to_add_as_fire': {
                    classification: [],
                    type: 'flat',
                },
                'physical_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'physical_damage_reduction_rating_+%': {
                    classification: [],
                    type: 'inc',
                },
                'physical_damage_taken_%_as_cold': {
                    classification: [],
                    type: 'flat',
                },
                'physical_damage_taken_%_as_fire': {
                    classification: [],
                    type: 'flat',
                },
                physical_damage_to_return_to_melee_attacker: {
                    classification: [],
                    type: 'flat',
                },
                'power_charge_on_block_%_chance': {
                    classification: [],
                    type: 'flat',
                },
                'power_frenzy_or_endurance_charge_on_kill_%': {
                    classification: [],
                    type: 'flat',
                },
                projectile_base_number_of_targets_to_pierce: {
                    classification: [],
                    type: 'flat',
                },
                quiver_projectiles_pierce_1_additional_target: {
                    classification: [],
                    type: 'flat',
                },
                quiver_projectiles_pierce_2_additional_targets: {
                    classification: [],
                    type: 'flat',
                },
                'recover_10%_of_maximum_mana_on_skill_use_%': {
                    classification: [],
                    type: 'flat',
                },
                'reflect_damage_taken_+%': {
                    classification: [],
                    type: 'inc',
                },
                'shock_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'skill_effect_duration_+%': {
                    classification: [],
                    type: 'inc',
                },
                'skill_mana_cost_+': {
                    classification: [],
                    type: 'flat',
                },
                'spell_critical_strike_chance_+%': {
                    classification: [],
                    type: 'inc',
                },
                'spell_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                spell_maximum_added_cold_damage: {
                    classification: [],
                    type: 'flat',
                },
                spell_maximum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                spell_maximum_added_lightning_damage: {
                    classification: [],
                    type: 'flat',
                },
                spell_minimum_added_cold_damage: {
                    classification: [],
                    type: 'flat',
                },
                spell_minimum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                spell_minimum_added_lightning_damage: {
                    classification: [],
                    type: 'flat',
                },
                'trap_damage_+%': {
                    classification: [],
                    type: 'inc',
                },
                'trap_throwing_speed_+%': {
                    classification: [],
                    type: 'inc',
                },
                'unique_facebreaker_unarmed_physical_damage_+%_final': {
                    classification: [],
                    type: 'more',
                },
            };
            exports_15("default", applications);
        }
    };
});
System.register("calculator/Value", ["calculator/ValueRange", "calculator/stat_applications"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var ValueRange_2, stat_applications_1, poe_round, Value;
    return {
        setters: [
            function (ValueRange_2_1) {
                ValueRange_2 = ValueRange_2_1;
            },
            function (stat_applications_1_1) {
                stat_applications_1 = stat_applications_1_1;
            }
        ],
        execute: function () {
            // truncate after precision digits
            poe_round = function (n, precision) {
                // (Math.floor(n * 10 ** precision) / 10 ** precision
                // 1.005 => 1.00499999999999999999
                // round to prec + 1 and then truncate by removing the created digit
                return Number(n.toFixed(precision + 1).slice(0, -1));
            };
            Value = /** @class */ (function () {
                function Value(range, classification, modifiers) {
                    if (classification === void 0) { classification = []; }
                    if (modifiers === void 0) { modifiers = []; }
                    /**
                     * if the value change since init
                     */
                    this.augmented = false;
                    this.range = range instanceof ValueRange_2.default ? range : new ValueRange_2.default(range);
                    this.classification = classification;
                    this.modifiers = modifiers;
                }
                Object.defineProperty(Value.prototype, "value", {
                    get: function () {
                        return this.range.valueOf();
                    },
                    enumerable: true,
                    configurable: true
                });
                Value.prototype.augmentWith = function (stats) {
                    var _this = this;
                    return new Value(this.range, this.classification, this.modifiers.concat(stats.filter(function (stat) { return _this.augmentableBy(stat); }).map(function (stat) {
                        return {
                            stat: stat,
                            type: stat_applications_1.default[stat.props.id].type,
                        };
                    })));
                };
                Value.prototype.augmentableBy = function (stat) {
                    var _this = this;
                    return (stat_applications_1.default[stat.props.id] != null &&
                        // empty clauses never augment anything
                        stat_applications_1.default[stat.props.id].classification.length > 0 &&
                        // applications[stat.props.id].classification is in KNF
                        // [a, b, [c, d]] => a && b && (c || d)
                        stat_applications_1.default[stat.props.id].classification.every(function (tag) {
                            return Array.isArray(tag)
                                ? tag.some(function (or) { return _this.classification.includes(or); })
                                : _this.classification.includes(tag);
                        }));
                };
                /**
                 * calculates the final ValueRange from all the applied modifers
                 *
                 * in PoE all increase modifers get summed up to one big more modifier
                 */
                Value.prototype.compute = function (precision) {
                    if (precision === void 0) { precision = 0; }
                    var flat = this.modifiers
                        .filter(function (_a) {
                        var type = _a.type;
                        return type === 'flat';
                    })
                        .reduce(function (sum, modifier) { return sum.add(modifier.stat.values); }, ValueRange_2.default.zero);
                    var increases = this.modifiers
                        .filter(function (_a) {
                        var type = _a.type;
                        return type === 'inc';
                    })
                        .reduce(function (sum, modifier) { return sum.add(modifier.stat.values); }, ValueRange_2.default.zero);
                    var more = this.modifiers
                        .filter(function (_a) {
                        var type = _a.type;
                        return type === 'more';
                    })
                        .reduce(function (sum, modifier) { return sum.mult(modifier.stat.values.percentToFactor()); }, ValueRange_2.default.one);
                    var calculated = new Value(this.range
                        .add(flat)
                        .mult(increases.percentToFactor())
                        .mult(more)
                        .map(function (n) { return poe_round(n, precision); }));
                    calculated.augmented = calculated.range !== this.range;
                    return calculated;
                };
                return Value;
            }());
            exports_16("default", Value);
        }
    };
});
System.register("containers/item/atlasModifier", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function atlasModifier(baseitem) {
        var has_elder_tag = baseitem.tags.find(function (tag) { return tag === AtlasModifierTag[AtlasModifierTag.elder_item]; }) !== undefined;
        var has_shaper_tag = baseitem.tags.find(function (tag) { return tag === AtlasModifierTag[AtlasModifierTag.shaper_item]; }) !== undefined;
        if (has_elder_tag && has_shaper_tag) {
            throw new Error('Item can only be shaper or elder item not both.');
        }
        if (has_elder_tag) {
            return AtlasModifier.ELDER;
        }
        else if (has_shaper_tag) {
            return AtlasModifier.SHAPER;
        }
        else {
            return AtlasModifier.NONE;
        }
    }
    exports_17("default", atlasModifier);
    // generates the appropriate tags for {baseitem} with {modifier}
    function tagsWithModifier(baseitem, meta_data, modifier) {
        var tags = baseitem.tags;
        var with_none = tags.filter(function (tag) {
            return !tag.endsWith('_shaper') &&
                !tag.endsWith('_elder') &&
                tag !== AtlasModifierTag[AtlasModifierTag.elder_item] &&
                tag !== AtlasModifierTag[AtlasModifierTag.shaper_item];
        });
        switch (modifier) {
            case AtlasModifier.NONE:
                return with_none;
            case AtlasModifier.ELDER:
                return with_none.concat(AtlasModifierTag[AtlasModifierTag.elder_item], AtlasModifierTag[elderTag(meta_data)]);
            case AtlasModifier.SHAPER:
                return with_none.concat(AtlasModifierTag[AtlasModifierTag.shaper_item], AtlasModifierTag[shaperTag(meta_data)]);
        }
    }
    exports_17("tagsWithModifier", tagsWithModifier);
    // {baseitem} specific elder tag
    function elderTag(meta_data) {
        try {
            return suffixedTag('elder', meta_data);
        }
        catch (err) {
            throw new Error("this item cannot have the elder tag (" + err.message + ")");
        }
    }
    exports_17("elderTag", elderTag);
    // {baseitem} specific shaperTag tag
    function shaperTag(meta_data) {
        try {
            return suffixedTag('shaper', meta_data);
        }
        catch (err) {
            throw new Error("this item cannot have the shaper tag (" + err.message + ")");
        }
    }
    exports_17("shaperTag", shaperTag);
    function suffixedTag(suffix, meta_data) {
        var tag_prefix = tagIdentifier(meta_data);
        var tag = AtlasModifierTag[tag_prefix + "_" + suffix];
        if (tag !== undefined) {
            return tag;
        }
        else {
            throw new Error(tag_prefix + " not set in Tag with '" + suffix + "' as suffix");
        }
    }
    function tagIdentifier(meta_data) {
        if (meta_data.isA('AbstractTwoHandAxe')) {
            return '2h_axe';
        }
        else if (meta_data.isA('AbstractTwoHandMace')) {
            return '2h_mace';
        }
        else if (meta_data.isA('AbstractTwoHandSword')) {
            return '2h_sword';
        }
        else if (meta_data.isA('AbstractAmulet')) {
            return 'amulet';
        }
        else if (meta_data.isA('AbstractOneHandAxe')) {
            return 'axe';
        }
        else if (meta_data.isA('AbstractBelt')) {
            return 'belt';
        }
        else if (meta_data.isA('AbstractBodyArmour')) {
            return 'body_armour';
        }
        else if (meta_data.isA('AbstractBoots')) {
            return 'boots';
        }
        else if (meta_data.isA('AbstractBow')) {
            return 'bow';
        }
        else if (meta_data.isA('AbstractClaw')) {
            return 'claw';
        }
        else if (meta_data.isA('AbstractDagger')) {
            return 'dagger';
        }
        else if (meta_data.isA('AbstractGloves')) {
            return 'gloves';
        }
        else if (meta_data.isA('AbstractHelmet')) {
            return 'helmet';
        }
        else if (meta_data.isA('AbstractOneHandMace')) {
            return 'mace';
        }
        else if (meta_data.isA('AbstractQuiver')) {
            return 'quiver';
        }
        else if (meta_data.isA('AbstractRing')) {
            return 'ring';
        }
        else if (meta_data.isA('AbstractSceptre')) {
            return 'sceptre';
        }
        else if (meta_data.isA('AbstractShield')) {
            return 'shield';
        }
        else if (meta_data.isA('AbstractStaff')) {
            return 'staff';
        }
        else if (meta_data.isA('AbstractOneHandSword')) {
            return 'sword';
        }
        else if (meta_data.isA('AbstractWand')) {
            return 'wand';
        }
        throw new Error();
    }
    var AtlasModifier, AtlasModifierTag;
    return {
        setters: [],
        execute: function () {
            (function (AtlasModifier) {
                AtlasModifier["NONE"] = "";
                AtlasModifier["ELDER"] = "elder_item";
                AtlasModifier["SHAPER"] = "shaper_item";
            })(AtlasModifier || (AtlasModifier = {}));
            exports_17("AtlasModifier", AtlasModifier);
            (function (AtlasModifierTag) {
                AtlasModifierTag[AtlasModifierTag["shaper_item"] = 0] = "shaper_item";
                AtlasModifierTag[AtlasModifierTag["elder_item"] = 1] = "elder_item";
                AtlasModifierTag[AtlasModifierTag["boots_shaper"] = 2] = "boots_shaper";
                AtlasModifierTag[AtlasModifierTag["boots_elder"] = 3] = "boots_elder";
                AtlasModifierTag[AtlasModifierTag["sword_shaper"] = 4] = "sword_shaper";
                AtlasModifierTag[AtlasModifierTag["sword_elder"] = 5] = "sword_elder";
                AtlasModifierTag[AtlasModifierTag["gloves_shaper"] = 6] = "gloves_shaper";
                AtlasModifierTag[AtlasModifierTag["gloves_elder"] = 7] = "gloves_elder";
                AtlasModifierTag[AtlasModifierTag["helmet_shaper"] = 8] = "helmet_shaper";
                AtlasModifierTag[AtlasModifierTag["helmet_elder"] = 9] = "helmet_elder";
                AtlasModifierTag[AtlasModifierTag["body_armour_shaper"] = 10] = "body_armour_shaper";
                AtlasModifierTag[AtlasModifierTag["body_armour_elder"] = 11] = "body_armour_elder";
                AtlasModifierTag[AtlasModifierTag["amulet_shaper"] = 12] = "amulet_shaper";
                AtlasModifierTag[AtlasModifierTag["amulet_elder"] = 13] = "amulet_elder";
                AtlasModifierTag[AtlasModifierTag["ring_shaper"] = 14] = "ring_shaper";
                AtlasModifierTag[AtlasModifierTag["ring_elder"] = 15] = "ring_elder";
                AtlasModifierTag[AtlasModifierTag["belt_shaper"] = 16] = "belt_shaper";
                AtlasModifierTag[AtlasModifierTag["belt_elder"] = 17] = "belt_elder";
                AtlasModifierTag[AtlasModifierTag["quiver_shaper"] = 18] = "quiver_shaper";
                AtlasModifierTag[AtlasModifierTag["quiver_elder"] = 19] = "quiver_elder";
                AtlasModifierTag[AtlasModifierTag["shield_shaper"] = 20] = "shield_shaper";
                AtlasModifierTag[AtlasModifierTag["shield_elder"] = 21] = "shield_elder";
                AtlasModifierTag[AtlasModifierTag["2h_sword_shaper"] = 22] = "2h_sword_shaper";
                AtlasModifierTag[AtlasModifierTag["2h_sword_elder"] = 23] = "2h_sword_elder";
                AtlasModifierTag[AtlasModifierTag["axe_shaper"] = 24] = "axe_shaper";
                AtlasModifierTag[AtlasModifierTag["axe_elder"] = 25] = "axe_elder";
                AtlasModifierTag[AtlasModifierTag["mace_shaper"] = 26] = "mace_shaper";
                AtlasModifierTag[AtlasModifierTag["mace_elder"] = 27] = "mace_elder";
                AtlasModifierTag[AtlasModifierTag["claw_shaper"] = 28] = "claw_shaper";
                AtlasModifierTag[AtlasModifierTag["claw_elder"] = 29] = "claw_elder";
                AtlasModifierTag[AtlasModifierTag["bow_shaper"] = 30] = "bow_shaper";
                AtlasModifierTag[AtlasModifierTag["bow_elder"] = 31] = "bow_elder";
                AtlasModifierTag[AtlasModifierTag["dagger_shaper"] = 32] = "dagger_shaper";
                AtlasModifierTag[AtlasModifierTag["dagger_elder"] = 33] = "dagger_elder";
                AtlasModifierTag[AtlasModifierTag["2h_axe_shaper"] = 34] = "2h_axe_shaper";
                AtlasModifierTag[AtlasModifierTag["2h_axe_elder"] = 35] = "2h_axe_elder";
                AtlasModifierTag[AtlasModifierTag["2h_mace_shaper"] = 36] = "2h_mace_shaper";
                AtlasModifierTag[AtlasModifierTag["2h_mace_elder"] = 37] = "2h_mace_elder";
                AtlasModifierTag[AtlasModifierTag["staff_shaper"] = 38] = "staff_shaper";
                AtlasModifierTag[AtlasModifierTag["staff_elder"] = 39] = "staff_elder";
                AtlasModifierTag[AtlasModifierTag["sceptre_shaper"] = 40] = "sceptre_shaper";
                AtlasModifierTag[AtlasModifierTag["sceptre_elder"] = 41] = "sceptre_elder";
                AtlasModifierTag[AtlasModifierTag["wand_shaper"] = 42] = "wand_shaper";
                AtlasModifierTag[AtlasModifierTag["wand_elder"] = 43] = "wand_elder";
            })(AtlasModifierTag || (AtlasModifierTag = {}));
            exports_17("AtlasModifierTag", AtlasModifierTag);
        }
    };
});
System.register("containers/item/Component", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("containers/ImmutableContainer", ["calculator/Stat"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var Stat_2, ImmutableContainer;
    return {
        setters: [
            function (Stat_2_1) {
                Stat_2 = Stat_2_1;
            }
        ],
        execute: function () {
            /**
             * immutable implementation of Container
             */
            ImmutableContainer = /** @class */ (function () {
                function ImmutableContainer(mods) {
                    this.mods = mods;
                }
                ImmutableContainer.prototype.builder = function () {
                    return { mods: this.mods };
                };
                // batch mutations
                ImmutableContainer.prototype.withMutations = function (mutate) {
                    var builder = mutate(this.builder());
                    // @ts-ignore
                    return this.constructor.withBuilder(builder);
                };
                /**
                 *  adds a new non-existing mod
                 */
                ImmutableContainer.prototype.addMod = function (mod) {
                    if (!this.hasMod(mod)) {
                        return this.withMutations(function (builder) {
                            return Object.assign({}, builder, { mods: builder.mods.concat(mod) });
                        });
                    }
                    else {
                        return this;
                    }
                };
                /**
                 * truncates mods
                 */
                ImmutableContainer.prototype.removeAllMods = function () {
                    if (this.mods.length > 0) {
                        return this.withMutations(function (builder) {
                            return Object.assign({}, builder, { mods: [] });
                        });
                    }
                    else {
                        return this;
                    }
                };
                /**
                 * removes an existing mod
                 */
                ImmutableContainer.prototype.removeMod = function (other) {
                    var _this = this;
                    if (this.hasMod(other)) {
                        return this.withMutations(function (builder) {
                            return Object.assign({}, builder, {
                                mods: _this.mods.filter(function (mod) { return mod.props.id !== other.props.id; }),
                            });
                        });
                    }
                    else {
                        return this;
                    }
                };
                ImmutableContainer.prototype.indexOfModWithId = function (id) {
                    return this.mods.findIndex(function (mod) { return mod.props.id === id; });
                };
                ImmutableContainer.prototype.indexOfMod = function (mod) {
                    return this.indexOfModWithId(mod.props.id);
                };
                ImmutableContainer.prototype.hasMod = function (mod) {
                    return this.indexOfMod(mod) !== -1;
                };
                ImmutableContainer.prototype.hasModGroup = function (other) {
                    return (this.mods.find(function (mod) { return mod.props.correct_group === other.props.correct_group; }) !== undefined);
                };
                /**
                 * tags of the mods in the container
                 */
                ImmutableContainer.prototype.getTags = function () {
                    return this.mods
                        .reduce(function (tags, mod) {
                        return tags.concat(mod.props.tags);
                    }, [])
                        .filter(
                    // unique by id
                    function (tag, i, tags) { return tags.findIndex(function (other) { return other === tag; }) === i; });
                };
                ImmutableContainer.prototype.asArray = function () {
                    return this.mods;
                };
                /**
                 * @param {number} mod_type generation type
                 */
                ImmutableContainer.prototype.numberOfModsOfType = function (mod_type) {
                    return this.mods.filter(function (mod) { return mod.props.generation_type === mod_type; })
                        .length;
                };
                /**
                 * checks if theres more place for a mod with their generationtype
                 */
                ImmutableContainer.prototype.hasRoomFor = function (mod) {
                    return (this.numberOfModsOfType(mod.props.generation_type) <
                        this.maxModsOfType(mod));
                };
                /**
                 * checks if this container has any mods
                 */
                ImmutableContainer.prototype.any = function () {
                    return this.mods.length > 0;
                };
                /**
                 * lists all the stats that are offered by its mods
                 *
                 * mods can have multiple stats so we sum their values grouped by stat id
                 */
                ImmutableContainer.prototype.stats = function () {
                    return this.mods.reduce(function (stats, mod) {
                        // flattened
                        return mod.statsJoined().reduce(function (joined, stat) {
                            var id = stat.props.id;
                            var existing = joined[id];
                            // group by stat.Id
                            if (existing instanceof Stat_2.default) {
                                return __assign({}, joined, (_a = {}, _a[id] = existing.add(stat.values), _a));
                            }
                            else {
                                return __assign({}, joined, (_b = {}, _b[id] = stat, _b));
                            }
                            var _a, _b;
                        }, stats);
                    }, {});
                };
                return ImmutableContainer;
            }());
            exports_19("default", ImmutableContainer);
        }
    };
});
System.register("containers/item/components/Affixes", ["mods/index", "containers/ImmutableContainer"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var mods_1, ImmutableContainer_1, ItemAffixes;
    return {
        setters: [
            function (mods_1_1) {
                mods_1 = mods_1_1;
            },
            function (ImmutableContainer_1_1) {
                ImmutableContainer_1 = ImmutableContainer_1_1;
            }
        ],
        execute: function () {
            /**
             * the explicits of an item
             */
            ItemAffixes = /** @class */ (function (_super) {
                __extends(ItemAffixes, _super);
                function ItemAffixes(item, mods) {
                    var _this = _super.call(this, mods) || this;
                    _this.item = item;
                    return _this;
                }
                ItemAffixes.withBuilder = function (builder) {
                    return new ItemAffixes(builder.item, builder.mods);
                };
                ItemAffixes.prototype.builder = function () {
                    return {
                        item: this.item,
                        mods: this.mods,
                    };
                };
                /**
                 * @override
                 */
                ItemAffixes.prototype.maxModsOfType = function (mod) {
                    if (mod.isPrefix()) {
                        return this.maxPrefixes();
                    }
                    else if (mod.isSuffix()) {
                        return this.maxSuffixes();
                    }
                    else {
                        return 0;
                    }
                };
                /**
                 *  checks if the domains are equiv
                 */
                ItemAffixes.prototype.inDomainOf = function (mod_domain) {
                    switch (mod_domain) {
                        case mods_1.Mod.DOMAIN.MASTER:
                            return this.inDomainOf(mods_1.Mod.DOMAIN.ITEM);
                        default:
                            return mod_domain === this.modDomainEquiv();
                    }
                };
                ItemAffixes.prototype.level = function () {
                    return this.item.props.item_level;
                };
                ItemAffixes.prototype.lockedPrefixes = function () {
                    return this.indexOfModWithId(mods_1.metaMods.LOCKED_PREFIXES) !== -1;
                };
                ItemAffixes.prototype.lockedSuffixes = function () {
                    return this.indexOfModWithId(mods_1.metaMods.LOCKED_SUFFIXES) !== -1;
                };
                ItemAffixes.prototype.getPrefixes = function () {
                    return this.mods.filter(function (mod) { return mod.isPrefix(); });
                };
                ItemAffixes.prototype.getSuffixes = function () {
                    return this.mods.filter(function (mod) { return mod.isSuffix(); });
                };
                /**
                 * maximum number of prefixes
                 */
                ItemAffixes.prototype.maxPrefixes = function () {
                    if (this.item.rarity.isNormal()) {
                        return 0;
                    }
                    else if (this.item.rarity.isMagic()) {
                        return 1;
                    }
                    else if (this.item.rarity.isRare()) {
                        if (this.item.meta_data.isA('AbstractJewel')) {
                            return 2;
                        }
                        return 3;
                    }
                    else if (this.item.rarity.isUnique()) {
                        return Number.POSITIVE_INFINITY;
                    }
                    else {
                        throw new Error('rarity not recognized');
                    }
                };
                ItemAffixes.prototype.maxSuffixes = function () {
                    return this.maxPrefixes();
                };
                ItemAffixes.prototype.modDomainEquiv = function () {
                    if (this.item.meta_data.isA('AbstractJewel')) {
                        return mods_1.Mod.DOMAIN.JEWEL;
                    }
                    if (this.item.meta_data.isA('AbstractFlask')) {
                        return mods_1.Mod.DOMAIN.FLASK;
                    }
                    if (this.item.meta_data.isA('AbstractMap')) {
                        return mods_1.Mod.DOMAIN.MAP;
                    }
                    return mods_1.Mod.DOMAIN.ITEM;
                };
                return ItemAffixes;
            }(ImmutableContainer_1.default));
            exports_20("default", ItemAffixes);
        }
    };
});
System.register("containers/item/components/Sockets", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var ItemSockets;
    return {
        setters: [],
        execute: function () {
            /**
             * WIP item component for sockets
             */
            ItemSockets = /** @class */ (function () {
                function ItemSockets(item, builder) {
                    this.parent = item;
                    this.amount = builder;
                }
                ItemSockets.prototype.builder = function () {
                    return this.amount;
                };
                // TODO: what about Corroded Blades or other similar 1x4 Items. Confirm
                // that they also only can have max 4 sockets like Rods or act like small_Staff
                ItemSockets.prototype.max = function () {
                    var by_stats = this.maxOverride();
                    // tags take priority
                    if (by_stats != null) {
                        return by_stats;
                    }
                    else {
                        return Math.min(this.maxByDimensions(), this.maxByLevel(), this.maxByMetaData());
                    }
                };
                ItemSockets.prototype.any = function () {
                    return this.amount > 0;
                };
                ItemSockets.prototype.maxByMetaData = function () {
                    var meta_data = this.parent.meta_data;
                    if (meta_data.isA('AbstractShield')) {
                        return 3;
                    }
                    else if (meta_data.isA('AbstractArmour')) {
                        return 6;
                    }
                    else if (meta_data.isA('AbstractOneHandWeapon')) {
                        return 3;
                    }
                    else if (meta_data.isA('AbstractFishingRod')) {
                        return 4;
                    }
                    else if (meta_data.isA('AbstractTwoHandWeapon')) {
                        return 6;
                    }
                    else if (meta_data.isA('Equipment')) {
                        return 0;
                    }
                    else {
                        throw new Error("Can't determine sockes from meta data for " + meta_data.clazz);
                    }
                };
                ItemSockets.prototype.maxByLevel = function () {
                    var props = this.parent.props;
                    if (props.item_level <= 1) {
                        return 2;
                    }
                    else if (props.item_level <= 2) {
                        return 3;
                    }
                    else if (props.item_level <= 25) {
                        return 4;
                    }
                    else if (props.item_level <= 35) {
                        return 5;
                    }
                    else {
                        return 6;
                    }
                };
                ItemSockets.prototype.maxByDimensions = function () {
                    var _a = this.parent.baseitem, width = _a.width, height = _a.height;
                    return width * height;
                };
                ItemSockets.prototype.maxOverride = function () {
                    var stats = this.parent.stats();
                    var tags = this.parent.getTags();
                    if (stats.local_has_X_sockets != null) {
                        return stats.local_has_X_sockets.values.max;
                    }
                    else if (tags.find(function (id) { return id === 'small_staff'; }) !== undefined) {
                        return 3;
                    }
                    return undefined;
                };
                return ItemSockets;
            }());
            exports_21("default", ItemSockets);
        }
    };
});
System.register("containers/item/components/Name", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var ItemName;
    return {
        setters: [],
        execute: function () {
            /**
             * the name of an item
             *
             * for magic items those name consists of the baseitemname and the prefix/suffix
             * rare and unique items have a set name
             */
            ItemName = /** @class */ (function () {
                function ItemName(item, builder) {
                    this.parent = item;
                    this.random = builder;
                }
                ItemName.prototype.builder = function () {
                    return this.random;
                };
                ItemName.prototype.lines = function () {
                    if (this.parent.rarity.isNormal()) {
                        return [this.parent.baseitem.name];
                    }
                    else if (this.parent.rarity.isMagic()) {
                        var prefix = this.parent.affixes.getPrefixes()[0];
                        var suffix = this.parent.affixes.getSuffixes()[0];
                        return [
                            [
                                prefix && prefix.props.name,
                                this.parent.baseitem.name,
                                suffix && suffix.props.name,
                            ]
                                .filter(Boolean)
                                .join(' '),
                        ];
                    }
                    else if (this.parent.rarity.isRare()) {
                        return [this.random, this.parent.baseitem.name];
                    }
                    else if (this.parent.rarity.isUnique()) {
                        return ['TODO unique name?', this.parent.baseitem.name];
                    }
                    else {
                        throw new Error("unrecognized rarity " + String(this.parent.rarity));
                    }
                };
                ItemName.prototype.any = function () {
                    return true;
                };
                return ItemName;
            }());
            exports_22("default", ItemName);
        }
    };
});
System.register("containers/item/components/Rarity", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var RarityKind, ItemRarity;
    return {
        setters: [],
        execute: function () {
            (function (RarityKind) {
                RarityKind[RarityKind["normal"] = 1] = "normal";
                RarityKind[RarityKind["magic"] = 2] = "magic";
                RarityKind[RarityKind["rare"] = 3] = "rare";
                RarityKind[RarityKind["unique"] = 4] = "unique";
                RarityKind[RarityKind["showcase"] = 5] = "showcase";
            })(RarityKind || (RarityKind = {}));
            exports_23("RarityKind", RarityKind);
            /**
             * the rarity of an item
             */
            ItemRarity = /** @class */ (function () {
                function ItemRarity(item, builder) {
                    this.parent = item;
                    this.kind = builder;
                }
                ItemRarity.prototype.builder = function () {
                    return this.kind;
                };
                ItemRarity.prototype.isNormal = function () {
                    return this.kind === RarityKind.normal;
                };
                ItemRarity.prototype.isMagic = function () {
                    return this.kind === RarityKind.magic;
                };
                ItemRarity.prototype.isRare = function () {
                    return this.kind === RarityKind.rare || this.kind === RarityKind.showcase;
                };
                ItemRarity.prototype.isUnique = function () {
                    return this.kind === RarityKind.unique;
                };
                /**
                 * upgrade rarirty by one tier
                 *
                 * normal > magic > rare
                 */
                ItemRarity.prototype.upgrade = function () {
                    var new_rarity = this.kind;
                    if (this.isNormal()) {
                        new_rarity = RarityKind.magic;
                    }
                    else if (this.isMagic()) {
                        new_rarity = RarityKind.rare;
                    }
                    return this.parent.withMutations(function (builder) {
                        return __assign({}, builder, { rarity: new_rarity });
                    });
                };
                ItemRarity.prototype.set = function (rarity) {
                    return this.parent.withMutations(function (builder) {
                        return __assign({}, builder, { rarity: RarityKind[rarity] });
                    });
                };
                ItemRarity.prototype.toString = function () {
                    return RarityKind[this.kind].toString();
                };
                ItemRarity.prototype.any = function () {
                    // ItemRarity always has a rarity
                    return true;
                };
                return ItemRarity;
            }());
            exports_23("default", ItemRarity);
        }
    };
});
System.register("containers/item/components/Implicits", ["mods/index", "containers/ImmutableContainer"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var mods_2, ImmutableContainer_2, Implicits;
    return {
        setters: [
            function (mods_2_1) {
                mods_2 = mods_2_1;
            },
            function (ImmutableContainer_2_1) {
                ImmutableContainer_2 = ImmutableContainer_2_1;
            }
        ],
        execute: function () {
            /**
             * the implicits of an item
             */
            Implicits = /** @class */ (function (_super) {
                __extends(Implicits, _super);
                function Implicits(item, mods) {
                    var _this = _super.call(this, mods) || this;
                    _this.item = item;
                    return _this;
                }
                Implicits.withBuilder = function (builder) {
                    return new Implicits(builder.item, builder.mods);
                };
                /**
                 * @override
                 */
                Implicits.prototype.maxModsOfType = function (mod) {
                    switch (mod.props.generation_type) {
                        case mods_2.Mod.TYPE.PREMADE:
                            return 5;
                        case mods_2.Mod.TYPE.ENCHANTMENT:
                            return 1;
                        case mods_2.Mod.TYPE.VAAL:
                            return 1;
                        // no other generation types allowed
                        default:
                            return -1;
                    }
                };
                /**
                 * @override
                 *  checks if the domains are equiv
                 */
                Implicits.prototype.inDomainOf = function () {
                    return true;
                };
                /**
                 * @override
                 */
                Implicits.prototype.level = function () {
                    return this.item.props.item_level;
                };
                return Implicits;
            }(ImmutableContainer_2.default));
            exports_24("default", Implicits);
        }
    };
});
System.register("containers/item/components/Requirements", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var ItemName;
    return {
        setters: [],
        execute: function () {
            /**
             * the requirements to use this item
             *
             * contains attributes strength, intelligence, evasion
             * and the itemlevel
             */
            ItemName = /** @class */ (function () {
                function ItemName(item, builder) {
                    this.dex = 0;
                    this.int = 0;
                    this.str = 0;
                    this.parent = item;
                    if (builder != null) {
                        this.dex = builder.req_dex;
                        this.int = builder.req_int;
                        this.str = builder.req_str;
                    }
                }
                ItemName.prototype.builder = function () {
                    return {
                        req_dex: this.dex,
                        req_int: this.int,
                        req_str: this.str,
                    };
                };
                ItemName.prototype.level = function () {
                    if (this.parent.meta_data.isA('AbstractMap')) {
                        return 0;
                    }
                    else {
                        return Math.max.apply(Math, [this.parent.baseitem.drop_level].concat(this.parent.mods.map(function (mod) { return mod.requiredLevel(); })));
                    }
                };
                ItemName.prototype.list = function () {
                    return {
                        level: this.level(),
                        str: this.str,
                        dex: this.dex,
                        int: this.int,
                    };
                };
                ItemName.prototype.any = function () {
                    return Object.values(this.list()).some(function (value) { return value !== 0; });
                };
                return ItemName;
            }());
            exports_25("default", ItemName);
        }
    };
});
System.register("containers/item/components/properties/Properties", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var ItemProperties;
    return {
        setters: [],
        execute: function () {
            /**
             * properties for every item
             *
             * this is used for miscellaneous properties that don't really fit
             * into any other component
             */
            ItemProperties = /** @class */ (function () {
                // eslint-disable-next-line no-unused-vars
                function ItemProperties(item, builder) {
                    this.parent = item;
                    this.quality = builder.quality;
                }
                ItemProperties.prototype.builder = function () {
                    return {
                        quality: this.quality,
                    };
                };
                ItemProperties.prototype.any = function () {
                    return this.quality > 0;
                };
                return ItemProperties;
            }());
            exports_26("default", ItemProperties);
        }
    };
});
System.register("containers/item/components/properties/ArmourProperties", ["containers/item/components/properties/Properties", "calculator/ValueRange"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var Properties_1, ValueRange_3, ItemArmourProperties;
    return {
        setters: [
            function (Properties_1_1) {
                Properties_1 = Properties_1_1;
            },
            function (ValueRange_3_1) {
                ValueRange_3 = ValueRange_3_1;
            }
        ],
        execute: function () {
            ItemArmourProperties = /** @class */ (function (_super) {
                __extends(ItemArmourProperties, _super);
                function ItemArmourProperties() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ItemArmourProperties.prototype.defences = function () {
                    var item = this.parent;
                    var component_armour = item.baseitem.component_armour;
                    if (component_armour == null) {
                        throw new Error('component_armour not set while attempting to calculate defences');
                    }
                    var armour = component_armour.armour, evasion = component_armour.evasion, energy_shield = component_armour.energy_shield;
                    return {
                        armour: this.parent.computeValue(armour, ['local', 'defences', 'armour']),
                        evasion: this.parent.computeValue(evasion, [
                            'local',
                            'defences',
                            'evasion',
                        ]),
                        energy_shield: this.parent.computeValue(energy_shield, [
                            'local',
                            'defences',
                            'energy_shield',
                        ]),
                    };
                };
                ItemArmourProperties.prototype.any = function () {
                    var _a = this.defences(), armour = _a.armour, energy_shield = _a.energy_shield, evasion = _a.evasion;
                    return (_super.prototype.any.call(this) ||
                        // armour > 0
                        !ValueRange_3.default.isZero(armour.value) ||
                        // es > 0
                        !ValueRange_3.default.isZero(energy_shield.value) ||
                        // eva > 0
                        !ValueRange_3.default.isZero(evasion.value));
                };
                return ItemArmourProperties;
            }(Properties_1.default));
            exports_27("default", ItemArmourProperties);
        }
    };
});
System.register("containers/item/components/properties/ShieldProperties", ["containers/item/components/properties/ArmourProperties"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var ArmourProperties_1, ItemShieldProperties;
    return {
        setters: [
            function (ArmourProperties_1_1) {
                ArmourProperties_1 = ArmourProperties_1_1;
            }
        ],
        execute: function () {
            ItemShieldProperties = /** @class */ (function (_super) {
                __extends(ItemShieldProperties, _super);
                function ItemShieldProperties() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ItemShieldProperties.prototype.block = function () {
                    var shield_type = this.parent.baseitem.shield_type;
                    if (shield_type === undefined) {
                        throw new Error('shield_type not set in baseitem');
                    }
                    return this.parent.computeValue(shield_type.block, ['local', 'block']);
                };
                return ItemShieldProperties;
            }(ArmourProperties_1.default));
            exports_28("default", ItemShieldProperties);
        }
    };
});
System.register("containers/item/components/properties/WeaponProperties", ["containers/item/components/properties/Properties"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var Properties_2, ItemWeaponProperties;
    return {
        setters: [
            function (Properties_2_1) {
                Properties_2 = Properties_2_1;
            }
        ],
        execute: function () {
            ItemWeaponProperties = /** @class */ (function (_super) {
                __extends(ItemWeaponProperties, _super);
                function ItemWeaponProperties() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ItemWeaponProperties.prototype.physical_damage = function () {
                    var _a = this.weaponProps(), damage_min = _a.damage_min, damage_max = _a.damage_max;
                    return this.attackDamageRange(damage_min, damage_max, 'physical');
                };
                ItemWeaponProperties.prototype.chaos_damage = function () {
                    return this.attackDamageRange(0, 0, 'chaos');
                };
                ItemWeaponProperties.prototype.cold_damage = function () {
                    return this.attackDamageRange(0, 0, 'cold');
                };
                ItemWeaponProperties.prototype.fire_damage = function () {
                    return this.attackDamageRange(0, 0, 'fire');
                };
                ItemWeaponProperties.prototype.lightning_damage = function () {
                    return this.attackDamageRange(0, 0, 'lightning');
                };
                // attacks per 100s
                ItemWeaponProperties.prototype.attack_speed = function () {
                    // speed is in ms, precision 2 => 1e5
                    // seems to round ingame, see short bow test case
                    return this.parent.computeValue(Math.round(1e5 / this.weaponProps().speed), ['local', 'attack_speed']);
                };
                // crit() / 100 = crit%
                ItemWeaponProperties.prototype.crit = function () {
                    return this.parent.computeValue(this.weaponProps().critical, [
                        'local',
                        'crit_chance',
                    ]);
                };
                ItemWeaponProperties.prototype.weapon_range = function () {
                    return this.parent.computeValue(this.weaponProps().range_max, [
                        'local',
                        'weapon_range',
                    ]);
                };
                ItemWeaponProperties.prototype.any = function () {
                    return _super.prototype.any.call(this);
                };
                ItemWeaponProperties.prototype.weaponProps = function () {
                    var weapon_type = this.parent.baseitem.weapon_type;
                    if (weapon_type === undefined) {
                        throw new Error('weapon_type not set in baseitem');
                    }
                    return weapon_type;
                };
                ItemWeaponProperties.prototype.attackDamageRange = function (min, max, type) {
                    var classification = ['local', 'attack_damage', type];
                    return {
                        min: this.parent.computeValue(min, classification.concat(['min'])),
                        max: this.parent.computeValue(max, classification.concat(['max'])),
                    };
                };
                return ItemWeaponProperties;
            }(Properties_2.default));
            exports_29("default", ItemWeaponProperties);
        }
    };
});
System.register("containers/item/components/properties/build", ["containers/item/components/properties/Properties", "containers/item/components/properties/ArmourProperties", "containers/item/components/properties/ShieldProperties", "containers/item/components/properties/WeaponProperties"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    function build(item, builder) {
        if (item.meta_data.isA('AbstractShield')) {
            return new ShieldProperties_1.default(item, builder);
        }
        else if (item.meta_data.isA('AbstractArmour')) {
            return new ArmourProperties_2.default(item, builder);
        }
        else if (item.meta_data.isA('AbstractWeapon')) {
            return new WeaponProperties_1.default(item, builder);
        }
        else {
            return new Properties_3.default(item, builder);
        }
    }
    exports_30("default", build);
    var Properties_3, ArmourProperties_2, ShieldProperties_1, WeaponProperties_1;
    return {
        setters: [
            function (Properties_3_1) {
                Properties_3 = Properties_3_1;
            },
            function (ArmourProperties_2_1) {
                ArmourProperties_2 = ArmourProperties_2_1;
            },
            function (ShieldProperties_1_1) {
                ShieldProperties_1 = ShieldProperties_1_1;
            },
            function (WeaponProperties_1_1) {
                WeaponProperties_1 = WeaponProperties_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("containers/item/components/properties/index", ["containers/item/components/properties/Properties", "containers/item/components/properties/build"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (Properties_4_1) {
                exports_31({
                    "ItemProperties": Properties_4_1["default"]
                });
            },
            function (build_1_1) {
                exports_31({
                    "build": build_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("containers/item/Item", ["make-error", "mods/index", "util/MetaData", "calculator/Value", "containers/item/atlasModifier", "containers/item/components/Affixes", "containers/item/components/Sockets", "containers/item/components/Name", "containers/item/components/Rarity", "containers/item/components/Implicits", "containers/item/components/Requirements", "containers/item/components/properties/index"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var make_error_1, mods_3, MetaData_2, Value_1, atlasModifier_1, Affixes_1, Sockets_1, Name_1, Rarity_1, Implicits_1, Requirements_1, properties_1, UnacceptedMod, shallowEqual, Item;
    return {
        setters: [
            function (make_error_1_1) {
                make_error_1 = make_error_1_1;
            },
            function (mods_3_1) {
                mods_3 = mods_3_1;
            },
            function (MetaData_2_1) {
                MetaData_2 = MetaData_2_1;
            },
            function (Value_1_1) {
                Value_1 = Value_1_1;
            },
            function (atlasModifier_1_1) {
                atlasModifier_1 = atlasModifier_1_1;
            },
            function (Affixes_1_1) {
                Affixes_1 = Affixes_1_1;
            },
            function (Sockets_1_1) {
                Sockets_1 = Sockets_1_1;
            },
            function (Name_1_1) {
                Name_1 = Name_1_1;
            },
            function (Rarity_1_1) {
                Rarity_1 = Rarity_1_1;
            },
            function (Implicits_1_1) {
                Implicits_1 = Implicits_1_1;
            },
            function (Requirements_1_1) {
                Requirements_1 = Requirements_1_1;
            },
            function (properties_1_1) {
                properties_1 = properties_1_1;
            }
        ],
        execute: function () {
            UnacceptedMod = /** @class */ (function (_super) {
                __extends(UnacceptedMod, _super);
                function UnacceptedMod() {
                    return _super.call(this, 'Unacceptable mods passed to this Container') || this;
                }
                return UnacceptedMod;
            }(make_error_1.BaseError));
            exports_32("UnacceptedMod", UnacceptedMod);
            shallowEqual = function (a, b) {
                return a === b || Object.keys(a).every(function (key) { return a[key] === b[key]; });
            };
            /**
             * an Item in Path of Exile
             */
            Item = /** @class */ (function () {
                /**
                 * Use Item#build
                 *
                 * @private
                 * @param builder
                 */
                function Item(builder) {
                    this.baseitem = builder.baseitem;
                    this.props = builder.props;
                    this.meta_data = builder.meta_data;
                    // components
                    this.name = new Name_1.default(this, builder.name);
                    this.properties = properties_1.build(this, builder.properties);
                    this.rarity = new Rarity_1.default(this, builder.rarity);
                    this.requirements = new Requirements_1.default(this, builder.requirements);
                    this.sockets = new Sockets_1.default(this, builder.sockets);
                    this.affixes = new Affixes_1.default(this, builder.affixes);
                    this.implicits = new Implicits_1.default(this, builder.implicits);
                }
                /**
                 * creates a new item from the baseitem
                 * @param baseitem
                 */
                Item.build = function (baseitem) {
                    var clazz = String(baseitem.inherits_from.split(/[\\/]/).pop());
                    var meta_data = MetaData_2.default.build(clazz);
                    var implicits = baseitem.implicit_mods.map(function (mod_props) { return new mods_3.Mod(mod_props); });
                    return new Item({
                        affixes: [],
                        baseitem: baseitem,
                        implicits: implicits,
                        meta_data: meta_data,
                        name: 'Random Name',
                        /**
                         * miscellaneous props
                         */
                        props: {
                            atlas_modifier: atlasModifier_1.default(baseitem),
                            corrupted: false,
                            item_level: 100,
                            mirrored: false,
                        },
                        /**
                         * calculation related props
                         */
                        properties: { quality: 0 },
                        rarity: Rarity_1.RarityKind.normal,
                        requirements: baseitem.component_attribute_requirement,
                        /**
                         * the sockets of the item
                         */
                        sockets: 0,
                    });
                };
                Item.fromBuilder = function (builder) {
                    return new Item(builder);
                };
                Item.prototype.withMutations = function (mutate) {
                    var prev = this.builder();
                    var mutated = mutate(prev);
                    if (shallowEqual(prev, mutated)) {
                        return this;
                    }
                    else {
                        // @ts-ignore
                        return this.constructor.fromBuilder(mutated);
                    }
                };
                Item.prototype.builder = function () {
                    return {
                        affixes: this.affixes.mods,
                        baseitem: this.baseitem,
                        implicits: this.implicits.mods,
                        meta_data: this.meta_data,
                        name: this.name.builder(),
                        props: this.props,
                        properties: this.properties.builder(),
                        rarity: this.rarity.builder(),
                        requirements: this.requirements.builder(),
                        sockets: this.sockets.builder(),
                    };
                };
                // Taggable Implementation
                /**
                 * returns tags of item + tags from mods
                 */
                Item.prototype.getTags = function () {
                    return this.meta_data.props.tags.concat(this.baseitem.tags, this.implicits.getTags(), this.affixes.getTags());
                };
                Object.defineProperty(Item.prototype, "mods", {
                    // Container implementtion
                    get: function () {
                        return this.implicits.mods.concat(this.affixes.mods);
                    },
                    enumerable: true,
                    configurable: true
                });
                Item.prototype.asArray = function () {
                    return this.mods;
                };
                /**
                 * decides where to add the mod (explicit, implicit)
                 * throws if it could not decide where to put it
                 * @param other
                 */
                Item.prototype.addMod = function (other) {
                    if (other.isAffix()) {
                        return this.addAffix(other);
                    }
                    else if (other.implicitCandidate()) {
                        return this.addImplicit(other);
                    }
                    else {
                        throw new UnacceptedMod();
                    }
                };
                /**
                 * removed this mod either from implicit or explicit
                 *
                 * if that mod fiths into neither category it throws
                 * @param other
                 */
                Item.prototype.removeMod = function (other) {
                    if (other.isAffix()) {
                        return this.removeAffix(other);
                    }
                    else if (other.implicitCandidate()) {
                        return this.removeImplicit(other);
                    }
                    else {
                        throw new UnacceptedMod();
                    }
                };
                /**
                 * removes explicits
                 */
                Item.prototype.removeAllMods = function () {
                    return this.mutateAffixes(function (affixes) { return affixes.removeAllMods(); });
                };
                Item.prototype.hasMod = function (other) {
                    return this.affixes.hasMod(other) || this.implicits.hasMod(other);
                };
                Item.prototype.hasModGroup = function (other) {
                    return (
                    // isAffix => this.affixes.hasModGroup(other)
                    (!other.isAffix() || this.affixes.hasModGroup(other)) &&
                        // implicitCandidate => this.implicits.hasModGroup(other)
                        (!other.implicitCandidate() || this.implicits.hasModGroup(other)));
                };
                Item.prototype.hasRoomFor = function (other) {
                    return this.affixes.hasRoomFor(other) || this.implicits.hasRoomFor(other);
                };
                Item.prototype.indexOfModWithId = function (id) {
                    var affix_index = this.affixes.indexOfModWithId(id);
                    var implicit_index = this.implicits.indexOfModWithId(id);
                    if (affix_index !== -1) {
                        return affix_index;
                    }
                    else if (implicit_index !== -1) {
                        return implicit_index;
                    }
                    else {
                        return -1;
                    }
                };
                Item.prototype.maxModsOfType = function (other) {
                    if (other.isAffix()) {
                        return this.affixes.maxModsOfType(other);
                    }
                    else if (other.implicitCandidate()) {
                        return this.implicits.maxModsOfType(other);
                    }
                    else {
                        throw new UnacceptedMod();
                    }
                };
                Item.prototype.inDomainOf = function (mod_domain) {
                    return this.affixes.inDomainOf(mod_domain);
                };
                Item.prototype.level = function () {
                    return this.props.item_level;
                };
                Item.prototype.any = function () {
                    return this.mods.length > 0;
                };
                /**
                 * merge of implicit and explicit stats
                 */
                Item.prototype.stats = function () {
                    // merge implicit stats and affix stats by adding its stats
                    var a = this.implicits.stats();
                    var b = this.affixes.stats();
                    // assume that keys are unique
                    return Object.keys(a).concat(Object.keys(b)).reduce(function (stats, key) {
                        var left = a[key];
                        var right = b[key];
                        if (stats[key] != null) {
                            // already merged
                            return stats;
                        }
                        else {
                            var merged = void 0;
                            if (left != null && right != null) {
                                merged = left.add(right.values);
                            }
                            else if (right != null) {
                                merged = right;
                            }
                            else if (left != null) {
                                merged = left;
                            }
                            else {
                                // unreachable
                                throw new Error('unreachable code');
                            }
                            return __assign({}, stats, (_a = {}, _a[key] = merged, _a));
                        }
                        var _a;
                    }, {});
                };
                // End Container implementation
                Item.prototype.removeAllImplicits = function () {
                    return this.mutateImplicits(function (implicits) { return implicits.removeAllMods(); });
                };
                // Begin state managment
                Item.prototype.setProperty = function (prop, value) {
                    return this.withMutations(function (builder) {
                        return __assign({}, builder, { props: __assign({}, builder.props, (_a = {}, _a[prop] = value, _a)) });
                        var _a;
                    });
                };
                /**
                 * sets the corrupted property on the item or throws if it is already corrupted
                 */
                Item.prototype.corrupt = function () {
                    if (this.props.corrupted) {
                        throw new Error('invalid state: is already corrupted');
                    }
                    else {
                        return this.setProperty('corrupted', true);
                    }
                };
                /**
                 * sets the mirror property on the item or throws if it is already mirrored
                 */
                Item.prototype.mirror = function () {
                    if (this.props.mirrored) {
                        throw new Error('invalid state: is already mirrored');
                    }
                    else {
                        return this.setProperty('mirrored', true);
                    }
                };
                Item.prototype.isElderItem = function () {
                    return this.props.atlas_modifier === atlasModifier_1.AtlasModifier.ELDER;
                };
                /**
                 * returns an item that can have elder mods
                 *
                 * this does not remove existing shaper mods
                 */
                Item.prototype.asElderItem = function () {
                    return this.asAtlasModifier(atlasModifier_1.AtlasModifier.ELDER);
                };
                Item.prototype.isSHaperItem = function () {
                    return this.props.atlas_modifier === atlasModifier_1.AtlasModifier.SHAPER;
                };
                /**
                 * returns an item that can have shaper mods
                 *
                 * this does not remove existing elder mods
                 */
                Item.prototype.asShaperItem = function () {
                    return this.asAtlasModifier(atlasModifier_1.AtlasModifier.SHAPER);
                };
                // returns an item that cant have elder or shaper mods
                // this does not remove existing elder or shaper mods
                Item.prototype.removeAtlasModifier = function () {
                    return this.asAtlasModifier(atlasModifier_1.AtlasModifier.NONE);
                };
                // End state
                /**
                 * augments a given {value} with the local stats
                 * @param value
                 * @param classification
                 */
                Item.prototype.computeValue = function (value, classification) {
                    var base = new Value_1.default([value, value], classification);
                    return base.augmentWith(Object.values(this.stats())).compute();
                };
                // private
                Item.prototype.mutateAffixes = function (mutate) {
                    var _this = this;
                    return this.withMutations(function (builder) {
                        return __assign({}, builder, { affixes: mutate(_this.affixes).mods });
                    });
                };
                Item.prototype.addAffix = function (other) {
                    return this.mutateAffixes(function (affixes) { return affixes.addMod(other); });
                };
                Item.prototype.removeAffix = function (other) {
                    return this.mutateAffixes(function (affixes) { return affixes.removeMod(other); });
                };
                Item.prototype.mutateImplicits = function (mutate) {
                    var _this = this;
                    return this.withMutations(function (builder) {
                        return __assign({}, builder, { implicits: mutate(_this.implicits).mods });
                    });
                };
                Item.prototype.addImplicit = function (other) {
                    return this.mutateImplicits(function (implicits) { return implicits.addMod(other); });
                };
                Item.prototype.removeImplicit = function (other) {
                    return this.mutateImplicits(function (implicits) { return implicits.removeMod(other); });
                };
                Item.prototype.asAtlasModifier = function (modifier) {
                    if (this.props.atlas_modifier === modifier) {
                        return this;
                    }
                    else {
                        return this.withMutations(function (builder) {
                            return __assign({}, builder, { baseitem: __assign({}, builder.baseitem, { tags: atlasModifier_1.tagsWithModifier(builder.baseitem, builder.meta_data, modifier) }), props: __assign({}, builder.props, { atlas_modifier: modifier }) });
                        });
                    }
                };
                return Item;
            }());
            exports_32("default", Item);
        }
    };
});
System.register("containers/item/index", ["containers/item/Item", "containers/item/components/properties/ArmourProperties", "containers/item/components/properties/ShieldProperties", "containers/item/components/properties/WeaponProperties"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var Item_1;
    return {
        setters: [
            function (Item_1_1) {
                Item_1 = Item_1_1;
            },
            function (ArmourProperties_3_1) {
                exports_33({
                    "ArmourProperties": ArmourProperties_3_1["default"]
                });
            },
            function (ShieldProperties_2_1) {
                exports_33({
                    "ShieldProperties": ShieldProperties_2_1["default"]
                });
            },
            function (WeaponProperties_2_1) {
                exports_33({
                    "WeaponProperties": WeaponProperties_2_1["default"]
                });
            }
        ],
        execute: function () {
            exports_33("default", Item_1.default);
        }
    };
});
System.register("util/rng", ["lodash"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    function random(min, max) {
        return _.random(min, max);
    }
    exports_34("random", random);
    function choose(pool, getWeight) {
        var sum_spawnweight = pool.reduce(function (sum, weightable) { return sum + getWeight(weightable); }, 0);
        var min_spawnweight = 0;
        // roll a number between 0 and the sum of all weights
        var hit = random(min_spawnweight, sum_spawnweight);
        // the chosen option is the one where hit
        // in [sum_of_prev_weights, sum_of_prev_weights  + own_spawnweigh]
        var item = pool.find(function (other) {
            min_spawnweight += getWeight(other);
            return hit <= min_spawnweight;
        });
        return item;
    }
    exports_34("choose", choose);
    var _;
    return {
        setters: [
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/Orb", ["mods/index", "util/Flags", "util/rng", "generators/Generator"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var mods_4, Flags_3, rng_1, Generator_1, Orb;
    return {
        setters: [
            function (mods_4_1) {
                mods_4 = mods_4_1;
            },
            function (Flags_3_1) {
                Flags_3 = Flags_3_1;
            },
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (Generator_1_1) {
                Generator_1 = Generator_1_1;
            }
        ],
        execute: function () {
            /**
             * @abstract
             * a Generator that randomly rolls one of its mods
             * ignores mods that have no spawnweight or 0 spawnweight for every tag
             */
            Orb = /** @class */ (function (_super) {
                __extends(Orb, _super);
                function Orb() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Orb.modFilter = function (mod) {
                    return (mod.spawn_weights.length > 0 &&
                        mod.spawn_weights.some(function (_a) {
                            var value = _a.value;
                            return value > 0;
                        }));
                };
                Orb.buildMods = function (mods) {
                    var _this = this;
                    return mods
                        .filter(function (props) { return _this.modFilter(props); })
                        .map(function (props) { return new mods_4.Mod(props); });
                };
                Orb.prototype.chooseMod = function (container) {
                    var details = this.modsFor(container);
                    var detail = rng_1.choose(details, function (other) {
                        if (other.spawnweight == null) {
                            throw new Error('optional spawnweight not allowed when choosing');
                        }
                        return other.spawnweight;
                    });
                    if (detail != null) {
                        return detail.mod;
                    }
                    else {
                        return undefined;
                    }
                };
                /**
                 * adds a mod from chooseMod ignoring if it's applicable
                 * @param {Item} item
                 */
                Orb.prototype.rollMod = function (container) {
                    var mod = this.chooseMod(container);
                    if (mod != null) {
                        return container.addMod(mod);
                    }
                    else {
                        return container;
                    }
                };
                Orb.prototype.isModSpawnableOn = function (mod, container) {
                    var spawnable_flags = {
                        no_matching_tags: false,
                        spawnweight_zero: false,
                    };
                    var spawnweight = mod.spawnweightPropsFor(container);
                    if (spawnweight == null) {
                        // at first glance this shouldn't be happening
                        // since every mod seems to have a spawnweight for the default
                        // tag which every equipment seems to have
                        spawnable_flags.no_matching_tags = true;
                    }
                    else if (spawnweight.value <= 0) {
                        spawnable_flags.spawnweight_zero = true;
                    }
                    return spawnable_flags;
                };
                Orb.prototype.modsFor = function (container, whitelist) {
                    var _this = this;
                    if (whitelist === void 0) { whitelist = []; }
                    var details = [];
                    this.getAvailableMods().forEach(function (mod) {
                        var applicable_flags = _this.isModApplicableTo(mod, container);
                        var spawnable_flags = _this.isModSpawnableOn(mod, container);
                        var spawnweight = mod.spawnweightFor(container);
                        var is_applicable = !Flags_3.anySet(applicable_flags, whitelist);
                        var is_spawnable = !Flags_3.anySet(spawnable_flags, whitelist);
                        var is_rollable = is_applicable && is_spawnable;
                        if (is_rollable) {
                            details.push({
                                mod: mod,
                                applicable: applicable_flags,
                                spawnable: spawnable_flags,
                                spawnweight: spawnweight,
                            });
                        }
                    });
                    return details;
                };
                return Orb;
            }(Generator_1.default));
            exports_35("default", Orb);
        }
    };
});
System.register("generators/item_orbs/ItemOrb", ["generators/Orb"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var Orb_1, ItemOrb;
    return {
        setters: [
            function (Orb_1_1) {
                Orb_1 = Orb_1_1;
            }
        ],
        execute: function () {
            ItemOrb = /** @class */ (function (_super) {
                __extends(ItemOrb, _super);
                function ItemOrb() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * currency only applies to items
                 */
                ItemOrb.prototype.applicableTo = function (item) {
                    var applicable_flags = {
                        corrupted: false,
                        mirrored: false,
                    };
                    if (item.props.corrupted) {
                        applicable_flags.corrupted = true;
                    }
                    if (item.props.mirrored) {
                        applicable_flags.mirrored = true;
                    }
                    return applicable_flags;
                };
                return ItemOrb;
            }(Orb_1.default));
            exports_36("default", ItemOrb);
        }
    };
});
System.register("generators/item_orbs/Transmute", ["util/Flags", "generators/item_orbs/ItemOrb", "mods/Mod"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var Flags_4, ItemOrb_1, Mod_2, Transmute;
    return {
        setters: [
            function (Flags_4_1) {
                Flags_4 = Flags_4_1;
            },
            function (ItemOrb_1_1) {
                ItemOrb_1 = ItemOrb_1_1;
            },
            function (Mod_2_1) {
                Mod_2 = Mod_2_1;
            }
        ],
        execute: function () {
            Transmute = /** @class */ (function (_super) {
                __extends(Transmute, _super);
                function Transmute() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Transmute.modFilter = function (mod) {
                    // prefix/suffix only
                    return (_super.modFilter.call(this, mod) &&
                        [Mod_2.default.TYPE.PREFIX, Mod_2.default.TYPE.SUFFIX].indexOf(mod.generation_type) !== -1);
                };
                Transmute.build = function (mods) {
                    return new Transmute(this.buildMods(mods));
                };
                /**
                 *  adds 1-2 mods
                 */
                Transmute.prototype.applyTo = function (item) {
                    var new_item = item;
                    if (!Flags_4.anySet(this.applicableTo(item))) {
                        new_item = item.rarity.set('magic');
                        new_item = this.rollMod(new_item);
                        if (Math.random() <= 0.5) {
                            new_item = this.rollMod(new_item);
                        }
                        return new_item;
                    }
                    return new_item;
                };
                /**
                 * maps mod::applicableTo as if it were already magic
                 */
                Transmute.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    // simulate upgrade
                    return _super.prototype.modsFor.call(this, item.rarity.set('magic'), whitelist);
                };
                Transmute.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_white: false });
                    if (!item.rarity.isNormal()) {
                        applicable_flags.not_white = true;
                    }
                    return applicable_flags;
                };
                return Transmute;
            }(ItemOrb_1.default));
            exports_37("default", Transmute);
        }
    };
});
System.register("generators/item_orbs/Alchemy", ["lodash", "util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var _, Flags_5, ItemOrb_2, Transmute_1, Alchemy;
    return {
        setters: [
            function (_2) {
                _ = _2;
            },
            function (Flags_5_1) {
                Flags_5 = Flags_5_1;
            },
            function (ItemOrb_2_1) {
                ItemOrb_2 = ItemOrb_2_1;
            },
            function (Transmute_1_1) {
                Transmute_1 = Transmute_1_1;
            }
        ],
        execute: function () {
            Alchemy = /** @class */ (function (_super) {
                __extends(Alchemy, _super);
                function Alchemy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Alchemy.build = function (mods) {
                    return new Alchemy(Transmute_1.default.buildMods(mods));
                };
                /**
                 *  adds 1-2 mods
                 */
                Alchemy.prototype.applyTo = function (item, options) {
                    if (options === void 0) { options = {}; }
                    var _a = options.force, force = _a === void 0 ? false : _a;
                    if (force || !Flags_5.anySet(this.applicableTo(item))) {
                        // upgrade to rare
                        var alched_item = item.rarity.set('rare');
                        // rare items can have no more than 6 affixes
                        var new_mods = _.random(4, 6) - item.affixes.mods.length;
                        for (var rolled_mods = 1; rolled_mods <= new_mods; rolled_mods += 1) {
                            alched_item = this.rollMod(alched_item);
                        }
                        var prefixes = alched_item.affixes.getPrefixes().length;
                        var suffixes = alched_item.affixes.getSuffixes().length;
                        var diff = Math.abs(prefixes - suffixes);
                        var missing_mods = Math.max(0, diff - 1);
                        // correct differences between #prefixes, #suffixes >= 2
                        for (var rolled_mods = 1; rolled_mods <= missing_mods; rolled_mods += 1) {
                            alched_item = this.rollMod(alched_item);
                        }
                        return alched_item;
                    }
                    return item;
                };
                /**
                 * maps mod::applicableTo as if it were already magic
                 */
                Alchemy.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    // simulate upgrade
                    return _super.prototype.modsFor.call(this, item.rarity.set('rare'), whitelist);
                };
                Alchemy.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_white: false });
                    if (!item.rarity.isNormal()) {
                        applicable_flags.not_white = true;
                    }
                    return applicable_flags;
                };
                return Alchemy;
            }(ItemOrb_2.default));
            exports_38("default", Alchemy);
        }
    };
});
System.register("generators/item_orbs/Augment", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Flags_6, ItemOrb_3, Transmute_2, Augment;
    return {
        setters: [
            function (Flags_6_1) {
                Flags_6 = Flags_6_1;
            },
            function (ItemOrb_3_1) {
                ItemOrb_3 = ItemOrb_3_1;
            },
            function (Transmute_2_1) {
                Transmute_2 = Transmute_2_1;
            }
        ],
        execute: function () {
            Augment = /** @class */ (function (_super) {
                __extends(Augment, _super);
                function Augment() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Augment.build = function (mods) {
                    return new Augment(Transmute_2.default.buildMods(mods));
                };
                /**
                 * adds one random property
                 */
                Augment.prototype.applyTo = function (item) {
                    if (!Flags_6.anySet(this.applicableTo(item))) {
                        return this.rollMod(item);
                    }
                    else {
                        return item;
                    }
                };
                /**
                 * item needs to be magic
                 */
                Augment.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_magic: false });
                    if (!item.rarity.isMagic()) {
                        applicable_flags.not_magic = true;
                    }
                    return applicable_flags;
                };
                return Augment;
            }(ItemOrb_3.default));
            exports_39("default", Augment);
        }
    };
});
System.register("generators/item_orbs/Scouring", ["util/Flags", "generators/item_orbs/ItemOrb"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var Flags_7, ItemOrb_4, Scouring;
    return {
        setters: [
            function (Flags_7_1) {
                Flags_7 = Flags_7_1;
            },
            function (ItemOrb_4_1) {
                ItemOrb_4 = ItemOrb_4_1;
            }
        ],
        execute: function () {
            Scouring = /** @class */ (function (_super) {
                __extends(Scouring, _super);
                function Scouring() {
                    return _super.call(this, []) || this;
                }
                /**
                 * applies Orb of Scouring to an item
                 * considers locked affixes metamods
                 */
                Scouring.prototype.applyTo = function (other, options) {
                    if (options === void 0) { options = {}; }
                    var _a = options.force, force = _a === void 0 ? false : _a, _b = options.ignore_meta_mods, ignore_meta_mods = _b === void 0 ? false : _b;
                    if (force || !Flags_7.anySet(this.applicableTo(other))) {
                        var scoured_item = other;
                        if (!ignore_meta_mods) {
                            var locked_prefixes = scoured_item.affixes.lockedPrefixes();
                            var locked_suffixes = scoured_item.affixes.lockedSuffixes();
                            if (!locked_prefixes) {
                                scoured_item = scoured_item.affixes
                                    .getPrefixes()
                                    .reduce(function (item, prefix) { return item.removeMod(prefix); }, scoured_item);
                            }
                            if (!locked_suffixes) {
                                scoured_item = scoured_item.affixes
                                    .getSuffixes()
                                    .reduce(function (item, suffix) { return item.removeMod(suffix); }, scoured_item);
                            }
                        }
                        else {
                            scoured_item = scoured_item.removeAllMods();
                        }
                        // set correct rarity
                        var remaining_prefixes = scoured_item.affixes.getPrefixes().length;
                        var remaining_suffixes = scoured_item.affixes.getSuffixes().length;
                        var new_rarity = other.rarity.toString();
                        if (remaining_prefixes === 0 && remaining_suffixes === 0) {
                            new_rarity = 'normal';
                        }
                        return scoured_item.rarity.set(new_rarity);
                    }
                    else {
                        return other;
                    }
                };
                /**
                 * checks if normal or unique rarity and returns false
                 */
                Scouring.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { normal: false, unique: false });
                    if (item.rarity.isNormal()) {
                        applicable_flags.normal = true;
                    }
                    else if (item.rarity.isUnique()) {
                        applicable_flags.unique = true;
                    }
                    return applicable_flags;
                };
                return Scouring;
            }(ItemOrb_4.default));
            exports_40("default", Scouring);
        }
    };
});
System.register("generators/item_orbs/Alteration", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Augment", "generators/item_orbs/Scouring", "generators/item_orbs/Transmute"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var Flags_8, ItemOrb_5, Augment_1, Scouring_1, Transmute_3, Alteration;
    return {
        setters: [
            function (Flags_8_1) {
                Flags_8 = Flags_8_1;
            },
            function (ItemOrb_5_1) {
                ItemOrb_5 = ItemOrb_5_1;
            },
            function (Augment_1_1) {
                Augment_1 = Augment_1_1;
            },
            function (Scouring_1_1) {
                Scouring_1 = Scouring_1_1;
            },
            function (Transmute_3_1) {
                Transmute_3 = Transmute_3_1;
            }
        ],
        execute: function () {
            Alteration = /** @class */ (function (_super) {
                __extends(Alteration, _super);
                function Alteration() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Alteration.build = function (mods) {
                    return new Alteration(Transmute_3.default.buildMods(mods));
                };
                /**
                 *  rerolls properties of magic
                 */
                Alteration.prototype.applyTo = function (item) {
                    if (!Flags_8.anySet(this.applicableTo(item))) {
                        // TODO actually considers *_cannot_be_changed?
                        // granted via scouring but is this true for ingame alts?
                        var scoured_item = new Scouring_1.default().applyTo(item);
                        var reforged_item = new Transmute_3.default(this.mods).applyTo(scoured_item);
                        // no complete scour?
                        if (reforged_item === scoured_item) {
                            reforged_item = new Augment_1.default(this.mods).applyTo(reforged_item);
                        }
                        return reforged_item;
                    }
                    else {
                        return item;
                    }
                };
                Alteration.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_magic: false });
                    if (!item.rarity.isMagic()) {
                        applicable_flags.not_magic = true;
                    }
                    return applicable_flags;
                };
                return Alteration;
            }(ItemOrb_5.default));
            exports_41("default", Alteration);
        }
    };
});
System.register("generators/item_orbs/Annulment", ["lodash", "util/Flags", "generators/item_orbs/ItemOrb"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var _, Flags_9, ItemOrb_6, Annulment;
    return {
        setters: [
            function (_3) {
                _ = _3;
            },
            function (Flags_9_1) {
                Flags_9 = Flags_9_1;
            },
            function (ItemOrb_6_1) {
                ItemOrb_6 = ItemOrb_6_1;
            }
        ],
        execute: function () {
            Annulment = /** @class */ (function (_super) {
                __extends(Annulment, _super);
                function Annulment() {
                    return _super.call(this, []) || this;
                }
                Annulment.prototype.applyTo = function (item) {
                    if (!Flags_9.anySet(this.applicableTo(item))) {
                        var locked_prefixes_1 = item.affixes.lockedPrefixes();
                        var locked_suffixes_1 = item.affixes.lockedSuffixes();
                        var mods = item.affixes.mods.filter(function (mod) {
                            return (
                            // locked_prefixes => !isPrefix
                            (!locked_prefixes_1 || !mod.isPrefix()) &&
                                // locked_suffixes => !isSuffix
                                (!locked_suffixes_1 || !mod.isSuffix()));
                        });
                        if (mods.length > 0) {
                            var annul = _.sample(mods);
                            if (annul == null) {
                                throw new Error('sample returned no mods');
                            }
                            return item.removeMod(annul);
                        }
                        else {
                            return item;
                        }
                    }
                    else {
                        return item;
                    }
                };
                Annulment.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_magic_rare: false });
                    if (!item.rarity.isMagic() && !item.rarity.isRare()) {
                        applicable_flags.not_magic_rare = true;
                    }
                    return applicable_flags;
                };
                Annulment.prototype.modsFor = function (item) {
                    return [];
                };
                return Annulment;
            }(ItemOrb_6.default));
            exports_42("default", Annulment);
        }
    };
});
System.register("generators/item_orbs/Exalted", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var Flags_10, ItemOrb_7, Transmute_4, Exalted;
    return {
        setters: [
            function (Flags_10_1) {
                Flags_10 = Flags_10_1;
            },
            function (ItemOrb_7_1) {
                ItemOrb_7 = ItemOrb_7_1;
            },
            function (Transmute_4_1) {
                Transmute_4 = Transmute_4_1;
            }
        ],
        execute: function () {
            Exalted = /** @class */ (function (_super) {
                __extends(Exalted, _super);
                function Exalted() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Exalted.build = function (mods) {
                    return new Exalted(Transmute_4.default.buildMods(mods));
                };
                /**
                 * adds one random property
                 */
                Exalted.prototype.applyTo = function (item) {
                    if (!Flags_10.anySet(this.applicableTo(item))) {
                        return this.rollMod(item);
                    }
                    else {
                        return item;
                    }
                };
                /**
                 * item needs to be magic
                 */
                Exalted.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_rare: false });
                    if (!item.rarity.isRare()) {
                        applicable_flags.not_rare = true;
                    }
                    return applicable_flags;
                };
                return Exalted;
            }(ItemOrb_7.default));
            exports_43("default", Exalted);
        }
    };
});
System.register("generators/item_orbs/Chaos", ["lodash", "util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Alchemy", "generators/item_orbs/Exalted", "generators/item_orbs/Scouring", "generators/item_orbs/Transmute"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var lodash_1, Flags_11, ItemOrb_8, Alchemy_1, Exalted_1, Scouring_2, Transmute_5, Chaos;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (Flags_11_1) {
                Flags_11 = Flags_11_1;
            },
            function (ItemOrb_8_1) {
                ItemOrb_8 = ItemOrb_8_1;
            },
            function (Alchemy_1_1) {
                Alchemy_1 = Alchemy_1_1;
            },
            function (Exalted_1_1) {
                Exalted_1 = Exalted_1_1;
            },
            function (Scouring_2_1) {
                Scouring_2 = Scouring_2_1;
            },
            function (Transmute_5_1) {
                Transmute_5 = Transmute_5_1;
            }
        ],
        execute: function () {
            Chaos = /** @class */ (function (_super) {
                __extends(Chaos, _super);
                function Chaos() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Chaos.build = function (mods) {
                    return new Chaos(Transmute_5.default.buildMods(mods));
                };
                /**
                 *  rerolls properties of magic
                 */
                Chaos.prototype.applyTo = function (item) {
                    if (!Flags_11.anySet(this.applicableTo(item))) {
                        var locked_prefixes_2 = item.affixes.lockedPrefixes();
                        var locked_suffixes_2 = item.affixes.lockedSuffixes();
                        if (locked_prefixes_2 && locked_suffixes_2) {
                            // TODO rerolls name so it is actually a new item
                            return item;
                        }
                        var scoured_item = new Scouring_2.default().applyTo(item);
                        var reforged_item = new Alchemy_1.default(this.mods).applyTo(scoured_item);
                        // no complete scour?
                        if (reforged_item === scoured_item) {
                            // limit the possible mods of this exalt according to
                            // meta mods since usually adding prefixes is ok even with locked_prefixes
                            var exalted = new Exalted_1.default(this.mods.filter(function (mod) {
                                return (
                                // locked_suffixes => !suffix
                                (!locked_suffixes_2 || !mod.isSuffix()) &&
                                    // locked_prefixes => !prefix
                                    (!locked_prefixes_2 || !mod.isPrefix()));
                            }));
                            var new_mods = lodash_1.random(2, 3);
                            for (var i = 1; i <= new_mods; i += 1) {
                                reforged_item = exalted.applyTo(reforged_item);
                            }
                        }
                        return reforged_item;
                    }
                    else {
                        return item;
                    }
                };
                Chaos.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_rare: false });
                    if (!item.rarity.isRare()) {
                        applicable_flags.not_rare = true;
                    }
                    return applicable_flags;
                };
                return Chaos;
            }(ItemOrb_8.default));
            exports_44("default", Chaos);
        }
    };
});
System.register("generators/item_orbs/EnchantmentBench", ["util/Flags", "mods/Mod", "generators/item_orbs/ItemOrb"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var Flags_12, Mod_3, ItemOrb_9, Enchantmentbench;
    return {
        setters: [
            function (Flags_12_1) {
                Flags_12 = Flags_12_1;
            },
            function (Mod_3_1) {
                Mod_3 = Mod_3_1;
            },
            function (ItemOrb_9_1) {
                ItemOrb_9 = ItemOrb_9_1;
            }
        ],
        execute: function () {
            /**
             * ingame representation of a enchantment bench
             */
            Enchantmentbench = /** @class */ (function (_super) {
                __extends(Enchantmentbench, _super);
                function Enchantmentbench() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Enchantmentbench.modFilter = function (mod) {
                    return (_super.modFilter.call(this, mod) &&
                        [Mod_3.default.TYPE.ENCHANTMENT].indexOf(mod.generation_type) !== -1);
                };
                Enchantmentbench.build = function (mods) {
                    return new Enchantmentbench(this.buildMods(mods));
                };
                /**
                 * replaces implicits with new enchantment mod
                 */
                Enchantmentbench.prototype.applyTo = function (item) {
                    if (!Flags_12.anySet(this.applicableTo(item))) {
                        var blank_item = item.removeAllImplicits();
                        var enchantment = this.chooseMod(blank_item);
                        if (enchantment != null) {
                            return blank_item.addMod(enchantment);
                        }
                    }
                    return item;
                };
                Enchantmentbench.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    // replace so ignore full domain
                    return _super.prototype.modsFor.call(this, item, whitelist.concat(['domain_full']));
                };
                return Enchantmentbench;
            }(ItemOrb_9.default));
            exports_45("default", Enchantmentbench);
        }
    };
});
System.register("generators/item_orbs/Essence", ["util/Flags", "generators/item_orbs/ItemOrb", "mods/Mod", "generators/item_orbs/Alchemy", "generators/item_orbs/Scouring"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var Flags_13, ItemOrb_10, Mod_4, Alchemy_2, Scouring_3, Essence;
    return {
        setters: [
            function (Flags_13_1) {
                Flags_13 = Flags_13_1;
            },
            function (ItemOrb_10_1) {
                ItemOrb_10 = ItemOrb_10_1;
            },
            function (Mod_4_1) {
                Mod_4 = Mod_4_1;
            },
            function (Alchemy_2_1) {
                Alchemy_2 = Alchemy_2_1;
            },
            function (Scouring_3_1) {
                Scouring_3 = Scouring_3_1;
            }
        ],
        execute: function () {
            Essence = /** @class */ (function (_super) {
                __extends(Essence, _super);
                /**
                 *
                 * @param props props of a specific essence (contains the guarenteed mod)
                 * @param mods mods that are rolled onto the item after th guarenteed is applied
                 */
                function Essence(props, mods) {
                    var _this = _super.call(this, []) || this;
                    _this.alchemy = Alchemy_2.default.build(mods);
                    _this.props = props;
                    return _this;
                }
                Essence.build = function (props, mods) {
                    return new Essence(props, mods);
                };
                /**
                 *  add the guarenteed mod and fill up the rest like alchemy
                 */
                Essence.prototype.applyTo = function (item, options) {
                    if (options === void 0) { options = {}; }
                    var _a = options.force, force = _a === void 0 ? false : _a;
                    var new_item = item;
                    if (force || !Flags_13.anySet(this.applicableTo(item))) {
                        // scour first if this reforges
                        if (this.reforges()) {
                            // essences ignore meta mods so dont use a scour implementation
                            // and just blindly remove mods
                            new_item = Essence.reforger.applyTo(new_item, {
                                ignore_meta_mods: true,
                                force: true,
                            });
                        }
                        // 1. add guarenteed
                        var guarenteed = this.chooseMod(new_item);
                        if (guarenteed === undefined) {
                            throw new Error("'" + new_item.baseitem.item_class + "' has no guarentedd mod");
                        }
                        new_item = new_item.rarity.set('rare').addMod(guarenteed);
                        // 2. fill up like alch
                        new_item = this.alchemy.applyTo(new_item, { force: true });
                        return new_item;
                    }
                    return new_item;
                };
                /**
                 * only one mod per itemclass
                 */
                Essence.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    var mod = this.chooseMod(item);
                    if (mod === undefined) {
                        return [];
                    }
                    return [{ mod: mod, spawnweight: Number.POSITIVE_INFINITY }];
                };
                Essence.prototype.chooseMod = function (item) {
                    return this.modForItemclass(item.baseitem.item_class);
                };
                Essence.prototype.modForItemclass = function (itemclass) {
                    var mod_props = this.modPropsFor(itemclass);
                    if (mod_props === undefined) {
                        return undefined;
                    }
                    else {
                        return new Mod_4.default(mod_props);
                    }
                };
                Essence.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { wrong_rarity: !item.rarity.isNormal(), wrong_itemclass: this.chooseMod(item) === undefined });
                    if (this.reforges()) {
                        applicable_flags.wrong_rarity =
                            applicable_flags.wrong_rarity && !item.rarity.isRare();
                    }
                    return applicable_flags;
                };
                Essence.prototype.reforges = function () {
                    return this.props.tier > 5;
                };
                Essence.prototype.modPropsFor = function (item_class) {
                    switch (item_class) {
                        case 'Amulet':
                            return this.props.amulet_mod;
                        case 'Belt':
                            return this.props.belt_mod;
                        case 'Body Armour':
                            return this.props.body_armour_mod;
                        case 'Boots':
                            return this.props.boots_mod;
                        case 'Bow':
                            return this.props.bow_mod;
                        case 'Claw':
                            return this.props.claw_mod;
                        case 'Dagger':
                            return this.props.dagger_mod;
                        case 'Gloves':
                            return this.props.gloves_mod;
                        case 'Helmet':
                            return this.props.helmet_mod;
                        case 'One Hand Axe':
                            return this.props.one_hand_axe_mod;
                        case 'One Hand Mace':
                            return this.props.one_hand_mace_mod;
                        case 'One Hand Sword':
                            return this.props.one_hand_sword_mod;
                        case 'Thrusting One Hand Sword':
                            return this.props.one_hand_thrusting_sword_mod;
                        case 'Quiver':
                            return this.props.quiver_mod;
                        case 'Ring':
                            return this.props.ring_mod;
                        case 'Sceptre':
                            return this.props.sceptre_mod;
                        case 'Shield':
                            return this.props.shield_mod;
                        case 'Staff':
                            return this.props.staff_mod;
                        case 'Two Hand Axe':
                            return this.props.two_hand_axe_mod;
                        case 'Two Hand Mace':
                            return this.props.two_hand_mace_mod;
                        case 'Two Hand Sword':
                            return this.props.two_hand_sword_mod;
                        case 'Wand':
                            return this.props.wand_mod;
                        default:
                            return undefined;
                    }
                };
                Essence.reforger = new Scouring_3.default();
                return Essence;
            }(ItemOrb_10.default));
            exports_46("default", Essence);
        }
    };
});
System.register("generators/item_orbs/Regal", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var Flags_14, ItemOrb_11, Transmute_6, Regal;
    return {
        setters: [
            function (Flags_14_1) {
                Flags_14 = Flags_14_1;
            },
            function (ItemOrb_11_1) {
                ItemOrb_11 = ItemOrb_11_1;
            },
            function (Transmute_6_1) {
                Transmute_6 = Transmute_6_1;
            }
        ],
        execute: function () {
            Regal = /** @class */ (function (_super) {
                __extends(Regal, _super);
                function Regal() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Regal.build = function (mods) {
                    return new Regal(Transmute_6.default.buildMods(mods));
                };
                /**
                 *  adds 1 mod
                 */
                Regal.prototype.applyTo = function (item) {
                    if (!Flags_14.anySet(this.applicableTo(item))) {
                        // upgrade to rare
                        return this.rollMod(item.rarity.set('rare'));
                    }
                    else {
                        return item;
                    }
                };
                /**
                 * maps mod::applicableTo as if it were already magic
                 */
                Regal.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    // simulate upgrade
                    return _super.prototype.modsFor.call(this, item.rarity.set('rare'), whitelist);
                };
                Regal.prototype.applicableTo = function (item) {
                    var applicable_flags = __assign({}, _super.prototype.applicableTo.call(this, item), { not_magic: false });
                    if (!item.rarity.isMagic()) {
                        applicable_flags.not_magic = true;
                    }
                    return applicable_flags;
                };
                return Regal;
            }(ItemOrb_11.default));
            exports_47("default", Regal);
        }
    };
});
System.register("generators/item_orbs/Talisman", ["generators/item_orbs/ItemOrb"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var ItemOrb_12, Talisman;
    return {
        setters: [
            function (ItemOrb_12_1) {
                ItemOrb_12 = ItemOrb_12_1;
            }
        ],
        execute: function () {
            /**
             * TODO
             */
            Talisman = /** @class */ (function (_super) {
                __extends(Talisman, _super);
                function Talisman() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Talisman.modFilter = function () {
                    // no mods
                    return false;
                };
                Talisman.build = function (mods) {
                    return new Talisman(this.buildMods(mods));
                };
                Talisman.prototype.applyTo = function (item) {
                    throw new Error('not implemented');
                };
                return Talisman;
            }(ItemOrb_12.default));
            exports_48("default", Talisman);
        }
    };
});
System.register("generators/item_orbs/Vaal", ["util/Flags", "mods/Mod", "generators/item_orbs/ItemOrb"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var Flags_15, Mod_5, ItemOrb_13, Vaal;
    return {
        setters: [
            function (Flags_15_1) {
                Flags_15 = Flags_15_1;
            },
            function (Mod_5_1) {
                Mod_5 = Mod_5_1;
            },
            function (ItemOrb_13_1) {
                ItemOrb_13 = ItemOrb_13_1;
            }
        ],
        execute: function () {
            Vaal = /** @class */ (function (_super) {
                __extends(Vaal, _super);
                function Vaal() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Vaal.modFilter = function (mod) {
                    // vaal implicits
                    return (_super.modFilter.call(this, mod) &&
                        [Mod_5.default.TYPE.VAAL].indexOf(mod.generation_type) !== -1);
                };
                Vaal.build = function (mods) {
                    return new Vaal(this.buildMods(mods));
                };
                /**
                 * replaces implicit with vaal implicit
                 * TODO: white sockets, reroll (brick(, nothing
                 */
                Vaal.prototype.applyTo = function (item) {
                    if (!Flags_15.anySet(this.applicableTo(item))) {
                        var blank_item = item.removeAllImplicits();
                        var implicit = this.chooseMod(blank_item);
                        if (implicit != null) {
                            var vaaled_item = blank_item.addMod(implicit);
                            if (vaaled_item !== blank_item) {
                                return vaaled_item.corrupt();
                            }
                        }
                    }
                    // nothing changed
                    return item;
                };
                return Vaal;
            }(ItemOrb_13.default));
            exports_49("default", Vaal);
        }
    };
});
System.register("generators/item_orbs/index", ["generators/item_orbs/Alchemy", "generators/item_orbs/Alteration", "generators/item_orbs/Annulment", "generators/item_orbs/Augment", "generators/item_orbs/Chaos", "generators/item_orbs/EnchantmentBench", "generators/item_orbs/Essence", "generators/item_orbs/Exalted", "generators/item_orbs/ItemOrb", "generators/item_orbs/Regal", "generators/item_orbs/Scouring", "generators/item_orbs/Talisman", "generators/item_orbs/Transmute", "generators/item_orbs/Vaal"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    return {
        setters: [
            function (Alchemy_3_1) {
                exports_50({
                    "Alchemy": Alchemy_3_1["default"]
                });
            },
            function (Alteration_1_1) {
                exports_50({
                    "Alteration": Alteration_1_1["default"]
                });
            },
            function (Annulment_1_1) {
                exports_50({
                    "Annulment": Annulment_1_1["default"]
                });
            },
            function (Augment_2_1) {
                exports_50({
                    "Augment": Augment_2_1["default"]
                });
            },
            function (Chaos_1_1) {
                exports_50({
                    "Chaos": Chaos_1_1["default"]
                });
            },
            function (EnchantmentBench_1_1) {
                exports_50({
                    "EnchantmentBench": EnchantmentBench_1_1["default"]
                });
            },
            function (Essence_1_1) {
                exports_50({
                    "Essence": Essence_1_1["default"]
                });
            },
            function (Exalted_2_1) {
                exports_50({
                    "Exalted": Exalted_2_1["default"]
                });
            },
            function (ItemOrb_14_1) {
                exports_50({
                    "ItemOrb": ItemOrb_14_1["default"]
                });
            },
            function (Regal_1_1) {
                exports_50({
                    "Regal": Regal_1_1["default"]
                });
            },
            function (Scouring_4_1) {
                exports_50({
                    "Scouring": Scouring_4_1["default"]
                });
            },
            function (Talisman_1_1) {
                exports_50({
                    "Talisman": Talisman_1_1["default"]
                });
            },
            function (Transmute_7_1) {
                exports_50({
                    "Transmute": Transmute_7_1["default"]
                });
            },
            function (Vaal_1_1) {
                exports_50({
                    "Vaal": Vaal_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/MasterBenchOption", ["util/Flags", "util/ts", "mods/index", "generators/Generator"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var Flags_16, ts_2, mods_5, Generator_2, MasterBenchOption;
    return {
        setters: [
            function (Flags_16_1) {
                Flags_16 = Flags_16_1;
            },
            function (ts_2_1) {
                ts_2 = ts_2_1;
            },
            function (mods_5_1) {
                mods_5 = mods_5_1;
            },
            function (Generator_2_1) {
                Generator_2 = Generator_2_1;
            }
        ],
        execute: function () {
            MasterBenchOption = /** @class */ (function (_super) {
                __extends(MasterBenchOption, _super);
                function MasterBenchOption(option) {
                    var _this = this;
                    if (option.mod != null) {
                        _this = _super.call(this, [new mods_5.Mod(option.mod)]) || this;
                    }
                    else {
                        _this = _super.call(this, []) || this;
                    }
                    _this.props = option;
                    return _this;
                }
                MasterBenchOption.build = function (option) {
                    return new MasterBenchOption(option);
                };
                Object.defineProperty(MasterBenchOption.prototype, "mod", {
                    get: function () {
                        return this.mods[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * applies a chosen craftingbenchoption
                 *
                 * cant overload extended method. so we have to set the chosen option before
                 */
                MasterBenchOption.prototype.applyTo = function (item) {
                    if (this.isApplicableTo(item)) {
                        var mod = this.mod;
                        /**
                         * TODO customactions for no mod
                         */
                        if (mod != null) {
                            // white gets upgraded to blue
                            var crafted_item = item.rarity.isNormal()
                                ? item.rarity.set('magic')
                                : item;
                            if (this.isModApplicableTo(mod, crafted_item)) {
                                return crafted_item.addMod(mod);
                            }
                        }
                        else {
                            throw new Error('customactions are not implemented yet');
                        }
                    }
                    // nothing changed
                    return item;
                };
                /**
                 * every item is welcome
                 */
                MasterBenchOption.prototype.applicableTo = function (item) {
                    var applicable_flags = {
                        wrong_itemclass: false,
                    };
                    var item_classes = this.props.item_classes;
                    applicable_flags.wrong_itemclass =
                        item_classes.find(function (item_class) { return item_class === item.baseitem.item_class; }) === undefined;
                    return applicable_flags;
                };
                /**
                 * greps mod::applicableTo
                 */
                MasterBenchOption.prototype.modsFor = function (item, whitelist) {
                    var _this = this;
                    if (whitelist === void 0) { whitelist = []; }
                    // TODO look into why we simulate another rarity why is a MasterMod not
                    // applicable to white items?
                    // simulate blue if white
                    var simulated_item = item.rarity.isNormal()
                        ? item.rarity.set('magic')
                        : item;
                    return this.getAvailableMods()
                        .map(function (mod) {
                        var applicable_flags = __assign({}, _this.isModApplicableTo(mod, simulated_item), _this.applicableTo(simulated_item));
                        if (Flags_16.anySet(applicable_flags, whitelist)) {
                            return null;
                        }
                        else {
                            return {
                                mod: mod,
                                applicable: applicable_flags,
                            };
                        }
                    })
                        .filter(ts_2.filterUndefined);
                };
                /**
                 * checks if the given mod is applicable to the item
                 *
                 * remember that this doesn't check if the passed mod is the mod of this option
                 */
                MasterBenchOption.prototype.isModApplicableTo = function (mod, item) {
                    var applicable_flags = __assign({}, _super.prototype.isModApplicableTo.call(this, mod, item), { no_multimod: false });
                    // grep MasterMods and set failure if we cant multimod
                    var master_mods = item.mods.filter(function (other) { return other.isMasterMod(); });
                    var has_no_multi_mod = master_mods.find(function (other) { return other.props.id === mods_5.metaMods.MULTIMOD; }) ===
                        undefined;
                    if (master_mods.length > 0 && has_no_multi_mod) {
                        applicable_flags.no_multimod = true;
                    }
                    return applicable_flags;
                };
                return MasterBenchOption;
            }(Generator_2.default));
            exports_51("default", MasterBenchOption);
        }
    };
});
System.register("helpers/MasterBench", ["generators/MasterBenchOption"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var MasterBenchOption_1, MasterBench;
    return {
        setters: [
            function (MasterBenchOption_1_1) {
                MasterBenchOption_1 = MasterBenchOption_1_1;
            }
        ],
        execute: function () {
            /**
             */
            MasterBench = /** @class */ (function () {
                function MasterBench(options) {
                    this.options = options;
                }
                MasterBench.build = function (props, master_primary) {
                    var options = props.filter(function (_a) {
                        var npc_master_key = _a.npc_master_key;
                        // master_primary != null implies master_primary === npc_master_key
                        return master_primary == null || npc_master_key === master_primary;
                    });
                    if (options.length <= 0) {
                        throw new Error("no options found for '" + String(master_primary) + "'");
                    }
                    // TODO allow customactions
                    return new MasterBench(options
                        .filter(function (_a) {
                        var mod = _a.mod;
                        return mod != null;
                    })
                        .map(function (option) { return new MasterBenchOption_1.default(option); }));
                };
                MasterBench.prototype.applyOptionTo = function (item, option_id) {
                    var option = this.options.find(function (other) { return other.props.primary === option_id; });
                    if (option === undefined) {
                        throw new Error("option '" + option_id + "' not found");
                    }
                    return option.applyTo(item);
                };
                MasterBench.prototype.getAvailableMods = function () {
                    return this.options
                        .map(function (_a) {
                        var mod = _a.mod;
                        return mod;
                    })
                        .filter(function (mod) { return mod !== undefined; });
                };
                /**
                 * greps mod::applicableTo
                 */
                MasterBench.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    return this.options.reduce(function (mods, option) { return mods.concat(option.modsFor(item, whitelist)); }, []);
                };
                return MasterBench;
            }());
            exports_52("default", MasterBench);
        }
    };
});
System.register("generators/ItemShowcase", ["helpers/MasterBench", "generators/Generator", "generators/item_orbs/Alchemy", "generators/item_orbs/EnchantmentBench", "generators/item_orbs/Vaal"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var MasterBench_1, Generator_3, Alchemy_4, EnchantmentBench_2, Vaal_2, ItemShowcase;
    return {
        setters: [
            function (MasterBench_1_1) {
                MasterBench_1 = MasterBench_1_1;
            },
            function (Generator_3_1) {
                Generator_3 = Generator_3_1;
            },
            function (Alchemy_4_1) {
                Alchemy_4 = Alchemy_4_1;
            },
            function (EnchantmentBench_2_1) {
                EnchantmentBench_2 = EnchantmentBench_2_1;
            },
            function (Vaal_2_1) {
                Vaal_2 = Vaal_2_1;
            }
        ],
        execute: function () {
            /**
             * Masterbench/Currency hybrid
             */
            ItemShowcase = /** @class */ (function (_super) {
                __extends(ItemShowcase, _super);
                function ItemShowcase(props, options) {
                    var _this = this;
                    var enchantment = EnchantmentBench_2.default.build(props);
                    var master = MasterBench_1.default.build(options);
                    var explicits = Alchemy_4.default.build(props);
                    var vaal = Vaal_2.default.build(props);
                    var mods = enchantment.mods.concat(explicits.mods, vaal.mods, master.getAvailableMods());
                    _this = _super.call(this, mods) || this;
                    _this.enchantment = enchantment;
                    _this.master = master;
                    _this.explicits = explicits;
                    _this.vaal = vaal;
                    return _this;
                }
                /**
                 * only abstract showcase, not for actual usage
                 */
                ItemShowcase.prototype.applyTo = function (item) {
                    return item;
                };
                /**
                 * not applicable to anything
                 * @param item
                 */
                ItemShowcase.prototype.applicableTo = function (item) {
                    return {
                        not_applicable: true,
                    };
                };
                /**
                 * greps mod::applicableTo and (if implemented) mod::spawnableOn
                 * if we have all the space for mods we need
                 */
                ItemShowcase.prototype.modsFor = function (item, whitelist) {
                    if (whitelist === void 0) { whitelist = []; }
                    var details = this.master.modsFor(item, whitelist).concat(this.enchantment.modsFor(item, whitelist), this.explicits.modsFor(item, whitelist), this.vaal.modsFor(item, whitelist));
                    // flow cant merge object types
                    // { mod: OneMod, prop: number } | { mod: AnotherMod, prop: number }
                    // will not become { mod: OneMod | AnotherMod, prop: number }
                    // and for some reason ['a', 'b'] cant be cast to Array<number | string>
                    return details;
                };
                return ItemShowcase;
            }(Generator_3.default));
            exports_53("default", ItemShowcase);
        }
    };
});
System.register("containers/AtlasNode", ["mods/Mod", "containers/ImmutableContainer"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var Mod_6, ImmutableContainer_3, SEXTANT_RANGE, AtlasNode;
    return {
        setters: [
            function (Mod_6_1) {
                Mod_6 = Mod_6_1;
            },
            function (ImmutableContainer_3_1) {
                ImmutableContainer_3 = ImmutableContainer_3_1;
            }
        ],
        execute: function () {
            exports_54("SEXTANT_RANGE", SEXTANT_RANGE = 55); // http://poecraft.com/atlas has 55
            AtlasNode = /** @class */ (function (_super) {
                __extends(AtlasNode, _super);
                function AtlasNode(mods, props) {
                    var _this = _super.call(this, mods) || this;
                    _this.props = props;
                    return _this;
                }
                AtlasNode.build = function (props) {
                    return new AtlasNode([], props);
                };
                AtlasNode.withBuilder = function (builder) {
                    return new AtlasNode(builder.mods, builder.props);
                };
                AtlasNode.prototype.builder = function () {
                    return {
                        mods: this.mods,
                        props: this.props,
                    };
                };
                /**
                 * returns a list of nodes with sextant distance <= depth
                 * sextant distance:
                 * (a, b) => 1, if a.isInSextantRange(b)
                 *           +inf, otherwise
                 */
                AtlasNode.prototype.inSextantRange = function (atlas, max_depth) {
                    if (max_depth === void 0) { max_depth = 1; }
                    var expand = [this];
                    var in_range = new Set();
                    var depth = max_depth;
                    // with every step mark every node in range as to be expanded and
                    // decrement depth
                    /* eslint-disable no-loop-func */
                    while (expand.length && depth >= 0) {
                        expand = expand.reduce(function (nodes, node) {
                            in_range.add(node);
                            var new_nodes = atlas.filter(function (new_node) {
                                return node.isInSextantRange(new_node) &&
                                    node !== new_node &&
                                    !in_range.has(new_node);
                            });
                            return nodes.concat(new_nodes);
                        }, []);
                        depth -= 1;
                    }
                    /* eslint-enable no-loop-func */
                    return Array.from(in_range.values());
                };
                AtlasNode.prototype.isInSextantRange = function (other) {
                    return this.distance(other) <= SEXTANT_RANGE;
                };
                AtlasNode.prototype.distance = function (other) {
                    return Math.sqrt(Math.pow((this.props.x - other.props.x), 2) + Math.pow((this.props.y - other.props.y), 2));
                };
                AtlasNode.prototype.pos = function () {
                    return "X: " + this.props.x + " Y: " + this.props.y;
                };
                AtlasNode.prototype.getAllMods = function (atlas) {
                    return this.inSextantRange(atlas).reduce(function (mods, other) { return mods.concat(other.mods); }, this.mods);
                };
                AtlasNode.prototype.getTags = function () {
                    return _super.prototype.getTags.call(this)
                        .concat(this.props.world_area.tags)
                        .filter(
                    // unique by id
                    function (tag, i, tags) { return tags.findIndex(function (other) { return other === tag; }) === i; });
                };
                AtlasNode.prototype.maxModsOfType = function () {
                    return Number.POSITIVE_INFINITY;
                };
                AtlasNode.prototype.inDomainOf = function (mod_domain) {
                    return mod_domain === Mod_6.default.DOMAIN.ATLAS;
                };
                AtlasNode.prototype.level = function () {
                    return this.props.world_area.area_level;
                };
                AtlasNode.prototype.affectingMods = function (atlas) {
                    var _this = this;
                    return atlas.reduce(function (mods, other) {
                        if (_this.isInSextantRange(other)) {
                            return mods.concat(other.mods);
                        }
                        else {
                            return mods;
                        }
                    }, []); // this.mods will be passed on atlas.reduce
                };
                AtlasNode.prototype.activeMods = function (atlas) {
                    var _this = this;
                    return this.affectingMods(atlas).filter(function (mod) { return mod.spawnweightFor(_this) > 0; });
                };
                AtlasNode.prototype.inactiveMods = function (atlas) {
                    var _this = this;
                    return this.affectingMods(atlas).filter(function (mod) { return mod.spawnweightFor(_this) <= 0; });
                };
                return AtlasNode;
            }(ImmutableContainer_3.default));
            exports_54("default", AtlasNode);
        }
    };
});
System.register("generators/Sextant", ["make-error", "mods/Mod", "util/Flags", "generators/Orb"], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var make_error_2, Mod_7, Flags_17, Orb_2, ContextUndefined, CorruptedState, Type, Sextant;
    return {
        setters: [
            function (make_error_2_1) {
                make_error_2 = make_error_2_1;
            },
            function (Mod_7_1) {
                Mod_7 = Mod_7_1;
            },
            function (Flags_17_1) {
                Flags_17 = Flags_17_1;
            },
            function (Orb_2_1) {
                Orb_2 = Orb_2_1;
            }
        ],
        execute: function () {
            ContextUndefined = /** @class */ (function (_super) {
                __extends(ContextUndefined, _super);
                function ContextUndefined(context) {
                    return _super.call(this, "context not set, set " + context) || this;
                }
                return ContextUndefined;
            }(make_error_2.BaseError));
            exports_55("ContextUndefined", ContextUndefined);
            CorruptedState = /** @class */ (function (_super) {
                __extends(CorruptedState, _super);
                function CorruptedState(message) {
                    return _super.call(this, "corrupted state: " + message) || this;
                }
                return CorruptedState;
            }(make_error_2.BaseError));
            exports_55("CorruptedState", CorruptedState);
            (function (Type) {
                Type[Type["apprentice"] = 1] = "apprentice";
                Type[Type["journeyman"] = 2] = "journeyman";
                Type[Type["master"] = 3] = "master";
            })(Type || (Type = {}));
            exports_55("Type", Type);
            Sextant = /** @class */ (function (_super) {
                __extends(Sextant, _super);
                function Sextant() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.type = Type.master;
                    return _this;
                }
                Sextant.modFilter = function (mod) {
                    return _super.modFilter.call(this, mod) && mod.domain === Mod_7.default.DOMAIN.ATLAS;
                };
                Sextant.build = function (mods) {
                    return new Sextant(this.buildMods(mods));
                };
                /**
                 * creates a list of mod that are either
                 * a) already applied to this node because they are directly in range
                 * b) already applied to adjacent nodes and would create duplicates if applied
                 *    to this node
                 * in other words: consider every mod from maps within a sextant distance of 2
                 * @param {AtlasNode} node
                 * @param {AtlasNode[]} atlas
                 */
                Sextant.blockedMods = function (target, atlas) {
                    return target
                        .inSextantRange(atlas, 1)
                        .reduce(function (mods, secondary) { return mods.concat(secondary.getAllMods(atlas)); }, []);
                };
                Sextant.prototype.applyTo = function (node) {
                    if (!Flags_17.anySet(this.applicableTo(node))) {
                        var rolled = _super.prototype.rollMod.call(this, node.removeAllMods());
                        if (rolled !== node) {
                            // something change
                            // reset the context to signal that it has to be mutated
                            this.atlas = undefined;
                        }
                        return rolled;
                    }
                    else {
                        return node;
                    }
                };
                // applicable to any node for now
                Sextant.prototype.applicableTo = function (node) {
                    var applicable_flags = {
                        wrong_tier_group: false,
                    };
                    var area_ranges = (_a = {},
                        _a[Type.apprentice] = 72,
                        _a[Type.journeyman] = 77,
                        _a[Type.master] = 84,
                        _a);
                    applicable_flags.wrong_tier_group =
                        node.props.world_area.area_level > area_ranges[this.type];
                    return applicable_flags;
                    var _a;
                };
                // I'm not sure how it determines the spawnweight
                // For example a map with no_monster_packs can still roll
                // a mod with spawnweight 0 for no_monster_packs if adjacent maps can roll it
                // I don't know which spawnweight it chooses though if
                // it can choose between multiple weights
                // for now we just search the adjacents if its 0 and pick first we find
                Sextant.prototype.findAdjacentWithSpawnweight = function (mod, node) {
                    if (this.atlas == null) {
                        throw new ContextUndefined('atlas');
                    }
                    return node.inSextantRange(this.atlas).find(function (other) {
                        return mod.spawnweightFor(other) > 0;
                    });
                };
                Sextant.prototype.isModSpawnableOn = function (mod, node) {
                    var spawnable_flags = __assign({}, _super.prototype.isModSpawnableOn.call(this, mod, node), { no_adjacents_with_spawnweight: false });
                    if (spawnable_flags.spawnweight_zero) {
                        var adjacent_with_spawnweight = this.findAdjacentWithSpawnweight(mod, node);
                        if (adjacent_with_spawnweight === undefined) {
                            spawnable_flags.no_adjacents_with_spawnweight = true;
                        }
                        else {
                            spawnable_flags.spawnweight_zero = false;
                        }
                    }
                    return spawnable_flags;
                };
                Sextant.prototype.modsFor = function (node, whitelist) {
                    var _this = this;
                    if (whitelist === void 0) { whitelist = []; }
                    if (this.atlas == null) {
                        throw new ContextUndefined('atlas');
                    }
                    var blocked = Sextant.blockedMods(node, this.atlas);
                    return _super.prototype.modsFor.call(this, node, whitelist)
                        .filter(function (_a) {
                        var mod = _a.mod;
                        var is_blocked = blocked.includes(mod);
                        return !is_blocked;
                    })
                        .map(function (_a) {
                        var spawnable = _a.spawnable, spawnweight = _a.spawnweight, mod = _a.mod, details = __rest(_a, ["spawnable", "spawnweight", "mod"]);
                        if (spawnable === undefined || spawnweight === undefined) {
                            throw new Error('spawnable is undefined');
                        }
                        var spawnweight_with_adjacents = spawnweight;
                        if (spawnweight === 0 && !spawnable.spawnweight_zero) {
                            // see Sextant.isModSpawnableOn
                            // we took the spawnweight from an adjacent node
                            var adjacent_with_spawnweight = _this.findAdjacentWithSpawnweight(mod, node);
                            // this shouldn't be happening spawnweight should be > 0
                            // if the flag is not set. only exception is whitelist
                            var corrupted_state = adjacent_with_spawnweight == null &&
                                !whitelist.includes('spawnweight_zero');
                            if (corrupted_state) {
                                throw new CorruptedState('spawnweight should be > 0 if spawnweight_zero is false');
                            }
                            else if (adjacent_with_spawnweight != null) {
                                // we need to assure Flow that whitelist.includes didnt
                                // mutate adjacent_with_spawnweight although we wouldnt care about
                                // it because we dont care if it went from null > any
                                // we just need to be sure that it didnt go from any > null
                                // and this is given since it's the first check in the expression
                                spawnweight_with_adjacents = mod.spawnweightFor(adjacent_with_spawnweight);
                            }
                        }
                        return __assign({ mod: mod,
                            spawnable: spawnable, spawnweight: spawnweight_with_adjacents }, details);
                    });
                };
                Sextant.type = Type;
                return Sextant;
            }(Orb_2.default));
            exports_55("default", Sextant);
        }
    };
});
System.register("generators/index", ["generators/item_orbs/index", "generators/ItemShowcase", "generators/MasterBenchOption", "generators/Sextant"], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [
            function (_4_1) {
                exports_56({
                    "Alchemy": _4_1["Alchemy"],
                    "Annulment": _4_1["Annulment"],
                    "Alteration": _4_1["Alteration"],
                    "Augment": _4_1["Augment"],
                    "Chaos": _4_1["Chaos"],
                    "EnchantmentBench": _4_1["EnchantmentBench"],
                    "Essence": _4_1["Essence"],
                    "Exalted": _4_1["Exalted"],
                    "Regal": _4_1["Regal"],
                    "Scouring": _4_1["Scouring"],
                    "Talisman": _4_1["Talisman"],
                    "Transmute": _4_1["Transmute"],
                    "Vaal": _4_1["Vaal"]
                });
            },
            function (ItemShowcase_1_1) {
                exports_56({
                    "ItemShowcase": ItemShowcase_1_1["default"]
                });
            },
            function (MasterBenchOption_2_1) {
                exports_56({
                    "MasterBenchOption": MasterBenchOption_2_1["default"]
                });
            },
            function (Sextant_1_1) {
                exports_56({
                    "Sextant": Sextant_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("containers/index", ["containers/AtlasNode", "containers/ImmutableContainer", "containers/item/index"], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    return {
        setters: [
            function (AtlasNode_1_1) {
                exports_57({
                    "AtlasNode": AtlasNode_1_1["default"]
                });
            },
            function (ImmutableContainer_4_1) {
                exports_57({
                    "ImmutableContainer": ImmutableContainer_4_1["default"]
                });
            },
            function (item_1_1) {
                exports_57({
                    "Item": item_1_1["default"],
                    "ArmourProperties": item_1_1["ArmourProperties"],
                    "ShieldProperties": item_1_1["ShieldProperties"],
                    "WeaponProperties": item_1_1["WeaponProperties"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("helpers/Atlas", ["containers/AtlasNode", "generators/Sextant"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var AtlasNode_2, Sextant_2, Atlas;
    return {
        setters: [
            function (AtlasNode_2_1) {
                AtlasNode_2 = AtlasNode_2_1;
            },
            function (Sextant_2_1) {
                Sextant_2 = Sextant_2_1;
            }
        ],
        execute: function () {
            /**
             * immutable data structure for the atlas in Path of Exile
             *
             * main purpose is for reducer like usage in redux
             */
            Atlas = /** @class */ (function () {
                function Atlas(nodes) {
                    this.nodes = nodes;
                }
                Atlas.buildLookupTable = function (atlas) {
                    return atlas.reduce(function (nodes, props) {
                        return nodes.set(props.world_area.id, new AtlasNode_2.default([], props));
                    }, new Map());
                };
                Atlas.build = function (atlas) {
                    var nodes = Atlas.buildLookupTable(atlas);
                    return new Atlas(nodes);
                };
                Atlas.withBuilder = function (builder) {
                    return new Atlas(builder.nodes);
                };
                // TODO in the future use [Symbol.iterator]()
                Atlas.prototype.asArray = function () {
                    return Array.from(this.nodes.values());
                };
                /**
                 * wrapper for map get that ensures a node or throws
                 */
                Atlas.prototype.get = function (world_area_id) {
                    var node = this.nodes.get(world_area_id);
                    if (node == null) {
                        throw new Error("IndexError: '" + world_area_id + "' not found");
                    }
                    return node;
                };
                Atlas.prototype.builder = function () {
                    return {
                        nodes: this.nodes,
                    };
                };
                /**
                 * batch mutations
                 *
                 * if the returned object is strict equal to the prev one
                 * it doesn't return a new copy
                 */
                Atlas.prototype.withMutations = function (mutate) {
                    var prev = this.builder();
                    var next = mutate(prev);
                    if (prev !== next) {
                        // @ts-ignore
                        return this.constructor.withBuilder(next);
                    }
                    else {
                        return this;
                    }
                };
                /**
                 * removes mods on all maps
                 *
                 * always returns a new copy
                 */
                Atlas.prototype.reset = function () {
                    var _this = this;
                    return this.withMutations(function (_a) {
                        var nodes = _a.nodes, builder = __rest(_a, ["nodes"]);
                        return __assign({}, builder, { nodes: Atlas.buildLookupTable(_this.asArray().map(function (node) { return node.removeAllMods().props; })) });
                    });
                };
                Atlas.prototype.addMod = function (mod, world_area_id) {
                    return this.mutateNode(world_area_id, function (node) { return node.addMod(mod); });
                };
                Atlas.prototype.removeMod = function (mod, world_area_id) {
                    return this.mutateNode(world_area_id, function (node) { return node.removeMod(mod); });
                };
                Atlas.prototype.mutateNode = function (world_area_id, mutate) {
                    var target = this.get(world_area_id);
                    var mutated = mutate(target);
                    if (target === mutated) {
                        return this;
                    }
                    else {
                        return this.withMutations(function (_a) {
                            var nodes = _a.nodes, builder = __rest(_a, ["nodes"]);
                            return __assign({}, builder, { nodes: new Map(nodes).set(world_area_id, mutated) });
                        });
                    }
                };
                Atlas.prototype.applySextant = function (sextant, world_area_id) {
                    var sextant_on_atlas = this.prepareSextant(sextant);
                    return this.mutateNode(world_area_id, function (node) {
                        return sextant_on_atlas.applyTo(node);
                    });
                };
                Atlas.prototype.modsFor = function (sextant, world_area_id) {
                    var sextant_on_atlas = this.prepareSextant(sextant);
                    return sextant_on_atlas.modsFor(this.get(world_area_id));
                };
                Atlas.prototype.blockedMods = function (world_area_id) {
                    var target = this.get(world_area_id);
                    return Sextant_2.default.blockedMods(target, this.asArray());
                };
                Atlas.prototype.prepareSextant = function (sextant) {
                    var clone = new Sextant_2.default(sextant.mods);
                    clone.type = sextant.type;
                    clone.atlas = this.asArray();
                    return clone;
                };
                return Atlas;
            }());
            exports_58("default", Atlas);
        }
    };
});
System.register("interfaces/Builder", [], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/Buildable", [], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/index", [], function (exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("helpers/PropsTable", ["make-error"], function (exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var make_error_3, NotFound, PropsTable;
    return {
        setters: [
            function (make_error_3_1) {
                make_error_3 = make_error_3_1;
            }
        ],
        execute: function () {
            NotFound = /** @class */ (function (_super) {
                __extends(NotFound, _super);
                function NotFound(name, message) {
                    return _super.call(this, name + " not found " + message) || this;
                }
                return NotFound;
            }(make_error_3.BaseError));
            exports_62("NotFound", NotFound);
            // take care. flow accepts any as a constructor
            PropsTable = /** @class */ (function () {
                function PropsTable(all, constructor, arg1) {
                    this.builder = constructor;
                    this.table = all;
                    this.builder_arg1 = arg1;
                }
                PropsTable.prototype.all = function () {
                    return this.table;
                };
                PropsTable.prototype.find = function (finder) {
                    return this.table.find(finder);
                };
                /**
                 * Builds an instance for the properties for which the provided predicate is
                 * true. Returns for the first value for which the predicate is true
                 */
                PropsTable.prototype.from = function (finder) {
                    var props = this.find(finder);
                    if (props == null) {
                        throw new NotFound(this.builder.name, "with custom finder");
                    }
                    return this.builder.build(props, this.builder_arg1);
                };
                PropsTable.prototype.fromPrimary = function (primary) {
                    return this.fromProp('primary', primary);
                };
                PropsTable.prototype.fromName = function (name) {
                    return this.fromProp('name', name);
                };
                PropsTable.prototype.fromId = function (id) {
                    return this.fromProp('id', id);
                };
                PropsTable.prototype.fromProp = function (prop, value) {
                    try {
                        return this.from(function (other) { return other[prop] === value; });
                    }
                    catch (err) {
                        // catch Notfound
                        if (err instanceof NotFound) {
                            throw new NotFound(this.builder.name, "with " + prop + " '" + value + "'");
                        }
                        else {
                            throw err;
                        }
                    }
                };
                return PropsTable;
            }());
            exports_62("default", PropsTable);
        }
    };
});
System.register("helpers/createTables", ["containers/AtlasNode", "containers/item/Item", "generators/index", "mods/Mod", "helpers/PropsTable"], function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    function createTable(props, constructor, arg1) {
        return new PropsTable_1.default(props, constructor, arg1);
    }
    var AtlasNode_3, Item_2, generators_1, Mod_8, PropsTable_1, createAtlasNodes, createItems, createMasterBenchOptions, createMods, createEssences;
    return {
        setters: [
            function (AtlasNode_3_1) {
                AtlasNode_3 = AtlasNode_3_1;
            },
            function (Item_2_1) {
                Item_2 = Item_2_1;
            },
            function (generators_1_1) {
                generators_1 = generators_1_1;
            },
            function (Mod_8_1) {
                Mod_8 = Mod_8_1;
            },
            function (PropsTable_1_1) {
                PropsTable_1 = PropsTable_1_1;
            }
        ],
        execute: function () {
            exports_63("createAtlasNodes", createAtlasNodes = function (props) {
                return createTable(props, AtlasNode_3.default, undefined);
            });
            exports_63("createItems", createItems = function (props) {
                return createTable(props, Item_2.default, undefined);
            });
            exports_63("createMasterBenchOptions", createMasterBenchOptions = function (props) {
                return createTable(props, generators_1.MasterBenchOption, undefined);
            });
            exports_63("createMods", createMods = function (props) {
                return createTable(props, Mod_8.default, undefined);
            });
            exports_63("createEssences", createEssences = function (props, mods) {
                return createTable(props, generators_1.Essence, mods);
            });
        }
    };
});
System.register("index", ["calculator/Stat", "calculator/ValueRange", "generators/Generator", "schema", "generators/index", "containers/index", "mods/index", "helpers/Atlas", "helpers/MasterBench", "helpers/createTables", "util/index"], function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var schema;
    return {
        setters: [
            function (Stat_3_1) {
                exports_64({
                    "Stat": Stat_3_1["default"]
                });
            },
            function (ValueRange_4_1) {
                exports_64({
                    "ValueRange": ValueRange_4_1["default"]
                });
            },
            function (Generator_4_1) {
                exports_64({
                    "Generator": Generator_4_1["default"]
                });
            },
            function (schema_1) {
                schema = schema_1;
            },
            function (index_1_1) {
                exports_64({
                    "Alchemy": index_1_1["Alchemy"],
                    "Alteration": index_1_1["Alteration"],
                    "Annulment": index_1_1["Annulment"],
                    "Augment": index_1_1["Augment"],
                    "Chaos": index_1_1["Chaos"],
                    "EnchantmentBench": index_1_1["EnchantmentBench"],
                    "Exalted": index_1_1["Exalted"],
                    "Regal": index_1_1["Regal"],
                    "Scouring": index_1_1["Scouring"],
                    "Talisman": index_1_1["Talisman"],
                    "Transmute": index_1_1["Transmute"],
                    "Vaal": index_1_1["Vaal"],
                    "ItemShowcase": index_1_1["ItemShowcase"],
                    "MasterBenchOption": index_1_1["MasterBenchOption"],
                    "Sextant": index_1_1["Sextant"]
                });
            },
            function (containers_1_1) {
                exports_64({
                    "AtlasNode": containers_1_1["AtlasNode"],
                    "Item": containers_1_1["Item"],
                    "ArmourProperties": containers_1_1["ArmourProperties"],
                    "ShieldProperties": containers_1_1["ShieldProperties"],
                    "WeaponProperties": containers_1_1["WeaponProperties"]
                });
            },
            function (mods_6_1) {
                exports_64({
                    "Mod": mods_6_1["Mod"]
                });
            },
            function (Atlas_1_1) {
                exports_64({
                    "Atlas": Atlas_1_1["default"]
                });
            },
            function (MasterBench_2_1) {
                exports_64({
                    "MasterBench": MasterBench_2_1["default"]
                });
            },
            function (createTables_1_1) {
                exports_64({
                    "createAtlasNodes": createTables_1_1["createAtlasNodes"],
                    "createItems": createTables_1_1["createItems"],
                    "createMasterBenchOptions": createTables_1_1["createMasterBenchOptions"],
                    "createMods": createTables_1_1["createMods"]
                });
            },
            function (util_1_1) {
                exports_64({
                    "anySet": util_1_1["anySet"]
                });
            }
        ],
        execute: function () {
            exports_64("schema", schema);
        }
    };
});
