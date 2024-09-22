import { currentInstance, instancesStore } from "@/stores/instances";
import { getAccessToken, requireClientIdSecret } from "@/utils/auth";
import { getClientForInstance } from "@/utils/instance-utils";
import { assert } from "@std/assert";
import { createSignal, onMount } from "solid-js";

export default function CodeReceiver() {
  const [error, setError] = createSignal<string>("");

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
      const client = await getClientForInstance(instanceName);
      const instance = instancesStore.get()[instanceName];
      assert(instance);

      requireClientIdSecret(client);

      // Get access token for account.
      const t = await getAccessToken({
        instanceHostname: instanceName,
        client,
        code,
        codeVerifier: instance.codeVerifier,
      });

      console.log("t", t);
    })();
  });
  return <div>{error()}</div>;
}
