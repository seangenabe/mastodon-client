import { json } from "@/stores/utils/json";
import type { Instance } from "@/types/Instance";
import { persistentAtom, persistentMap } from "@nanostores/persistent";

export const instancesStore = persistentMap<
  Partial<Record<string, Instance>>
>(
  "instance:",
  {},
  json,
);

export const currentInstance = persistentAtom<string>("currentInstance", "");
