export function propOrUndefined<T, K extends keyof T>(
  obj: T | undefined | null,
  prop: K,
): T[K] | undefined {
  if (obj == null) {
    return undefined;
  } else {
    return obj[prop];
  }
}
