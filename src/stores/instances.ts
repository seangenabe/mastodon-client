import type { Instance } from "@/types/Instance";
import { persistentAtom } from "@nanostores/persistent";

export const instancesStore = persistentAtom<Instance[]>("instances", [], {
  encode: JSON.stringify,
  decode: JSON.parse
});
