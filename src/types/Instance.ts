import type { mastodon } from "masto";

export interface Instance {
  client?: mastodon.v1.Client;
  codeVerifier?: string;
}
