import camelcase from "camelcase";
import type { CamelCasedProperties } from "type-fest";

export function camelCaseKeys<T extends object>(
  obj: T,
): CamelCasedProperties<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      camelcase(key),
      value,
    ]),
  ) as CamelCasedProperties<T>;
}
