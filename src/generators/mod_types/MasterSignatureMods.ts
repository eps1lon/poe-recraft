import ViewOnlyOrb from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps } from '../../schema';
import { anySet } from '../../util';

/**
 * Generator for all mods that are possible of the item is an Elder item
 */
export default class MasterSignatureMods extends ViewOnlyOrb {
  /**
   * mapping from mod id to master id
   * 
   * we need to know what master vendor can spawn the mods because the vendor
   * tells us what itemclasses can appear
   */
  public static readonly MOD_MASTER: { [key: string]: string } = {
    // Leo
    AllDamageMasterVendorItem: 'pvp',
    // Zana
    MapQuantityAddedAsRarityVendorItem: 'str_dex_int',
    // Catarina
    LocalIncreaseSocketedSupportGemLevelIntMasterVendorItem: 'int',
    // Vorici
    LifeLeechSpeedDexIntMasterVendorItem: 'dex_int',
    // Haku
    SocketedGemQualityStrMasterVendorItem: 'str',
    // Tora
    BleedOnHitGainedDexMasterVendorItemUpdated_: 'dex',
    // Vagan
    AlwaysHitsStrDexMasterVendorItem: 'str_dex',
    // Elreon
    ReduceGlobalFlatManaCostStrIntMasterVendor: 'str_int',
  };

  /**
   * mapping from master id to a filter function that returns true if it could've
   * sold the given item
   * 
   * TODO required level? Do master sell the best bases e.g. Hubris Circlets
   */
  public static readonly MASTER_ITEMCLASSES: {
    [key: string]: (item: Item) => boolean;
  } = {
    // Leo
    pvp: item => ['Amulet', 'Ring', 'Belt'].includes(item.baseitem.item_class),
    // Zana
    str_dex_int: item => ['Map'].includes(item.baseitem.item_class),
    // Catarina TODO: es bases only?
    int: item =>
      ['Helmet', 'Dagger', 'Wand', 'Sceptre'].includes(
        item.baseitem.item_class,
      ) || isSpiritShield(item),
    // Vorici
    dex_int: item => ['Gloves', 'Amulet'].includes(item.baseitem.item_class),
    // Haku
    str: item =>
      item.meta_data.isA('AbstractOneHandWeapon') ||
      item.meta_data.isA('AbstractTwoHandWeapon'),
    // Tora
    dex: item => ['Bow'].includes(item.baseitem.item_class),
    // Vagan: 1H/2H melee weapon
    str_dex: item =>
      [
        'One Hand Axe',
        'One Hand Mace',
        'One Hand Sword',
        'Thrusting One Hand Sword',
        'Sceptre',
        'Dagger',
        'Claw',
        'Two Hand Axe',
        'Two Hand Mace',
        'Two Hand Sword',
        'Staff',
      ].includes(item.baseitem.item_class),
    // Elreon
    str_int: item => ['Ring', 'Amulet'].includes(item.baseitem.item_class),
  };

  public static build(mods: ModProps[]): MasterSignatureMods {
    return new MasterSignatureMods(
      mods
        .filter(MasterSignatureMods.isMasterSignature)
        .map(props => new Mod(props)),
    );
  }

  /**
   * 
   * @param mod 
   * @returns true if the mod can only be found on items bought from masters
   */
  public static isMasterSignature(mod: ModProps) {
    return MasterSignatureMods.MOD_MASTER[mod.id] !== undefined;
  }

  /**
   * @param item 
   * @param whitelist
   */
  public modsFor(item: Item, whitelist: string[] = []) {
    // basically ignore spawnweight
    const whitelist_spawnable = whitelist.concat(
      'no_matching_tags',
      'spawnweight_zero',
    );

    return super
      .modsFor(item, whitelist_spawnable)
      .map(details => {
        const { mod } = details;
        const master = MasterSignatureMods.MOD_MASTER[mod.props.id];
        if (master === undefined) {
          // should not happen unless MOD_MASTER was changed
          throw new Error(`no master found for '${mod.props.id}'`);
        }

        const sellsItem = MasterSignatureMods.MASTER_ITEMCLASSES[master];
        if (sellsItem === undefined) {
          // should not happen unless MASTER_ITEMCLASSES was changed
          throw new Error(`no itemclasses given for '${master}'`);
        }

        return {
          ...details,
          applicable: {
            ...details.applicable,
            not_buyable: !sellsItem(item),
          },
        };
      })
      .filter(({ applicable }) => !anySet(applicable, whitelist_spawnable));
  }
}

function isSpiritShield(item: Item): boolean {
  return (
    item.baseitem.item_class === 'Shield' &&
    item.baseitem.tags.includes('focus')
  );
}
