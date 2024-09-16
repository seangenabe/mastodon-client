import { instancesStore } from "@/stores/instances";
import {
  MASTODON_CLIENT_NAME,
  MASTODON_CLIENT_REDIRECT_URI,
  MASTODON_CLIENT_WEBSITE,
} from "astro:env/client";
import { createRestAPIClient } from "masto";

const DEFAULT_SCOPES = "read write follow push";

export async function getClientForInstance(instanceKey: string) {
  const instances = instancesStore.get();
  const instance = instances[instanceKey];

  if (!instance?.client) {
    const masto = createRestAPIClient({
      url: instanceKey,
    });

    const client = await masto.v1.apps.create({
      clientName: MASTODON_CLIENT_NAME,
      website: MASTODON_CLIENT_WEBSITE,
      redirectUris: MASTODON_CLIENT_REDIRECT_URI || MASTODON_CLIENT_WEBSITE,
      scopes: DEFAULT_SCOPES,
    });

    instancesStore.setKey(instanceKey, {
      ...(instancesStore.get()[instanceKey] ?? {}),
      client,
    });
  }
}
