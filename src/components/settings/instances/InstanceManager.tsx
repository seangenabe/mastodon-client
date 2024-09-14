import InstanceCard from "@/components/settings/instances/InstanceCard"
import { instancesStore } from "@/stores/instances"
import { useStore } from "@nanostores/solid"
import { For } from "solid-js"

export default function InstanceManager() {
  const instancesFn = useStore(instancesStore)

  return (
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
      <For each={instancesFn()}>
        {(instance) => <InstanceCard instance={instance} />}
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
    </div>
  )
}
