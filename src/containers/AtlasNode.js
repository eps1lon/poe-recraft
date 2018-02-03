// @flow
import Mod from '../mods/Mod';
import { type AtlasNodeProps } from '../schema';

import ImmutableContainer from './ImmutableContainer';

export const SEXTANT_RANGE = 55; // http://poecraft.com/atlas has 55

export type Builder = {
  mods: Mod[],
  props: AtlasNodeProps,
};

type HumanId = string;

export default class AtlasNode extends ImmutableContainer<Mod, Builder> {
  static humanId(props: AtlasNodeProps): HumanId {
    return props.world_area.id.replace(/MapAtlas/, '');
  }

  props: AtlasNodeProps;

  static build(props: AtlasNodeProps) {
    return new AtlasNode([], props);
  }

  static withBuilder(builder: Builder): AtlasNode {
    return new AtlasNode(builder.mods, builder.props);
  }

  constructor(mods: Mod[], props: AtlasNodeProps) {
    super(mods);

    this.props = props;
  }

  builder(): Builder {
    return {
      mods: this.mods,
      props: this.props,
    };
  }

  /**
   * returns a list of nodes with sextant distance <= depth
   * sextant distance:
   * (a, b) => 1, if a.isInSextantRange(b)
   *           +inf, otherwise
   */
  inSextantRange(atlas: AtlasNode[], max_depth: number = 1): AtlasNode[] {
    let expand = [this];
    const in_range: Set<AtlasNode> = new Set();

    let depth = max_depth;

    // with every step mark every node in range as to be expanded and
    // decrement depth
    /* eslint-disable no-loop-func */
    while (expand.length && depth >= 0) {
      expand = expand.reduce((nodes, node) => {
        in_range.add(node);

        const new_nodes = atlas.filter(
          new_node =>
            node.isInSextantRange(new_node) &&
            node !== new_node &&
            !in_range.has(new_node),
        );

        return nodes.concat(new_nodes);
      }, []);

      depth -= 1;
    }
    /* eslint-enable no-loop-func */

    return [...in_range.values()];
  }

  isInSextantRange(other: AtlasNode): boolean {
    return this.distance(other) <= SEXTANT_RANGE;
  }

  distance(other: AtlasNode): number {
    return Math.sqrt(
      (this.props.x - other.props.x) ** 2 + (this.props.y - other.props.y) ** 2,
    );
  }

  pos(): string {
    return `X: ${this.props.x} Y: ${this.props.y}`;
  }

  getAllMods(atlas: AtlasNode[]): Mod[] {
    return this.inSextantRange(atlas).reduce(
      (mods, other) => mods.concat(other.mods),
      this.mods,
    );
  }

  getTags() {
    return super
      .getTags()
      .concat(this.props.world_area.tags)
      .filter(
        // unique by id
        (tag, i, tags) => tags.findIndex(other => other.id === tag.id) === i,
      );
  }

  maxModsOfType(): number {
    return Number.POSITIVE_INFINITY;
  }

  inDomainOf(mod_domain: number): boolean {
    return mod_domain === Mod.DOMAIN.ATLAS;
  }

  level(): number {
    return this.props.world_area.area_level;
  }

  affectingMods(atlas: AtlasNode[]): Mod[] {
    return atlas.reduce((mods, other) => {
      if (this.isInSextantRange(other)) {
        return mods.concat(other.mods);
      } else {
        return mods;
      }
    }, []); // this.mods will be passed on atlas.reduce
  }

  activeMods(atlas: AtlasNode[]): Mod[] {
    return this.affectingMods(atlas).filter(
      mod => mod.spawnweightFor(this) > 0,
    );
  }

  inactiveMods(atlas: AtlasNode[]): Mod[] {
    return this.affectingMods(atlas).filter(
      mod => mod.spawnweightFor(this) <= 0,
    );
  }

  humanId(): HumanId {
    return AtlasNode.humanId(this.props);
  }
}
