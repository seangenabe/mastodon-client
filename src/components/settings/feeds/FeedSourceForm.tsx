import Button from "@/components/common/Button";
import { messages } from "@/components/settings/feeds/messages";
import { Home } from "@/components/settings/feeds/sources/Home";
import type { Feed, FeedSource } from "@/types/Feed";
import { useStore } from "@nanostores/solid";
import { createSignal, For, Show } from "solid-js";

export default function FeedSourceForm({
  requestedResult,
  onSubmit,
}: {
  requestedResult: "feed" | "source";
  onSubmit: (
    values: { source: FeedSource; feedPartial: Pick<Feed, "title"> },
  ) => void;
}) {
  const [sourceType, setSourceType] = createSignal<FeedSource["type"]>("home");
  const t = useStore(messages);

  const getTabClass = (isActive: boolean) => {
    const base =
      "rounded-lg px-4 py-2 hover:outline outline-4 outline-ctp-text ";
    let other: string;
    if (isActive) {
      other = "bg-ctp-sky text-black outline";
    } else {
      other = "bg-ctp-surface2 text-ctp-text";
    }
    return base + other;
  };

  return (
    <>
      <ul class="flex mb-4 flex-wrap text-center text-gray-500 dark:text-gray-400 gap-4">
        <For
          each={["home", "list", "search"] satisfies FeedSource["type"][]}
        >
          {(key) => {
            return (
              <li>
                <button
                  class={getTabClass(key === sourceType())}
                  aria-current={key === sourceType() ? "page" : undefined}
                  onClick={() => setSourceType(key)}
                >
                  {t()[`${key}Request`]({
                    request: t()[`requestAs_${requestedResult}`],
                  })}
                </button>
              </li>
            );
          }}
        </For>
      </ul>
      <Show when={sourceType() === "home"}>
        <Home request={requestedResult} onSubmit={onSubmit} />
      </Show>
    </>
  );
}
