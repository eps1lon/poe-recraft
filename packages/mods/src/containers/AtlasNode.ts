import Mod from '../mods/Mod';
import { AtlasNodeProps, Tag } from '../schema';

import ImmutableContainer from './ImmutableContainer';

export const SEXTANT_RANGE = 55; // http://poecraft.com/atlas has 55

export interface Builder {
  mods: Mod[];
  props: AtlasNodeProps;
}
export type HumanId = string;

export default class AtlasNode extends ImmutableContainer<Mod, Builder> {
  public static build(props: AtlasNodeProps) {
    return new AtlasNode([], props);
  }

  public static withBuilder(builder: Builder): AtlasNode {
    return new AtlasNode(builder.mods, builder.props);
  }

  public props: AtlasNodeProps;

  constructor(mods: Mod[], props: AtlasNodeProps) {
    super(mods);

    this.props = props;
  }

  public builder(): Builder {
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
  public inSextantRange(atlas: AtlasNode[], max_depth = 1): AtlasNode[] {
    let expand: AtlasNode[] = [this];
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
      }, [] as AtlasNode[]);

      depth -= 1;
    }
    /* eslint-enable no-loop-func */

    return Array.from(in_range.values());
  }

  public isInSextantRange(other: AtlasNode): boolean {
    return this.distance(other) <= SEXTANT_RANGE;
  }

  public distance(other: AtlasNode): number {
    return Math.sqrt(
      (this.props.x - other.props.x) ** 2 + (this.props.y - other.props.y) ** 2,
    );
  }

  public pos(): string {
    return `X: ${this.props.x} Y: ${this.props.y}`;
  }

  public getAllMods(atlas: AtlasNode[]): Mod[] {
    return this.inSextantRange(atlas).reduce(
      (mods, other) => mods.concat(other.mods),
      this.mods,
    );
  }

  public getTags(): Tag[] {
    return super
      .getTags()
      .concat(this.props.world_area.tags)
      .filter(
        // unique by id
        (tag, i, tags) => tags.findIndex(other => other === tag) === i,
      );
  }

  public maxModsOfType(): number {
    return Number.POSITIVE_INFINITY;
  }

  public inDomainOf(mod_domain: number): boolean {
    return mod_domain === Mod.DOMAIN.ATLAS;
  }

  public level(): number {
    return this.props.world_area.area_level;
  }

  public affectingMods(atlas: AtlasNode[]): Mod[] {
    return atlas.reduce((mods, other) => {
      if (this.isInSextantRange(other)) {
        return mods.concat(other.mods);
      } else {
        return mods;
      }
    }, [] as Mod[]); // this.mods will be passed on atlas.reduce
  }

  public activeMods(atlas: AtlasNode[]): Mod[] {
    return this.affectingMods(atlas).filter(
      mod => mod.spawnweightFor(this) > 0,
    );
  }

  public inactiveMods(atlas: AtlasNode[]): Mod[] {
    return this.affectingMods(atlas).filter(
      mod => mod.spawnweightFor(this) <= 0,
    );
  }
}
