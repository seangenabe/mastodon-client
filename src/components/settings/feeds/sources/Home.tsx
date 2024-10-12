import { messages } from "@/components/settings/feeds/messages";
import { accountsStore } from "@/stores/accounts";
import type { Feed, HomeFeedSource } from "@/types/Feed";
import { plaintextAccountLine } from "@/utils/plaintext-account-line";
import { useStore } from "@nanostores/solid";
import { For } from "solid-js";

export function Home({ onSubmit, request }: {
  onSubmit: (values: {
    source: HomeFeedSource;
    feedPartial: Pick<Feed, "title">;
  }) => void;
  request: "feed" | "source";
}) {
  let form!: HTMLFormElement;
  const accounts = useStore(accountsStore);
  const t = useStore(messages);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const data = new FormData(form);
    const accountId = data.get("accountId") as string | null;

    if (!accountId) {
      return;
    }

    onSubmit({
      source: { accountId, type: "home" },
      feedPartial: { title: "Home" },
    });
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
        <For each={Object.entries(accounts())}>
          {([accountId, account]) => (
            <option value={accountId}>
              {plaintextAccountLine(account!)}
            </option>
          )}
        </For>
      </select>
      <div></div>
      <div>
        <button
          type="submit"
          class="bg-ctp-blue text-black px-4 py-2 rounded-lg"
        >
          {t().addRequested({ request: t()[`requestAs_${request}`] })}
        </button>
      </div>
    </form>
  );
}
