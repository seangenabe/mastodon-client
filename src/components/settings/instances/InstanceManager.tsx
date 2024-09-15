import InstanceAddCard from "@/components/settings/instances/InstanceAddCard"
import InstanceCard from "@/components/settings/instances/InstanceCard"
import InstanceDeleteDialog, {
  type InstanceDeleteDialogRef,
} from "@/components/settings/instances/InstanceDeleteDialog"
import { instancesStore } from "@/stores/instances"
import { useStore } from "@nanostores/solid"
import { createSignal, For } from "solid-js"

export default function InstanceManager() {
  const instances = useStore(instancesStore)
  const [dialogRef, setDialogRef] = createSignal<InstanceDeleteDialogRef>()

  const promptDeleteInstance = (key: string) => {
    dialogRef()?.showModal(key)
  }

  return (
    <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 content-stretch">
      <For each={Object.entries(instances())}>
        {([key, instance]) => (
          <InstanceCard
            key={key}
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
