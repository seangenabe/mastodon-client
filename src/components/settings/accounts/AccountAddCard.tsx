import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import { accountsStore } from "@/stores/accounts"
import { instancesStore } from "@/stores/instances"
import { useStore } from "@nanostores/solid"
import { For, type JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

function getFormValues(form: HTMLFormElement) {
  const data = new FormData(form)
  return {
    username: (data.get("username") as string | null)?.trim() ?? "",
    instanceName: (data.get("instanceName") as string | null)?.trim() ?? "",
  }
}

export default function AccountAddCard({
  class: className = "",
}: {
  class?: string
}) {
  const instances = useStore(instancesStore)
  let usernameField!: HTMLInputElement
  let formRef!: HTMLFormElement

  const submitHandler: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault()

    const { username, instanceName } = getFormValues(formRef)

    // Add account
    accountsStore.set([...accountsStore.get(), { username, instanceName }])

    e.currentTarget.reset()
    usernameField.focus()
  }

  const changeHandler = () => {
    const currentFormValues = getFormValues(formRef)

    if (
      accountsStore
        .get()
        .some(
          (account) =>
            account.username === currentFormValues.username &&
            account.instanceName === currentFormValues.instanceName
        )
    ) {
      usernameField.setCustomValidity("Account has already been added")
    } else {
      usernameField.setCustomValidity("")
    }
  }

  return (
    <div
      class={twMerge(
        "bg-ctp-surface0 rounded-lg p-4 border-4 border-ctp-surface1 border-dashed",
        className
      )}
    >
      <form
        class="flex flex-col gap-4 h-full"
        onSubmit={submitHandler}
        ref={formRef}
      >
        <div class="flex-1 flex">
          <label class="flex-1 flex flex-col gap-1">
            <div class="text-sm">Username</div>
            <Input
              class="block w-full py-0 px-2 font-bold"
              name="username"
              pattern="[^@]+"
              required
              onInput={changeHandler}
              ref={usernameField}
            />
          </label>
          <label class="flex-1 flex flex-col gap-1">
            <div class="text-sm">Instance</div>
            <div class="flex align-baseline">
              <div class="font-bold px-2">@</div>
              <select
                class="rounded-md bg-ctp-surface1 outline-4 hover:outline focus:outline active:outline outline-ctp-text block w-full flex-1 py-0 px-2 font-bold"
                name="instanceName"
                onSelect={changeHandler}
              >
                <For each={instances()}>
                  {(instance) => (
                    <option value={instance.name}>{instance.name}</option>
                  )}
                </For>
              </select>
            </div>
          </label>
        </div>
        <div class="md:justify-end flex flex-row gap-4">
          <Button variant="primary" type="submit">
            Add account
          </Button>
        </div>
      </form>
    </div>
  )
}
