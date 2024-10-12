import type { Account } from "@/types/Account";

export function AccountLine({ account }: { account: Account }) {
  return (
    <span class="whitespace-nowrap">
      <span class="opacity-50">@</span>
      <span class="">{account.username}</span>
      <span class="opacity-50">@{account.instanceName}</span>
    </span>
  );
}
