import InstanceAddCard from "@/components/settings/instances/InstanceAddCard"
import InstanceCard from "@/components/settings/instances/InstanceCard"
import InstanceDeleteDialog, {
  type InstanceDeleteDialogRef,
} from "@/components/settings/instances/InstanceDeleteDialog"
import { instancesStore } from "@/stores/instances"
import type { Instance } from "@/types/Instance"
import { useStore } from "@nanostores/solid"
import { createSignal, For } from "solid-js"

export default function InstanceManager() {
  const instancesFn = useStore(instancesStore)
  const [dialogRef, setDialogRef] = createSignal<InstanceDeleteDialogRef>()

  const promptDeleteInstance = (instance: Instance) => {
    dialogRef()?.showModal(instance.name)
  }

  return (
    <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 content-stretch">
      <For each={instancesFn()}>
        {(instance) => (
          <InstanceCard
            instance={instance}
            onDeleteClick={promptDeleteInstance}
          />
        )}
      </For>
      <InstanceAddCard />
      <InstanceDeleteDialog ref={setDialogRef} />
    </div>
  )
}
