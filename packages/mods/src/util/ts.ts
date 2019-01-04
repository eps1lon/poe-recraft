// checks if obj[key] can be accessed
export function isKeyOf<T>(key: any, obj: T): key is keyof T {
  return key in obj;
}

export function filterUndefined<T>(item: T | undefined | null): item is T {
  return item != null;
}
