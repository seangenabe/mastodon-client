import AddFeedCard from "@/components/settings/feeds/AddFeedCard";
import FeedCard from "@/components/settings/feeds/FeedCard";
import { feedsStore } from "@/stores/feeds";
import { useStore } from "@nanostores/solid";
import { For } from "solid-js";

export default function FeedManager() {
  const feeds = useStore(feedsStore);

  return (
    <div class="flex flex-col gap-4">
      <For each={feeds()}>
        {(feed, index) => <FeedCard feed={feed} index={index()} />}
      </For>
      <AddFeedCard />
    </div>
  );
}
