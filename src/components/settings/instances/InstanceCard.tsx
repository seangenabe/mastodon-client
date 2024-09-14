import type { Instance } from "@/types/Instance"

export default function InstanceCard({ instance }: { instance: Instance }) {
  return (
    <div class="flex flex-col md:min-h-32 bg-ctp-surface1 rounded-lg p-4">
      <div class="font-bold flex-1">{instance.name}</div>
      <div class="text-sm md:justify-end flex flex-row gap-4">
        <button
          type="button"
          class="text-ctp-red hover:underline active:underline block"
          title={`Delete the instance ${instance.name}`}
        >
          <span class="icon-[fe--trash] mr-1"></span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}
