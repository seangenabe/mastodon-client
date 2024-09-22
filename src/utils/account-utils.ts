import { accountClients, accountsStore } from "@/stores/accounts";
import { createRestAPIClient, type mastodon } from "masto";

export async function getClientForAccount(accountKey: string) {
  const accounts = accountsStore.get();

  const account = accounts[accountKey];
  if (!account) {
    throw new Error("account not found");
  }

  const client = accountClients.get()[accountKey];
  if (client) {
    return client;
  }

  if (!account.accessToken) {
    throw new Error("No access token, please log in");
  }

  const newClient = createRestAPIClient({
    url: `https://${account.instanceName}`,
    accessToken: account.accessToken,
    timeout: 30_000,
  });

  accountClients.setKey(accountKey, newClient);

  return newClient;
}

export function getAccountKey(
  accountInfo: mastodon.v1.Account,
  instanceName: string,
) {
  return `#${accountInfo.id}@${instanceName}`;
}
