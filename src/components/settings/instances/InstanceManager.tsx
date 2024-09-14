import InstanceCard from "@/components/settings/instances/InstanceCard"
import { instancesStore } from "@/stores/instances"
import type { Instance } from "@/types/Instance"
import { useStore } from "@nanostores/solid"
import { createSignal, For } from "solid-js"

export default function InstanceManager() {
  const instancesFn = useStore(instancesStore)
  const [nameOfInstanceToDelete, setDeleteInstanceName] = createSignal("")
  let deleteDialog: HTMLDialogElement | undefined = undefined

  const handleDeleteInstance = (instance: Instance) => {
    if (deleteDialog) {
      setDeleteInstanceName(() => instance.name)
      deleteDialog.show()
    }
    // const instances = instancesStore.get()
    // const newInstances = instances.filter((x) => x.name !== instance.name)
    // instancesStore.set(newInstances)
  }

  return (
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
      <For each={instancesFn()}>
        {(instance) => (
          <InstanceCard
            instance={instance}
            onDeleteClick={handleDeleteInstance}
          />
        )}
      </For>
      <a
        href="/settings/instances/add"
        class="flex flex-col md:min-h-32 bg-ctp-surface0 rounded-lg p-4 border-4 focus:border-ctp-blue hover:border-ctp-blue active:border-ctp-blue border-ctp-surface1 border-dashed justify-center text-center"
      >
        <div>
          <div>
            <span class="icon-[pajamas--plus]"></span>
          </div>
          <div>Add a new instance</div>
        </div>
      </a>
      <dialog
        class="delete-dialog p-4 bg-ctp-base rounded-lg border-4 border-ctp-red backdrop:bg-ctp-base"
        ref={(x) => {
          deleteDialog = x
        }}
      >
        <p>
          Are you sure you want to delete the instance{" "}
          <code>{nameOfInstanceToDelete()}</code>?
        </p>
        <button type="button" class="rounded-lg p-4">
          Cancel
        </button>
        <button type="button" class="rounded-lg p-4">
          Delete <code>{nameOfInstanceToDelete()}</code>
        </button>
      </dialog>
    </div>
  )
}
