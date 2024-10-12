import AddFeedCard from "@/components/settings/feeds/AddFeedCard";
import FeedCard from "@/components/settings/feeds/FeedCard";
import { feedsStore } from "@/stores/feeds";
import { For } from "solid-js";

export default function FeedManager() {
  return (
    <div class="flex flex-col gap-4">
      <For each={feedsStore.get()}>
        {(feed, index) => <FeedCard feed={feed} index={index()} />}
      </For>
      <AddFeedCard />
    </div>
  );
}
