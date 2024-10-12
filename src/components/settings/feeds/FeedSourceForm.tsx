import { messages } from "@/components/settings/feeds/messages";
import { Home } from "@/components/settings/feeds/sources/Home";
import { feedsStore } from "@/stores/feeds";
import type { Feed, FeedSource } from "@/types/Feed";
import { useStore } from "@nanostores/solid";
import { createSignal, For, Show } from "solid-js";

export default function FeedSourceForm({
  requestedResult,
}: {
  requestedResult: "feed" | "source";
}) {
  const [sourceType, setSourceType] = createSignal<FeedSource["type"]>("home");
  const t = useStore(messages);

  const handleSubmitNewFeed = ({ source, feedPartial }: {
    source: FeedSource;
    feedPartial: Pick<Feed, "title">;
  }) => {
    const feed = { ...feedPartial, sources: [source] };

    feedsStore.set([...feedsStore.get(), feed]);
  };

  return (
    <>
      <ul class="flex mb-4 flex-wrap text-center text-gray-500 dark:text-gray-400 gap-4">
        <For
          each={["home", "list", "search"] satisfies FeedSource["type"][]}
        >
          {(key) => (
            <li>
              <button
                classList={{
                  "inline-block px-4 py-3 rounded-lg": true,
                  "bg-ctp-sky text-black": key === sourceType(),
                  "bg-ctp-surface2 text-ctp-text": key !== sourceType(),
                }}
                aria-current={key === sourceType() ? "page" : undefined}
                onClick={() => setSourceType(key)}
              >
                {t()[`${key}Request`]({
                  request: t()[`requestAs_${requestedResult}`],
                })}
              </button>
            </li>
          )}
        </For>
      </ul>
      <Show when={sourceType() === "home"}>
        <Home request="feed" onSubmit={handleSubmitNewFeed} />
      </Show>
    </>
  );
}
