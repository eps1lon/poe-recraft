// @flow
import type { ModProps } from '../schema';

import Stat from '../util/Stat';

export default class Mod {
  static DOMAIN = {
    ITEM: 1,
    FLASK: 2,
    MONSTER: 3,
    STRONGBOX: 4,
    MAP: 5,
    STANCE: 9,
    MASTER: 10,
    JEWEL: 11,
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
}
