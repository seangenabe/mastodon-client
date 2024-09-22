import Spinner from "@/components/common/Spinner";
import { accountsStore } from "@/stores/accounts";
import { currentInstance, instancesStore } from "@/stores/instances";
import { getAccountKey } from "@/utils/account-utils";
import { getAccessToken, requireClientIdSecret } from "@/utils/auth";
import { getErrorMessage } from "@/utils/error";
import { getClientForInstance } from "@/utils/instance-utils";
import { assert } from "@std/assert";
import { createRestAPIClient } from "masto";
import { createSignal, onMount, Show } from "solid-js";

export default function CodeReceiver() {
  const [error, setError] = createSignal<string>("");
  const [loading, setLoading] = createSignal(false);

  onMount(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) {
      setError("code is missing. Did you get here by mistake?");
      return;
    }

    // Receive code from Mastodon instance
    const instanceName = currentInstance.get();
    if (!instanceName) {
      setError(
        "Instance is not set. Please go through the regular login flow.",
      );
      return;
    }

    // Clear the code from the URL
    // history.replaceState(
    //   {},
    //   document.title,
    //   location.pathname ?? "/auth/receive-code",
    // );

    (async () => {
      setLoading(true);
      try {
        const client = await getClientForInstance(instanceName);
        const instance = instancesStore.get()[instanceName];
        assert(instance);

        requireClientIdSecret(client);

        // Get access token for account.
        const { accessToken } = await getAccessToken({
          instanceHostname: instanceName,
          client,
          code,
          codeVerifier: instance.codeVerifier,
        });

        // Determine user info
        const masto = createRestAPIClient({
          url: `https://${instanceName}`,
          accessToken,
        });
        const credentials = await masto.v1.accounts.verifyCredentials();

        // Save account
        accountsStore.setKey(getAccountKey(credentials, instanceName), {
          username: credentials.username,
          instanceName,
          accessToken,
          accountInfo: credentials,
        });

        location.replace("/settings/accounts");
      } catch (err) {
        console.error(err);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  });
  return (
    <div class="flex flex-col gap-4">
      <Show when={loading()}>
        <div class="px-4 text-center">
          <Spinner />
        </div>
      </Show>
      <Show when={error()}>
        <div class="px-4">
          <a
            href="/"
            class="underline text-ctp-blue"
          >
            Home
          </a>
        </div>
        <div
          class="p-4 text-sm text-ctp-red rounded-lg bg-ctp-surface0"
          role="alert"
        >
          {error()}
        </div>
      </Show>
    </div>
  );
}
