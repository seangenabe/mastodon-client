import { AccountLine } from "@/components/common/AccountLine";
import AddFeedSourceCard from "@/components/settings/feeds/AddFeedSourceCard";
import { accountsStore } from "@/stores/accounts";
import { feedsStore } from "@/stores/feeds";
import type { Feed, HomeFeedSource } from "@/types/Feed";
import { useStore } from "@nanostores/solid";
import { For, type JSX, Show } from "solid-js";

export function HomeSourceCard({ source }: { source: HomeFeedSource }) {
  const accounts = useStore(accountsStore);
  const account = accounts()[source.accountId];

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <>
      <span class="font-bold">Home:</span> <AccountLine account={account} />
    </>
  );
}

export function SourceCardWrapper(
  { children, onDelete }: { children: JSX.Element; onDelete: () => void },
) {
  return (
    <div class="p-4 bg-ctp-peach text-black rounded-lg border-white border-4 flex flex-row gap-4 items-center">
      <div class="flex-1">
        {children}
      </div>
      <div>
        <button
          class="rounded-lg p-2 outline-4 hover:outline active:outline focus:outline outline-black"
          title="Delete this feed source"
          aria-label="Delete this feed source"
          onClick={() => onDelete()}
        >
          <span class="icon-[fe--trash] mr-1"></span>
        </button>
      </div>
    </div>
  );
}

export default function FeedCard(
  { feed, index }: { feed: Feed; index: number },
) {
  const handleDeleteSource = (sourceIndex: number) => {
    const feeds = feedsStore.get();

    feedsStore.set(
      feeds.map((feed, currentIndex) => {
        if (currentIndex !== index) {
          return feed;
        }
        return {
          ...feed,
          sources: feed.sources.toSpliced(sourceIndex, 1),
        };
      }),
    );
  };

  const handleDeleteFeed = () => {
    const feeds = feedsStore.get();

    feedsStore.set(feeds.toSpliced(index, 1));
  };

  return (
    <div class="flex flex-row gap-4 rounded-lg bg-ctp-surface2">
      <div class="p-4">{index}</div>
      <div class="p-4 flex-1">
        <h2 class="font-bold text-lg mt-2 mb-4">{feed.title}</h2>
        <section class="border border-white rounded-lg px-2 py-4">
          <h3 class="font-bold mb-4">Sources</h3>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <For each={feed.sources}>
              {(source, index) => (
                <SourceCardWrapper onDelete={() => handleDeleteSource(index())}>
                  <Show when={source.type === "home"}>
                    <HomeSourceCard source={source as HomeFeedSource} />
                  </Show>
                </SourceCardWrapper>
              )}
            </For>
            <AddFeedSourceCard />
          </div>
        </section>
      </div>
      <div class="p-4">
        <button
          class="rounded-lg p-2 outline-4 hover:outline active:outline focus:outline outline-ctp-red text-ctp-red"
          title="Delete this feed"
          aria-label="Delete this feed"
          onClick={() => handleDeleteFeed()}
        >
          <span class="icon-[fe--trash] mr-1"></span>
        </button>
      </div>
    </div>
  );
}
