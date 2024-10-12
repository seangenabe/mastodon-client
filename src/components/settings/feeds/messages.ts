import { i18n } from "@/stores/translations";
import { params } from "@nanostores/i18n";

export const messages = i18n("feeds", {
  requestAs_feed: "Feed",
  requestAs_source: "Source",
  homeRequest: params("Home {request}"),
  listRequest: params("List {request}"),
  searchRequest: params("Search {request}"),
  addRequested: params("Add {request}"),
});
