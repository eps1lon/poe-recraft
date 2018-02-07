// @flow
import AtlasNode from '../containers/AtlasNode';
import Mod from '../mods/Mod';
import { ModProps } from '../schema';
import { Flags, anySet } from '../util/Flags';

import Orb, {
  SpawnableFlag as BaseSpawnableFlag,
  SpawnableFlags as BaseSpawnableFlags,
} from './Orb';

export interface SpawnableFlags extends BaseSpawnableFlags {
  no_adjacents_with_spawnweight: boolean;
}
export type SpawnableFlag = keyof SpawnableFlags;

export interface ApplicableFlags extends Flags {
  wrong_tier_group: boolean;
}
export type ApplicableFlag = keyof ApplicableFlags;

export class ContextUndefined extends Error {
  constructor(context: string) {
    super(`context not set, set ${context}`);
  }
}

export class CorruptedState extends Error {
  constructor(message: string) {
    super(`corrupted state: ${message}`);
  }
}

enum Type {
  apprentice = 1,
  journeyman = 2,
  master = 3,
}

export default class Sextant extends Orb<AtlasNode> {
  static type = Type;

  static modFilter(mod: ModProps): boolean {
    return super.modFilter(mod) && mod.domain === Mod.DOMAIN.ATLAS;
  }

  static build(mods: ModProps[]): Sextant {
    return new Sextant(this.buildMods(mods));
  }

  /**
   * creates a list of mod that are either
   * a) already applied to this node because they are directly in range
   * b) already applied to adjacent nodes and would create duplicates if applied
   *    to this node
   * in other words: consider every mod from maps within a sextant distance of 2
   * @param {AtlasNode} node 
   * @param {AtlasNode[]} atlas 
   */
  static blockedMods(target: AtlasNode, atlas: AtlasNode[]): Mod[] {
    return target
      .inSextantRange(atlas, 1)
      .reduce(
        (mods, secondary) => mods.concat(secondary.getAllMods(atlas)),
        [] as Mod[],
      );
  }

  atlas: AtlasNode[] | undefined;
  type: Type = Type.master;

  applyTo(node: AtlasNode): AtlasNode {
    if (!anySet(this.applicableTo(node))) {
      const rolled = super.rollMod(node.removeAllMods());

      if (rolled !== node) {
        // something change
        // reset the context to signal that it has to be mutated
        this.atlas = undefined;
      }

      return rolled;
    } else {
      return node;
    }
  }

  // applicable to any node for now
  // eslint-disable-next-line no-unused-vars
  applicableTo(node: AtlasNode): ApplicableFlags {
    const applicable_flags = {
      wrong_tier_group: false,
    };

    const area_ranges = {
      [Type.apprentice]: 72,
      [Type.journeyman]: 77,
      [Type.master]: 84,
    };

    applicable_flags.wrong_tier_group =
      node.props.world_area.area_level > area_ranges[this.type];

    return applicable_flags;
  }

  // I'm not sure how it determines the spawnweight
  // For example a map with no_monster_packs can still roll
  // a mod with spawnweight 0 for no_monster_packs if adjacent maps can roll it
  // I don't know which spawnweight it chooses though if
  // it can choose between multiple weights
  // for now we just search the adjacents if its 0 and pick first we find
  findAdjacentWithSpawnweight(
    mod: Mod,
    node: AtlasNode,
  ): AtlasNode | undefined {
    if (this.atlas == null) throw new ContextUndefined('atlas');

    return node.inSextantRange(this.atlas).find(other => {
      return mod.spawnweightFor(other) > 0;
    });
  }

  isModSpawnableOn(mod: Mod, node: AtlasNode): SpawnableFlags {
    const spawnable_flags = {
      ...super.isModSpawnableOn(mod, node),
      no_adjacents_with_spawnweight: false,
    };

    if (spawnable_flags.spawnweight_zero) {
      const adjacent_with_spawnweight = this.findAdjacentWithSpawnweight(
        mod,
        node,
      );

      if (adjacent_with_spawnweight === undefined) {
        spawnable_flags.no_adjacents_with_spawnweight = true;
      } else {
        spawnable_flags.spawnweight_zero = false;
      }
    }

    return spawnable_flags;
  }

  modsFor(node: AtlasNode, whitelist: string[] = []) {
    if (this.atlas == null) throw new ContextUndefined('atlas');

    const blocked = Sextant.blockedMods(node, this.atlas);

    return super
      .modsFor(node, whitelist)
      .filter(({ mod }) => {
        const is_blocked = blocked.includes(mod);

        return !is_blocked;
      })
      .map(({ spawnable, spawnweight, mod, ...details }) => {
        if (spawnable === undefined || spawnweight === undefined) {
          throw new Error('spawnable is undefined');
        }

        let spawnweight_with_adjacents: number = spawnweight;

        if (spawnweight === 0 && !spawnable.spawnweight_zero) {
          // see Sextant.isModSpawnableOn
          // we took the spawnweight from an adjacent node
          const adjacent_with_spawnweight = this.findAdjacentWithSpawnweight(
            mod,
            node,
          );

          // this shouldn't be happening spawnweight should be > 0
          // if the flag is not set. only exception is whitelist
          const corrupted_state =
            adjacent_with_spawnweight == null &&
            !whitelist.includes('spawnweight_zero');

          if (corrupted_state) {
            throw new CorruptedState(
              'spawnweight should be > 0 if spawnweight_zero is false',
            );
          } else if (adjacent_with_spawnweight != null) {
            // we need to assure Flow that whitelist.includes didnt
            // mutate adjacent_with_spawnweight although we wouldnt care about
            // it because we dont care if it went from null > any
            // we just need to be sure that it didnt go from any > null
            // and this is given since it's the first check in the expression
            spawnweight_with_adjacents = mod.spawnweightFor(
              adjacent_with_spawnweight,
            );
          }
        }

        return {
          mod,
          spawnable,
          spawnweight: spawnweight_with_adjacents,
          ...details,
        };
      });
  }
}
