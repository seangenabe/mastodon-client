import { json } from "@/stores/utils/json";
import type { Feed } from "@/types/Feed";
import { persistentAtom } from "@nanostores/persistent";

export const feedsStore = persistentAtom<Feed[]>(
  "feeds",
  [],
  json,
);
