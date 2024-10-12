import { accountsStore } from "@/stores/accounts";
import { feedsStore } from "@/stores/feeds";
import type { Feed, HomeFeed } from "@/types/Feed";
import { plaintextAccountLine } from "@/utils/plaintext-account-line";
import { createSignal, For, Show } from "solid-js";

const TAB_LABELS = {
  home: "Home feed",
  list: "List feed",
  search: "Search feed",
} as const satisfies Record<Feed["type"], string>;

export function AddHomeFeed() {
  let form!: HTMLFormElement;

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    console.log("form", form);
    const data = new FormData(form);
    console.log("data", data);
    const accountId = data.get("accountId") as string | null;

    if (!accountId) {
      return;
    }

    const feed: HomeFeed = {
      title: "Home",
      type: "home",
      accountId: accountId,
    };

    feedsStore.set([...feedsStore.get(), feed]);
  };

  return (
    <form
      class="grid gap-4 sm:grid-cols-2 max-w-prose items-baseline"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label for="accountId" class="text-right">Account</label>
      <select
        id="accountId"
        name="accountId"
        class="bg-ctp-surface1 p-2 rounded-lg"
        required
      >
        <For each={Object.entries(accountsStore.get())}>
          {([accountId, account]) => (
            <option value={accountId}>
              {plaintextAccountLine(account!)}
            </option>
          )}
        </For>
      </select>
      <div></div>
      <div>
        <button type="submit" class="bg-ctp-blue text-black p-2 rounded-lg">
          Add feed
        </button>
      </div>
    </form>
  );
}

export default function AddFeedCard() {
  const [feedType, setFeedType] = createSignal<Feed["type"]>("home");

  return (
    <div class="bg-ctp-surface0 rounded-lg p-4 border-4 border-ctp-surface1 border-dashed">
      <h2 class="font-bold mb-4 mt-2 text-lg">Add a new feed</h2>
      <ul class="flex mb-4 flex-wrap text-center text-gray-500 dark:text-gray-400 gap-4">
        <For each={Object.entries(TAB_LABELS) as [Feed["type"], string][]}>
          {([key, label]) => (
            <li>
              <button
                classList={{
                  "inline-block px-4 py-3 rounded-lg": true,
                  "bg-ctp-sky text-black": key === feedType(),
                  "bg-ctp-surface2 text-ctp-text": key !== feedType(),
                }}
                aria-current={key === feedType() ? "page" : undefined}
                onClick={() => setFeedType(key)}
              >
                {label}
              </button>
            </li>
          )}
        </For>
      </ul>
      <Show when={feedType() === "home"}>
        <AddHomeFeed />
      </Show>
    </div>
  );
}
