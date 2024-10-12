import FeedSourceForm from "@/components/settings/feeds/FeedSourceForm";

export default function AddFeedCard() {
  return (
    <div class="bg-ctp-surface0 rounded-lg p-4 border-4 border-ctp-surface1 border-dashed">
      <h2 class="font-bold mb-4 mt-2 text-lg">Add a new feed</h2>
      <FeedSourceForm requestedResult="feed" />
    </div>
  );
}
