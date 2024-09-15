import { json } from "@/stores/utils/json";
import type { Instance } from "@/types/Instance";
import { persistentMap } from "@nanostores/persistent";

export const instancesStore = persistentMap<Record<string, Instance>>("instance:", {}, json)
