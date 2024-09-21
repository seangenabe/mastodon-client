import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/Spinner";
import { instancesStore } from "@/stores/instances";
import type { Instance } from "@/types/Instance";
import { getMatchingAuthorizationUrl, getRealInstanceHost } from "@/utils/auth";
import { getClientForInstance } from "@/utils/instance-utils";
import { mergeIntoMap } from "@/utils/nanostores";
import { useStore } from "@nanostores/solid";
import type { MapStore } from "nanostores";
import { createSignal, createUniqueId, For, type JSX, Show } from "solid-js";
import { twMerge } from "tailwind-merge";

function getFormValues(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    username: (data.get("username") as string | null)?.trim() ?? "",
    instanceName: (data.get("instanceName") as string | null)?.trim() ?? "",
  };
}

export default function AccountAddCard({
  class: className = "",
}: {
  class?: string;
}) {
  const instances = useStore(instancesStore);
  let usernameField!: HTMLInputElement;
  let formRef!: HTMLFormElement;
  const [loading, setLoading] = createSignal(false);

  const submitHandler: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();

    setLoading(true);

    const formValues = getFormValues(formRef);
    const userInputInstanceKey = formValues
      .instanceName;

    if (!userInputInstanceKey.trim()) {
      return;
    }

    (async () => {
      try {
        const realInstanceHost = await getRealInstanceHost(
          userInputInstanceKey,
        );
        const client = await getClientForInstance(realInstanceHost);
        const { url, codeVerifier } = await getMatchingAuthorizationUrl({
          instanceHostname: realInstanceHost,
          clientId: client.clientId!,
        });

        if (codeVerifier) {
          mergeIntoMap(
            instancesStore as MapStore<Record<string, Instance>>,
            realInstanceHost,
            { codeVerifier },
            () => ({}),
          );
        }

        // Redirect to auth url
        location.href = url;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();

    // Add account
    // const account = { username, instanceName };
    // const accountKey = toString(account);
    // accountsStore.setKey(accountKey, ac unt);

    // e.currentTarget.reset();
    // usernameField.focus();
  };

  const instanceKeys = () => Object.entries(instances());
  const listId = createUniqueId();

  return (
    <div
      class={twMerge(
        "bg-ctp-surface0 rounded-lg p-4 border-4 border-ctp-surface1 border-dashed",
        className,
      )}
    >
      <form
        class="flex flex-col gap-4 h-full"
        onSubmit={submitHandler}
        ref={formRef}
      >
        <div class="flex-1 flex">
          <label class="flex-1 flex flex-col gap-1">
            <div class="text-sm">Instance</div>
            <div class="flex align-baseline">
              <Input
                name="instanceName"
                list={listId}
                required
                class="w-full"
              />
              <datalist id={listId}>
                <For each={instanceKeys()}>
                  {([key]) => <option value={key}>{key}</option>}
                </For>
              </datalist>
            </div>
          </label>
        </div>
        <div class="md:justify-end flex flex-row gap-4 align-middle">
          <Show when={loading()}>
            <div class="flex flex-col justify-center">
              <Spinner label="Preparing login page on Mastodon instance, please wait." />
            </div>
          </Show>
          <Button variant="primary" type="submit" disabled={loading()}>
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
