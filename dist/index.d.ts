declare module "schema" {
    export interface TagProps {
        primary: number;
        id: string;
    }
    export interface ModTypeProps {
        primary: number;
    }
    export interface SpawnWeightProps {
        value: number;
        tag: TagProps;
    }
    export interface StatProps {
        primary: number;
        id: string;
    }
    export interface ModProps {
        primary: number;
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
        tags: TagProps[];
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
    export interface ItemClassProps {
        primary: number;
        name: string;
    }
    export interface BaseItemTypeProps {
        primary: number;
        name: string;
        width: number;
        height: number;
        drop_level: number;
        inherits_from: string;
        weapon_type?: WeaponTypeProps;
        component_attribute_requirement?: AttributeRequirementProps;
        component_armour?: ArmourProps;
        implicit_mods: ModProps[];
        item_class: ItemClassProps;
        tags: TagProps[];
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
        item_classes: ItemClassProps[];
    }
    export interface WorldAreaProps {
        primary: number;
        id: string;
        name: string;
        area_level: number;
        tags: TagProps[];
        area_type_tags: TagProps[];
        mods: ModProps[];
    }
    export interface AtlasNodeProps {
        primary: number;
        x: number;
        y: number;
        adjacent: number[];
        world_area: WorldAreaProps;
    }
}
declare module "calculator/ValueRange" {
    export default class ValueRange {
        min: number;
        max: number;
        constructor(min: number, max: number);
        add(other: ValueRange): default;
        mult(other: ValueRange): default;
        map(mapFn: (n: number) => number): default;
        isAddIdentity(): boolean;
        isMultIdentity(): boolean;
        /**
         * +29% => 1.29
         */
        percentToFactor(): ValueRange;
        asTuple(): [number, number];
    }
}
declare module "calculator/Stat" {
    import { StatProps } from "schema";
    import ValueRange from "calculator/ValueRange";
    export default class Stat {
        props: StatProps;
        values: ValueRange;
        constructor(props: StatProps, values?: [number, number] | ValueRange);
        add(other: ValueRange): default;
        mult(other: ValueRange): default;
    }
}
declare module "interfaces/Taggable" {
    import { TagProps } from "schema";
    export interface Taggable {
        getTags(): TagProps[];
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
        };
        static TYPE: {
            [key: string]: number;
        };
        static build(props: ModProps): default;
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
    export default interface Container<T extends Mod> extends Taggable {
        mods: ReadonlyArray<T>;
        addMod(mod: T): this;
        removeMod(mod: T): this;
        removeAllMods(): this;
        hasMod(mod: T): boolean;
        hasModGroup(mod: T): boolean;
        hasRoomFor(mod: T): boolean;
        any(): boolean;
        indexOfModWithPrimary(primary: number): number;
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
        LOCKED_PREFIXES: number;
        LOCKED_SUFFIXES: number;
        NO_ATTACK_MODS: number;
        NO_CASTER_MODS: number;
        MULTIMOD: number;
        LLD_MOD: number;
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
    import { TagProps } from "schema";
    export interface MetaDataProps {
        extends: string;
        inheritance: string[];
        tags: TagProps[];
        AttributeRequirements?: {
            dexterity_requirement: string[];
            intelligence_requirement: string[];
            strength_requirement: string[];
        };
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
        };
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
        static build(clazz: string): MetaData | undefined;
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
declare module "containers/item/Component" {
    export default interface Component<T, B> {
        parent: T;
        builder(): B;
        any(): boolean;
    }
}
declare module "containers/ImmutableContainer" {
    import { TagProps } from "schema";
    import Mod from "mods/Mod";
    import Stat from "calculator/Stat";
    import Container from "containers/Container";
    export interface Builder<T extends Mod> {
        mods: T[];
    }
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
        indexOfModWithPrimary(primary: number): number;
        indexOfMod(mod: T): number;
        hasMod(mod: T): boolean;
        hasModGroup(other: T): boolean;
        /**
         * tags of the mods in the container
         */
        getTags(): TagProps[];
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
     * mixin for Item
     *
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
declare module "containers/item/components/properties/ComputedProperties" {
    export interface Property {
        values: [number, number];
        type: 'simple' | 'augmented';
    }
    export interface Properties {
        [key: string]: Property;
    }
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
        modifiers: Modifier[];
        base: ValueRange;
        constructor(range: [number, number] | ValueRange, classification?: Classification, modifiers?: Modifier[]);
        augmentWith(stats: Stat[]): Value;
        augmentableBy(stat: Stat): boolean;
        /**
         * calculates the final ValueRange from all the applied modifers
         *
         * in PoE all increase modifers get summed up to one big more modifier
         */
        compute(precision?: number): ValueRange;
    }
}
declare module "containers/item/components/properties/ArmourProperties" {
    import { Properties, Property } from "containers/item/components/properties/ComputedProperties";
    import Item from "containers/item/Item";
    export interface ArmourProperties extends Properties {
        armour: Property;
        evasion: Property;
        energy_shield: Property;
    }
    export default function build(item: Item): ArmourProperties;
}
declare module "containers/item/components/properties/ItemProperties" {
    import { Properties as ComputedProperties } from "containers/item/components/properties/ComputedProperties";
    import Component from "containers/item/Component";
    import Item from "containers/item/Item";
    export interface Properties {
        list(): ComputedProperties;
    }
    export type Builder = null;
    export default class ItemProperties implements Properties, Component<Item, Builder> {
        parent: Item;
        constructor(item: Item, builder: Builder);
        builder(): Builder;
        list(): ComputedProperties;
        any(): boolean;
    }
}
declare module "containers/item/Item" {
    import { BaseError } from 'make-error';
    import Container from "containers/Container";
    import { Mod } from "mods/index";
    import { TagProps, BaseItemTypeProps } from "schema";
    import MetaData from "util/MetaData";
    import Stat from "calculator/Stat";
    import Component from "containers/item/Component";
    import ItemAffixes from "containers/item/components/Affixes";
    import { Sockets, Builder as SocketsBuilder } from "containers/item/components/Sockets";
    import { Name, Builder as NameBuilder } from "containers/item/components/Name";
    import { Builder as RarityBuilder, Rarity } from "containers/item/components/Rarity";
    import Implicits from "containers/item/components/Implicits";
    import { Requirements, Builder as RequirementsBuilder } from "containers/item/components/Requirements";
    import { Properties, Builder as PropertiesBuilder } from "containers/item/components/properties/ItemProperties";
    export interface ItemProps {
        readonly corrupted: boolean;
        readonly item_level: number;
        readonly mirrored: boolean;
        readonly sockets?: number;
    }
    export class UnacceptedMod extends BaseError {
        constructor();
    }
    export interface Builder {
        affixes: Mod[];
        baseitem: BaseItemTypeProps;
        implicits: Mod[];
        meta_data: MetaData;
        name: NameBuilder;
        props: ItemProps;
        properties: PropertiesBuilder;
        rarity: RarityBuilder;
        requirements: RequirementsBuilder;
        sockets: SocketsBuilder;
    }
    export default class Item implements Container<Mod> {
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
        constructor(builder: Builder);
        withMutations(mutate: (builder: Builder) => Builder): this;
        builder(): Builder;
        /**
         * returns tags of item + tags from mods
         */
        getTags(): TagProps[];
        readonly mods: Mod[];
        asArray(): Mod[];
        addMod(other: Mod): this;
        removeMod(other: Mod): this;
        removeAllMods(): this;
        hasMod(other: Mod): boolean;
        hasModGroup(other: Mod): boolean;
        hasRoomFor(other: Mod): boolean;
        indexOfModWithPrimary(primary: number): number;
        maxModsOfType(other: Mod): number;
        inDomainOf(mod_domain: number): boolean;
        level(): number;
        any(): boolean;
        stats(): {
            [key: string]: Stat;
        };
        removeAllImplicits(): this;
        setProperty(prop: keyof ItemProps, value: any): this;
        corrupt(): this;
        mirror(): this;
        private mutateAffixes(mutate);
        private addAffix(other);
        private removeAffix(other);
        private mutateImplicits(mutate);
        private addImplicit(other);
        private removeImplicit(other);
    }
}
declare module "containers/item/index" {
    import Item from "containers/item/Item";
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
    export default class Alchemy extends ItemOrb {
        static build(mods: ModProps[]): Alchemy;
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
    export default class Scouring extends ItemOrb {
        constructor();
        /**
         * applies Orb of Scouring to an item
         * considers locked affixes metamods
         */
        applyTo(other: Item): Item;
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
        static build(option: CraftingBenchOptionsProps): default;
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
        static build(props: CraftingBenchOptionsProps[], master_primary?: number): default;
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
    import { CraftingBenchOptionsProps, ModProps } from "schema";
    import Generator, { GeneratorDetails } from "generators/Generator";
    import Alchemy from "generators/item_orbs/Alchemy";
    import EnchantmentBench from "generators/item_orbs/EnchantmentBench";
    import Vaal from "generators/item_orbs/Vaal";
    import { Flags } from "util/Flags";
    /**
     * Masterbench/Currency hybrid
     */
    export default class ItemShowcase extends Generator<Mod, Item> {
        enchantment: EnchantmentBench;
        master: MasterBench;
        explicits: Alchemy;
        vaal: Vaal;
        constructor(props: ModProps[], options: CraftingBenchOptionsProps[]);
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
         */
        modsFor(item: Item, whitelist?: string[]): Array<GeneratorDetails<Mod>>;
    }
}
declare module "containers/AtlasNode" {
    import Mod from "mods/Mod";
    import { AtlasNodeProps, TagProps } from "schema";
    import ImmutableContainer from "containers/ImmutableContainer";
    export const SEXTANT_RANGE = 55;
    export interface Builder {
        mods: Mod[];
        props: AtlasNodeProps;
    }
    export type HumanId = string;
    export default class AtlasNode extends ImmutableContainer<Mod, Builder> {
        static humanId(props: AtlasNodeProps): HumanId;
        static build(props: AtlasNodeProps): default;
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
        getTags(): TagProps[];
        maxModsOfType(): number;
        inDomainOf(mod_domain: number): boolean;
        level(): number;
        affectingMods(atlas: AtlasNode[]): Mod[];
        activeMods(atlas: AtlasNode[]): Mod[];
        inactiveMods(atlas: AtlasNode[]): Mod[];
        humanId(): HumanId;
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
    export { Alchemy, Annulment, Alteration, Augment, Chaos, EnchantmentBench, Exalted, Regal, Scouring, Talisman, Transmute, Vaal } from "generators/item_orbs/index";
    export { default as ItemShowcase } from "generators/ItemShowcase";
    export { default as MasterBenchOption } from "generators/MasterBenchOption";
    export { default as Sextant } from "generators/Sextant";
}
declare module "containers/index" {
    export { default as AtlasNode } from "containers/AtlasNode";
    export { default as Container } from "containers/Container";
    export { default as ImmutableContainer } from "containers/ImmutableContainer";
    export { default as Item } from "containers/item/index";
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
        get(id: HumanId): AtlasNode;
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
        addMod(mod: Mod, node_id: HumanId): this;
        removeMod(mod: Mod, node_id: HumanId): this;
        mutateNode(node_id: HumanId, mutate: (node: AtlasNode) => AtlasNode): this;
        applySextant(sextant: Sextant, node_id: HumanId): this;
        modsFor(sextant: Sextant, node_id: HumanId): Array<GeneratorDetails<Mod>>;
        blockedMods(node_id: HumanId): Mod[];
        private prepareSextant(sextant);
    }
}
declare module "interfaces/Builder" {
    export type Builder<P, T> = (props: P) => T;
}
declare module "interfaces/Buildable" {
    export interface Buildable<P, T> {
        name: string;
        build(props: P): T;
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
    export interface PropsWithPrimary {
        primary: number;
    }
    export class NotFound extends BaseError {
        constructor(name: string, message: string);
    }
    export default class PropsTable<P extends PropsWithPrimary, T> {
        builder: Buildable<P, T>;
        table: P[];
        constructor(all: P[], constructor: Buildable<P, T>);
        all(): P[];
        find(finder: (props: P) => boolean): P | undefined;
        /**
         * Builds an instance for the properties for which the provided predicate is
         * true. Returns for the first value for which the predicate is true
         */
        from(finder: (props: P) => boolean): T;
        fromPrimary(primary: number): T;
    }
}
declare module "helpers/createTables" {
    import { AtlasNodeProps, BaseItemTypeProps, CraftingBenchOptionsProps, ModProps } from "schema";
    import AtlasNode from "containers/AtlasNode";
    import Item from "containers/item/Item";
    import MasterBenchOption from "generators/MasterBenchOption";
    import Mod from "mods/Mod";
    import PropsTable from "helpers/PropsTable";
    export const createAtlasNodes: (props: AtlasNodeProps[]) => PropsTable<AtlasNodeProps, AtlasNode>;
    export const createItems: (props: BaseItemTypeProps[]) => PropsTable<BaseItemTypeProps, Item>;
    export const createMasterBenchOptions: (props: CraftingBenchOptionsProps[]) => PropsTable<CraftingBenchOptionsProps, MasterBenchOption>;
    export const createMods: (props: ModProps[]) => PropsTable<ModProps, Mod>;
}
declare module "index" {
    export { default as Stat } from "calculator/Stat";
    export { default as ValueRange } from "calculator/ValueRange";
    export { default as Generator, GeneratorDetails } from "generators/Generator";
    export { default as Container } from "containers/Container";
    export { Flags } from "util/index";
    export { Alchemy, Alteration, Annulment, Augment, Chaos, EnchantmentBench, Exalted, Regal, Scouring, Talisman, Transmute, Vaal, ItemShowcase, MasterBenchOption, Sextant } from "generators/index";
    export { AtlasNode, Item } from "containers/index";
    export { Mod } from "mods/index";
    export { default as Atlas } from "helpers/Atlas";
    export { default as MasterBench } from "helpers/MasterBench";
    export { createAtlasNodes, createItems, createMasterBenchOptions, createMods } from "helpers/createTables";
    export { anySet } from "util/index";
}
