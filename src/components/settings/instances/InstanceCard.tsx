import Button from "@/components/common/Button"
import type { Instance } from "@/types/Instance"

export default function InstanceCard({
  instance,
  onDeleteClick = () => {},
}: {
  instance: Instance
  onDeleteClick: (instance: Instance) => void
}) {
  return (
    <div class="flex flex-col md:min-h-32 bg-ctp-surface1 rounded-lg p-4">
      <div class="font-bold flex-1">{instance.name}</div>
      <div class="text-sm md:justify-end flex flex-row gap-4">
        <Button
          variant="link"
          type="button"
          class="text-ctp-red block outline-ctp-red"
          title={`Delete the instance ${instance.name}`}
          onClick={() => onDeleteClick(instance)}
        >
          <span class="icon-[fe--trash] mr-1"></span>
          Delete
        </Button>
      </div>
    </div>
  )
}
