import { AccountLine } from "@/components/common/AccountLine";
import Button from "@/components/common/Button";
import { accountsStore } from "@/stores/accounts";
import { type Account } from "@/types/Account";
import { createSignal, onMount, Show } from "solid-js";

export interface AccountDeleteDialogRef {
  showModal(accountKey: string, account: Account): void;
}

export default function AccountDeleteDialog({
  ref,
}: {
  ref?(ref: AccountDeleteDialogRef): void;
}) {
  const [accountKey, setAccountKey] = createSignal<string>("");
  const [account, setAccount] = createSignal<Account | null>(null);
  let dialogRef!: HTMLDialogElement;

  onMount(() => {
    ref?.({
      showModal(accountKey, account) {
        setAccountKey(accountKey);
        setAccount(account);
        dialogRef.showModal();
      },
    });
  });

  const deleteAccount = () => {
    const currentAccount = account();

    if (!currentAccount) {
      return;
    }

    accountsStore.setKey(accountKey(), undefined);

    dialogRef.close();
  };

  return (
    <dialog
      class="delete-dialog p-4 bg-ctp-base rounded-lg border-4 border-ctp-red backdrop:bg-gray-600/80 text-ctp-text"
      ref={dialogRef}
    >
      <div class="flex flex-col gap-4 min-h-32 justify-evenly">
        <p>
          Are you sure you want to remove the account{" "}
          <strong>
            <Show when={account()}>
              {(a) => <AccountLine account={a()}></AccountLine>}
            </Show>
          </strong>
          ?
        </p>
        <div class="flex flex-row gap-4 justify-evenly">
          <Button type="button" onClick={() => dialogRef.close()}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={deleteAccount}>
            Delete{" "}
            <strong>
              <Show when={account()}>
                {(a) => <AccountLine account={a()}></AccountLine>}
              </Show>
            </strong>
          </Button>
        </div>
      </div>
    </dialog>
  );
}
