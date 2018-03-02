import ItemProperties, {
  NumericProperty,
  Properties,
  Builder as BaseBuilder,
} from './Properties';
import Stat from '../../../../calculator/Stat';
import ValueRange, { ValueRangeLike } from '../../../../calculator/ValueRange';
import Value from '../../../../calculator/Value';
import { WeaponTypeProps } from '../../../../schema';

export interface WeaponProperties extends Properties {}

export type Builder = BaseBuilder;

export default class ItemWeaponProperties extends ItemProperties
  implements WeaponProperties {
  public physical_damage() {
    const { damage_min, damage_max } = this.weaponProps();
    return this.attackDamageRange(damage_min, damage_max, 'physical');
  }

  public chaos_damage() {
    return this.attackDamageRange(0, 0, 'chaos');
  }

  public cold_damage() {
    return this.attackDamageRange(0, 0, 'cold');
  }

  public fire_damage() {
    return this.attackDamageRange(0, 0, 'fire');
  }

  public lightning_damage() {
    return this.attackDamageRange(0, 0, 'lightning');
  }

  // attacks per 100s
  public attack_speed() {
    // speed is in ms, precision 2 => 1e5
    // seems to round ingame, see short bow test case
    return this.parent.computeValue(Math.round(1e5 / this.weaponProps().speed), [
      'local',
      'attack_speed',
    ]);
  }

  // crit() / 100 = crit%
  public crit() {
    return this.parent.computeValue(this.weaponProps().critical, [
      'local',
      'crit_chance',
    ]);
  }

  public weapon_range() {
    return this.parent.computeValue(this.weaponProps().range_max, [
      'local',
      'weapon_range',
    ]);
  }

  public any(): boolean {
    return super.any();
  }

  private weaponProps(): WeaponTypeProps {
    const { weapon_type } = this.parent.baseitem;
    if (weapon_type === undefined) {
      throw new Error('weapon_type not set in baseitem');
    }

    return weapon_type;
  }

  private attackDamageRange(min: number, max: number, type: string) {
    const classification = ['local', 'attack_damage', type];

    const base_min = new Value([min, min], [...classification, 'min']);
    const base_max = new Value([max, max], [...classification, 'max']);

    return {
      min: this.parent.computeValue(min, [...classification, 'min']),
      max: this.parent.computeValue(max, [...classification, 'max']),
    };
  }
}
