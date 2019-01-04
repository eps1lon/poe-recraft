import Component from '../../Component';
import Item from '../../Item';
import {
  ArgumentError,
  SocketOverflow,
  LinkNonExistingSockets,
  ColorNonExistingSocket,
} from './errors';
import { SocketOptions, ColorBatch } from './options';
import { SocketColor, SocketGroup, SocketId, Socket } from './types';

export interface Sockets<T> {
  /**
   * @deprecated use maxSockets() instead
   * @returns the maximum amount of sockets
   */
  max(): number;
  /**
   * @returns the maximum amount of sockets
   */
  maxSockets(): number;
  /**
   * @returns current amount of sockets
   */
  count(): number;
  /**
   * @returns the biggest number of linked sockets
   */
  maxLinks(): number;
  /**
   * checks if {a} and {b} are linked
   * @param a the socket to check
   * @param b the socket for which to check if it is linked to a
   */
  isLinked(a: SocketId, b: SocketId): boolean;
  /**
   * links each pair of
   * @param a
   * @param b
   */
  link(...sockets: SocketId[]): T;
  /**
   * sets the number of sockets to n
   * @param n
   * @param options set {keep_links} to true if it should not reroll links
   */
  socket(n: number, options?: Partial<SocketOptions>): T;
  colors(): SocketColor[];
  color(color: SocketColor, ...sockets: SocketId[]): T;
  colorBatch(...batch: ColorBatch[]): T;
  mapColors(fn: (socket: Socket, index: SocketId, item: T) => Socket): T;
  toJson(): Array<Socket & { group: number }>;
}

export interface Builder {
  sockets: Socket[];
  groups: SocketGroup[];
}

/**
 * item component for sockets
 */
