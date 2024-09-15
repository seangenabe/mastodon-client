import { json } from "@/stores/utils/json";
import type { Account } from "@/types/Account";
import { persistentMap } from "@nanostores/persistent";

export const accountsStore = persistentMap<Record<string, Account>>(
  "account:",
  {},
  json,
);
