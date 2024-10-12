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

  return (
    <dialog
      class="p-4 bg-ctp-base rounded-lg border-4 border-ctp-surface1 backdrop:bg-ctp-base text-ctp-text"
      ref={dialogRef}
    >
    </dialog>
  );
}
