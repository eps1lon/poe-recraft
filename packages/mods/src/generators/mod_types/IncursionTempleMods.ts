import ViewOnlyOrb, {
  SpawnableFlags as BaseSpawnableFlags,
} from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps, ItemClassId } from '../../schema';

export interface SpawnableFlags extends BaseSpawnableFlags {
  not_matching_itemclass: boolean;
}
export type SpawnableFlag = keyof SpawnableFlags;

/**
 * Generator for all mods that can be crafted at the Blood Altar with Spirit Beasts
 */
export default class IncursionTempleMods extends ViewOnlyOrb {
  public static build(mods: ModProps[]): IncursionTempleMods {
    return new IncursionTempleMods(
      mods.filter(IncursionTempleMods.isTempleMod).map(props => new Mod(props)),
    );
  }

  /**
   *
   * @param mod
   * @returns true if cab only be found in T3 temple chests
   */
  public static isTempleMod(mod: ModProps): boolean {
    return /Enhanced.*Mod/.test(mod.id);
  }

  /**
   * @override
   *
   * super call with the addition of item class check
   * mods are assigned to certain itemclasses which is determined
   * in {itemclassModIds()}
   *
   * @param mod
   * @param item
   * @returns {SpawnableFlags}
   */
  public isModSpawnableOn(mod: Mod, item: Item): SpawnableFlags {
    const mod_ids = this.itemclassModIds(item.baseitem
      .item_class as ItemClassId);
    const not_matching_itemclass = !mod_ids.includes(mod.props.id);

    return {
      ...super.isModSpawnableOn(mod, item),
      not_matching_itemclass,
    };
  }

  /**
   * @override
   *
   * We assume that every mod has the same chance
   *
   * @param mod
   * @param item
   * @returns {number | undefined}
   */
  public spawnweightFor(mod: Mod, item: Item): number | undefined {
    // assume they are evenly distributed
    return 1000;
  }

