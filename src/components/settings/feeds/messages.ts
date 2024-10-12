import { i18n } from "@/stores/translations";
import { params } from "@nanostores/i18n";

export const messages = i18n("feeds", {
  requestAs_feed: "feed",
  requestAs_source: "source",
  homeRequest: params("Home {request}"),
  listRequest: params("List {request}"),
  searchRequest: params("Search {request}"),
  addRequested: params("Add {request}"),
  defaultTitle_home: "Home",
});
