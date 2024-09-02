import type { Post } from "@/types/Post";
import type { PostGroup } from "@/types/PostGroup";

/**
 * A viewable user-selectable view of social media posts with a title.
 */
export interface View {
  title: string;
  viewItem: (Post | PostGroup)[]
}