export default class ItemSockets
  implements Sockets<Item>, Component<Item, Builder> {
  public parent: Item;
  public groups: SocketGroup[];
  public sockets: Socket[];

  constructor(item: Item, builder: Builder) {
    this.parent = item;

    this.groups = builder.groups;
    this.sockets = builder.sockets;
  }

  public builder() {
    return {
      groups: this.groups,
      sockets: this.sockets,
    };
  }

  /**
   * @deprecated
   */
  public max(): number {
    console.warn(
      'poe-mods DEPRECATION: use Sockets.maxSockets() instead of Sockets.max()',
    );
    return this.maxSockets();
  }

  /**
   * calculates the maximum amount of sockets possible on this item
   *
   * TODO: what about Corroded Blades or other similar 1x4 Items. Confirm
   * that they also only can have max 4 sockets like Rods or act like small_Staff
   */
  public maxSockets(): number {
    const by_stats = this.maxOverride();

    // tags take priority
    if (by_stats != null) {
      return by_stats;
    } else {
      return Math.min(
        this.maxByDimensions(),
        this.maxByLevel(),
        this.maxByMetaData(),
      );
    }
  }

  public count(): number {
    return this.sockets.length;
  }

  public maxLinks(): number {
    // Math.max of empty array returns -inf
    if (this.groups.length === 0) {
      return 0;
    } else {
      return Math.max(...this.groups.map(g => g.length));
    }
  }

  public isLinked(a: SocketId, b: SocketId): boolean {
    const group_a = this.groupOf(a);
    // -1 hints that this socket is part of no group and therefore cannot be linked
    if (group_a === -1) {
      return false;
    }
    const group_b = this.groupOf(b);
    return group_a === group_b;
  }

  /**
   * links the specified socket indices
   * @param pairs consider args as pairs so be sure to have even argument length
   */
  public link(...pairs: SocketId[]): Item {
    if (pairs.length % 2) {
      throw new ArgumentError(
        '#links() require pairs of sockets. An odd number of sockets was given.',
      );
    }

    return this.parent.withMutations(builder => {
      const { groups, sockets } = builder.sockets;

      // for each pair link the pair but throw if the specified
      // sockets dont exist
      const new_groups = chunk(pairs, 2).reduce((acc, [a, b]) => {
        if (sockets[a] === undefined || sockets[b] === undefined) {
          throw new LinkNonExistingSockets();
        }
        return link(acc, a, b);
      }, groups);

      if (new_groups === groups) {
        return builder;
      } else {
        return {
          ...builder,
          sockets: {
            ...builder.sockets,
            groups: new_groups,
          },
        };
      }
    });
  }

  /**
   * set the sockets to {n}
   *
   * set force to true to ignore socket limit
   * set keep_links to false if the new sockets should all be unlinked
   * newSocket is a callback which is called for every new socket. By default
   * a white socket is created.
   *
   * @param n
   * @param options
   */
  public socket(n: number, options: Partial<SocketOptions> = {}): Item {
    const {
      newSocket = defaultNewSocket,
      keep_links = true,
      force = false,
    } = options;

    const max_count = this.maxSockets();
    if (!force && n > max_count) {
      throw new SocketOverflow(max_count);
    }

    return this.parent.withMutations(builder => {
      const count = this.count();
      if (count === n) {
        return builder;
      } else {
        const new_sockets = Array.from({ length: n }).map((_, index) => {
          return (
            builder.sockets.sockets[index] || newSocket(this.parent, index)
          );
        });
        // slice socket indices away that are beyond the new count
        const new_groups = keep_links
          ? builder.sockets.groups
              .map(group => group.filter((_, index) => index < n))
              .filter(group => group.length > 0)
          : [];

        return {
          ...builder,
          sockets: {
            sockets: new_sockets,
            groups: new_groups,
          },
        };
      }
    });
  }

  public colors(): SocketColor[] {
    return this.sockets.map(({ color }) => color);
  }

  public color(color: SocketColor, ...indices: SocketId[]): Item {
    return this.colorBatch({ color, sockets: indices });
  }

  public colorBatch(...batches: ColorBatch[]): Item {
    if (this.batchesHaveNonExistingSockets(batches)) {
      throw new ColorNonExistingSocket();
    }
    // SocketId => NewSocketColor
    const colors = batches.reduce((acc, batch) => {
      return batch.sockets.reduce((acc_batch, socket_index) => {
        return acc_batch.set(socket_index, batch.color);
      }, acc);
    }, new Map<SocketId, SocketColor>());

    return this.mapColors((socket, index) => {
      const new_color = colors.get(index);
      // dont recolor this
      if (new_color === undefined) {
        return socket;
      } else {
        return {
          ...socket,
          color: new_color,
        };
      }
    });
  }

  /**
   *
   * @param fn if fn returns a referentially equal Socket no new item is returned
   */
  public mapColors(
    fn: (socket: Socket, index: number, item: Item) => Socket,
  ): Item {
    return this.parent.withMutations(builder => {
      let changed = false;

      const new_sockets = builder.sockets.sockets.map((socket, index) => {
        const new_socket = fn(socket, index, this.parent);
        if (new_socket.color !== socket.color) {
          changed = true;
        }
        return new_socket;
      });

      if (!changed) {
        return builder;
      } else {
        return {
          ...builder,
          sockets: {
            ...builder.sockets,
            // copy array
            sockets: new_sockets,
          },
        };
      }
    });
  }

  public any(): boolean {
    return this.count() > 0;
  }

  /**
   * a string representation of the sockets, links and colors
   *
   * each char represents a color shorthand, dashes means the adjacent sockets
   * are linked, whitespace instead means no link
   */
  public toString(): string {
    return this.sockets
      .map((socket, index) => {
        // last socket?
        if (index + 1 === this.sockets.length) {
          return `${socket.color}`;
        } else {
          // linked with the next socket?
          const is_linked = this.isLinked(index, index + 1);
          return `${socket.color}${is_linked ? '-' : ' '}`;
        }
      })
      .join('');
  }

  /**
   * serialized format which includes group information
   */
  public toJson(): Array<Socket & { group: number }> {
    return this.sockets.map((socket, index) => {
      const group = this.groupOf(index);

      return {
        ...socket,
        group,
      };
    });
  }

  private groupOf(socket_index: SocketId): number {
    return groupOf(this.groups, socket_index);
  }

  private maxByMetaData(): number {
    const { meta_data } = this.parent;

    if (meta_data.isA('AbstractShield')) {
      return 3;
    } else if (meta_data.isA('AbstractArmour')) {
      return 6;
    } else if (meta_data.isA('AbstractOneHandWeapon')) {
      return 3;
    } else if (meta_data.isA('AbstractFishingRod')) {
      return 4;
    } else if (meta_data.isA('AbstractTwoHandWeapon')) {
      return 6;
    } else if (meta_data.isA('Equipment')) {
      return 0;
    } else {
      throw new Error(
        `Can't determine sockes from meta data for ${meta_data.clazz}`,
      );
    }
  }

  private maxByLevel(): number {
    const { props } = this.parent;

    if (props.item_level <= 1) {
      return 2;
    } else if (props.item_level <= 2) {
      return 3;
    } else if (props.item_level <= 25) {
      return 4;
    } else if (props.item_level <= 35) {
      return 5;
    } else {
      return 6;
    }
  }

  private maxByDimensions(): number {
    const { width, height } = this.parent.baseitem;

    return width * height;
  }

  private maxOverride(): number | undefined {
    const stats = this.parent.stats();
    const tags = this.parent.getTags();

    if (stats.local_has_X_sockets != null) {
      return stats.local_has_X_sockets.values.max;
    } else if (tags.find(id => id === 'small_staff') !== undefined) {
      return 3;
    }

    return undefined;
  }

  /**
   * true if some batch tries to color an index that is out of bounds
   * @param batches
   */
  private batchesHaveNonExistingSockets(batches: ColorBatch[]) {
    return batches.some(batch =>
      batch.sockets.some(index => this.sockets[index] === undefined),
    );
  }
}

function defaultNewSocket(item: Item): Socket {
  return {
    color: SocketColor.white,
  };
}

/**
 * takes a flat array and transforms it into an array of arrays of {size}
 * @param arr
 * @param size
 */
function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => {
    return arr.slice(i * size, (i + 1) * size);
  });
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

// staic helpers

/**
 * ind the index of a group that holds {socket_index}
 * @param groups
 * @param socket_index
 */
function groupOf(groups: SocketGroup[], socket_index: SocketId): number {
  return groups.findIndex(group => group.includes(socket_index));
}

function link(groups: SocketGroup[], a: SocketId, b: SocketId): SocketGroup[] {
  const group_a = groupOf(groups, a);
  const group_b = groupOf(groups, b);

  // already linked?
  if (group_a !== -1 && group_a === group_b) {
    return groups;
  }

  // keep every group that is not within [a, b] as-is
  const unaffected_groups = groups.filter(group => {
    const overlapping = group.find(socket => a <= socket && socket <= b);
    return overlapping === undefined;
  });
  // and add a new group [a..b] merged with the original groups
  const merged_group = Array.from(
    { length: b - a + 1 },
    (_, i) => i + a,
  ).concat(...(groups[group_a] || []), ...(groups[group_b] || []));

  return [...unaffected_groups, unique(merged_group)];
}
