import { Taggable } from '../interfaces/Taggable';
import { ModProps, SpawnWeightProps, StatProps } from '../schema';
import Stat from '../calculator/Stat';
import { isKeyOf } from '../util/ts';

export default class Mod {
  public static DOMAIN = {
    ITEM: 1,
    FLASK: 2,
    MONSTER: 3,
    STRONGBOX: 4,
    MAP: 5,
    STANCE: 9,
    MASTER: 10,
    JEWEL: 11,
    ATLAS: 12,
    ABYSS_JEWEL: 14,
  };

  public static TYPE: { [key: string]: number } = {
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

  public static build(props: ModProps) {
    return new this(props);
  }

  public readonly props: ModProps;

  constructor(props: ModProps) {
    this.props = props;
  }

  public isType(type: string) {
    const t = type.toUpperCase();

    return t in Mod.TYPE && this.props.generation_type === Mod.TYPE[t];
  }

  public isPrefix() {
    return this.isType('prefix');
  }

  public isSuffix() {
    return this.isType('suffix');
  }

  public isEnchantment() {
    return this.isType('enchantment');
  }

  public isPremade() {
    return this.isType('premade');
  }

  public isAffix() {
    return this.isPrefix() || this.isSuffix();
  }

  public isMasterMod(): boolean {
    return this.props.domain === Mod.DOMAIN.MASTER;
  }

  public implicitCandidate() {
    return (
      this.isPremade() || this.isType('vaal') || this.isType('enchantment')
    );
  }

  public statsJoined(): Stat[] {
    return this.props.stats.map((stat_props, i) => {
      return this.nthStat(stat_props, i);
    });
  }

  /**
   * string identifier of the generation type
   */
  public modType(): string | undefined {
    const entry = Object.entries(Mod.TYPE).find(([, type]) => {
      return this.props.generation_type === type;
    });

    if (entry === undefined) {
      return undefined;
    } else {
      return entry[0].toLowerCase();
    }
  }

  public requiredLevel(): number {
    return Math.floor(this.props.level * 0.8);
  }

  public spawnweightPropsFor(other: Taggable): SpawnWeightProps | undefined {
    const { spawn_weights } = this.props;
    const other_tags = other.getTags();

    const match = spawn_weights.find(
      ({ tag }) => other_tags.find(item_tag => tag === item_tag) != null,
    );

    if (match == null) {
      const default_spawnweight = spawn_weights.find(
        ({ tag }) => tag === 'default',
      );

      return default_spawnweight;
    } else {
      return match;
    }
  }

  public spawnweightFor(other: Taggable): number {
    const spawnweight = this.spawnweightPropsFor(other);

    if (spawnweight == null) {
      return 0;
    } else {
      return spawnweight.value;
    }
  }

  public nthStat(stat_props: StatProps, n: number) {
    const min_key = `stat${n + 1}_min`;
    const max_key = `stat${n + 1}_max`;

    if (isKeyOf(min_key, this.props) && isKeyOf(max_key, this.props)) {
      const stat = new Stat(stat_props, [
        +this.props[min_key],
        +this.props[max_key],
      ]);

      return stat;
    }

    throw new Error(`${min_key} and ${max_key} not found in ModProps`);
  }
}
