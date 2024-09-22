import AccountAddCard from "@/components/settings/accounts/AccountAddCard";
import AccountCard from "@/components/settings/accounts/AccountCard";
import AccountDeleteDialog, {
  type AccountDeleteDialogRef,
} from "@/components/settings/accounts/AccountDeleteDialog";
import { accountsStore } from "@/stores/accounts";
import type { Account } from "@/types/Account";
import { useStore } from "@nanostores/solid";
import { createSignal, For } from "solid-js";

export default function AccountManager() {
  const accounts = useStore(accountsStore);
  const [dialogRef, setDialogRef] = createSignal<AccountDeleteDialogRef>();

  const promptDeleteAccount = (accountKey: string, account: Account) => {
    dialogRef()?.showModal(accountKey, account);
  };

  return (
    <div class="grid lg:grid-cols-2 content-stretch gap-4">
      <For each={Object.entries(accounts() as Record<string, Account>)}>
        {([accountKey, account]) => (
          <AccountCard
            accountKey={accountKey}
            account={account}
            onDeleteClick={promptDeleteAccount}
          />
        )}
      </For>
      <AccountAddCard />
      <AccountDeleteDialog ref={setDialogRef} />
    </div>
  );
}
