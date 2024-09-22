import type { mastodon } from "masto";

export interface Account {
  username: string;
  instanceName: string;
  accessToken?: string;
  accountInfo?: mastodon.v1.Account;
}

export function toString(a: Account) {
  return `${a.username}@${a.instanceName}`;
}
