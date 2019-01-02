import { GeneratorDetails } from '../Generator';
import ViewOnlyOrb from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps } from '../../schema';

export type Faction = 'brinerot' | 'mutewind' | 'redblade' | 'renegade';

/**
 * Generator for all mods that can appear on items dropped by Warbands
 *
 * Each Faction of Warbands can drop a magic item that has a single Warbands
 * mod. The itemclass of that item depends on the faction
 */
export default class WarbandsMods extends ViewOnlyOrb {
  /**
   * mapping from Warband factions to their mods
   */
  public static readonly FACTION_MODS: {
    [faction in Faction]: Set<Mod['props']['id']>
  } = {
    brinerot: new Set(['DamageDuringFlaskEffectWarbands']),
    mutewind: new Set(['CannotBeFrozenWarbands']),
    redblade: new Set(['PhysicalDamageTakenAsFirePercentWarbands']),
    renegade: new Set([
      'FireResistancePenetrationWarbands',
      'LightningPenetrationWarbands',
      'ColdResistancePenetrationWarbands',
    ]),
  };

  /**
   * mapping from Warband factions to the item classes they can drop
   */
  public static readonly FACTION_ITEM_CLASSES: {
    // filter functions for each faction that check if a given item can
    // be dropped from that faction
    [faction in Faction]: (item: Item) => boolean
  } = {
    brinerot: item => item.baseitem.item_class === 'Gloves',
    mutewind: item => item.baseitem.item_class === 'Boots',
    redblade: item => item.baseitem.item_class === 'Helmet',
    renegade: item => item.meta_data.isA('AbstractWeapon'),
  };

  public static build(mods: ModProps[]): WarbandsMods {
    return new WarbandsMods(
      mods.filter(WarbandsMods.isWarbands).map(props => new Mod(props)),
    );
  }

  /**
   *
   * @param mod
   * @returns true if the mod can spawn on Warbands drops
   */
  public static isWarbands(mod: ModProps): boolean {
    return (
      Object.values(WarbandsMods.FACTION_MODS).find(mods =>
        mods.has(mod.id),
      ) !== undefined
    );
  }

  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    const faction = this.factionOf(item);
    if (faction === undefined) {
      return [];
    }

    // mod ids that are spawnable by the faction responsible for this itemclass
    const mod_ids = WarbandsMods.FACTION_MODS[faction];

    // omit everything spawnable related. crafting is deterministic
    return super
      .modsFor(item, whitelist.concat('no_matching_tags', 'spawnweight_zero'))
      .map(({ spawnable, spawnweight, ...details }) => details)
      .filter(({ mod }) => mod_ids.has(mod.props.id));
  }

  private factionOf(item: Item): Faction | undefined {
    const faction = Object.entries(WarbandsMods.FACTION_ITEM_CLASSES).find(
      ([, isDroppable]) => isDroppable(item),
    );

    if (faction === undefined) {
      return undefined;
    } else {
      return faction[0] as Faction;
    }
  }
}
