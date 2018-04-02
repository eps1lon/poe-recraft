declare module "schema" {
    export type Tag = string;
    export interface ModTypeProps {
        primary: number;
    }
    export interface SpawnWeightProps {
        value: number;
        tag: Tag;
    }
    export interface StatProps {
        id: string;
    }
    export interface ModProps {
        id: string;
        level: number;
        domain: number;
        name: string;
        correct_group: string;
        generation_type: number;
        stat1_min: number;
        stat1_max: number;
        stat2_min: number;
        stat2_max: number;
        stat3_min: number;
        stat3_max: number;
        stat4_min: number;
        stat4_max: number;
        stat5_min: number;
        stat5_max: number;
        mod_type: ModTypeProps;
        spawn_weights: SpawnWeightProps[];
        stats: StatProps[];
        tags: Tag[];
    }
    export interface WeaponTypeProps {
        critical: number;
        speed: number;
        damage_min: number;
        damage_max: number;
        range_max: number;
    }
    export interface AttributeRequirementProps {
        req_str: number;
        req_dex: number;
        req_int: number;
    }
    export interface ArmourProps {
        armour: number;
        evasion: number;
        energy_shield: number;
    }
    export interface ShieldTypeProps {
        block: number;
    }
    export interface BaseItemTypeProps {
        id: string;
        name: string;
        width: number;
        height: number;
        drop_level: number;
        inherits_from: string;
        weapon_type?: WeaponTypeProps;
        component_attribute_requirement?: AttributeRequirementProps;
        component_armour?: ArmourProps;
        shield_type?: ShieldTypeProps;
        implicit_mods: ModProps[];
        item_class: string;
        tags: Tag[];
    }
    export interface CraftingBenchOptionsProps {
        primary: number;
        master_level: number;
        name: string;
        crafting_bench_custom_action: number;
        sockets: number;
        socket_colours: string;
        links: number;
        item_quantity: number;
        npc_master_key: number;
        mods_key?: number;
        npc_master: {
            row: number;
            npc: {
                name: string;
                short_name: string;
            };
        };
        costs: Array<{
            amount: number;
            base_item_type: BaseItemTypeProps;
        }>;
        mod?: ModProps;
        item_classes: string[];
    }
    export interface WorldAreaProps {
        id: string;
        name: string;
        area_level: number;
        tags: Tag[];
        area_type_tags: Tag[];
        mods: ModProps[];
    }
    export interface AtlasNodeProps {
        primary: number;
        x: number;
        y: number;
        adjacent: number[];
        world_area: WorldAreaProps;
    }
    export interface EssenceProps {
        primary: number;
        tier: number;
        base_item_type: BaseItemTypeProps;
        essence_type: {
            id: string;
            essence_type: number;
            is_corrupted_essence: boolean;
        };
        item_level_restriction: number;
        quiver_mod?: ModProps;
        amulet_mod?: ModProps;
        ring_mod?: ModProps;
        belt_mod?: ModProps;
        shield_mod?: ModProps;
        helmet_mod?: ModProps;
        body_armour_mod?: ModProps;
        boots_mod?: ModProps;
        gloves_mod?: ModProps;
        bow_mod?: ModProps;
        wand_mod?: ModProps;
        staff_mod?: ModProps;
        two_hand_sword_mod?: ModProps;
        two_hand_axe_mod?: ModProps;
        two_hand_mace_mod?: ModProps;
        claw_mod?: ModProps;
        dagger_mod?: ModProps;
        one_hand_sword_mod?: ModProps;
        one_hand_thrusting_sword_mod?: ModProps;
        one_hand_axe_mod?: ModProps;
        one_hand_mace_mod?: ModProps;
        sceptre_mod?: ModProps;
    }
}
declare module "calculator/ValueRange" {
    export type ValueRangeLike = ValueRange | number | [number, number];
    export default class ValueRange {
        static zero: ValueRange;
        static one: ValueRange;
        static isZero(value: ValueRangeLike): boolean;
        min: number;
        max: number;
        constructor(range: ValueRangeLike);
        add(other: ValueRangeLike): ValueRange;
        mult(other: ValueRangeLike): ValueRange;
        map(mapFn: (n: number) => number): ValueRange;
        isAddIdentity(): boolean;
        isMultIdentity(): boolean;
        /**
         * +29% => 1.29
         */
        percentToFactor(): ValueRange;
        asTuple(): [number, number];
        valueOf(): number | [number, number];
    }
}
declare module "calculator/Stat" {
    import { StatProps } from "schema";
    import ValueRange from "calculator/ValueRange";
    export default class Stat {
        props: StatProps;
        values: ValueRange;
        constructor(props: StatProps, values?: [number, number] | ValueRange);
        add(other: ValueRange): Stat;
        mult(other: ValueRange): Stat;
    }
}
declare module "interfaces/Taggable" {
    import { Tag } from "schema";
    export interface Taggable {
        getTags(): Tag[];
    }
}
declare module "util/ts" {
    export function isKeyOf<T>(key: any, obj: T): key is keyof T;
    export function filterUndefined<T>(item: T | undefined | null): item is T;
}
declare module "mods/Mod" {
    import { Taggable } from "interfaces/Taggable";
    import { ModProps, SpawnWeightProps, StatProps } from "schema";
    import Stat from "calculator/Stat";
    export default class Mod {
        static DOMAIN: {
            ITEM: number;
            FLASK: number;
            MONSTER: number;
            STRONGBOX: number;
            MAP: number;
            STANCE: number;
            MASTER: number;
            JEWEL: number;
            ATLAS: number;
            ABYSS_JEWEL: number;
        };
        static TYPE: {
            [key: string]: number;
        };
        static build(props: ModProps): Mod;
        readonly props: ModProps;
        constructor(props: ModProps);
        isType(type: string): boolean;
        isPrefix(): boolean;
        isSuffix(): boolean;
        isEnchantment(): boolean;
        isPremade(): boolean;
        isAffix(): boolean;
        isMasterMod(): boolean;
        implicitCandidate(): boolean;
        statsJoined(): Stat[];
        /**
         * string identifier of the generation type
         */
        modType(): string | undefined;
        requiredLevel(): number;
        spawnweightPropsFor(other: Taggable): SpawnWeightProps | undefined;
        spawnweightFor(other: Taggable): number;
        nthStat(stat_props: StatProps, n: number): Stat;
    }
}
declare module "containers/Container" {
    import { Taggable } from "interfaces/Taggable";
    import Mod from "mods/Mod";
    import Stat from "calculator/Stat";
    /**
     * a Container in poe-mods is a container of Mods
     */
    export default interface Container<T extends Mod> extends Taggable {
        mods: ReadonlyArray<T>;
        addMod(mod: T): this;
        removeMod(mod: T): this;
        removeAllMods(): this;
        hasMod(mod: T): boolean;
        /**
         * already has a mod of this group?
         * @param mod
         */
        hasModGroup(mod: T): boolean;
        /**
         * will addMod actually add this mod
         * @param mod
         */
        hasRoomFor(mod: T): boolean;
        /**
         * does this container have any displayable properties?
         */
        any(): boolean;
        indexOfModWithId(id: string): number;
        maxModsOfType(mod: T): number;
        inDomainOf(domain: number): boolean;
        level(): number;
        stats(): {
            [key: string]: Stat;
        };
        asArray(): T[];
    }
}
declare module "mods/meta_mods" {
    const _default: Readonly<{
        LOCKED_PREFIXES: string;
        LOCKED_SUFFIXES: string;
        NO_ATTACK_MODS: string;
        NO_CASTER_MODS: string;
        MULTIMOD: string;
        LLD_MOD: string;
    }>;
    export default _default;
}
declare module "util/Flags" {
    export interface Flags {
        [key: string]: boolean;
    }
    export const anySet: (flags: Flags, whitelist?: any[]) => boolean;
}
declare module "generators/Generator" {
    import Container from "containers/Container";
    import Mod from "mods/Mod";
    import { Flags } from "util/Flags";
    export interface GeneratorDetails<M extends Mod> {
        mod: M;
        applicable?: Flags;
        spawnable?: Flags;
        spawnweight?: number;
    }
    export interface ModApplicableFlags extends Flags {
        domain_full: boolean;
        already_present: boolean;
        wrong_domain: boolean;
        lower_ilvl: boolean;
        above_lld_level: boolean;
    }
    export type ModApplicableFlag = keyof ModApplicableFlags;
    /**
     * @abstract
     */
    export default abstract class Generator<M extends Mod, C extends Container<any>> {
        mods: M[];
        constructor(mods: M[]);
        abstract applyTo(container: C): C;
        abstract modsFor(container: C, whitelist: string[]): Array<GeneratorDetails<M>>;
        abstract applicableTo(container: C): Flags;
        /**
         * returns a copy of #mods
         *
         * we can stick with a shallow copy since Mod are supposed to be immutable
         */
        getAvailableMods(): M[];
        isApplicableTo(container: C, whitelist?: string[]): boolean;
        isModApplicableTo(mod: M, container: C): ModApplicableFlags;
    }
}
declare module "util/meta_data" {
    import { MetaDataMap } from "util/MetaData";
    const _default: MetaDataMap;
    export default _default;
}
declare module "util/MetaData" {
    import { Tag } from "schema";
    export interface MetaDataProps {
        extends: string;
        inheritance: string[];
        tags: Tag[];
        AttributeRequirements?: {
            dexterity_requirement: string[];
            intelligence_requirement: string[];
            strength_requirement: string[];
        } | {};
        Base?: {
            tag?: string[];
            x_size?: string[];
            y_size?: string[];
        };
        Quality?: {
            max_quality: string[];
        };
        Sockets?: {
            socket_info: string[];
        };
        Usable?: {
            action: string[];
            use_type: string[];
        } | {};
        Weapon?: {
            accuracy_rating?: string[];
            critical_chance?: string[];
            minimum_attack_distance?: string[];
            maximum_attack_distance?: string[];
            minimum_damage?: string[];
            maximum_damage?: string[];
            weapon_speed?: string[];
            weapon_class?: string[];
        };
    }
    export interface MetaDataMap {
        [key: string]: MetaDataProps;
    }
    /**
     * class Metadata
     *
     * representation of a .ot file in METADATA
     */
    export default class MetaData {
        static build(clazz: string): MetaData;
        clazz: string;
        props: MetaDataProps;
        constructor(clazz: string, props: MetaDataProps);
        isA(other: string): boolean;
    }
}
declare module "util/index" {
    export { Flags, anySet } from "util/Flags";
    export { default as MetaData } from "util/MetaData";
}
declare module "mods/index" {
    export { default as metaMods } from "mods/meta_mods";
    export { default as Mod } from "mods/Mod";
}
declare module "calculator/stat_applications" {
    export interface Application {
        classification: Array<string | string[]>;
        type: 'flat' | 'inc' | 'more';
    }
    const applications: {
        [key: string]: Application;
    };
    export default applications;
}
declare module "calculator/Value" {
    import Stat from "calculator/Stat";
    import ValueRange from "calculator/ValueRange";
    export type Classification = ReadonlyArray<string>;
    export interface Modifier {
        stat: Stat;
        type: 'flat' | 'inc' | 'more';
    }
    export default class Value {
        classification: Classification;
        modifiers: ReadonlyArray<Modifier>;
        range: ValueRange;
        /**
         * if the value change since init
         */
        augmented: boolean;
        constructor(range: [number, number] | ValueRange, classification?: Classification, modifiers?: Modifier[]);
        readonly value: number | [number, number];
        augmentWith(stats: Stat[]): Value;
        augmentableBy(stat: Stat): boolean;
        /**
         * calculates the final ValueRange from all the applied modifers
         *
         * in PoE all increase modifers get summed up to one big more modifier
         */
        compute(precision?: number): Value;
    }
}
declare module "containers/item/atlasModifier" {
    import { Tag } from "schema";
    import MetaData from "util/MetaData";
    export enum AtlasModifier {
        NONE = "",
        ELDER = "elder_item",
        SHAPER = "shaper_item",
    }
    export enum AtlasModifierTag {
        'shaper_item' = 0,
        'elder_item' = 1,
        'boots_shaper' = 2,
        'boots_elder' = 3,
        'sword_shaper' = 4,
        'sword_elder' = 5,
        'gloves_shaper' = 6,
        'gloves_elder' = 7,
        'helmet_shaper' = 8,
        'helmet_elder' = 9,
        'body_armour_shaper' = 10,
        'body_armour_elder' = 11,
        'amulet_shaper' = 12,
        'amulet_elder' = 13,
        'ring_shaper' = 14,
        'ring_elder' = 15,
        'belt_shaper' = 16,
        'belt_elder' = 17,
        'quiver_shaper' = 18,
        'quiver_elder' = 19,
        'shield_shaper' = 20,
        'shield_elder' = 21,
        '2h_sword_shaper' = 22,
        '2h_sword_elder' = 23,
        'axe_shaper' = 24,
        'axe_elder' = 25,
        'mace_shaper' = 26,
        'mace_elder' = 27,
        'claw_shaper' = 28,
        'claw_elder' = 29,
        'bow_shaper' = 30,
        'bow_elder' = 31,
        'dagger_shaper' = 32,
        'dagger_elder' = 33,
        '2h_axe_shaper' = 34,
        '2h_axe_elder' = 35,
        '2h_mace_shaper' = 36,
        '2h_mace_elder' = 37,
        'staff_shaper' = 38,
        'staff_elder' = 39,
        'sceptre_shaper' = 40,
        'sceptre_elder' = 41,
        'wand_shaper' = 42,
        'wand_elder' = 43,
    }
    export default function atlasModifier(baseitem: {
        tags: Tag[];
    }): AtlasModifier;
    export function tagsWithModifier(baseitem: {
        tags: Tag[];
    }, meta_data: MetaData, modifier: AtlasModifier): Tag[];
    export function elderTag(meta_data: MetaData): AtlasModifierTag;
    export function shaperTag(meta_data: MetaData): AtlasModifierTag;
}
declare module "containers/item/Component" {
    export default interface Component<T, B> {
        parent: T;
        builder(): B;
        any(): boolean;
    }
}
declare module "containers/ImmutableContainer" {
    import { Tag } from "schema";
    import Mod from "mods/Mod";
    import Stat from "calculator/Stat";
    import Container from "containers/Container";
    export interface Builder<T extends Mod> {
        mods: T[];
    }
    /**
     * immutable implementation of Container
     */
    export default abstract class ImmutableContainer<T extends Mod, B extends Builder<T>> implements Container<T> {
        mods: T[];
        constructor(mods: T[]);
        builder(): B;
        withMutations(mutate: (builder: B) => B): this;
        /**
         *  adds a new non-existing mod
         */
        addMod(mod: T): this;
        /**
         * truncates mods
         */
        removeAllMods(): this;
        /**
         * removes an existing mod
         */
        removeMod(other: T): this;
        indexOfModWithId(id: string): number;
        indexOfMod(mod: T): number;
        hasMod(mod: T): boolean;
        hasModGroup(other: T): boolean;
        /**
         * tags of the mods in the container
         */
        getTags(): Tag[];
        asArray(): T[];
        /**
         * @param {number} mod_type generation type
         */
        numberOfModsOfType(mod_type: number): number;
        /**
         * checks if theres more place for a mod with their generationtype
         */
        hasRoomFor(mod: T): boolean;
        /**
         * checks if this container has any mods
         */
        any(): boolean;
        /**
         * lists all the stats that are offered by its mods
         *
         * mods can have multiple stats so we sum their values grouped by stat id
         */
        stats(): {
            [key: string]: Stat;
        };
        abstract maxModsOfType(mod: T): number;
        abstract inDomainOf(mod_domain: number): boolean;
        abstract level(): number;
    }
}
declare module "containers/item/components/Affixes" {
    import { Mod } from "mods/index";
    import Item from "containers/item/Item";
    import ImmutableContainer from "containers/ImmutableContainer";
    export interface Builder {
        item: Item;
        mods: Mod[];
    }
    /**
     * the explicits of an item
     */
    export default class ItemAffixes extends ImmutableContainer<Mod, Builder> {
        static withBuilder(builder: Builder): ItemAffixes;
        item: Item;
        constructor(item: Item, mods: Mod[]);
        builder(): {
            item: Item;
            mods: Mod[];
        };
        /**
         * @override
         */
        maxModsOfType(mod: Mod): number;
        /**
         *  checks if the domains are equiv
         */
        inDomainOf(mod_domain: number): boolean;
        level(): number;
        lockedPrefixes(): boolean;
        lockedSuffixes(): boolean;
        getPrefixes(): Mod[];
        getSuffixes(): Mod[];
        /**
         * maximum number of prefixes
         */
        maxPrefixes(): number;
        maxSuffixes(): number;
        private modDomainEquiv();
    }
}
declare module "containers/item/components/Sockets" {
    import Component from "containers/item/Component";
    import Item from "containers/item/Item";
    export interface Sockets {
        max(): number;
    }
    export type Builder = number;
    /**
     * WIP item component for sockets
     */
    export default class ItemSockets implements Sockets, Component<Item, Builder> {
        amount: number;
        parent: Item;
        constructor(item: Item, builder: Builder);
        builder(): number;
        max(): number;
        any(): boolean;
        private maxByMetaData();
        private maxByLevel();
        private maxByDimensions();
        private maxOverride();
    }
}
declare module "containers/item/components/Name" {
    import Component from "containers/item/Component";
    import Item from "containers/item/Item";
    export interface Name {
        lines(): string[];
    }
    export type Builder = string;
    /**
     * the name of an item
     *
     * for magic items those name consists of the baseitemname and the prefix/suffix
     * rare and unique items have a set name
     */
    export default class ItemName implements Name, Component<Item, Builder> {
        parent: Item;
        random: string;
        constructor(item: Item, builder: Builder);
        builder(): Builder;
        lines(): string[];
        any(): boolean;
    }
}
declare module "containers/item/components/Rarity" {
    import Component from "containers/item/Component";
    import Item from "containers/item/Item";
    export enum RarityKind {
        normal = 1,
        magic = 2,
        rare = 3,
        unique = 4,
        showcase = 5,
    }
    export type RarityIdent = keyof typeof RarityKind;
    export interface Rarity<T> {
        isNormal(): boolean;
        isMagic(): boolean;
        isRare(): boolean;
        isUnique(): boolean;
        set(rarity: RarityIdent): T;
        upgrade(): T;
        toString(): RarityIdent;
    }
    export type Builder = RarityKind;
    /**
     * the rarity of an item
     */
    export default class ItemRarity implements Rarity<Item>, Component<Item, Builder> {
        parent: Item;
        kind: RarityKind;
        constructor(item: Item, builder: Builder);
        builder(): Builder;
        isNormal(): boolean;
        isMagic(): boolean;
        isRare(): boolean;
        isUnique(): boolean;
        /**
         * upgrade rarirty by one tier
         *
         * normal > magic > rare
         */
        upgrade(): Item;
        set(rarity: RarityIdent): Item;
        toString(): RarityIdent;
        any(): boolean;
    }
}
declare module "containers/item/components/Implicits" {
    import { Mod } from "mods/index";
    import ImmutableContainer from "containers/ImmutableContainer";
    import Item from "containers/item/Item";
    export interface Builder {
        item: Item;
        mods: Mod[];
    }
    /**
     * the implicits of an item
     */
    export default class Implicits extends ImmutableContainer<Mod, Builder> {
        static withBuilder(builder: Builder): Implicits;
        item: Item;
        constructor(item: Item, mods: Mod[]);
        /**
         * @override
         */
        maxModsOfType(mod: Mod): number;
        /**
         * @override
         *  checks if the domains are equiv
         */
        inDomainOf(): boolean;
        /**
         * @override
         */
        level(): number;
    }
}
declare module "containers/item/components/Requirements" {
    import Component from "containers/item/Component";
    import Item from "containers/item/Item";
    export interface Requirements {
        list(): {
            level: number;
            dex: number;
            int: number;
            str: number;
        };
        level(): number;
    }
    export type Builder = {
        req_str: number;
        req_dex: number;
        req_int: number;
    } | undefined;
    /**
     * the requirements to use this item
     *
     * contains attributes strength, intelligence, evasion
     * and the itemlevel
     */
    export default class ItemName implements Requirements, Component<Item, Builder> {
        parent: Item;
        dex: number;
        int: number;
        str: number;
        constructor(item: Item, builder: Builder);
        builder(): Builder;
        level(): number;
        list(): {
            level: number;
            str: number;
            dex: number;
            int: number;
        };
        any(): boolean;
    }
}
declare module "containers/item/components/properties/Properties" {
    import Component from "containers/item/Component";
    import Item from "containers/item/Item";
    export interface NumericProperty {
        value: number | [number, number];
        augmented: boolean;
    }
    export interface Properties {
        quality: number;
    }
    export interface Builder {
        quality: number;
    }
    /**
     * properties for every item
     *
     * this is used for miscellaneous properties that don't really fit
     * into any other component
     */
    export default class ItemProperties implements Properties, Component<Item, Builder> {
        parent: Item;
        quality: number;
        constructor(item: Item, builder: Builder);
        builder(): Builder;
        any(): boolean;
    }
}
declare module "containers/item/components/properties/ArmourProperties" {
    import ItemProperties, { NumericProperty, Properties, Builder as BaseBuilder } from "containers/item/components/properties/Properties";
    export interface Defences {
        armour: NumericProperty;
        evasion: NumericProperty;
        energy_shield: NumericProperty;
    }
    export interface ArmourProperties extends Properties {
        defences(): Defences;
    }
    export type Builder = BaseBuilder;
    export default class ItemArmourProperties extends ItemProperties implements ArmourProperties {
        defences(): Defences;
        any(): boolean;
    }
}
declare module "containers/item/components/properties/ShieldProperties" {
    import ItemArmourProperties, { ArmourProperties } from "containers/item/components/properties/ArmourProperties";
    import { NumericProperty } from "containers/item/components/properties/Properties";
    export interface ShieldProperties extends ArmourProperties {
        block(): NumericProperty;
    }
    export default class ItemShieldProperties extends ItemArmourProperties implements ShieldProperties {
        block(): NumericProperty;
    }
}
declare module "containers/item/components/properties/WeaponProperties" {
    import ItemProperties, { Properties, Builder as BaseBuilder, NumericProperty } from "containers/item/components/properties/Properties";
    export interface WeaponProperties extends Properties {
        physical_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        chaos_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        cold_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        fire_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        lightning_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        attack_speed(): NumericProperty;
        crit(): NumericProperty;
        weapon_range(): NumericProperty;
    }
    export type Builder = BaseBuilder;
    export default class ItemWeaponProperties extends ItemProperties implements WeaponProperties {
        physical_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        chaos_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        cold_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        fire_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        lightning_damage(): {
            min: NumericProperty;
            max: NumericProperty;
        };
        attack_speed(): NumericProperty;
        crit(): NumericProperty;
        weapon_range(): NumericProperty;
        any(): boolean;
        private weaponProps();
        private attackDamageRange(min, max, type);
    }
}
declare module "containers/item/components/properties/build" {
    import ItemProperties, { Builder } from "containers/item/components/properties/Properties";
    import Item from "containers/item/index";
    export default function build(item: Item, builder: Builder): ItemProperties;
}
declare module "containers/item/components/properties/index" {
    export { default as ItemProperties, Builder, Properties } from "containers/item/components/properties/Properties";
    export { default as build } from "containers/item/components/properties/build";
}
declare module "containers/item/Item" {
    import { BaseError } from 'make-error';
    import Container from "containers/Container";
    import { Mod } from "mods/index";
    import { Tag, BaseItemTypeProps } from "schema";
    import MetaData from "util/MetaData";
    import Stat from "calculator/Stat";
    import { AtlasModifier } from "containers/item/atlasModifier";
    import Component from "containers/item/Component";
    import ItemAffixes from "containers/item/components/Affixes";
    import { Sockets, Builder as SocketsBuilder } from "containers/item/components/Sockets";
    import { Name, Builder as NameBuilder } from "containers/item/components/Name";
    import { Builder as RarityBuilder, Rarity } from "containers/item/components/Rarity";
    import Implicits from "containers/item/components/Implicits";
    import { Requirements, Builder as RequirementsBuilder } from "containers/item/components/Requirements";
    import { Properties, Builder as PropertiesBuilder } from "containers/item/components/properties/index";
    import { NumericProperty } from "containers/item/components/properties/Properties";
    export interface ItemProps {
        readonly atlas_modifier: AtlasModifier;
        readonly corrupted: boolean;
        readonly item_level: number;
        readonly mirrored: boolean;
    }
    export class UnacceptedMod extends BaseError {
        constructor();
    }
    export interface Builder {
        /**
         * explicits of the item
         */
        affixes: Mod[];
        baseitem: BaseItemTypeProps;
        implicits: Mod[];
        /**
         * reflection of the baseitem
         */
        meta_data: MetaData;
        name: NameBuilder;
        props: ItemProps;
        properties: PropertiesBuilder;
        rarity: RarityBuilder;
        requirements: RequirementsBuilder;
        sockets: SocketsBuilder;
    }
    /**
     * an Item in Path of Exile
     */
    export default class Item implements Container<Mod> {
        /**
         * creates a new item from the baseitem
         * @param baseitem
         */
        static build(baseitem: BaseItemTypeProps): Item;
        static fromBuilder(builder: Builder): Item;
        affixes: ItemAffixes;
        baseitem: BaseItemTypeProps;
        implicits: Implicits;
        meta_data: MetaData;
        name: Name & Component<Item, NameBuilder>;
        props: ItemProps;
        properties: Properties & Component<Item, any>;
        rarity: Rarity<Item> & Component<Item, RarityBuilder>;
        requirements: Requirements & Component<Item, RequirementsBuilder>;
        sockets: Sockets & Component<Item, SocketsBuilder>;
        /**
         * Use Item#build
         *
         * @private
         * @param builder
         */
        constructor(builder: Builder);
        withMutations(mutate: (builder: Builder) => Builder): this;
        builder(): Builder;
        /**
         * returns tags of item + tags from mods
         */
        getTags(): Tag[];
        readonly mods: Mod[];
        asArray(): Mod[];
        /**
         * decides where to add the mod (explicit, implicit)
         * throws if it could not decide where to put it
         * @param other
         */
        addMod(other: Mod): this;
        /**
         * removed this mod either from implicit or explicit
         *
         * if that mod fiths into neither category it throws
         * @param other
         */
        removeMod(other: Mod): this;
        /**
         * removes explicits
         */
        removeAllMods(): this;
        hasMod(other: Mod): boolean;
        hasModGroup(other: Mod): boolean;
        hasRoomFor(other: Mod): boolean;
        indexOfModWithId(id: string): number;
        maxModsOfType(other: Mod): number;
        inDomainOf(mod_domain: number): boolean;
        level(): number;
        any(): boolean;
        /**
         * merge of implicit and explicit stats
         */
        stats(): {
            [key: string]: Stat;
        };
        removeAllImplicits(): this;
        setProperty(prop: keyof ItemProps, value: any): this;
        /**
         * sets the corrupted property on the item or throws if it is already corrupted
         */
        corrupt(): this;
        /**
         * sets the mirror property on the item or throws if it is already mirrored
         */
        mirror(): this;
        isElderItem(): boolean;
        /**
         * returns an item that can have elder mods
         *
         * this does not remove existing shaper mods
         */
        asElderItem(): this;
        isSHaperItem(): boolean;
        /**
         * returns an item that can have shaper mods
         *
         * this does not remove existing elder mods
         */
        asShaperItem(): this;
        removeAtlasModifier(): this;
        /**
         * augments a given {value} with the local stats
         * @param value
         * @param classification
         */
        computeValue(value: number, classification: string[]): NumericProperty;
        private mutateAffixes(mutate);
        private addAffix(other);
        private removeAffix(other);
        private mutateImplicits(mutate);
        private addImplicit(other);
        private removeImplicit(other);
        private asAtlasModifier(modifier);
    }
}
declare module "containers/item/index" {
    import Item from "containers/item/Item";
    export { default as ArmourProperties } from "containers/item/components/properties/ArmourProperties";
    export { default as ShieldProperties } from "containers/item/components/properties/ShieldProperties";
    export { default as WeaponProperties } from "containers/item/components/properties/WeaponProperties";
    export default Item;
}
declare module "util/rng" {
    export function random(min: number, max: number): number;
    export function choose<T>(pool: T[], getWeight: (item: T) => number): T | undefined;
}
declare module "generators/Orb" {
    import Container from "containers/Container";
    import { ModProps } from "schema";
    import { Mod } from "mods/index";
    import { Flags } from "util/Flags";
    import Generator, { GeneratorDetails } from "generators/Generator";
    export interface SpawnableFlags extends Flags {
        no_matching_tags: boolean;
        spawnweight_zero: boolean;
    }
    export type SpawnableFlag = keyof SpawnableFlags;
    /**
     * @abstract
     * a Generator that randomly rolls one of its mods
     * ignores mods that have no spawnweight or 0 spawnweight for every tag
     */
    export default abstract class Orb<C extends Container<any>> extends Generator<Mod, C> {
        static modFilter(mod: ModProps): boolean;
        static buildMods(mods: ModProps[]): Mod[];
        chooseMod(container: C): Mod | undefined;
        /**
         * adds a mod from chooseMod ignoring if it's applicable
         * @param {Item} item
         */
        rollMod(container: C): C;
        isModSpawnableOn(mod: Mod, container: C): SpawnableFlags;
        modsFor(container: C, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
    }
}
declare module "generators/item_orbs/ItemOrb" {
    import Item from "containers/item/index";
    import { Flags } from "util/Flags";
    import Orb from "generators/Orb";
    export interface ApplicableFlags extends Flags {
        corrupted: boolean;
        mirrored: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default abstract class ItemOrb extends Orb<Item> {
        /**
         * currency only applies to items
         */
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Transmute" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    import Mod from "mods/Mod";
    import { GeneratorDetails } from "generators/Generator";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_white: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Transmute extends ItemOrb {
        static modFilter(mod: ModProps): boolean;
        static build(mods: ModProps[]): Transmute;
        /**
         *  adds 1-2 mods
         */
        applyTo(item: Item): Item;
        /**
         * maps mod::applicableTo as if it were already magic
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Alchemy" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    import { GeneratorDetails } from "generators/Generator";
    import Mod from "mods/Mod";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_white: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    /**
     * options for Alchemy#applyTo()
     */
    export interface ApplyOptions {
        /**
         * ignores Alchemy#applicableTo() if true
         */
        force: boolean;
    }
    export default class Alchemy extends ItemOrb {
        static build(mods: ModProps[]): Alchemy;
        /**
         *  adds 1-2 mods
         */
        applyTo(item: Item, options?: Partial<ApplyOptions>): Item;
        /**
         * maps mod::applicableTo as if it were already magic
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Augment" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_magic: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Augment extends ItemOrb {
        static build(mods: ModProps[]): Augment;
        /**
         * adds one random property
         */
        applyTo(item: Item): Item;
        /**
         * item needs to be magic
         */
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Scouring" {
    import Item from "containers/item/index";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    export interface ApplicableFlags extends BaseApplicableFlags {
        normal: boolean;
        unique: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    /**
     * options for Scouring.applyTo()
     */
    export interface ApplyToOptions {
        /**
         * ignores meta mods such as "Prefixes cannot be changed"
         */
        ignore_meta_mods: boolean;
        /**
         * apply even if not applyicable
         */
        force: boolean;
    }
    export default class Scouring extends ItemOrb {
        constructor();
        /**
         * applies Orb of Scouring to an item
         * considers locked affixes metamods
         */
        applyTo(other: Item, options?: Partial<ApplyToOptions>): Item;
        /**
         * checks if normal or unique rarity and returns false
         */
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Alteration" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_magic: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Alteration extends ItemOrb {
        static build(mods: ModProps[]): Alteration;
        /**
         *  rerolls properties of magic
         */
        applyTo(item: Item): Item;
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Annulment" {
    import Item from "containers/item/index";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_magic_rare: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Annulment extends ItemOrb {
        constructor();
        applyTo(item: Item): Item;
        applicableTo(item: Item): ApplicableFlags;
        modsFor(item: Item): never[];
    }
}
declare module "generators/item_orbs/Exalted" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_rare: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Exalted extends ItemOrb {
        static build(mods: ModProps[]): Exalted;
        /**
         * adds one random property
         */
        applyTo(item: Item): Item;
        /**
         * item needs to be magic
         */
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Chaos" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_rare: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Chaos extends ItemOrb {
        static build(mods: ModProps[]): Chaos;
        /**
         *  rerolls properties of magic
         */
        applyTo(item: Item): Item;
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/EnchantmentBench" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import Mod from "mods/Mod";
    import ItemOrb from "generators/item_orbs/ItemOrb";
    import { GeneratorDetails } from "generators/Generator";
    /**
     * ingame representation of a enchantment bench
     */
    export default class Enchantmentbench extends ItemOrb {
        static modFilter(mod: ModProps): boolean;
        static build(mods: ModProps[]): Enchantmentbench;
        /**
         * replaces implicits with new enchantment mod
         */
        applyTo(item: Item): Item;
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
    }
}
declare module "generators/item_orbs/Essence" {
    import Item from "containers/item/index";
    import { ModProps, EssenceProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    import Mod from "mods/Mod";
    import { GeneratorDetails } from "generators/Generator";
    export interface ApplicableFlags extends BaseApplicableFlags {
        wrong_rarity: boolean;
        wrong_itemclass: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    /**
     * Essences guarantee at least exactly one mod depending on itemclass
     * or are not applicable. They should provide a mod for every equipment type.
     */
    export default class Essence extends ItemOrb {
        static build(props: EssenceProps, mods: ModProps[]): Essence;
        private static reforger;
        props: EssenceProps;
        private alchemy;
        /**
         *
         * @param props props of a specific essence (contains the guarenteed mod)
         * @param mods mods that are rolled onto the item after th guarenteed is applied
         */
        constructor(props: EssenceProps, mods: ModProps[]);
        /**
         *  add the guarenteed mod and fill up the rest like alchemy
         */
        applyTo(item: Item, options?: Partial<{
            force: boolean;
        }>): Item;
        /**
         * only one mod per itemclass
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
        /**
         * @returns Mod if the itemclass of the Item is eligible
         */
        chooseMod(item: Item): Mod | undefined;
        /**
         *
         * @param itemclass
         * @returns the guaranteed mod for the itemclass
         */
        modForItemclass(itemclass: string): Mod | undefined;
        /**
         * applicable if the essence guarantees a mod for the itemclass
         * and the rarity is either white or rare (only if essence can reforge)
         * @param item
         */
        applicableTo(item: Item): ApplicableFlags;
        /**
         * @returns true if the essence can reforge (i.e. reroll) the item
         */
        reforges(): boolean;
        /**
         * @returns true if the essence is the best of its type
         */
        isTopTier(): boolean;
        /**
         * mapping from itemclass to mod prop in essence props
         * @param item_class
         */
        private modPropsFor(item_class);
    }
}
declare module "generators/item_orbs/Regal" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb, { ApplicableFlags as BaseApplicableFlags } from "generators/item_orbs/ItemOrb";
    import { GeneratorDetails } from "generators/Generator";
    import Mod from "mods/Mod";
    export interface ApplicableFlags extends BaseApplicableFlags {
        not_magic: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class Regal extends ItemOrb {
        static build(mods: ModProps[]): Regal;
        /**
         *  adds 1 mod
         */
        applyTo(item: Item): Item;
        /**
         * maps mod::applicableTo as if it were already magic
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
        applicableTo(item: Item): ApplicableFlags;
    }
}
declare module "generators/item_orbs/Talisman" {
    import { ModProps } from "schema";
    import Item from "containers/item/index";
    import ItemOrb from "generators/item_orbs/ItemOrb";
    /**
     * TODO
     */
    export default class Talisman extends ItemOrb {
        static modFilter(): boolean;
        static build(mods: ModProps[]): Talisman;
        applyTo(item: Item): Item;
    }
}
declare module "generators/item_orbs/Vaal" {
    import Item from "containers/item/index";
    import { ModProps } from "schema";
    import ItemOrb from "generators/item_orbs/ItemOrb";
    export default class Vaal extends ItemOrb {
        static modFilter(mod: ModProps): boolean;
        static build(mods: ModProps[]): Vaal;
        /**
         * replaces implicit with vaal implicit
         * TODO: white sockets, reroll (brick(, nothing
         */
        applyTo(item: Item): Item;
    }
}
declare module "generators/item_orbs/index" {
    export { default as Alchemy } from "generators/item_orbs/Alchemy";
    export { default as Alteration } from "generators/item_orbs/Alteration";
    export { default as Annulment } from "generators/item_orbs/Annulment";
    export { default as Augment } from "generators/item_orbs/Augment";
    export { default as Chaos } from "generators/item_orbs/Chaos";
    export { default as EnchantmentBench } from "generators/item_orbs/EnchantmentBench";
    export { default as Essence } from "generators/item_orbs/Essence";
    export { default as Exalted } from "generators/item_orbs/Exalted";
    export { default as ItemOrb } from "generators/item_orbs/ItemOrb";
    export { default as Regal } from "generators/item_orbs/Regal";
    export { default as Scouring } from "generators/item_orbs/Scouring";
    export { default as Talisman } from "generators/item_orbs/Talisman";
    export { default as Transmute } from "generators/item_orbs/Transmute";
    export { default as Vaal } from "generators/item_orbs/Vaal";
}
declare module "generators/MasterBenchOption" {
    import Item from "containers/item/Item";
    import { CraftingBenchOptionsProps } from "schema";
    import { Flags } from "util/Flags";
    import { Mod } from "mods/index";
    import Generator, { ModApplicableFlags as BaseModApplicableFlags, GeneratorDetails } from "generators/Generator";
    export interface ModApplicableFlags extends BaseModApplicableFlags {
        no_multimod: boolean;
    }
    export type ModApplicableFlag = keyof BaseModApplicableFlags;
    export interface ApplicableFlags extends Flags {
        wrong_itemclass: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export default class MasterBenchOption extends Generator<Mod, Item> {
        static build(option: CraftingBenchOptionsProps): MasterBenchOption;
        readonly props: CraftingBenchOptionsProps;
        constructor(option: CraftingBenchOptionsProps);
        readonly mod: Mod | undefined;
        /**
         * applies a chosen craftingbenchoption
         *
         * cant overload extended method. so we have to set the chosen option before
         */
        applyTo(item: Item): Item;
        /**
         * every item is welcome
         */
        applicableTo(item: Item): ApplicableFlags;
        /**
         * greps mod::applicableTo
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
        /**
         * checks if the given mod is applicable to the item
         *
         * remember that this doesn't check if the passed mod is the mod of this option
         */
        isModApplicableTo(mod: Mod, item: Item): ModApplicableFlags;
    }
}
declare module "helpers/MasterBench" {
    import Item from "containers/item/Item";
    import MasterBenchOption from "generators/MasterBenchOption";
    import { CraftingBenchOptionsProps } from "schema";
    import { Mod } from "mods/index";
    import { GeneratorDetails } from "generators/Generator";
    export type OptionId = number;
    /**
     */
    export default class MasterBench {
        static build(props: CraftingBenchOptionsProps[], master_primary?: number): MasterBench;
        readonly options: MasterBenchOption[];
        constructor(options: MasterBenchOption[]);
        applyOptionTo(item: Item, option_id: OptionId): Item;
        getAvailableMods(): Mod[];
        /**
         * greps mod::applicableTo
         */
        modsFor(item: Item, whitelist?: string[]): GeneratorDetails<Mod>[];
    }
}
declare module "generators/ItemShowcase" {
    import Item from "containers/item/Item";
    import MasterBench from "helpers/MasterBench";
    import Mod from "mods/Mod";
    import { CraftingBenchOptionsProps, EssenceProps, ModProps } from "schema";
    import Generator, { GeneratorDetails } from "generators/Generator";
    import { Alchemy, EnchantmentBench, Vaal } from "generators/item_orbs/index";
    import { Flags } from "util/Flags";
    /**
     * Masterbench/Currency hybrid
     */
    export default class ItemShowcase extends Generator<Mod, Item> {
        enchantment: EnchantmentBench;
        master: MasterBench;
        explicits: Alchemy;
        vaal: Vaal;
        private essences;
        constructor(props: ModProps[], options: CraftingBenchOptionsProps[], essences: EssenceProps[]);
        /**
         * only abstract showcase, not for actual usage
         */
        applyTo(item: Item): Item;
        /**
         * not applicable to anything
         * @param item
         */
        applicableTo(item: Item): Flags;
        /**
         * greps mod::applicableTo and (if implemented) mod::spawnableOn
         * if we have all the space for mods we need
         *
         * @returns master-, enchantment-, vaal-, explicit-, (top tier) essence-mods
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
    }
}
declare module "containers/AtlasNode" {
    import Mod from "mods/Mod";
    import { AtlasNodeProps, Tag } from "schema";
    import ImmutableContainer from "containers/ImmutableContainer";
    export const SEXTANT_RANGE = 55;
    export interface Builder {
        mods: Mod[];
        props: AtlasNodeProps;
    }
    export type HumanId = string;
    export default class AtlasNode extends ImmutableContainer<Mod, Builder> {
        static build(props: AtlasNodeProps): AtlasNode;
        static withBuilder(builder: Builder): AtlasNode;
        props: AtlasNodeProps;
        constructor(mods: Mod[], props: AtlasNodeProps);
        builder(): Builder;
        /**
         * returns a list of nodes with sextant distance <= depth
         * sextant distance:
         * (a, b) => 1, if a.isInSextantRange(b)
         *           +inf, otherwise
         */
        inSextantRange(atlas: AtlasNode[], max_depth?: number): AtlasNode[];
        isInSextantRange(other: AtlasNode): boolean;
        distance(other: AtlasNode): number;
        pos(): string;
        getAllMods(atlas: AtlasNode[]): Mod[];
        getTags(): Tag[];
        maxModsOfType(): number;
        inDomainOf(mod_domain: number): boolean;
        level(): number;
        affectingMods(atlas: AtlasNode[]): Mod[];
        activeMods(atlas: AtlasNode[]): Mod[];
        inactiveMods(atlas: AtlasNode[]): Mod[];
    }
}
declare module "generators/Sextant" {
    import { BaseError } from 'make-error';
    import AtlasNode from "containers/AtlasNode";
    import Mod from "mods/Mod";
    import { ModProps } from "schema";
    import { Flags } from "util/Flags";
    import Orb, { SpawnableFlags as BaseSpawnableFlags } from "generators/Orb";
    export interface SpawnableFlags extends BaseSpawnableFlags {
        no_adjacents_with_spawnweight: boolean;
    }
    export type SpawnableFlag = keyof SpawnableFlags;
    export interface ApplicableFlags extends Flags {
        wrong_tier_group: boolean;
    }
    export type ApplicableFlag = keyof ApplicableFlags;
    export class ContextUndefined extends BaseError {
        constructor(context: string);
    }
    export class CorruptedState extends BaseError {
        constructor(message: string);
    }
    export enum Type {
        apprentice = 1,
        journeyman = 2,
        master = 3,
    }
    export default class Sextant extends Orb<AtlasNode> {
        static type: typeof Type;
        static modFilter(mod: ModProps): boolean;
        static build(mods: ModProps[]): Sextant;
        /**
         * creates a list of mod that are either
         * a) already applied to this node because they are directly in range
         * b) already applied to adjacent nodes and would create duplicates if applied
         *    to this node
         * in other words: consider every mod from maps within a sextant distance of 2
         * @param {AtlasNode} node
         * @param {AtlasNode[]} atlas
         */
        static blockedMods(target: AtlasNode, atlas: AtlasNode[]): Mod[];
        atlas: AtlasNode[] | undefined;
        type: Type;
        applyTo(node: AtlasNode): AtlasNode;
        applicableTo(node: AtlasNode): ApplicableFlags;
        findAdjacentWithSpawnweight(mod: Mod, node: AtlasNode): AtlasNode | undefined;
        isModSpawnableOn(mod: Mod, node: AtlasNode): SpawnableFlags;
        modsFor(node: AtlasNode, whitelist?: string[]): {
            applicable?: Flags | undefined;
            mod: Mod;
            spawnable: Flags;
            spawnweight: number;
        }[];
    }
}
declare module "generators/index" {
    export { Alchemy, Annulment, Alteration, Augment, Chaos, EnchantmentBench, Essence, Exalted, Regal, Scouring, Talisman, Transmute, Vaal } from "generators/item_orbs/index";
    export { default as ItemShowcase } from "generators/ItemShowcase";
    export { default as MasterBenchOption } from "generators/MasterBenchOption";
    export { default as Sextant } from "generators/Sextant";
}
declare module "containers/index" {
    export { default as AtlasNode } from "containers/AtlasNode";
    export { default as Container } from "containers/Container";
    export { default as ImmutableContainer } from "containers/ImmutableContainer";
    export { default as Item, ArmourProperties, ShieldProperties, WeaponProperties } from "containers/item/index";
}
declare module "helpers/Atlas" {
    import AtlasNode from "containers/AtlasNode";
    import Sextant from "generators/Sextant";
    import Mod from "mods/Mod";
    import { AtlasNodeProps } from "schema";
    import { GeneratorDetails } from "generators/Generator";
    export type HumanId = string;
    export type AtlasNodes = Map<HumanId, AtlasNode>;
    export interface Builder {
        nodes: AtlasNodes;
    }
    /**
     * immutable data structure for the atlas in Path of Exile
     *
     * main purpose is for reducer like usage in redux
     */
    export default class Atlas {
        static buildLookupTable(atlas: AtlasNodeProps[]): AtlasNodes;
        static build(atlas: AtlasNodeProps[]): Atlas;
        static withBuilder(builder: Builder): Atlas;
        readonly nodes: AtlasNodes;
        constructor(nodes: AtlasNodes);
        asArray(): AtlasNode[];
        /**
         * wrapper for map get that ensures a node or throws
         */
        get(world_area_id: string): AtlasNode;
        builder(): Builder;
        /**
         * batch mutations
         *
         * if the returned object is strict equal to the prev one
         * it doesn't return a new copy
         */
        withMutations(mutate: (builder: Builder) => Builder): this;
        /**
         * removes mods on all maps
         *
         * always returns a new copy
         */
        reset(): this;
        addMod(mod: Mod, world_area_id: string): this;
        removeMod(mod: Mod, world_area_id: HumanId): this;
        mutateNode(world_area_id: string, mutate: (node: AtlasNode) => AtlasNode): this;
        applySextant(sextant: Sextant, world_area_id: string): this;
        modsFor(sextant: Sextant, world_area_id: string): Array<GeneratorDetails<Mod>>;
        blockedMods(world_area_id: string): Mod[];
        private prepareSextant(sextant);
    }
}
declare module "interfaces/Builder" {
    export type Builder<P, T> = (props: P) => T;
}
declare module "interfaces/Buildable" {
    export interface Buildable<P, T, A1> {
        name: string;
        build(props: P, arg1: A1): T;
    }
}
declare module "interfaces/index" {
    export { Builder } from "interfaces/Builder";
    export { Buildable } from "interfaces/Buildable";
    export { Taggable } from "interfaces/Taggable";
}
declare module "helpers/PropsTable" {
    import { BaseError } from 'make-error';
    import { Buildable } from "interfaces/index";
    export interface TableProps {
        primary?: number;
        name?: string;
        id?: string;
    }
    export class NotFound extends BaseError {
        constructor(name: string, message: string);
    }
    export default class PropsTable<P extends TableProps, T, A1> {
        builder: Buildable<P, T, A1>;
        table: P[];
        builder_arg1: A1;
        constructor(all: P[], constructor: Buildable<P, T, A1>, arg1: A1);
        all(): P[];
        find(finder: (props: P) => boolean): P | undefined;
        /**
         * Builds an instance for the properties for which the provided predicate is
         * true. Returns for the first value for which the predicate is true
         */
        from(finder: (props: P) => boolean): T;
        fromPrimary(primary: number): T;
        fromName(name: string): T;
        fromId(id: string): T;
        fromProp<K extends keyof P>(prop: K, value: P[K]): T;
    }
}
declare module "helpers/createTables" {
    import { AtlasNodeProps, BaseItemTypeProps, CraftingBenchOptionsProps, EssenceProps, ModProps } from "schema";
    import AtlasNode from "containers/AtlasNode";
    import Item from "containers/item/Item";
    import { Essence, MasterBenchOption } from "generators/index";
    import Mod from "mods/Mod";
    import PropsTable from "helpers/PropsTable";
    export const createAtlasNodes: (props: AtlasNodeProps[]) => PropsTable<AtlasNodeProps, AtlasNode, undefined>;
    export const createItems: (props: BaseItemTypeProps[]) => PropsTable<BaseItemTypeProps, Item, undefined>;
    export const createMasterBenchOptions: (props: CraftingBenchOptionsProps[]) => PropsTable<CraftingBenchOptionsProps, MasterBenchOption, undefined>;
    export const createMods: (props: ModProps[]) => PropsTable<ModProps, Mod, undefined>;
    export const createEssences: (props: EssenceProps[], mods: ModProps[]) => PropsTable<EssenceProps, Essence, ModProps[]>;
}
declare module "index" {
    export { default as Stat } from "calculator/Stat";
    export { default as ValueRange } from "calculator/ValueRange";
    export { default as Generator, GeneratorDetails } from "generators/Generator";
    export { default as Container } from "containers/Container";
    import * as schema from "schema";
    export { Flags } from "util/index";
    export { Alchemy, Alteration, Annulment, Augment, Chaos, EnchantmentBench, Exalted, Regal, Scouring, Talisman, Transmute, Vaal, ItemShowcase, MasterBenchOption, Sextant } from "generators/index";
    export { AtlasNode, Item, ArmourProperties, ShieldProperties, WeaponProperties } from "containers/index";
    export { Mod } from "mods/index";
    export { default as Atlas } from "helpers/Atlas";
    export { default as MasterBench } from "helpers/MasterBench";
    export { createAtlasNodes, createItems, createMasterBenchOptions, createMods } from "helpers/createTables";
    export { schema };
    export { anySet } from "util/index";
}
