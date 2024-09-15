import Button from "@/components/common/Button"
import type { Instance } from "@/types/Instance"

export default function InstanceCard({
  key,
  instance,
  onDeleteClick = () => {},
}: {
  key: string
  instance: Instance
  onDeleteClick: (key: string, instance: Instance) => void
}) {
  return (
    <div class="flex flex-col md:min-h-32 bg-ctp-surface1 rounded-lg p-4">
      <div class="font-bold flex-1">{key}</div>
      <div class="text-sm md:justify-end flex flex-row gap-4">
        <Button
          variant="link"
          type="button"
          class="text-ctp-red block outline-ctp-red"
          title={`Delete the instance ${key}`}
          onClick={() => onDeleteClick(key, instance)}
        >
          <span class="icon-[fe--trash] mr-1"></span>
          Remove
        </Button>
      </div>
    </div>
  )
}
