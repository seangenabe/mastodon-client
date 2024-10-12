import { accountsStore } from "@/stores/accounts";
import type { Feed, HomeFeed } from "@/types/Feed";
import { Show } from "solid-js";

export function HomeFeedCard({ feed }: { feed: HomeFeed }) {
  const account = accountsStore.get()[feed.accountId];

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <div>
      <p>Home feed for account: {account.accountInfo?.displayName}</p>
    </div>
  );
}

export default function FeedCard(
  { feed, index }: { feed: Feed; index: number },
) {
  return (
    <div class="flex flex-row gap-4">
      <div>{index}</div>
      <Show when={feed.type === "home"}>
        <HomeFeedCard feed={feed} />
      </Show>
    </div>
  );
}
