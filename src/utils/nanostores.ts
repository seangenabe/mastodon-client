import type { MapStore } from "nanostores";
import type { AllKeys } from "node_modules/nanostores/atom";

export function mergeIntoMap<
  T extends Partial<{ [key: string]: object }>,
>(
  map: MapStore<T>,
  key: keyof T,
  values: T[typeof key],
  newFactory: () => T[typeof key],
): void;
export function mergeIntoMap<
  T extends { [key: string]: object } = any,
>(
  map: MapStore<T>,
  key: keyof T,
  values: T[typeof key],
  newFactory: () => T[typeof key],
): void;
export function mergeIntoMap<
  T extends { [key: string]: object } = any,
>(
  map: MapStore<T>,
  key: keyof T,
  values: T[typeof key],
  newFactory: () => T[typeof key],
): void {
  let obj = map.get()[key];

  if (!obj) {
    obj = newFactory();
  }

  Object.assign(obj, values);

  map.setKey(key as AllKeys<T>, obj as T[AllKeys<T>]);
}
