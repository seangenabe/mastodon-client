import FeedSourceForm from "@/components/settings/feeds/FeedSourceForm";
import { feedsStore } from "@/stores/feeds";
import type { Feed, FeedSource } from "@/types/Feed";

export default function AddFeedCard() {
  const handleSubmit = (
    { source, feedPartial }: {
      source: FeedSource;
      feedPartial: Pick<Feed, "title">;
    },
  ) => {
    const newFeed = { ...feedPartial, sources: [source] };

    feedsStore.set([...feedsStore.get(), newFeed]);
  };

  return (
    <div class="bg-ctp-surface0 rounded-lg p-4 border-4 border-ctp-surface1 border-dashed">
      <h2 class="font-bold mb-4 mt-2 text-lg">Add a new feed</h2>
      <FeedSourceForm requestedResult="feed" onSubmit={handleSubmit} />
    </div>
  );
}
