import type { Account } from "@/types/Account";

export function plaintextAccountLine(account: Account) {
  return `@${account.username}@${account.instanceName}`;
}
