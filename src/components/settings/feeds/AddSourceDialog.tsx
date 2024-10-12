import CloseButton from "@/components/common/CloseButton";
import FeedSourceForm from "@/components/settings/feeds/FeedSourceForm";
import type { FeedSource } from "@/types/Feed";
import { onMount } from "solid-js";

export interface AddSourceDialogRef {
  showModal(): Promise<FeedSource | undefined>;
}

export function AddSourceDialog({
  ref,
}: {
  ref?(ref: AddSourceDialogRef): void;
}) {
  let dialogRef!: HTMLDialogElement;
  let resolve: ((value: FeedSource | undefined) => void) | undefined =
    undefined;

  onMount(() => {
    ref?.({
      async showModal() {
        dialogRef.showModal();
        return new Promise((r) => {
          resolve = r;
        });
      },
    });
  });

  const handleSubmit = ({ source }: { source: FeedSource }) => {
    dialogRef.close();
    resolve?.(source);
  };

  const handleClose = () => {
    dialogRef.close();
    resolve?.(undefined);
  };

  return (
    <dialog
      class="p-4 bg-ctp-base rounded-lg border-4 border-ctp-surface1 backdrop:bg-ctp-base text-ctp-text"
      ref={dialogRef}
    >
      <div class="mb-4 flex justify-between">
        <h1 class="text-lg font-bold">Add a new feed source</h1>
        <CloseButton onClick={handleClose} />
      </div>
      <FeedSourceForm requestedResult="source" onSubmit={handleSubmit} />
    </dialog>
  );
}
