// @flow
import { Mod } from '../mods';
import { type AtlasNodeProps } from '../schema';

import Container from './Container';

export const SEXTANT_RANGE = 55; // http://poecraft.com/atlas has 55

export default class AtlasNode extends Container<Mod> {
  +props: AtlasNodeProps;

  constructor(mods: Mod[], props: AtlasNodeProps) {
    super(mods);

    (this: any).props = props;
  }

  inSextantRange(atlas: AtlasNode[]): AtlasNode[] {
    return atlas.filter(
      other => this.isInSextantRange(other) && this !== other,
    );
  }

  /**
   * returns a list of nodes with sextant distance <= depth
   * sextant distance:
   * (a, b) => 1, if a.isInSextantRange(b)
   *           +inf, otherwise
   */
  inSextantRangeWithDepth(atlas: AtlasNode[], max_depth: number): AtlasNode[] {
    let expand = [this];
    const in_range: Set<AtlasNode> = new Set();

    let depth = max_depth;

    // with every step mark every node in range as to be expanded and
    // decrement depth
    /* eslint-disable no-loop-func */
    while (expand.length && depth >= 0) {
      expand = expand.reduce((nodes, node) => {
        in_range.add(node);

        const new_nodes = node
          .inSextantRange(atlas)
          .filter(new_node => !in_range.has(new_node));

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
}
