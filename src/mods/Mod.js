// @flow
import { type Buildable } from '../interfaces/Buildable';
import { type Taggable } from '../interfaces/Taggable';
import type { ModProps, SpawnWeightProps } from '../schema';

import Stat from '../util/Stat';

export default class Mod implements Buildable<ModProps> {
  static DOMAIN = {
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

  static TYPE = {
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

  static build(props: ModProps) {
    return new this(props);
  }

  +props: ModProps;

  constructor(props: ModProps) {
    // Covariant property `option` incompatible with contravariant use in
    (this: any).props = props;
  }

  isType(type: string) {
    return this.props.generation_type === Mod.TYPE[type.toUpperCase()];
  }

  isPrefix() {
    return this.isType('prefix');
  }

  isSuffix() {
    return this.isType('suffix');
  }

  isEnchantment() {
    return this.isType('enchantment');
  }

  isPremade() {
    return this.isType('premade');
  }

  isAffix() {
    return this.isPrefix() || this.isSuffix();
  }

  isMasterMod(): boolean {
    return this.props.domain === Mod.DOMAIN.MASTER;
  }

  implicitCandidate() {
    return (
      this.isPremade() || this.isType('vaal') || this.isType('enchantment')
    );
  }

  statsJoined(): Stat[] {
    return this.props.stats.map((stat_props, i) => {
      const stat = new Stat(stat_props, [
        +this.props[`stat${i + 1}_min`],
        +this.props[`stat${i + 1}_max`],
      ]);

      return stat;
    });
  }

  /**
   * string identifier of the generation type
   */
  modType(): ?string {
    const entry = Object.entries(Mod.TYPE).find(([, type]) => {
      return this.props.generation_type === type;
    });

    if (entry === undefined) {
      return undefined;
    } else {
      return entry[0].toLowerCase();
    }
  }

  requiredLevel(): number {
    return Math.floor(this.props.level * 0.8);
  }

  spawnweightPropsFor(other: Taggable): ?SpawnWeightProps {
    const { spawn_weights } = this.props;
    const other_tags = other.getTags();

    const match = spawn_weights.find(({ tag }) =>
      other_tags.find(item_tag => tag.primary === item_tag.primary),
    );

    if (match == null) {
      const default_spawnweight = spawn_weights.find(
        ({ tag }) => tag.primary === 0,
      );

      return default_spawnweight;
    } else {
      return match;
    }
  }

  spawnweightFor(other: Taggable): number {
    const spawnweight = this.spawnweightPropsFor(other);

    if (spawnweight == null) {
      return 0;
    } else {
      return spawnweight.value;
    }
  }
}
