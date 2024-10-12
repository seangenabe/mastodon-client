import {
  AddSourceDialog,
  type AddSourceDialogRef,
} from "@/components/settings/feeds/AddSourceDialog";
import { feedsStore } from "@/stores/feeds";
import { createSignal } from "solid-js";

export default function AddFeedSourceCard({
  feedIndex,
}: { feedIndex: number }) {
  const [addSourceDialog, setAddSourceDialog] = createSignal<
    AddSourceDialogRef
  >();

  const handleAddFeedSource = async () => {
    try {
      const newSource = await addSourceDialog()?.showModal();
      if (!newSource) {
        return;
      }

      feedsStore.set(
        feedsStore.get().map((feed, index) => {
          if (index !== feedIndex) {
            return feed;
          }
          return {
            ...feed,
            sources: [...feed.sources, newSource],
          };
        }),
      );
    } catch (err) {
      // Do nothing
    }
  };

  return (
    <div class="bg-ctp-peach text-black rounded-lg border-white border-4 p-4 border-dashed">
      <button
        class="rounded-lg p-2 outline-4 hover:outline active:outline focus:outline outline-black"
        onClick={() => handleAddFeedSource()}
      >
        Add a new feed source
      </button>
      <AddSourceDialog ref={setAddSourceDialog} />
    </div>
  );
}
