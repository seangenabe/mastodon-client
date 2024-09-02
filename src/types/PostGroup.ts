import type { Post } from "@/types/Post";

export interface PostGroup {
  type: "postGroup";
  leader: Post;
  items: Post[];
}
