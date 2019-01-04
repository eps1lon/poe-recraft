import Item from '../../Item';
import { Socket, SocketColor } from './types';
import ValueRange from '../../../../calculator/ValueRange';

/**
 * creates a Socket according to the highest attr requirement
 * if two or more requirements are equal the color is chosen
 * with the priority Green > Red > Blue
 * @param item
 */
export function rollRequirementBiasedStable(item: Item): Socket {
  const { dex, int, str } = item.requirements.list();
  const color_by_attr = [
    { value: dex.value, color: SocketColor.green },
    { value: str.value, color: SocketColor.red },
    { value: int.value, color: SocketColor.blue },
    // descending
  ].sort((a, b) => -ValueRange.cmpMax(a.value, b.value));

  return {
    color: color_by_attr[0].color,
  };
}
