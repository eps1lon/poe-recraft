import { GeneratorDetails } from '../Generator';
import ViewOnlyOrb from '../ViewOnlyOrb';
import Item from '../../containers/item';
import { Mod } from '../../mods';
import { ModProps } from '../../schema';

/**
 * Generator for all mods that can be crafted at the Blood Altar with Spirit Beasts
 */
export default class BestiaryAspectMods extends ViewOnlyOrb {
  /**
   * list of mod ids that can be crafted with Spirit Beasts
   */
  public static readonly ASPECT_MODS: Set<Mod['props']['id']> = new Set([
    'GrantsCatAspectCrafted',
    'GrantsBirdAspectCrafted',
    'GrantsSpiderAspectCrafted',
    'GrantsCrabAspectCrafted',
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
  public static isBestiaryAspect(mod: ModProps): boolean {
    return BestiaryAspectMods.ASPECT_MODS.has(mod.id);
  }

  public modsFor(
    item: Item,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    // omit everything spawnable related. crafting is deterministic
    return super
      .modsFor(item, whitelist.concat('no_matching_tags', 'spawnweight_zero'))
      .map(({ spawnable, spawnweight, ...details }) => details);
  }
}
