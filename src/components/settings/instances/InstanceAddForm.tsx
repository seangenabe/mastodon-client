import { instancesStore } from "@/stores/instances"
import type { Instance } from "@/types/Instance"
import type { JSX } from "solid-js"

export default function InstanceAddForm() {
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
    location.assign("/settings/instances")
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
    <form class="flex flex-col max-w-80 gap-4" onSubmit={submitHandler}>
      <label class="flex flex-col gap-2">
        <div class="text-sm">
          Name <em class="text-ctp-red italic">(required)</em>
        </div>
        <input
          name="instanceName"
          type="text"
          class="rounded-lg bg-ctp-surface0 font-bold p-4 block"
          required
          onInput={nameInputHandler}
        />
      </label>
      <div>
        <button type="submit" class="rounded-lg p-4 bg-ctp-blue text-ctp-base">
          Submit
        </button>
      </div>
    </form>
  )
}
