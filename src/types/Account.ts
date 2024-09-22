import type { mastodon } from "masto";

export interface CommonAccount {
  username: string;
  instanceName: string;
}

export interface MastodonAccount extends CommonAccount {
  type: "mastodon";
  accessToken?: string;
  accountInfo?: mastodon.v1.Account;
}

export type Account = MastodonAccount;

export function toString(a: Account) {
  return `${a.username}@${a.instanceName}`;
}
