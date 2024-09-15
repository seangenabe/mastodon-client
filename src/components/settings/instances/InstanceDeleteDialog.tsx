import Button from "@/components/common/Button"
import { instancesStore } from "@/stores/instances"
import { createSignal, onMount } from "solid-js"

export interface InstanceDeleteDialogRef {
  showModal(instanceName: string): void
}

export default function InstanceDeleteDialog({
  ref,
}: {
  ref?: (ref: InstanceDeleteDialogRef) => void
}) {
  const [instanceName, setInstanceName] = createSignal("")
  let dialogRef!: HTMLDialogElement

  onMount(() => {
    ref?.({
      showModal(inputInstanceName: string) {
        setInstanceName(() => inputInstanceName)
        dialogRef.showModal()
      },
    })
  })

  const deleteInstance = () => {
    const instances = instancesStore.get()
    // Instance name is in nameOfInstanceToDelete
    const name = instanceName()
    const newInstances = instances.filter((x) => x.name !== name)

    instancesStore.set(newInstances)
    dialogRef.close()
  }

  return (
    <dialog
      class="delete-dialog p-4 bg-ctp-base rounded-lg border-4 border-ctp-red backdrop:bg-ctp-base text-ctp-text"
      ref={dialogRef}
    >
      <div class="flex flex-col gap-4 min-h-32 justify-evenly">
        <p>
          Are you sure you want to delete the instance{" "}
          <strong>{instanceName()}</strong>?
        </p>
        <div class="flex flex-row gap-4 justify-evenly">
          <Button type="button" onClick={() => dialogRef.close()}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={deleteInstance}>
            Remove <strong>{instanceName()}</strong>
          </Button>
        </div>
      </div>
    </dialog>
  )
}
