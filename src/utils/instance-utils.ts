import { instancesStore } from "@/stores/instances";
import type { Instance } from "@/types/Instance";
import { mergeIntoMap } from "@/utils/nanostores";
import {
  MASTODON_CLIENT_NAME,
  MASTODON_CLIENT_REDIRECT_URI,
  MASTODON_CLIENT_WEBSITE,
} from "astro:env/client";
import { createRestAPIClient } from "masto";
import type { MapStore } from "nanostores";

const DEFAULT_SCOPES = "read write follow push";

export async function getClientForInstance(realInstanceKey: string) {
  const instances = instancesStore.get();
  const instance = instances[realInstanceKey];

  if (!instance?.client) {
    const masto = createRestAPIClient({
      url: `https://${realInstanceKey}`,
    });

    const client = await masto.v1.apps.create({
      clientName: MASTODON_CLIENT_NAME,
      website: MASTODON_CLIENT_WEBSITE,
      redirectUris: MASTODON_CLIENT_REDIRECT_URI || MASTODON_CLIENT_WEBSITE,
      scopes: DEFAULT_SCOPES,
    });

    mergeIntoMap(
      instancesStore as MapStore<Record<string, Instance>>,
      realInstanceKey,
      {
        client,
      },
      () => ({}),
    );

    return client;
  }

  return instance?.client;
}
