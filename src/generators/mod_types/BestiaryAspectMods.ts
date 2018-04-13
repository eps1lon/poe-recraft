import ViewOnlyOrb from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps } from '../../schema';

/**
 * Generator for all mods that are possible of the item is an Elder item
 */
export default class BestiaryAspectMods extends ViewOnlyOrb {
  /**
   * list of mods that can no longer appear in master vendor
   */
  public static readonly ASPECT_MODS: Set<Mod['props']['id']> = new Set([
    'GrantsCatAspect1',
    'GrantsBirdAspect1_',
    'GrantsSpiderAspect1',
    'GrantsCrabAspect1_',
  ]);

  public static build(mods: ModProps[]): BestiaryAspectMods {
    return new BestiaryAspectMods(
      mods
        .filter(BestiaryAspectMods.isBestiaryAspect)
        .map(props => new Mod(props)),
    );
  }

  /**
   * 
   * @param mod 
   * @returns true if the mod can only crafted with the Blood Altar from a
   *          Spirit Beast
   */
  public static isBestiaryAspect(mod: ModProps) {
    return BestiaryAspectMods.ASPECT_MODS.has(mod.id);
  }

  public modsFor(item: Item, whitelist: string[] = []) {
    // omit everything spawnable related. crafting is deterministic
    return super
      .modsFor(item, whitelist.concat('no_matching_tags', 'spawnweight_zero'))
      .map(({ spawnable, spawnweight, ...details }) => details);
  }
}
