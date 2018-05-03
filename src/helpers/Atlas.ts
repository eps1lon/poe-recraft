import AtlasNode from '../containers/AtlasNode';
import Sextant from '../generators/Sextant';
import Mod from '../mods/Mod';
import { AtlasNodeProps } from '../schema';
import { GeneratorDetails } from '../generators/Generator';

export type HumanId = string;
export type AtlasNodes = Map<HumanId, AtlasNode>;
export interface Builder {
  nodes: AtlasNodes;
}

type AtlasSextant = Sextant; // sextant.atlas defined

/**
 * immutable data structure for the atlas in Path of Exile
 *
 * main purpose is for reducer like usage in redux
 */
export default class Atlas {
  public static buildLookupTable(atlas: AtlasNodeProps[]): AtlasNodes {
    return atlas.reduce((nodes, props) => {
      return nodes.set(props.world_area.id, new AtlasNode([], props));
    }, new Map());
  }

  public static build(atlas: AtlasNodeProps[]): Atlas {
    const nodes: AtlasNodes = Atlas.buildLookupTable(atlas);

    return new Atlas(nodes);
  }

  public static withBuilder(builder: Builder): Atlas {
    return new Atlas(builder.nodes);
  }

  public readonly nodes: AtlasNodes;

  constructor(nodes: AtlasNodes) {
    this.nodes = nodes;
  }

  // TODO in the future use [Symbol.iterator]()
  public asArray(): AtlasNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * wrapper for map get that ensures a node or throws
   */
  public get(world_area_id: string): AtlasNode {
    const node = this.nodes.get(world_area_id);

    if (node == null) {
      throw new Error(`IndexError: '${world_area_id}' not found`);
    }

    return node;
  }

  public builder(): Builder {
    return {
      nodes: this.nodes,
    };
  }

  /**
   * batch mutations
   *
   * if the returned object is strict equal to the prev one
   * it doesn't return a new copy
   */
  public withMutations(mutate: (builder: Builder) => Builder): this {
    const prev = this.builder();
    const next = mutate(prev);

    if (prev !== next) {
      // @ts-ignore
      return this.constructor.withBuilder(next);
    } else {
      return this;
    }
  }

  /**
   * removes mods on all maps
   *
   * always returns a new copy
   */
  public reset(): this {
    return this.withMutations(({ nodes, ...builder }) => {
      return {
        ...builder,
        nodes: Atlas.buildLookupTable(
          this.asArray().map(node => node.removeAllMods().props),
        ),
      };
    });
  }

  public addMod(mod: Mod, world_area_id: string): this {
    return this.mutateNode(world_area_id, node => node.addMod(mod));
  }

  public removeMod(mod: Mod, world_area_id: HumanId): this {
    return this.mutateNode(world_area_id, node => node.removeMod(mod));
  }

  public mutateNode(
    world_area_id: string,
    mutate: (node: AtlasNode) => AtlasNode,
  ): this {
    const target = this.get(world_area_id);
    const mutated = mutate(target);

    if (target === mutated) {
      return this;
    } else {
      return this.withMutations(({ nodes, ...builder }) => {
        return {
          ...builder,
          nodes: new Map(nodes).set(world_area_id, mutated),
        };
      });
    }
  }

  public applySextant(sextant: Sextant, world_area_id: string): this {
    const sextant_on_atlas = this.prepareSextant(sextant);

    return this.mutateNode(world_area_id, node =>
      sextant_on_atlas.applyTo(node),
    );
  }

  public modsFor(
    sextant: Sextant,
    world_area_id: string,
  ): Array<GeneratorDetails<Mod>> {
    const sextant_on_atlas = this.prepareSextant(sextant);

    return sextant_on_atlas.modsFor(this.get(world_area_id));
  }

  public blockedMods(world_area_id: string): Mod[] {
    const target = this.get(world_area_id);

    return Sextant.blockedMods(target, this.asArray());
  }

  private prepareSextant(sextant: Sextant): AtlasSextant {
    const clone = new Sextant(sextant.mods);

    clone.type = sextant.type;
    clone.atlas = this.asArray();

    return clone;
  }
}