  private itemclassModIds(item_class: ItemClassId): string[] {
    switch (item_class) {
      case 'Helmet':
        return [
          // of Puhuarte
          'FireResistEnhancedModPhys_',
          'ColdResistEnhancedModPhys',
          'LightningResistEnhancedModPhys',
          // Xopec's
          'IncreasedManaEnhancedModPercent',
          'IncreasedManaEnhancedModReservation',
        ];
      case 'Boots':
        return [
          // Matatl's
          'MovementVelocityEnhancedModSpeed',
          'MovementVelocityEnhancedModDodge_',
          'MovementVelocityEnhancedModSpellDodge_',
          // Xopec's
          'IncreasedManaEnhancedModPercent',
        ];
      case 'Gloves':
        return [
          // Xopec's
          'IncreasedManaEnhancedModPercent',
          // Topotante's
          'AddedFireDamageEnhancedMod',
          'AddedColdDamageEnhancedMod',
          'AddedLightningDamageEnhancedMod',
          // of Puhuarte
          'FireResistEnhancedModAilments',
          'ColdResistEnhancedModAilments__',
          'LightningResistEnhancedModAilments',
        ];
      case 'Body Armour':
        return [
          // of Tacati
          'ChaosResistEnhancedMod_',
          // Guatelitzi's
          'IncreasedLifeEnhancedBodyMod___',
        ];
      case 'Shield':
        return [
          // of Tacati
          'ChaosResistEnhancedMod_',
          // Topotante's
          'FireDamagePrefixOnWeaponEnhancedMod',
          'ColdDamagePrefixOnWeaponEnhancedMod',
          'LightningDamagePrefixOnWeaponEnhancedMod_',
        ];
      case 'Dagger':
        return [
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
          // of Tacati
          'LocalIncreasedAttackSpeedEnhancedMod',
          'PoisonDurationEnhancedMod',
          'ChanceToPoisonEnhancedMod',
          'PoisonDamageEnhancedAttacksMod',
          'PoisonDamageEnhancedSpellsMod',
          // Topotante's
          'LocalAddedFireDamageEnhancedMod_',
          'LocalAddedColdDamageEnhancedMod',
          'LocalAddedLightningDamageEnhancedMod',
          // Matatl's
          'TrapDamageOnWeaponEnhancedMod',
          'LocalIncreaseSocketedTrapGemLevelEnhancedMod_',
          // of Matatl
          'TrapThrowSpeedEnhancedMod',
          'TrapCooldownRecoveryAndDurationEnhancedMod',
          'TrapAreaOfEffectEnhancedMod_',
        ];
      case 'Claw':
      case 'Thrusting One Hand Sword':
      case 'One Hand Sword':
        return [
          // Topotante's
          'LocalAddedFireDamageEnhancedMod_',
          'LocalAddedColdDamageEnhancedMod',
          'LocalAddedLightningDamageEnhancedMod',
          // of Tacati
          'LocalIncreasedAttackSpeedEnhancedMod',
          'PoisonDurationEnhancedMod',
          'ChanceToPoisonEnhancedMod',
          'PoisonDamageEnhancedAttacksMod',
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
        ];
      case 'One Hand Mace':
      case 'One Hand Axe':
        return [
          // Topotante's
          'LocalAddedFireDamageEnhancedMod_',
          'LocalAddedColdDamageEnhancedMod',
          'LocalAddedLightningDamageEnhancedMod',
          // of Tacati
          'LocalIncreasedAttackSpeedEnhancedMod',
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
        ];
      case 'Sceptre':
      case 'Wand':
        return [
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
          'SpellDamageOnWeaponEnhancedMod',
          // of Tacati
          'IncreasedCastSpeedEnhancedMod_',
          'LocalIncreasedAttackSpeedRangedEnhancedMod_',
          // Topotante's
          'LocalAddedFireDamageEnhancedMod_',
          'LocalAddedColdDamageEnhancedMod',
          'LocalAddedLightningDamageEnhancedMod',
          'FireDamagePrefixOnWeaponEnhancedMod',
          'ColdDamagePrefixOnWeaponEnhancedMod',
          'LightningDamagePrefixOnWeaponEnhancedMod_',
          // Matatl's
          'TrapDamageOnWeaponEnhancedMod',
          'LocalIncreaseSocketedTrapGemLevelEnhancedMod_',
          // of Matatl
          'TrapThrowSpeedEnhancedMod',
          'TrapCooldownRecoveryAndDurationEnhancedMod',
          'TrapAreaOfEffectEnhancedMod_',
          // Citaqualotl's
          'MinionDamageOnWeaponEnhancedMod__',
          'LocalIncreaseSocketedMinionGemLevelEnhancedMod',
          // of of Citaqualotl
          'MinionAttackAndCastSpeedEnhancedMod',
          'MinionDurationEnhancedMod_',
        ];
      case 'Two Hand Axe':
      case 'Two Hand Mace':
        return [
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
          // of Tacati
          'LocalIncreasedAttackSpeedEnhancedMod',
          // Topotante's
          'LocalAddedFireDamageEnhancedTwoHandMod',
          'LocalAddedColdDamageEnhancedTwoHandMod',
          'LocalAddedLightningDamageEnhancedTwoHandMod',
        ];
      case 'Two Hand Sword':
        return [
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
          // of Tacati
          'LocalIncreasedAttackSpeedEnhancedMod',
          'PoisonDurationEnhancedMod',
          'ChanceToPoisonEnhancedMod',
          'PoisonDamageEnhancedAttacksMod',
          // Topotante's
          'LocalAddedFireDamageEnhancedTwoHandMod',
          'LocalAddedColdDamageEnhancedTwoHandMod',
          'LocalAddedLightningDamageEnhancedTwoHandMod',
        ];
      case 'Bow':
        return [
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
          // of Tacati
          'LocalIncreasedAttackSpeedRangedEnhancedMod_',
          'PoisonDurationEnhancedMod',
          'ChanceToPoisonEnhancedMod',
          'PoisonDamageEnhancedAttacksMod',
          // Topotante's
          'LocalAddedFireDamageEnhancedTwoHandMod',
          'LocalAddedColdDamageEnhancedTwoHandMod',
          'LocalAddedLightningDamageEnhancedTwoHandMod',
        ];
      case 'Staff':
        return [
          // Tacati's
          'LocalIncreasedPhysicalDamageEnhancedMod',
          'SpellDamageOnTwoHandWeaponEnhancedMod',
          // of Tacati
          'IncreasedCastSpeedTwoHandEnhancedMod',
          // Topotante's
          'LocalAddedFireDamageEnhancedTwoHandMod',
          'LocalAddedColdDamageEnhancedTwoHandMod',
          'LocalAddedLightningDamageEnhancedTwoHandMod',
          'FireDamagePrefixOnTwoHandWeaponEnhancedMod',
          'ColdDamagePrefixOnTwoHandWeaponEnhancedMod',
          'LightningDamagePrefixOnTwoHandWeaponEnhancedMod',
          // Matatl's
          'TrapDamageOnTwoHandWeaponEnhancedMod',
          'LocalIncreaseSocketedTrapGemLevelEnhancedMod_',
          // of Matatl
          'TrapThrowSpeedEnhancedMod',
          'TrapCooldownRecoveryAndDurationEnhancedMod',
          'TrapAreaOfEffectEnhancedMod_',
          // Citaqualotl's
          'MinionDamageOnTwoHandWeaponEnhancedMod',
          'LocalIncreaseSocketedMinionGemLevelEnhancedMod',
          // of of Citaqualotl
          'MinionAttackAndCastSpeedEnhancedMod',
          'MinionDurationEnhancedMod_',
        ];
      case 'Amulet':
        return [
          // Xopec's
          'IncreasedManaEnhancedModOnHit_',
          'IncreasedManaEnhancedModRegen',
          // of Puhuarte
          'FireResistEnhancedModLeech',
          'ColdResistEnhancedModLeech',
          'LightningResistEnhancedModLeech_',
          // Guatelitzi's
          'IncreasedLifeEnhancedMod',
          'IncreasedEnergyShieldEnhancedModES',
          'IncreasedEnergyShieldEnhancedModRegen_',
          // of Guatelitzi
          'LifeRegenerationEnhancedMod',
        ];
      case 'Ring':
        return [
          // Xopec's
          'IncreasedManaEnhancedModOnHit_',
          'IncreasedManaEnhancedModRegen',
          'IncreasedManaEnhancedModCost',
          // Guatelitzi's
          'IncreasedLifeEnhancedMod',
          'IncreasedEnergyShieldEnhancedModES',
          'IncreasedEnergyShieldEnhancedModRegen_',
          // of Guatelitzi
          'LifeRegenerationEnhancedMod',
        ];
      case 'Belt':
        return [
          // Guatelitzi's
          'IncreasedLifeEnhancedMod',
          'IncreasedEnergyShieldEnhancedModES',
          'IncreasedEnergyShieldEnhancedModRegen_',
          // of Guatelitzi
          'LifeRegenerationEnhancedMod',
        ];
      default:
        return [];
    }
  }
}
