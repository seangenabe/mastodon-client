import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import { instancesStore } from "@/stores/instances"
import type { Instance } from "@/types/Instance"
import type { JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

export default function InstanceAddCard({
  class: className = "",
}: {
  class?: string
}) {
  let instanceNameInput!: HTMLInputElement

  const submitHandler: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const instanceName = data.get("instanceName") as string | null

    if (!instanceName?.trim()) {
      return
    }

    // Add instance
    const existingInstances = instancesStore.get()
    const instance: Instance = {
      name: instanceName,
    }
    instancesStore.set([...existingInstances, instance])

    e.currentTarget.reset()
    instanceNameInput.focus()
  }

  const nameInputHandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (
    e
  ) => {
    const currentValue = e.currentTarget.value
    if (
      instancesStore.get()?.some((instance) => instance.name === currentValue)
    ) {
      e.currentTarget.setCustomValidity("Name already exists")
    } else {
      e.currentTarget.setCustomValidity("")
    }
  }

  return (
    <div
      class={twMerge(
        "md:min-h-32 bg-ctp-surface0 rounded-lg p-4 border-4 border-ctp-surface1 border-dashed",
        className
      )}
    >
      <form onSubmit={submitHandler} class="flex flex-col gap-4 h-full">
        <div class="flex-1">
          <Input
            class="w-full p-0 px-2 font-bold"
            name="instanceName"
            ref={instanceNameInput}
            onInput={nameInputHandler}
            placeholder="mastodon.example"
            aria-label="Instance name"
            required
            pattern="[^@]+"
          />
        </div>
        <div class="md:justify-end flex flex-row gap-4">
          <Button variant="primary">Add</Button>
        </div>
      </form>
    </div>
  )
}
