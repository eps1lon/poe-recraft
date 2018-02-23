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
    var ValueRange;
    return {
        setters: [],
        execute: function () {
            ValueRange = /** @class */ (function () {
                function ValueRange(min, max) {
                    this.min = min;
                    this.max = max;
                }
                ValueRange.prototype.add = function (other) {
                    if (other.isAddIdentity()) {
                        return this;
                    }
                    else {
                        return new ValueRange(this.min + other.min, this.max + other.max);
                    }
                };
                ValueRange.prototype.mult = function (other) {
                    if (other.isMultIdentity()) {
                        return this;
                    }
                    else {
                        return new ValueRange(this.min * other.min, this.max * other.max);
                    }
                };
                ValueRange.prototype.map = function (mapFn) {
                    var _a = [mapFn(this.min), mapFn(this.max)], min = _a[0], max = _a[1];
                    if (min !== this.min || max !== this.max) {
                        return new ValueRange(min, max);
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
                    return this.mult(new ValueRange(0.01, 0.01)).add(new ValueRange(1, 1));
                };
                ValueRange.prototype.asTuple = function () {
                    return [this.min, this.max];
                };
                return ValueRange;
            }());
            exports_2("default", ValueRange);
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
                            : new ValueRange_1.default(values[0], values[1]);
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
                        return other_tags.find(function (item_tag) { return tag.primary === item_tag.primary; }) != null;
                    });
                    if (match == null) {
                        var default_spawnweight = spawn_weights.find(function (_a) {
                            var tag = _a.tag;
                            return tag.primary === 0;
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
                LOCKED_PREFIXES: 6184,
                LOCKED_SUFFIXES: 6185,
                NO_ATTACK_MODS: 6186,
                NO_CASTER_MODS: 6187,
                MULTIMOD: 6188,
                LLD_MOD: 6123,
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
                    var has_leo_meta_mod = container.indexOfModWithPrimary(meta_mods_1.default.LLD_MOD) !== -1;
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
                Equipment: {
                    extends: 'Item',
                    LocalStats: {},
                    Mods: {
                        stat_description_list: ['Metadata/stat_descriptions.txt'],
                        enable_rarity: ['normal', 'magic', 'rare', 'unique'],
                    },
                    inheritance: ['Item', 'Equipment'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Item: {
                    extends: 'nothing',
                    Base: { base_level: ['1\r'], tag: ['default'] },
                    inheritance: ['Item'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractAmulet: {
                    extends: 'Equipment',
                    Base: { x_size: ['1\r'], y_size: ['1\r'], tag: ['amulet'] },
                    Mods: { inventory_type: ['Amulet'] },
                    inheritance: ['Item', 'Equipment', 'AbstractAmulet'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 3, id: 'amulet' }],
                },
                AbstractSocketableAmulet: {
                    extends: 'AbstractAmulet',
                    AttributeRequirements: {
                        strength_requirement: ['0\r'],
                        dexterity_requirement: ['0\r'],
                        intelligence_requirement: ['0\r'],
                    },
                    Sockets: {
                        socket_info: [
                            '0:1:1 1:9999:100 2:9999:90 3:9999:80 4:9999:30 5:9999:20 6:9999:5',
                        ],
                    },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractAmulet',
                        'AbstractSocketableAmulet',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 3, id: 'amulet' }],
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
                    tags: [{ primary: 0, id: 'default' }, { primary: 3, id: 'amulet' }],
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
                    tags: [{ primary: 0, id: 'default' }, { primary: 3, id: 'amulet' }],
                },
                AbstractArmour: {
                    extends: 'Equipment',
                    Base: { tag: ['armour'] },
                    Quality: { max_quality: ['20\r'] },
                    Sockets: {
                        socket_info: ['1:1:100 2:1:90 3:2:80 4:25:30 5:9999:20 6:9999:5'],
                    },
                    inheritance: ['Item', 'Equipment', 'AbstractArmour'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 7, id: 'armour' }],
                },
                AbstractBodyArmour: {
                    extends: 'AbstractArmour',
                    Base: { tag: ['body_armour'] },
                    Mods: { inventory_type: ['BodyArmour'] },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:25:30 5:35:5 6:50:1'],
                    },
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractBodyArmour'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 7, id: 'armour' },
                        { primary: 16, id: 'body_armour' },
                    ],
                },
                AbstractBoots: {
                    extends: 'AbstractArmour',
                    Base: { x_size: ['2\r'], y_size: ['2\r'], tag: ['boots'] },
                    Mods: { inventory_type: ['Boots'] },
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractBoots'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 7, id: 'armour' },
                        { primary: 4, id: 'boots' },
                    ],
                },
                AbstractGloves: {
                    extends: 'AbstractArmour',
                    Base: { x_size: ['2\r'], y_size: ['2\r'], tag: ['gloves'] },
                    Mods: { inventory_type: ['Gloves'] },
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractGloves'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 7, id: 'armour' },
                        { primary: 22, id: 'gloves' },
                    ],
                },
                AbstractHelmet: {
                    extends: 'AbstractArmour',
                    Base: { x_size: ['2\r'], y_size: ['2\r'], tag: ['helmet'] },
                    Mods: { inventory_type: ['Helm'] },
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractHelmet'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 7, id: 'armour' },
                        { primary: 25, id: 'helmet' },
                    ],
                },
                AbstractShield: {
                    extends: 'AbstractArmour',
                    Base: { x_size: ['2\r'], y_size: ['2\r'], tag: ['shield'] },
                    Shield: { block_percentage: ['0\r'] },
                    Mods: { inventory_type: ['Offhand'] },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    inheritance: ['Item', 'Equipment', 'AbstractArmour', 'AbstractShield'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 7, id: 'armour' },
                        { primary: 1, id: 'shield' },
                    ],
                },
                AbstractBelt: {
                    extends: 'Equipment',
                    Base: { x_size: ['2\r'], y_size: ['1\r'], tag: ['belt'] },
                    Mods: { inventory_type: ['Belt'] },
                    inheritance: ['Item', 'Equipment', 'AbstractBelt'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 26, id: 'belt' }],
                },
                AbstractCurrency: {
                    extends: 'Item',
                    Base: { x_size: ['1\r'], y_size: ['1\r'] },
                    inheritance: ['Item', 'AbstractCurrency'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractMicrotransaction: {
                    extends: 'AbstractCurrency',
                    Stack: {},
                    inheritance: ['Item', 'AbstractCurrency', 'AbstractMicrotransaction'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                CurrencyImprint: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'CurrencyImprint',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                StackableCurrency: {
                    extends: 'AbstractCurrency',
                    Base: { tag: ['currency'] },
                    Stack: {},
                    inheritance: ['Item', 'AbstractCurrency', 'StackableCurrency'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                AbstractDivinationCard: {
                    extends: 'Item',
                    Base: {
                        x_size: ['1\r'],
                        y_size: ['1\r'],
                        tag: ['divination_card'],
                    },
                    Stack: {},
                    inheritance: ['Item', 'AbstractDivinationCard'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 152, id: 'divination_card' },
                    ],
                },
                AbstractFlask: {
                    extends: 'Item',
                    Base: {
                        tag: ['flask'],
                        x_size: ['1\r'],
                        y_size: ['2\r'],
                        description_text: ['ItemDescriptionFlask'],
                    },
                    Quality: { max_quality: ['20\r'] },
                    LocalStats: {},
                    Charges: { max_charges: ['2\t\r'] },
                    Mods: {
                        stat_description_list: ['Metadata/stat_descriptions.txt'],
                        enable_rarity: ['normal', 'magic', 'unique'],
                        disable_rarity: ['rare'],
                        inventory_type: ['Flask'],
                    },
                    Usable: { use_type: ['Usable'], action: ['flask'] },
                    Imprint: {},
                    inheritance: ['Item', 'AbstractFlask'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 20, id: 'flask' }],
                },
                AbstractHybridFlask: {
                    extends: 'AbstractFlask',
                    Base: { tag: ['hybrid_flask'] },
                    inheritance: ['Item', 'AbstractFlask', 'AbstractHybridFlask'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 20, id: 'flask' },
                        { primary: 19, id: 'hybrid_flask' },
                    ],
                },
                AbstractLifeFlask: {
                    extends: 'AbstractFlask',
                    Base: { tag: ['life_flask'] },
                    inheritance: ['Item', 'AbstractFlask', 'AbstractLifeFlask'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 20, id: 'flask' },
                        { primary: 17, id: 'life_flask' },
                    ],
                },
                AbstractManaFlask: {
                    extends: 'AbstractFlask',
                    Base: { tag: ['mana_flask'] },
                    inheritance: ['Item', 'AbstractFlask', 'AbstractManaFlask'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 20, id: 'flask' },
                        { primary: 18, id: 'mana_flask' },
                    ],
                },
                AbstractUtilityFlask: {
                    extends: 'AbstractFlask',
                    Base: { tag: ['utility_flask'] },
                    inheritance: ['Item', 'AbstractFlask', 'AbstractUtilityFlask'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 20, id: 'flask' },
                        { primary: 46, id: 'utility_flask' },
                    ],
                },
                CriticalUtilityFlask: {
                    extends: 'AbstractUtilityFlask',
                    Base: { tag: ['critical_utility_flask'] },
                    inheritance: [
                        'Item',
                        'AbstractFlask',
                        'AbstractUtilityFlask',
                        'CriticalUtilityFlask',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 20, id: 'flask' },
                        { primary: 46, id: 'utility_flask' },
                        { primary: 47, id: 'critical_utility_flask' },
                    ],
                },
                FlaskUtility1: {
                    extends: 'AbstractUtilityFlask',
                    Base: { description_text: ['ItemDescriptionFlaskUtility1'] },
                    inheritance: [
                        'Item',
                        'AbstractFlask',
                        'AbstractUtilityFlask',
                        'FlaskUtility1',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 20, id: 'flask' },
                        { primary: 46, id: 'utility_flask' },
                    ],
                },
                AbstractSkillGem: {
                    extends: 'Item',
                    Base: {
                        tag: ['gem'],
                        x_size: ['1\r'],
                        y_size: ['1\r'],
                        description_text: ['ItemDescriptionSkillGem'],
                    },
                    SkillGem: {},
                    Quality: { max_quality: ['20\r'] },
                    inheritance: ['Item', 'AbstractSkillGem'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 27, id: 'gem' }],
                },
                ActiveSkillGem: {
                    extends: 'AbstractSkillGem',
                    Base: { description_text: ['ItemDescriptionActiveSkillGem'] },
                    SkillGem: {},
                    inheritance: ['Item', 'AbstractSkillGem', 'ActiveSkillGem'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 27, id: 'gem' }],
                },
                SupportSkillGem: {
                    extends: 'AbstractSkillGem',
                    Base: {
                        description_text: ['ItemDescriptionSupportSkillGem'],
                        tag: ['support_gem'],
                    },
                    SkillGem: {},
                    inheritance: ['Item', 'AbstractSkillGem', 'SupportSkillGem'],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 27, id: 'gem' },
                        { primary: 169, id: 'support_gem' },
                    ],
                },
                AbstractHideoutDoodad: {
                    extends: 'Item',
                    Base: { x_size: ['1\r'], y_size: ['1\r'] },
                    Stack: {},
                    inheritance: ['Item', 'AbstractHideoutDoodad'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractJewel: {
                    extends: 'Item',
                    Base: {
                        x_size: ['1\r'],
                        y_size: ['1\r'],
                        description_text: ['ItemDescriptionPassiveJewel'],
                    },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: ['Metadata/stat_descriptions.txt'],
                        enable_rarity: ['magic', 'rare', 'unique'],
                        inventory_type: ['passivejewels'],
                    },
                    inheritance: ['Item', 'AbstractJewel'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractLabyrinthItem: {
                    extends: 'Item',
                    Stack: { max_stack_size: ['1\r'] },
                    inheritance: ['Item', 'AbstractLabyrinthItem'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                BronzeKey: {
                    extends: 'AbstractLabyrinthItem',
                    Base: { description_text: ['TreasureKeyDescription'] },
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'BronzeKey'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                GoldenKey: {
                    extends: 'AbstractLabyrinthItem',
                    Base: { description_text: ['GoldenKeyDescription'] },
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'GoldenKey'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                LabyrinthTrinket: {
                    extends: 'AbstractLabyrinthItem',
                    Base: { x_size: ['1\r'], y_size: ['1\r'] },
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'LabyrinthTrinket'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                SilverKey: {
                    extends: 'AbstractLabyrinthItem',
                    Base: { description_text: ['SilverKeyDescription'] },
                    inheritance: ['Item', 'AbstractLabyrinthItem', 'SilverKey'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractMapFragment: {
                    extends: 'Item',
                    Base: { description_text: ['ItemDescriptionMapFragment'] },
                    LocalStats: {},
                    Mods: {
                        stat_description_list: ['Metadata/stat_descriptions.txt'],
                        inventory_type: ['Map'],
                    },
                    inheritance: ['Item', 'AbstractMapFragment'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractMap: {
                    extends: 'Equipment',
                    Base: { tag: ['map'], description_text: ['ItemDescriptionMap'] },
                    LocalStats: {},
                    Mods: {},
                    Quality: { max_quality: ['20\r'] },
                    Map: {},
                    inheritance: ['Item', 'Equipment', 'AbstractMap'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 57, id: 'map' }],
                },
                MysteryBox1x1: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x1',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox1x2: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x2',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox1x3: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x3',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox1x4: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox1x4',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox2x1: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x1',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox2x2: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x2',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox2x3: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x3',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox2x4: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox2x4',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox3x2: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox3x2',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                MysteryBox3x3: {
                    extends: 'StackableCurrency',
                    Imprint: {},
                    inheritance: [
                        'Item',
                        'AbstractCurrency',
                        'StackableCurrency',
                        'MysteryBox3x3',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 153, id: 'currency' }],
                },
                AbstractQuestItem: {
                    extends: 'Item',
                    Base: { x_size: ['1\r'], y_size: ['1\r'] },
                    Quest: {},
                    inheritance: ['Item', 'AbstractQuestItem'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AllFlameLantern1: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a1q6minusHaveAllFlame'],
                        remove_flag: ['a1q6minusDeliveredAllFlame'],
                    },
                    inheritance: ['Item', 'AllFlameLantern1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                GoldenHand: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a2q5minusHaveGoldenHand'],
                        remove_flag: ['a2q5minusDeliveredGoldenHand'],
                        extra_flag: ['a2q5minusReceivedQuest'],
                    },
                    inheritance: ['Item', 'GoldenHand'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                InfernalTalc: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q5minusHaveTalc'],
                        remove_flag: ['a3q5minusUsedTalc'],
                    },
                    inheritance: ['Item', 'InfernalTalc'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                MedicineSet1: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a1q5minusHaveMedicineChest'],
                        remove_flag: ['a1q5minusNessaCongratulated'],
                        extra_flag: ['SeenMedicineChest'],
                    },
                    inheritance: ['Item', 'MedicineSet1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                PoisonSkillGem: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a2q6minusHaveSkillGem'],
                        remove_flag: ['a2q9minusPoisonedTree'],
                        extra_flag: ['a2q6minusHelenaInTown'],
                        extra_flag2: ['SeenBalefulGem'],
                    },
                    inheritance: ['Item', 'PoisonSkillGem'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                PoisonSpear: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a2q4minusHavePoisonSpear'],
                        remove_flag: ['a2q9minusPoisonedTree'],
                        extra_flag: ['a2q4minusReceivedQuest'],
                        extra_flag2: ['a2bminusStartNewQuests'],
                    },
                    inheritance: ['Item', 'PoisonSpear'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                RibbonSpool: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q4minusHaveRibbonSpool'],
                        remove_flag: ['a3q4minusDeliveredSpool'],
                        extra_flag: ['SeenRibbonSpool'],
                    },
                    inheritance: ['Item', 'RibbonSpool'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                SewerKeys: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q11minusHaveSewerKeys'],
                        remove_flag: ['a3q11minusUsedSewerKeys'],
                    },
                    inheritance: ['Item', 'SewerKeys'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                SpikeSealKey: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a2q11minusHaveKey'],
                        remove_flag: ['a1q9minusRoadOpened'],
                        extra_flag: ['a2q11minusSeenKey'],
                        extra_flag2: ['a1q9minusRoadBlocked'],
                    },
                    inheritance: ['Item', 'SpikeSealKey'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                SulphiteFlask: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q5minusHaveSulphite'],
                        remove_flag: ['a3q5minusDeliveredSulphite'],
                        extra_flag: ['SeenSulphite'],
                    },
                    inheritance: ['Item', 'SulphiteFlask'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                TolmanBracelet: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q2minusHaveTolmanItem'],
                        remove_flag: ['a3q2minusDeliveredItem'],
                        extra_flag: ['a3q2minusSeenTolmanItem'],
                    },
                    inheritance: ['Item', 'TolmanBracelet'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                TowerKey: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q9minusHaveTowerKey'],
                        remove_flag: ['a3q9minusUsedTowerKey'],
                        extra_flag: ['SeenTowerKey'],
                    },
                    inheritance: ['Item', 'TowerKey'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a4q6': {
                    extends: 'AbstractQuestItem',
                    Base: {
                        description_text: [
                            'ItemDescriptionBookPassivePointAnd2RespecPointsTasuni',
                        ],
                    },
                    Quest: {
                        use_flag: ['a4q6minusUsedRewardBook'],
                        grant_flag: ['a4q6minusHaveRewardBook'],
                        remove_flag: ['a4q6minusUsedRewardBook'],
                        respec_points: ['2\r'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePointAnd2RespecPoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a4q6'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                DaressoGem: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a4q4minusHaveGem'],
                        remove_flag: ['a4q4minusDeliveredGem'],
                        extra_flag: ['a4q1minusGemQuestsReceived'],
                    },
                    inheritance: ['Item', 'DaressoGem'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                KaomGem: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a4q3minusHaveGem'],
                        remove_flag: ['a4q3minusDeliveredGem'],
                        extra_flag: ['a4q1minusGemQuestsReceived'],
                    },
                    inheritance: ['Item', 'KaomGem'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Organ1: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a4q5minusHaveOrgan1'],
                        remove_flag: ['a4q5minusDeliveredOrgan1'],
                        extra_flag: ['a4q5minusSeenOrgan'],
                    },
                    inheritance: ['Item', 'Organ1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Organ2: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a4q5minusHaveOrgan2'],
                        remove_flag: ['a4q5minusDeliveredOrgan2'],
                        extra_flag: ['a4q5minusSeenOrgan'],
                    },
                    inheritance: ['Item', 'Organ2'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Organ3: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a4q5minusHaveOrgan3'],
                        remove_flag: ['a4q5minusDeliveredOrgan3'],
                        extra_flag: ['a4q5minusSeenOrgan'],
                    },
                    inheritance: ['Item', 'Organ3'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                RedBanner: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a4q2minusHaveBanner'],
                        remove_flag: ['a4q2minusUsedBanner'],
                        extra_flag: ['a4q2minusQuestReceived'],
                    },
                    inheritance: ['Item', 'RedBanner'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                CombinedAmulet: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a2q8minusPlacedApex'],
                        grant_flag: ['a2q8minusHaveApex'],
                    },
                    inheritance: ['Item', 'CombinedAmulet'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                DexAmulet: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a2bminusDeliveredAmulets'],
                        grant_flag: ['a2bminusHaveDexAmulet'],
                        extra_flag: ['a2bminusKilledDexBandit'],
                    },
                    inheritance: ['Item', 'DexAmulet'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                IntAmulet: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a2bminusDeliveredAmulets'],
                        grant_flag: ['a2bminusHaveIntAmulet'],
                        extra_flag: ['a2bminusKilledIntBandit'],
                    },
                    inheritance: ['Item', 'IntAmulet'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                StrAmulet: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a2bminusDeliveredAmulets'],
                        grant_flag: ['a2bminusHaveStrAmulet'],
                        extra_flag: ['a2bminusKilledStrBandit'],
                    },
                    inheritance: ['Item', 'StrAmulet'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Bust1: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q11minusHaveBust1'],
                        remove_flag: ['a3q11minusDeliveredBust1'],
                        extra_flag: ['SeenBust1'],
                    },
                    inheritance: ['Item', 'Bust1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Bust2: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q11minusHaveBust2'],
                        remove_flag: ['a3q11minusDeliveredBust2'],
                        extra_flag: ['SeenBust2'],
                    },
                    inheritance: ['Item', 'Bust2'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Bust3: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q11minusHaveBust3'],
                        remove_flag: ['a3q11minusDeliveredBust3'],
                        extra_flag: ['SeenBust3'],
                    },
                    inheritance: ['Item', 'Bust3'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Decanter: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q13minusHaveDecanter'],
                        remove_flag: ['a3q13minusDecanterDelivered'],
                        extra_flag: ['SeenDecanter'],
                    },
                    inheritance: ['Item', 'Decanter'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Fruit: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q13minusHavePlum'],
                        remove_flag: ['a3q13minusPlumDelivered'],
                        extra_flag: ['SeenPlum'],
                    },
                    inheritance: ['Item', 'Fruit'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Glyph1: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a1q4minusPlacedGlyphs'],
                        grant_flag: ['a1q4minusHaveGlyph1'],
                        extra_flag: ['a1q4minusKnowsAboutGlyphs'],
                        extra_flag2: ['SeenShell1'],
                    },
                    inheritance: ['Item', 'Glyph1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Glyph2: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a1q4minusPlacedGlyphs'],
                        grant_flag: ['a1q4minusHaveGlyph2'],
                        extra_flag: ['a1q4minusKnowsAboutGlyphs'],
                        extra_flag2: ['SeenShell2'],
                    },
                    inheritance: ['Item', 'Glyph2'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Glyph3: {
                    extends: 'Item',
                    Quest: {
                        remove_flag: ['a1q4minusPlacedGlyphs'],
                        grant_flag: ['a1q4minusHaveGlyph3'],
                        extra_flag: ['a1q4minusKnowsAboutGlyphs'],
                        extra_flag2: ['SeenShell3'],
                    },
                    inheritance: ['Item', 'Glyph3'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Page1: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q12minusHavePage1'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    inheritance: ['Item', 'Page1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Page2: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q12minusHavePage2'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    inheritance: ['Item', 'Page2'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Page3: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q12minusHavePage3'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    inheritance: ['Item', 'Page3'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Page4: {
                    extends: 'Item',
                    Quest: {
                        grant_flag: ['a3q12minusHavePage4'],
                        extra_flag: ['a3q12minusSeenPages'],
                        remove_flag: ['a3q12minusDeliveredPages'],
                    },
                    inheritance: ['Item', 'Page4'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                BanditRespecAlira: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBanditRespecAlira'] },
                    Quest: { can_sell: ['true\r'] },
                    Usable: { action: ['respec_alira'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionBanditRespecAlira'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecAlira'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                BanditRespecEramir: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBanditRespecEramir'] },
                    Quest: { can_sell: ['true\r'] },
                    Usable: { action: ['respec_eramir'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionBanditRespecEramir'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecEramir'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                BanditRespecKraityn: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBanditRespecKraityn'] },
                    Quest: { can_sell: ['true\r'] },
                    Usable: { action: ['respec_kraityn'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionBanditRespecKraityn'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecKraityn'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                BanditRespecOak: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBanditRespecOak'] },
                    Quest: { can_sell: ['true\r'] },
                    Usable: { action: ['respec_oak'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionBanditRespecOak'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'BanditRespecOak'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a1q6': {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBookPassivePointBestel'] },
                    Quest: {
                        use_flag: ['a1q6minusUsedRewardBook'],
                        grant_flag: ['a1q6minusHaveRewardBook'],
                        remove_flag: ['a1q6minusUsedRewardBook'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePoint'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a1q6'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a1q7': {
                    extends: 'AbstractQuestItem',
                    Base: {
                        description_text: ['ItemDescriptionBookPassivePointTarkleigh'],
                    },
                    Quest: {
                        use_flag: ['a1q7minusUsedRewardBook'],
                        grant_flag: ['a1q7minusHaveRewardBook'],
                        remove_flag: ['a1q7minusUsedRewardBook'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePoint'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a1q7'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a1q8': {
                    extends: 'AbstractQuestItem',
                    Base: {
                        description_text: ['ItemDescriptionBook2RespecPointsTarkleigh'],
                    },
                    Quest: {
                        use_flag: ['a1q8minusUsedRewardBook'],
                        grant_flag: ['a1q8minusHaveRewardBook'],
                        remove_flag: ['a1q8minusUsedRewardBook'],
                        respec_points: ['2\r'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2RespecPoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a1q8'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a1q9': {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBookPassivePointBestel'] },
                    Quest: {
                        use_flag: ['a1q9minusUsedRewardBook'],
                        grant_flag: ['a1q9minusHaveRewardBook'],
                        remove_flag: ['a1q9minusUsedRewardBook'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePoint'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a1q9'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a2q5': {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBook2RespecPointsYeena'] },
                    Quest: {
                        use_flag: ['a2q5minusUsedRewardBook'],
                        grant_flag: ['a2q5minusHaveRewardBook'],
                        remove_flag: ['a2q5minusUsedRewardBook'],
                        respec_points: ['2\r'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2RespecPoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a2q5'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a3q11v0': {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBookPassivePointHargan'] },
                    Quest: {
                        use_flag: ['a3q11minusUsedRewardBook'],
                        grant_flag: ['a3q11minusHaveRewardBook'],
                        remove_flag: ['a3q11minusUsedRewardBook'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePoint'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a3q11v0'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a3q11v1': {
                    extends: 'AbstractQuestItem',
                    Base: {
                        description_text: ['ItemDescriptionBookPassivePointAndRespecPointHargan'],
                    },
                    Quest: {
                        use_flag: ['a3q11minusUsedRewardBook'],
                        grant_flag: ['a3q11minusHaveRewardBook'],
                        remove_flag: ['a3q11minusUsedRewardBook'],
                        respec_points: ['1\r'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePointAndRespecPoint'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a3q11v1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a3q11v2': {
                    extends: 'AbstractQuestItem',
                    Base: {
                        description_text: [
                            'ItemDescriptionBookPassivePointAnd2RespecPointsHargan',
                        ],
                    },
                    Quest: {
                        use_flag: ['a3q11minusUsedRewardBook'],
                        grant_flag: ['a3q11minusHaveRewardBook'],
                        remove_flag: ['a3q11minusUsedRewardBook'],
                        respec_points: ['2\r'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunctionPassivePointAnd2RespecPoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a3q11v2'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                'Book-a3q9': {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBook2PassivePointsGrigor'] },
                    Quest: {
                        use_flag: ['a3q9minusUsedRewardBook'],
                        grant_flag: ['a3q9minusHaveRewardBook'],
                        remove_flag: ['a3q9minusUsedRewardBook'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2PassivePoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Book-a3q9'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Descent2_1: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBook2PassivePoints'] },
                    Quest: {
                        use_flag: ['Descent2Reward1'],
                        remove_flag: ['Descent2Reward1'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2PassivePoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_1'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Descent2_2: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBook2PassivePoints'] },
                    Quest: {
                        use_flag: ['Descent2Reward2'],
                        remove_flag: ['Descent2Reward2'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2PassivePoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_2'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Descent2_3: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBook2PassivePoints'] },
                    Quest: {
                        use_flag: ['Descent2Reward3'],
                        remove_flag: ['Descent2Reward3'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2PassivePoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_3'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                Descent2_4: {
                    extends: 'AbstractQuestItem',
                    Base: { description_text: ['ItemDescriptionBook2PassivePoints'] },
                    Quest: {
                        use_flag: ['Descent2Reward4'],
                        remove_flag: ['Descent2Reward4'],
                    },
                    Usable: { action: ['skill_book'], use_type: ['Usable'] },
                    Stack: { function_text: ['ItemFunction2PassivePoints'] },
                    inheritance: ['Item', 'AbstractQuestItem', 'Descent2_4'],
                    tags: [{ primary: 0, id: 'default' }],
                },
                AbstractQuiver: {
                    extends: 'Equipment',
                    Base: { tag: ['quiver'], x_size: ['2\r'], y_size: ['3\r'] },
                    LocalStats: {},
                    Mods: { inventory_type: ['Offhand'] },
                    inheritance: ['Item', 'Equipment', 'AbstractQuiver'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 21, id: 'quiver' }],
                },
                AbstractRelic: {
                    extends: 'Equipment',
                    Base: { tag: ['relic'] },
                    LocalStats: {},
                    Mods: {},
                    inheritance: ['Item', 'Equipment', 'AbstractRelic'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 28, id: 'relic' }],
                },
                AbstractLargeRelic: {
                    extends: 'AbstractRelic',
                    Base: { x_size: ['2\r'], y_size: ['2\r'] },
                    LocalStats: {},
                    Mods: { inventory_type: ['altar_large'] },
                    inheritance: ['Item', 'Equipment', 'AbstractRelic', 'AbstractLargeRelic'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 28, id: 'relic' }],
                },
                AbstractMediumRelic: {
                    extends: 'AbstractRelic',
                    Base: { x_size: ['1\r'], y_size: ['2\r'] },
                    LocalStats: {},
                    Mods: { inventory_type: ['altar_medium'] },
                    inheritance: ['Item', 'Equipment', 'AbstractRelic', 'AbstractMediumRelic'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 28, id: 'relic' }],
                },
                AbstractSmallRelic: {
                    extends: 'AbstractRelic',
                    Base: { x_size: ['1\r'], y_size: ['1\r'] },
                    LocalStats: {},
                    Mods: { inventory_type: ['altar_small'] },
                    inheritance: ['Item', 'Equipment', 'AbstractRelic', 'AbstractSmallRelic'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 28, id: 'relic' }],
                },
                AbstractRing: {
                    extends: 'Equipment',
                    Base: { x_size: ['1\r'], y_size: ['1\r'], tag: ['ring'] },
                    Mods: { inventory_type: ['Ring'] },
                    inheritance: ['Item', 'Equipment', 'AbstractRing'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 2, id: 'ring' }],
                },
                AbstractSocketableRing: {
                    extends: 'AbstractRing',
                    AttributeRequirements: {
                        strength_requirement: ['0\r'],
                        dexterity_requirement: ['0\r'],
                        intelligence_requirement: ['0\r'],
                    },
                    Sockets: {
                        socket_info: [
                            '0:1:1 1:9999:100 2:9999:90 3:9999:80 4:9999:30 5:9999:20 6:9999:5',
                        ],
                    },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractRing',
                        'AbstractSocketableRing',
                    ],
                    tags: [{ primary: 0, id: 'default' }, { primary: 2, id: 'ring' }],
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
                    tags: [{ primary: 0, id: 'default' }, { primary: 2, id: 'ring' }],
                },
                AbstractWeapon: {
                    extends: 'Equipment',
                    AttributeRequirements: {
                        strength_requirement: ['100\r'],
                        dexterity_requirement: ['0\r'],
                        intelligence_requirement: ['0\r'],
                    },
                    Mods: { inventory_type: ['Weapon"'] },
                    Weapon: {
                        minimum_attack_distance: ['0\r'],
                        maximum_attack_distance: ['3\r'],
                        minimum_damage: ['5\r'],
                        maximum_damage: ['10\r'],
                        weapon_speed: ['833\r'],
                        critical_chance: ['500\r'],
                        accuracy_rating: ['20\r'],
                    },
                    Quality: { max_quality: ['20\r'] },
                    Base: { tag: ['weapon'] },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    inheritance: ['Item', 'Equipment', 'AbstractWeapon'],
                    tags: [{ primary: 0, id: 'default' }, { primary: 8, id: 'weapon' }],
                },
                AbstractOneHandWeapon: {
                    extends: 'AbstractWeapon',
                    Base: { tag: ['onehand'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                    ],
                },
                AbstractClaw: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['claw', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['Claw'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractClaw',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 14, id: 'claw' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractDagger: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['dagger', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['Dagger'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractDagger',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 13, id: 'dagger' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractOneHandAxe: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['axe', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['OneHandAxe'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandAxe',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 15, id: 'axe' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractOneHandMace: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['mace', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['OneHandMace'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandMace',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 11, id: 'mace' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractSceptre: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['sceptre', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['Sceptre'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractSceptre',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 37, id: 'sceptre' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractOneHandSword: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['sword', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['OneHandSword'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandSword',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 12, id: 'sword' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractOneHandSwordThrusting: {
                    extends: 'AbstractOneHandSword',
                    Weapon: { weapon_class: ['OneHandSwordThrusting'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractOneHandSword',
                        'AbstractOneHandSwordThrusting',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 12, id: 'sword' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractWand: {
                    extends: 'AbstractOneHandWeapon',
                    Base: { tag: ['wand', 'ranged', 'one_hand_weapon'] },
                    Weapon: { weapon_class: ['Wand'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractOneHandWeapon',
                        'AbstractWand',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 23, id: 'onehand' },
                        { primary: 9, id: 'wand' },
                        { primary: 32, id: 'ranged' },
                        { primary: 81, id: 'one_hand_weapon' },
                    ],
                },
                AbstractTwoHandWeapon: {
                    extends: 'AbstractWeapon',
                    Base: { tag: ['twohand'] },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:25:30 5:35:5 6:50:1'],
                    },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                    ],
                },
                AbstractBow: {
                    extends: 'AbstractTwoHandWeapon',
                    Base: { tag: ['bow', 'ranged', 'two_hand_weapon'] },
                    Weapon: { weapon_class: ['Bow'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractBow',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 5, id: 'bow' },
                        { primary: 32, id: 'ranged' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
                },
                AbstractFishingRod: {
                    extends: 'AbstractTwoHandWeapon',
                    Base: { remove_tag: ['weapon'], tag: ['fishing_rod'] },
                    Weapon: { weapon_class: ['FishingRod'] },
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:25:30 5:9999:20 6:9999:5'],
                    },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractFishingRod',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 24, id: 'twohand' },
                        { primary: 80, id: 'fishing_rod' },
                    ],
                },
                AbstractStaff: {
                    extends: 'AbstractTwoHandWeapon',
                    Base: { tag: ['staff', 'two_hand_weapon'] },
                    Weapon: { weapon_class: ['Staff'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractStaff',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 10, id: 'staff' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
                },
                Staff1: {
                    extends: 'AbstractStaff',
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractStaff',
                        'Staff1',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 10, id: 'staff' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
                },
                AbstractTwoHandAxe: {
                    extends: 'AbstractTwoHandWeapon',
                    Base: { tag: ['axe', 'two_hand_weapon'] },
                    Weapon: { weapon_class: ['TwoHandAxe'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandAxe',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 15, id: 'axe' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
                },
                AbstractTwoHandMace: {
                    extends: 'AbstractTwoHandWeapon',
                    Base: { tag: ['mace', 'two_hand_weapon'] },
                    Weapon: { weapon_class: ['TwoHandMace'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandMace',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 11, id: 'mace' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
                },
                AbstractTwoHandSword: {
                    extends: 'AbstractTwoHandWeapon',
                    Base: { tag: ['sword', 'two_hand_weapon'] },
                    Weapon: { weapon_class: ['TwoHandSword'] },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandSword',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 12, id: 'sword' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
                },
                TwoHandSword1: {
                    extends: 'AbstractTwoHandSword',
                    Sockets: {
                        socket_info: ['1:1:50 2:1:120 3:2:100 4:9999:30 5:9999:20 6:9999:5'],
                    },
                    inheritance: [
                        'Item',
                        'Equipment',
                        'AbstractWeapon',
                        'AbstractTwoHandWeapon',
                        'AbstractTwoHandSword',
                        'TwoHandSword1',
                    ],
                    tags: [
                        { primary: 0, id: 'default' },
                        { primary: 8, id: 'weapon' },
                        { primary: 24, id: 'twohand' },
                        { primary: 12, id: 'sword' },
                        { primary: 82, id: 'two_hand_weapon' },
                    ],
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
                        return undefined;
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
System.register("containers/item/atlasModifier", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    function atlasModifier(baseitem) {
        var has_elder_tag = baseitem.tags.find(function (_a) {
            var primary = _a.primary;
            return primary === Tag.elder_item;
        }) !==
            undefined;
        var has_shaper_tag = baseitem.tags.find(function (_a) {
            var primary = _a.primary;
            return primary === Tag.shaper_item;
        }) !==
            undefined;
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
    exports_15("default", atlasModifier);
    // generates the appropriate tags for {baseitem} with {modifier}
    function tagsWithModifier(baseitem, meta_data, modifier) {
        var tags = baseitem.tags;
        var with_none = tags.filter(function (tag) {
            return !tag.id.endsWith('_shaper') &&
                !tag.id.endsWith('_elder') &&
                tag.primary !== Tag.elder_item &&
                tag.primary !== Tag.shaper_item;
        });
        switch (modifier) {
            case AtlasModifier.NONE:
                return with_none;
            case AtlasModifier.ELDER:
                return with_none.concat(tagProps(Tag.elder_item), elderTag(meta_data));
            case AtlasModifier.SHAPER:
                return with_none.concat(tagProps(Tag.shaper_item), shaperTag(meta_data));
        }
    }
    exports_15("tagsWithModifier", tagsWithModifier);
    // {baseitem} specific elder tag
    function elderTag(meta_data) {
        try {
            return suffixedTag('elder', meta_data);
        }
        catch (err) {
            throw new Error("this item cannot have the elder tag (" + err.message + ")");
        }
    }
    exports_15("elderTag", elderTag);
    // {baseitem} specific shaperTag tag
    function shaperTag(meta_data) {
        try {
            return suffixedTag('shaper', meta_data);
        }
        catch (err) {
            throw new Error("this item cannot have the shaper tag (" + err.message + ")");
        }
    }
    exports_15("shaperTag", shaperTag);
    function tagProps(tag) {
        return {
            primary: tag,
            id: Tag[tag],
        };
    }
    exports_15("tagProps", tagProps);
    function suffixedTag(suffix, meta_data) {
        var tag_prefix = tagIdentifier(meta_data);
        var tag = Tag[tag_prefix + "_" + suffix];
        if (tag !== undefined) {
            return tagProps(tag);
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
    var AtlasModifier, Tag;
    return {
        setters: [],
        execute: function () {
            (function (AtlasModifier) {
                AtlasModifier[AtlasModifier["NONE"] = 0] = "NONE";
                AtlasModifier[AtlasModifier["ELDER"] = 1] = "ELDER";
                AtlasModifier[AtlasModifier["SHAPER"] = 2] = "SHAPER";
            })(AtlasModifier || (AtlasModifier = {}));
            exports_15("AtlasModifier", AtlasModifier);
            (function (Tag) {
                Tag[Tag["shaper_item"] = 246] = "shaper_item";
                Tag[Tag["elder_item"] = 247] = "elder_item";
                Tag[Tag["boots_shaper"] = 248] = "boots_shaper";
                Tag[Tag["boots_elder"] = 249] = "boots_elder";
                Tag[Tag["sword_shaper"] = 250] = "sword_shaper";
                Tag[Tag["sword_elder"] = 251] = "sword_elder";
                Tag[Tag["gloves_shaper"] = 252] = "gloves_shaper";
                Tag[Tag["gloves_elder"] = 253] = "gloves_elder";
                Tag[Tag["helmet_shaper"] = 254] = "helmet_shaper";
                Tag[Tag["helmet_elder"] = 255] = "helmet_elder";
                Tag[Tag["body_armour_shaper"] = 256] = "body_armour_shaper";
                Tag[Tag["body_armour_elder"] = 257] = "body_armour_elder";
                Tag[Tag["amulet_shaper"] = 258] = "amulet_shaper";
                Tag[Tag["amulet_elder"] = 259] = "amulet_elder";
                Tag[Tag["ring_shaper"] = 260] = "ring_shaper";
                Tag[Tag["ring_elder"] = 261] = "ring_elder";
                Tag[Tag["belt_shaper"] = 262] = "belt_shaper";
                Tag[Tag["belt_elder"] = 263] = "belt_elder";
                Tag[Tag["quiver_shaper"] = 264] = "quiver_shaper";
                Tag[Tag["quiver_elder"] = 265] = "quiver_elder";
                Tag[Tag["shield_shaper"] = 266] = "shield_shaper";
                Tag[Tag["shield_elder"] = 267] = "shield_elder";
                Tag[Tag["2h_sword_shaper"] = 268] = "2h_sword_shaper";
                Tag[Tag["2h_sword_elder"] = 269] = "2h_sword_elder";
                Tag[Tag["axe_shaper"] = 270] = "axe_shaper";
                Tag[Tag["axe_elder"] = 271] = "axe_elder";
                Tag[Tag["mace_shaper"] = 272] = "mace_shaper";
                Tag[Tag["mace_elder"] = 273] = "mace_elder";
                Tag[Tag["claw_shaper"] = 274] = "claw_shaper";
                Tag[Tag["claw_elder"] = 275] = "claw_elder";
                Tag[Tag["bow_shaper"] = 276] = "bow_shaper";
                Tag[Tag["bow_elder"] = 277] = "bow_elder";
                Tag[Tag["dagger_shaper"] = 278] = "dagger_shaper";
                Tag[Tag["dagger_elder"] = 279] = "dagger_elder";
                Tag[Tag["2h_axe_shaper"] = 280] = "2h_axe_shaper";
                Tag[Tag["2h_axe_elder"] = 281] = "2h_axe_elder";
                Tag[Tag["2h_mace_shaper"] = 282] = "2h_mace_shaper";
                Tag[Tag["2h_mace_elder"] = 283] = "2h_mace_elder";
                Tag[Tag["staff_shaper"] = 284] = "staff_shaper";
                Tag[Tag["staff_elder"] = 285] = "staff_elder";
                Tag[Tag["sceptre_shaper"] = 286] = "sceptre_shaper";
                Tag[Tag["sceptre_elder"] = 287] = "sceptre_elder";
                Tag[Tag["wand_shaper"] = 288] = "wand_shaper";
                Tag[Tag["wand_elder"] = 289] = "wand_elder";
            })(Tag || (Tag = {}));
            exports_15("Tag", Tag);
        }
    };
});
System.register("containers/item/Component", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("containers/ImmutableContainer", ["calculator/Stat"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var Stat_2, ImmutableContainer;
    return {
        setters: [
            function (Stat_2_1) {
                Stat_2 = Stat_2_1;
            }
        ],
        execute: function () {
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
                                mods: _this.mods.filter(function (mod) { return mod.props.primary !== other.props.primary; }),
                            });
                        });
                    }
                    else {
                        return this;
                    }
                };
                ImmutableContainer.prototype.indexOfModWithPrimary = function (primary) {
                    return this.mods.findIndex(function (mod) { return mod.props.primary === primary; });
                };
                ImmutableContainer.prototype.indexOfMod = function (mod) {
                    return this.indexOfModWithPrimary(mod.props.primary);
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
                    function (tag, i, tags) { return tags.findIndex(function (other) { return other.id === tag.id; }) === i; });
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
            exports_17("default", ImmutableContainer);
        }
    };
});
System.register("containers/item/components/Affixes", ["mods/index", "containers/ImmutableContainer"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
                    return this.indexOfModWithPrimary(mods_1.metaMods.LOCKED_PREFIXES) !== -1;
                };
                ItemAffixes.prototype.lockedSuffixes = function () {
                    return this.indexOfModWithPrimary(mods_1.metaMods.LOCKED_SUFFIXES) !== -1;
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
            exports_18("default", ItemAffixes);
        }
    };
});
System.register("containers/item/components/Sockets", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var ItemSockets;
    return {
        setters: [],
        execute: function () {
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
                    else if (tags.find(function (_a) {
                        var id = _a.id;
                        return id === 'small_staff';
                    }) !== undefined) {
                        return 3;
                    }
                    return undefined;
                };
                return ItemSockets;
            }());
            exports_19("default", ItemSockets);
        }
    };
});
System.register("containers/item/components/Name", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var ItemName;
    return {
        setters: [],
        execute: function () {
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
            exports_20("default", ItemName);
        }
    };
});
System.register("containers/item/components/Rarity", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
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
            exports_21("RarityKind", RarityKind);
            /**
             * mixin for Item
             *
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
            exports_21("default", ItemRarity);
        }
    };
});
System.register("containers/item/components/Implicits", ["mods/index", "containers/ImmutableContainer"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
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
            exports_22("default", Implicits);
        }
    };
});
System.register("containers/item/components/Requirements", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var ItemName;
    return {
        setters: [],
        execute: function () {
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
            exports_23("default", ItemName);
        }
    };
});
System.register("containers/item/components/properties/ComputedProperties", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("calculator/stat_applications", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
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
                    classification: [],
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
                    classification: [],
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
                    classification: [],
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
                    classification: [],
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
                    classification: [],
                    type: 'flat',
                },
                local_maximum_added_cold_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_maximum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_maximum_added_lightning_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_maximum_added_physical_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_minimum_added_chaos_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_minimum_added_cold_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_minimum_added_fire_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_minimum_added_lightning_damage: {
                    classification: [],
                    type: 'flat',
                },
                local_minimum_added_physical_damage: {
                    classification: [],
                    type: 'flat',
                },
                'local_physical_damage_+%': {
                    classification: [],
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
                    classification: [],
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
            exports_25("default", applications);
        }
    };
});
System.register("calculator/Value", ["calculator/ValueRange", "calculator/stat_applications"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
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
                    this.base =
                        range instanceof ValueRange_2.default ? range : new ValueRange_2.default(range[0], range[1]);
                    this.classification = classification;
                    this.modifiers = modifiers;
                }
                Value.prototype.augmentWith = function (stats) {
                    var _this = this;
                    return new Value(this.base, this.classification, this.modifiers.concat(stats.filter(function (stat) { return _this.augmentableBy(stat); }).map(function (stat) {
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
                        .reduce(function (sum, modifier) { return sum.add(modifier.stat.values); }, new ValueRange_2.default(0, 0));
                    var increases = this.modifiers
                        .filter(function (_a) {
                        var type = _a.type;
                        return type === 'inc';
                    })
                        .reduce(function (sum, modifier) { return sum.add(modifier.stat.values); }, new ValueRange_2.default(0, 0));
                    var more = this.modifiers
                        .filter(function (_a) {
                        var type = _a.type;
                        return type === 'more';
                    })
                        .reduce(function (sum, modifier) { return sum.mult(modifier.stat.values.percentToFactor()); }, new ValueRange_2.default(1, 1));
                    return this.base
                        .add(flat)
                        .mult(increases.percentToFactor())
                        .mult(more)
                        .map(function (n) { return poe_round(n, precision); });
                };
                return Value;
            }());
            exports_26("default", Value);
        }
    };
});
System.register("containers/item/components/properties/ArmourProperties", ["lodash", "calculator/Value"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    function build(item) {
        // FIXME: https://github.com/facebook/flow/issues/2383
        var component_armour = item.baseitem.component_armour;
        if (component_armour == null) {
            throw new Error('component_armour not set while attempting to build ArmourProperties');
        }
        var armour = component_armour.armour, evasion = component_armour.evasion, energy_shield = component_armour.energy_shield;
        var props = {
            armour: new Value_1.default([armour, armour], ['local', 'defences', 'armour']),
            evasion: new Value_1.default([evasion, evasion], ['local', 'defences', 'evasion']),
            energy_shield: new Value_1.default([energy_shield, energy_shield], ['local', 'defences', 'energy_shield']),
        };
        var stats = item.stats();
        // Flow false positive when using Object.values
        var stats_as_array = Object.values(stats).slice();
        var augmented_props = _.mapValues(props, function (value) {
            var augmented = value.augmentWith(stats_as_array).compute();
            return {
                type: augmented === value.base ? 'simple' : 'augmented',
                values: augmented.asTuple(),
            };
        });
        return augmented_props;
    }
    exports_27("default", build);
    var _, Value_1;
    return {
        setters: [
            function (_1) {
                _ = _1;
            },
            function (Value_1_1) {
                Value_1 = Value_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("containers/item/components/properties/ItemProperties", ["containers/item/components/properties/ArmourProperties"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    function getPropertyBulder(item) {
        if (item.meta_data.isA('AbstractArmour')) {
            return ArmourProperties_1.default;
        }
        else {
            return undefined;
        }
    }
    var ArmourProperties_1, ItemProperties;
    return {
        setters: [
            function (ArmourProperties_1_1) {
                ArmourProperties_1 = ArmourProperties_1_1;
            }
        ],
        execute: function () {
            ItemProperties = /** @class */ (function () {
                // eslint-disable-next-line no-unused-vars
                function ItemProperties(item, builder) {
                    this.parent = item;
                }
                ItemProperties.prototype.builder = function () {
                    return null;
                };
                ItemProperties.prototype.list = function () {
                    var build = getPropertyBulder(this.parent);
                    if (build == null) {
                        return {};
                    }
                    else {
                        return build(this.parent);
                    }
                };
                ItemProperties.prototype.any = function () {
                    return getPropertyBulder(this.parent) != null;
                };
                return ItemProperties;
            }());
            exports_28("default", ItemProperties);
        }
    };
});
System.register("containers/item/Item", ["make-error", "mods/index", "util/MetaData", "containers/item/atlasModifier", "containers/item/components/Affixes", "containers/item/components/Sockets", "containers/item/components/Name", "containers/item/components/Rarity", "containers/item/components/Implicits", "containers/item/components/Requirements", "containers/item/components/properties/ItemProperties"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var make_error_1, mods_3, MetaData_2, atlasModifier_1, Affixes_1, Sockets_1, Name_1, Rarity_1, Implicits_1, Requirements_1, ItemProperties_1, UnacceptedMod, shallowEqual, Item;
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
            function (ItemProperties_1_1) {
                ItemProperties_1 = ItemProperties_1_1;
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
            exports_29("UnacceptedMod", UnacceptedMod);
            shallowEqual = function (a, b) {
                return a === b || Object.keys(a).every(function (key) { return a[key] === b[key]; });
            };
            Item = /** @class */ (function () {
                function Item(builder) {
                    this.baseitem = builder.baseitem;
                    this.props = builder.props;
                    this.meta_data = builder.meta_data;
                    // components
                    this.name = new Name_1.default(this, builder.name);
                    this.properties = new ItemProperties_1.default(this, builder.properties);
                    this.rarity = new Rarity_1.default(this, builder.rarity);
                    this.requirements = new Requirements_1.default(this, builder.requirements);
                    this.sockets = new Sockets_1.default(this, builder.sockets);
                    this.affixes = new Affixes_1.default(this, builder.affixes);
                    this.implicits = new Implicits_1.default(this, builder.implicits);
                }
                Item.build = function (baseitem) {
                    var clazz = String(baseitem.inherits_from.split(/[\\/]/).pop());
                    var meta_data = MetaData_2.default.build(clazz);
                    if (meta_data == null) {
                        throw new Error("meta_data for " + clazz + " not found");
                    }
                    var implicits = baseitem.implicit_mods.map(function (mod_props) { return new mods_3.Mod(mod_props); });
                    return new Item({
                        affixes: [],
                        baseitem: baseitem,
                        implicits: implicits,
                        meta_data: meta_data,
                        name: 'Random Name',
                        props: {
                            // more like misc
                            atlas_modifier: atlasModifier_1.default(baseitem),
                            corrupted: false,
                            item_level: 100,
                            mirrored: false,
                        },
                        properties: null,
                        rarity: Rarity_1.RarityKind.normal,
                        requirements: baseitem.component_attribute_requirement,
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
                Item.prototype.indexOfModWithPrimary = function (primary) {
                    var affix_index = this.affixes.indexOfModWithPrimary(primary);
                    var implicit_index = this.implicits.indexOfModWithPrimary(primary);
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
                Item.prototype.corrupt = function () {
                    if (this.props.corrupted) {
                        throw new Error('invalid state: is already corrupted');
                    }
                    else {
                        return this.setProperty('corrupted', true);
                    }
                };
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
                // returns an item that can have elder mods
                // this does not remove existing shaper mods
                Item.prototype.asElderItem = function () {
                    return this.asAtlasModifier(atlasModifier_1.AtlasModifier.ELDER);
                };
                Item.prototype.isSHaperItem = function () {
                    return this.props.atlas_modifier === atlasModifier_1.AtlasModifier.SHAPER;
                };
                // returns an item that can have shper mods
                // this does not remove existing elder mods
                Item.prototype.asShaperItem = function () {
                    return this.asAtlasModifier(atlasModifier_1.AtlasModifier.SHAPER);
                };
                // returns an item that cant have elder or shaper mods
                // this does not remove existing elder or shaper mods
                Item.prototype.removeAtlasModifier = function () {
                    return this.asAtlasModifier(atlasModifier_1.AtlasModifier.NONE);
                };
                // End state
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
            exports_29("default", Item);
        }
    };
});
System.register("containers/item/index", ["containers/item/Item"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var Item_1;
    return {
        setters: [
            function (Item_1_1) {
                Item_1 = Item_1_1;
            }
        ],
        execute: function () {
            exports_30("default", Item_1.default);
        }
    };
});
System.register("util/rng", ["lodash"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    function random(min, max) {
        return _.random(min, max);
    }
    exports_31("random", random);
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
    exports_31("choose", choose);
    var _;
    return {
        setters: [
            function (_2) {
                _ = _2;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/Orb", ["mods/index", "util/Flags", "util/rng", "generators/Generator"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
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
             */
            Orb = /** @class */ (function (_super) {
                __extends(Orb, _super);
                function Orb() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Orb.modFilter = function (mod) {
                    return mod.spawn_weights.length > 0;
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
            exports_32("default", Orb);
        }
    };
});
System.register("generators/item_orbs/ItemOrb", ["generators/Orb"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
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
            exports_33("default", ItemOrb);
        }
    };
});
System.register("generators/item_orbs/Transmute", ["util/Flags", "generators/item_orbs/ItemOrb", "mods/Mod"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
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
            exports_34("default", Transmute);
        }
    };
});
System.register("generators/item_orbs/Alchemy", ["lodash", "util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var _, Flags_5, ItemOrb_2, Transmute_1, Alchemy;
    return {
        setters: [
            function (_3) {
                _ = _3;
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
                Alchemy.prototype.applyTo = function (item) {
                    if (!Flags_5.anySet(this.applicableTo(item))) {
                        // upgrade to rare
                        var alched_item = item.rarity.set('rare');
                        var new_mods = _.random(4, 6);
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
            exports_35("default", Alchemy);
        }
    };
});
System.register("generators/item_orbs/Augment", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
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
            exports_36("default", Augment);
        }
    };
});
System.register("generators/item_orbs/Scouring", ["util/Flags", "generators/item_orbs/ItemOrb"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
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
                Scouring.prototype.applyTo = function (other) {
                    if (!Flags_7.anySet(this.applicableTo(other))) {
                        var scoured_item = other;
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
            exports_37("default", Scouring);
        }
    };
});
System.register("generators/item_orbs/Alteration", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Augment", "generators/item_orbs/Scouring", "generators/item_orbs/Transmute"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
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
            exports_38("default", Alteration);
        }
    };
});
System.register("generators/item_orbs/Annulment", ["lodash", "util/Flags", "generators/item_orbs/ItemOrb"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var _, Flags_9, ItemOrb_6, Annulment;
    return {
        setters: [
            function (_4) {
                _ = _4;
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
            exports_39("default", Annulment);
        }
    };
});
System.register("generators/item_orbs/Exalted", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
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
            exports_40("default", Exalted);
        }
    };
});
System.register("generators/item_orbs/Chaos", ["lodash", "util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Alchemy", "generators/item_orbs/Exalted", "generators/item_orbs/Scouring", "generators/item_orbs/Transmute"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
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
            exports_41("default", Chaos);
        }
    };
});
System.register("generators/item_orbs/EnchantmentBench", ["util/Flags", "mods/Mod", "generators/item_orbs/ItemOrb"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
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
            exports_42("default", Enchantmentbench);
        }
    };
});
System.register("generators/item_orbs/Regal", ["util/Flags", "generators/item_orbs/ItemOrb", "generators/item_orbs/Transmute"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var Flags_13, ItemOrb_10, Transmute_6, Regal;
    return {
        setters: [
            function (Flags_13_1) {
                Flags_13 = Flags_13_1;
            },
            function (ItemOrb_10_1) {
                ItemOrb_10 = ItemOrb_10_1;
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
                    if (!Flags_13.anySet(this.applicableTo(item))) {
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
            }(ItemOrb_10.default));
            exports_43("default", Regal);
        }
    };
});
System.register("generators/item_orbs/Talisman", ["generators/item_orbs/ItemOrb"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var ItemOrb_11, Talisman;
    return {
        setters: [
            function (ItemOrb_11_1) {
                ItemOrb_11 = ItemOrb_11_1;
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
            }(ItemOrb_11.default));
            exports_44("default", Talisman);
        }
    };
});
System.register("generators/item_orbs/Vaal", ["util/Flags", "mods/Mod", "generators/item_orbs/ItemOrb"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var Flags_14, Mod_4, ItemOrb_12, Vaal;
    return {
        setters: [
            function (Flags_14_1) {
                Flags_14 = Flags_14_1;
            },
            function (Mod_4_1) {
                Mod_4 = Mod_4_1;
            },
            function (ItemOrb_12_1) {
                ItemOrb_12 = ItemOrb_12_1;
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
                        [Mod_4.default.TYPE.VAAL].indexOf(mod.generation_type) !== -1);
                };
                Vaal.build = function (mods) {
                    return new Vaal(this.buildMods(mods));
                };
                /**
                 * replaces implicit with vaal implicit
                 * TODO: white sockets, reroll (brick(, nothing
                 */
                Vaal.prototype.applyTo = function (item) {
                    if (!Flags_14.anySet(this.applicableTo(item))) {
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
            }(ItemOrb_12.default));
            exports_45("default", Vaal);
        }
    };
});
System.register("generators/item_orbs/index", ["generators/item_orbs/Alchemy", "generators/item_orbs/Alteration", "generators/item_orbs/Annulment", "generators/item_orbs/Augment", "generators/item_orbs/Chaos", "generators/item_orbs/EnchantmentBench", "generators/item_orbs/Exalted", "generators/item_orbs/ItemOrb", "generators/item_orbs/Regal", "generators/item_orbs/Scouring", "generators/item_orbs/Talisman", "generators/item_orbs/Transmute", "generators/item_orbs/Vaal"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [
            function (Alchemy_2_1) {
                exports_46({
                    "Alchemy": Alchemy_2_1["default"]
                });
            },
            function (Alteration_1_1) {
                exports_46({
                    "Alteration": Alteration_1_1["default"]
                });
            },
            function (Annulment_1_1) {
                exports_46({
                    "Annulment": Annulment_1_1["default"]
                });
            },
            function (Augment_2_1) {
                exports_46({
                    "Augment": Augment_2_1["default"]
                });
            },
            function (Chaos_1_1) {
                exports_46({
                    "Chaos": Chaos_1_1["default"]
                });
            },
            function (EnchantmentBench_1_1) {
                exports_46({
                    "EnchantmentBench": EnchantmentBench_1_1["default"]
                });
            },
            function (Exalted_2_1) {
                exports_46({
                    "Exalted": Exalted_2_1["default"]
                });
            },
            function (ItemOrb_13_1) {
                exports_46({
                    "ItemOrb": ItemOrb_13_1["default"]
                });
            },
            function (Regal_1_1) {
                exports_46({
                    "Regal": Regal_1_1["default"]
                });
            },
            function (Scouring_3_1) {
                exports_46({
                    "Scouring": Scouring_3_1["default"]
                });
            },
            function (Talisman_1_1) {
                exports_46({
                    "Talisman": Talisman_1_1["default"]
                });
            },
            function (Transmute_7_1) {
                exports_46({
                    "Transmute": Transmute_7_1["default"]
                });
            },
            function (Vaal_1_1) {
                exports_46({
                    "Vaal": Vaal_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/MasterBenchOption", ["util/Flags", "util/ts", "mods/index", "generators/Generator"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var Flags_15, ts_2, mods_5, Generator_2, MasterBenchOption;
    return {
        setters: [
            function (Flags_15_1) {
                Flags_15 = Flags_15_1;
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
                        item_classes.find(function (item_class) { return item_class.primary === item.baseitem.item_class.primary; }) === undefined;
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
                        if (Flags_15.anySet(applicable_flags, whitelist)) {
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
                    var has_no_multi_mod = master_mods.find(function (other) { return other.props.primary === mods_5.metaMods.MULTIMOD; }) ===
                        undefined;
                    if (master_mods.length > 0 && has_no_multi_mod) {
                        applicable_flags.no_multimod = true;
                    }
                    return applicable_flags;
                };
                return MasterBenchOption;
            }(Generator_2.default));
            exports_47("default", MasterBenchOption);
        }
    };
});
System.register("helpers/MasterBench", ["generators/MasterBenchOption"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
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
            exports_48("default", MasterBench);
        }
    };
});
System.register("generators/ItemShowcase", ["helpers/MasterBench", "generators/Generator", "generators/item_orbs/Alchemy", "generators/item_orbs/EnchantmentBench", "generators/item_orbs/Vaal"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var MasterBench_1, Generator_3, Alchemy_3, EnchantmentBench_2, Vaal_2, ItemShowcase;
    return {
        setters: [
            function (MasterBench_1_1) {
                MasterBench_1 = MasterBench_1_1;
            },
            function (Generator_3_1) {
                Generator_3 = Generator_3_1;
            },
            function (Alchemy_3_1) {
                Alchemy_3 = Alchemy_3_1;
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
                    var explicits = Alchemy_3.default.build(props);
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
                        applicable: false,
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
            exports_49("default", ItemShowcase);
        }
    };
});
System.register("containers/AtlasNode", ["mods/Mod", "containers/ImmutableContainer"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var Mod_5, ImmutableContainer_3, SEXTANT_RANGE, AtlasNode;
    return {
        setters: [
            function (Mod_5_1) {
                Mod_5 = Mod_5_1;
            },
            function (ImmutableContainer_3_1) {
                ImmutableContainer_3 = ImmutableContainer_3_1;
            }
        ],
        execute: function () {
            exports_50("SEXTANT_RANGE", SEXTANT_RANGE = 55); // http://poecraft.com/atlas has 55
            AtlasNode = /** @class */ (function (_super) {
                __extends(AtlasNode, _super);
                function AtlasNode(mods, props) {
                    var _this = _super.call(this, mods) || this;
                    _this.props = props;
                    return _this;
                }
                AtlasNode.humanId = function (props) {
                    return props.world_area.id.replace(/MapAtlas/, '');
                };
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
                    function (tag, i, tags) { return tags.findIndex(function (other) { return other.id === tag.id; }) === i; });
                };
                AtlasNode.prototype.maxModsOfType = function () {
                    return Number.POSITIVE_INFINITY;
                };
                AtlasNode.prototype.inDomainOf = function (mod_domain) {
                    return mod_domain === Mod_5.default.DOMAIN.ATLAS;
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
                AtlasNode.prototype.humanId = function () {
                    return AtlasNode.humanId(this.props);
                };
                return AtlasNode;
            }(ImmutableContainer_3.default));
            exports_50("default", AtlasNode);
        }
    };
});
System.register("generators/Sextant", ["make-error", "mods/Mod", "util/Flags", "generators/Orb"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var make_error_2, Mod_6, Flags_16, Orb_2, ContextUndefined, CorruptedState, Type, Sextant;
    return {
        setters: [
            function (make_error_2_1) {
                make_error_2 = make_error_2_1;
            },
            function (Mod_6_1) {
                Mod_6 = Mod_6_1;
            },
            function (Flags_16_1) {
                Flags_16 = Flags_16_1;
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
            exports_51("ContextUndefined", ContextUndefined);
            CorruptedState = /** @class */ (function (_super) {
                __extends(CorruptedState, _super);
                function CorruptedState(message) {
                    return _super.call(this, "corrupted state: " + message) || this;
                }
                return CorruptedState;
            }(make_error_2.BaseError));
            exports_51("CorruptedState", CorruptedState);
            (function (Type) {
                Type[Type["apprentice"] = 1] = "apprentice";
                Type[Type["journeyman"] = 2] = "journeyman";
                Type[Type["master"] = 3] = "master";
            })(Type || (Type = {}));
            exports_51("Type", Type);
            Sextant = /** @class */ (function (_super) {
                __extends(Sextant, _super);
                function Sextant() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.type = Type.master;
                    return _this;
                }
                Sextant.modFilter = function (mod) {
                    return _super.modFilter.call(this, mod) && mod.domain === Mod_6.default.DOMAIN.ATLAS;
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
                    if (!Flags_16.anySet(this.applicableTo(node))) {
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
            exports_51("default", Sextant);
        }
    };
});
System.register("generators/index", ["generators/item_orbs/index", "generators/ItemShowcase", "generators/MasterBenchOption", "generators/Sextant"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [
            function (_5_1) {
                exports_52({
                    "Alchemy": _5_1["Alchemy"],
                    "Annulment": _5_1["Annulment"],
                    "Alteration": _5_1["Alteration"],
                    "Augment": _5_1["Augment"],
                    "Chaos": _5_1["Chaos"],
                    "EnchantmentBench": _5_1["EnchantmentBench"],
                    "Exalted": _5_1["Exalted"],
                    "Regal": _5_1["Regal"],
                    "Scouring": _5_1["Scouring"],
                    "Talisman": _5_1["Talisman"],
                    "Transmute": _5_1["Transmute"],
                    "Vaal": _5_1["Vaal"]
                });
            },
            function (ItemShowcase_1_1) {
                exports_52({
                    "ItemShowcase": ItemShowcase_1_1["default"]
                });
            },
            function (MasterBenchOption_2_1) {
                exports_52({
                    "MasterBenchOption": MasterBenchOption_2_1["default"]
                });
            },
            function (Sextant_1_1) {
                exports_52({
                    "Sextant": Sextant_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("containers/index", ["containers/AtlasNode", "containers/ImmutableContainer", "containers/item/index"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    return {
        setters: [
            function (AtlasNode_1_1) {
                exports_53({
                    "AtlasNode": AtlasNode_1_1["default"]
                });
            },
            function (ImmutableContainer_4_1) {
                exports_53({
                    "ImmutableContainer": ImmutableContainer_4_1["default"]
                });
            },
            function (item_1_1) {
                exports_53({
                    "Item": item_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("helpers/Atlas", ["containers/AtlasNode", "generators/Sextant"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
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
                        return nodes.set(AtlasNode_2.default.humanId(props), new AtlasNode_2.default([], props));
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
                Atlas.prototype.get = function (id) {
                    var node = this.nodes.get(id);
                    if (node == null) {
                        throw new Error("IndexError: '" + id + "' not found");
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
                Atlas.prototype.addMod = function (mod, node_id) {
                    return this.mutateNode(node_id, function (node) { return node.addMod(mod); });
                };
                Atlas.prototype.removeMod = function (mod, node_id) {
                    return this.mutateNode(node_id, function (node) { return node.removeMod(mod); });
                };
                Atlas.prototype.mutateNode = function (node_id, mutate) {
                    var target = this.get(node_id);
                    var mutated = mutate(target);
                    if (target === mutated) {
                        return this;
                    }
                    else {
                        return this.withMutations(function (_a) {
                            var nodes = _a.nodes, builder = __rest(_a, ["nodes"]);
                            return __assign({}, builder, { nodes: new Map(nodes).set(node_id, mutated) });
                        });
                    }
                };
                Atlas.prototype.applySextant = function (sextant, node_id) {
                    var sextant_on_atlas = this.prepareSextant(sextant);
                    return this.mutateNode(node_id, function (node) { return sextant_on_atlas.applyTo(node); });
                };
                Atlas.prototype.modsFor = function (sextant, node_id) {
                    var sextant_on_atlas = this.prepareSextant(sextant);
                    return sextant_on_atlas.modsFor(this.get(node_id));
                };
                Atlas.prototype.blockedMods = function (node_id) {
                    var target = this.get(node_id);
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
            exports_54("default", Atlas);
        }
    };
});
System.register("interfaces/Builder", [], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/Buildable", [], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/index", [], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("helpers/PropsTable", ["make-error"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
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
            exports_58("NotFound", NotFound);
            // take care. flow accepts any as a constructor
            PropsTable = /** @class */ (function () {
                function PropsTable(all, constructor) {
                    this.builder = constructor;
                    this.table = all;
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
                    return this.builder.build(props);
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
            exports_58("default", PropsTable);
        }
    };
});
System.register("helpers/createTables", ["containers/AtlasNode", "containers/item/Item", "generators/MasterBenchOption", "mods/Mod", "helpers/PropsTable"], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    function createTable(props, constructor) {
        return new PropsTable_1.default(props, constructor);
    }
    var AtlasNode_3, Item_2, MasterBenchOption_3, Mod_7, PropsTable_1, createAtlasNodes, createItems, createMasterBenchOptions, createMods;
    return {
        setters: [
            function (AtlasNode_3_1) {
                AtlasNode_3 = AtlasNode_3_1;
            },
            function (Item_2_1) {
                Item_2 = Item_2_1;
            },
            function (MasterBenchOption_3_1) {
                MasterBenchOption_3 = MasterBenchOption_3_1;
            },
            function (Mod_7_1) {
                Mod_7 = Mod_7_1;
            },
            function (PropsTable_1_1) {
                PropsTable_1 = PropsTable_1_1;
            }
        ],
        execute: function () {
            exports_59("createAtlasNodes", createAtlasNodes = function (props) {
                return createTable(props, AtlasNode_3.default);
            });
            exports_59("createItems", createItems = function (props) {
                return createTable(props, Item_2.default);
            });
            exports_59("createMasterBenchOptions", createMasterBenchOptions = function (props) {
                return createTable(props, MasterBenchOption_3.default);
            });
            exports_59("createMods", createMods = function (props) {
                return createTable(props, Mod_7.default);
            });
        }
    };
});
System.register("index", ["calculator/Stat", "calculator/ValueRange", "generators/Generator", "generators/index", "containers/index", "mods/index", "helpers/Atlas", "helpers/MasterBench", "helpers/createTables", "util/index"], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [
            function (Stat_3_1) {
                exports_60({
                    "Stat": Stat_3_1["default"]
                });
            },
            function (ValueRange_3_1) {
                exports_60({
                    "ValueRange": ValueRange_3_1["default"]
                });
            },
            function (Generator_4_1) {
                exports_60({
                    "Generator": Generator_4_1["default"]
                });
            },
            function (index_1_1) {
                exports_60({
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
                exports_60({
                    "AtlasNode": containers_1_1["AtlasNode"],
                    "Item": containers_1_1["Item"]
                });
            },
            function (mods_6_1) {
                exports_60({
                    "Mod": mods_6_1["Mod"]
                });
            },
            function (Atlas_1_1) {
                exports_60({
                    "Atlas": Atlas_1_1["default"]
                });
            },
            function (MasterBench_2_1) {
                exports_60({
                    "MasterBench": MasterBench_2_1["default"]
                });
            },
            function (createTables_1_1) {
                exports_60({
                    "createAtlasNodes": createTables_1_1["createAtlasNodes"],
                    "createItems": createTables_1_1["createItems"],
                    "createMasterBenchOptions": createTables_1_1["createMasterBenchOptions"],
                    "createMods": createTables_1_1["createMods"]
                });
            },
            function (util_1_1) {
                exports_60({
                    "anySet": util_1_1["anySet"]
                });
            }
        ],
        execute: function () {
        }
    };
});
