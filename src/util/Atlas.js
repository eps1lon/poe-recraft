// @flow
import { AtlasNode } from '../containers';
import { Sextant } from '../generators';
import { type Mod } from '../mods';
import { type AtlasNodeProps } from '../schema';

type AtlasNodeId = string;

type AtlasNodes = Map<AtlasNodeId, AtlasNode>;

type Builder = {
  nodes: AtlasNodes,
};

type AtlasSextant = Sextant; // sextant.atlas defined

/**
 * immutable data structure for the atlas in Path of Exile
 * 
 * main purpose is for reducer like usage in redux
 */
export default class Atlas {
  static nodeId(node: AtlasNodeProps): AtlasNodeId {
    return node.world_area.id.replace(/MapAtlas/, '');
  }

  static buildLookupTable(atlas: AtlasNodeProps[]): AtlasNodes {
    return atlas.reduce((nodes, props) => {
      return nodes.set(Atlas.nodeId(props), new AtlasNode([], props));
    }, new Map());
  }

  static build(atlas: AtlasNodeProps[]): Atlas {
    const nodes: AtlasNodes = Atlas.buildLookupTable(atlas);

    return new Atlas(nodes);
  }

  static withBuilder(builder: Builder): Atlas {
    return new Atlas(builder.nodes);
  }

  +nodes: AtlasNodes;

  constructor(nodes: AtlasNodes) {
    (this: any).nodes = nodes;
  }

  // TODO in the future use [Symbol.iterator]()
  asArray(): AtlasNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * wrapper for map get that ensures a node or throws
   */
  get(id: AtlasNodeId): AtlasNode {
    const node = this.nodes.get(id);

    if (node == null) {
      throw new Error(`IndexError: '${id}' not found`);
    }

    return node;
  }

  builder(): Builder {
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
  withMutations(mutate: Builder => Builder): this {
    const prev = this.builder();
    const next = mutate(prev);

    if (prev !== next) {
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
  reset(): this {
    return this.withMutations(({ nodes, ...builder }) => {
      return {
        ...builder,
        nodes: Atlas.buildLookupTable(
          this.asArray().map(node => node.removeAllMods().props),
        ),
      };
    });
  }

  addMod(mod: Mod, node_id: AtlasNodeId): this {
    return this.mutateNode(node_id, node => node.addMod(mod));
  }

  removeMod(mod: Mod, node_id: AtlasNodeId): this {
    return this.mutateNode(node_id, node => node.removeMod(mod));
  }

  mutateNode(node_id: AtlasNodeId, mutate: AtlasNode => AtlasNode): this {
    const target = this.get(node_id);
    const mutated = mutate(target);

    if (target === mutated) {
      return this;
    } else {
      return this.withMutations(({ nodes, ...builder }) => {
        return {
          ...builder,
          nodes: new Map(nodes).set(node_id, mutated),
        };
      });
    }
  }

  applySextant(sextant: Sextant, node_id: AtlasNodeId): this {
    const sextant_on_atlas = this.prepareSextant(sextant);

    return this.mutateNode(node_id, node => sextant_on_atlas.applyTo(node));
  }

  modsFor(sextant: Sextant, node_id: AtlasNodeId) {
    const sextant_on_atlas = this.prepareSextant(sextant);

    return sextant_on_atlas.modsFor(this.get(node_id));
  }

  blockedMods(node_id: AtlasNodeId): Mod[] {
    const target = this.get(node_id);

    return Sextant.blockedMods(target, this.asArray());
  }

  // private

  prepareSextant(sextant: Sextant): AtlasSextant {
    const clone = new Sextant(sextant.mods);

    clone.type = sextant.type;
    clone.atlas = this.asArray();

    return clone;
  }
}
