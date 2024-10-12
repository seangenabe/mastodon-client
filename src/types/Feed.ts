export interface HomeFeedSource {
  type: "home";
  accountId: string;
}

export interface ListFeedSource {
  type: "list";
  accountId: string;
}

export interface SearchFeedSource {
  type: "search";
  accountId?: string;
}

export type FeedSource = HomeFeedSource | ListFeedSource | SearchFeedSource;

/**
 * A viewable user-selectable view of social media posts with a title.
 */
export interface Feed {
  title: string;
  sources: FeedSource[];
}
