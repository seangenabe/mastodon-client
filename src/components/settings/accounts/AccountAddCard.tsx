import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { instancesStore } from "@/stores/instances";
import { useStore } from "@nanostores/solid";
import { createUniqueId, For, type JSX } from "solid-js";
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

  const submitHandler: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();

    const { instanceName } = getFormValues(formRef);

    if (!instanceName.trim()) {
      return;
    }

    (async () => {
      let loginInstance = instanceName;

      try {
        const res = await fetch(`https://${instanceName}/.well-know/host-meta`);

        if (!res.ok) {
          throw new Error("Instance not found");
        }
        const text = await res.text();

        // Parse XML
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(text, "text/xml");

        // Get Link[template]
        const link = xmlDocument.getElementsByName("Link")[0];
        const template = link?.getAttribute("template");

        if (!template) {
          throw new Error("Error parsing host-meta");
        }

        const url = new URL(template);
        const { host } = url;
        if (instanceName !== host) {
          loginInstance = host;
        }

      } catch (error) {
        console.error(error);
      }
    })();

    // Add account
    // const account = { username, instanceName };
    // const accountKey = toString(account);
    // accountsStore.setKey(accountKey, account);

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
        <div class="md:justify-end flex flex-row gap-4">
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
