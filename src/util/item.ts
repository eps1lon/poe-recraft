import { Item } from 'poe-mods';

export function namei18n(
  item: Item,
  messages: { [key: string]: string }
): string {
  const i18n_key = `poe.baseitemtypes.${item.baseitem.id}.name`;
  const name = messages[i18n_key];
  if (typeof name === 'string') {
    return name;
  } else {
    // fallback
    return item.baseitem.id;
  }
}
