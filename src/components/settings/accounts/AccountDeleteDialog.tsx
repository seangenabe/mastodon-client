import { AccountLine } from "@/components/common/AccountLine"
import Button from "@/components/common/Button"
import { accountsStore } from "@/stores/accounts"
import { equals, type Account } from "@/types/Account"
import { createSignal, onMount, Show } from "solid-js"

export interface AccountDeleteDialogRef {
  showModal(account: Account): void
}

export default function AccountDeleteDialog({
  ref,
}: {
  ref?: (ref: AccountDeleteDialogRef) => void
}) {
  const [account, setAccount] = createSignal<Account | null>(null)
  let dialogRef!: HTMLDialogElement

  onMount(() => {
    ref?.({
      showModal(account) {
        setAccount(() => account)
        dialogRef.showModal()
      },
    })
  })

  const deleteInstance = () => {
    const accounts = accountsStore.get()
    const a = account()

    if (a == null) {
      return
    }

    const newAccounts = accounts.filter((x) => !equals(x, a))

    accountsStore.set(newAccounts)
    dialogRef.close()
  }

  return (
    <dialog
      class="delete-dialog p-4 bg-ctp-base rounded-lg border-4 border-ctp-red backdrop:bg-ctp-base text-ctp-text"
      ref={dialogRef}
    >
      <div class="flex flex-col gap-4">
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
          <Button type="button" variant="danger" onClick={deleteInstance}>
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
  )
}
