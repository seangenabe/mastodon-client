import { AccountLine } from "@/components/common/AccountLine";
import Button from "@/components/common/Button";
import { type Account, toString } from "@/types/Account";
import { Show } from "solid-js";

export default function AccountCard({
  accountKey,
  account,
  onDeleteClick = () => {},
}: {
  accountKey: string;
  account: Account;
  onDeleteClick?(accountKey: string, account: Account): void;
}) {
  return (
    <div
      class="flex flex-col md:min-h-32 bg-ctp-surface1 rounded-lg p-4"
      style={{
        "background-image": `url(${
          JSON.stringify(account.accountInfo?.header)
        })`,
      }}
    >
      <div class="flex-1">
        <Show when={account.accountInfo?.avatar}>
          <figure>
            <img
              src={account.accountInfo?.avatar}
              alt={`${toString(account)}'s avatar`}
              width={80}
              class="rounded-lg border-ctp-overlay0 border-4 border-solid"
            />
          </figure>
        </Show>
        <AccountLine account={account} />
      </div>
      <div class="text-sm md:justify-end flex flex-row gap-4">
        <Button
          variant="link"
          type="button"
          class="text-ctp-red block outline-ctp-red"
          title={`Remove the account ${toString(account)}`}
          onClick={() => onDeleteClick(accountKey, account)}
        >
          <span class="icon-[fe--trash] mr-1"></span>
          Remove
        </Button>
      </div>
    </div>
  );
}
