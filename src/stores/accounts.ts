import { json } from "@/stores/utils/json";
import type { Account } from "@/types/Account";
import { persistentMap } from "@nanostores/persistent";
import type { mastodon } from "masto";
import { map } from "nanostores";

export const accountsStore = persistentMap<Partial<Record<string, Account>>>(
  "account:",
  {},
  json,
);

export const accountClients = map<
  Partial<Record<string, mastodon.rest.Client>>
>({});
