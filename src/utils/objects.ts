export function pick<T extends object = object, K extends keyof T = keyof T>(
  obj: T,
  keys: (keyof T)[],
): Pick<T, K> {
  const ret: Pick<T, K> = {} as unknown as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      ret[key as K] = obj[key] as T[K];
    }
  }

  return ret;
}
