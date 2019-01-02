import { BaseError } from 'make-error';
import { Item } from '../../containers';
import {
  SocketColor,
  rollRequirementBiasedStable,
} from '../../containers/item/components/Sockets';

export enum CustomAction {
  RemoveCraftedMod = 1,
  /**
   * i.e. Fortune favours the brav
   */
  RandomZanaMod = 2,
  /**
   * i.e. apply the thing that is defined in its props
   * e.g. a mod, sockets, colors, links
   */
  ApplySelf = 7,
}
/**
 * {CraftingBenchOptionsProps.crafting_bench_custom_action} is of type
 * number but at the moment there are only a finite number of actions.
 * In the future more actions might be added. If we encounter such an action
 * this error is thrown.
 */
export class UnrecognizedCustomAction extends BaseError {
  constructor(action: number) {
    super(`This option has an unsupported custom action '${action}'`);
  }
}

export class InvalidColorConfiguration extends BaseError {
  constructor(char: string) {
    super(`Invalid character '${char}' in color configuration`);
  }
}

/**
 * changes the number of sockets to {n}
 * new sockets are generated with {rollRequirementBiasedStable}
 * @param item
 * @param n
 */
export function changeSockets(item: Item, n: number): Item {
  return item.sockets.socket(n, {
    keep_links: true,
    newSocket: rollRequirementBiasedStable,
  });
}

/**
 * links the first {n} sockets of the item
 * if {n} is bigger than the current number of sockets all sockets are linked
 * @param item
 * @param n
 */
export function changeLinks(item: Item, n: number): Item {
  const link_size = Math.min(item.sockets.count(), n);

  return item.sockets.link(0, link_size - 1);
}

/**
 * changes the colors of the item according to the configuration
 * @param item
 * @param configuration - a string consisting of R|G|B e.g. 'RRR' for 3 red
 *                        The configuration is case sensitive
 */
export function changeColors(item: Item, configuration: string) {
  const colors = parseColorConfiguration(configuration);

  return item.sockets.mapColors((socket, index) => {
    const color = colors[index];
    if (color === undefined) {
      return rollRequirementBiasedStable(item);
    } else {
      return { color };
    }
  });
}

/**
 * removes all crafted mods, if not crafted mods are present the item itself is returned
 * @param item
 */
export function removeCraftedMods(item: Item): Item {
  return item.mods
    .filter(mod => mod.isMasterMod())
    .reduce((acc, mod) => acc.removeMod(mod), item);
}

function parseColorConfiguration(configuration: string): SocketColor[] {
  return configuration.split('').map(char => {
    switch (char) {
      case 'R':
        return SocketColor.red;
      case 'B':
        return SocketColor.blue;
      case 'G':
        return SocketColor.green;
      default:
        throw new InvalidColorConfiguration(char);
    }
  });
}
