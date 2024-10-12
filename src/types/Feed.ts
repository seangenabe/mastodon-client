export type WithTitle = {
  title: string;
};

export type HomeFeed = WithTitle & {
  type: "home";
  accountId: string;
};

export type ListFeed = WithTitle & {
  type: "list";
  accountId: string;
};

export type SearchFeed = WithTitle & {
  type: "search";
  accountId?: string;
};

/**
 * A viewable user-selectable view of social media posts with a title.
 */
export type Feed = HomeFeed | ListFeed | SearchFeed;
