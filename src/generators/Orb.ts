import Container from '../containers/Container';
import { ModProps } from '../schema';
import { Mod } from '../mods';
import { Flags, anySet } from '../util/Flags';
import { choose } from '../util/rng';

import Generator, { GeneratorDetails } from './Generator';

export interface SpawnableFlags extends Flags {
  no_matching_tags: boolean;
  spawnweight_zero: boolean;
}
export type SpawnableFlag = keyof SpawnableFlags;

/**
 * @abstract
 * a Generator that randomly rolls one of its mods
 * ignores mods that have no spawnweight or 0 spawnweight for every tag
 */
export default abstract class Orb<C extends Container<any>> extends Generator<
  Mod,
  C
> {
  public static modFilter(mod: ModProps): boolean {
    return (
      mod.spawn_weights.length > 0 &&
      mod.spawn_weights.some(({ value }) => value > 0)
    );
  }

  public static buildMods(mods: ModProps[]): Mod[] {
    return mods
      .filter(props => this.modFilter(props))
      .map(props => new Mod(props));
  }

  public chooseMod(container: C): Mod | undefined {
    const details: Array<GeneratorDetails<Mod>> = this.modsFor(container);
    const detail = choose(details, other => {
      if (other.spawnweight == null) {
        throw new Error('optional spawnweight not allowed when choosing');
      }

      return other.spawnweight;
    });

    if (detail != null) {
      return detail.mod;
    } else {
      return undefined;
    }
  }

  /**
   * adds a mod from chooseMod ignoring if it's applicable
   * @param {Item} item
   */
  public rollMod(container: C): C {
    const mod = this.chooseMod(container);
    if (mod != null) {
      return container.addMod(mod);
    } else {
      return container;
    }
  }

  public isModSpawnableOn(mod: Mod, container: C): SpawnableFlags {
    const spawnable_flags: SpawnableFlags = {
      no_matching_tags: false,
      spawnweight_zero: false,
    };
    const spawnweight = this.spawnweightFor(mod, container);

    if (spawnweight == null) {
      // at first glance this shouldn't be happening
      // since every mod seems to have a spawnweight for the default
      // tag which every equipment seems to have
      spawnable_flags.no_matching_tags = true;
    } else if (spawnweight <= 0) {
      spawnable_flags.spawnweight_zero = true;
    }

    return spawnable_flags;
  }

  public spawnweightFor(mod: Mod, container: C): number | undefined {
    const props = mod.spawnweightPropsFor(container);
    if (props == null) {
      return undefined;
    } else {
      return props.value;
    }
  }

  public modsFor(
    container: C,
    whitelist: string[] = [],
  ): Array<GeneratorDetails<Mod>> {
    const details: Array<GeneratorDetails<Mod>> = [];
    this.getAvailableMods().forEach(mod => {
      const applicable_flags = this.isModApplicableTo(mod, container);
      const spawnable_flags = this.isModSpawnableOn(mod, container);
      const spawnweight = this.spawnweightFor(mod, container);

      const is_applicable = !anySet(applicable_flags, whitelist);

      const is_spawnable = !anySet(spawnable_flags, whitelist);

      const is_rollable = is_applicable && is_spawnable;

      if (is_rollable) {
        details.push({
          mod,
          applicable: applicable_flags,
          spawnable: spawnable_flags,
          spawnweight,
        });
      }
    });

    return details;
  }
}
