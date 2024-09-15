import { generateCodeChallenge, verifier } from "@/utils/oauth-pkce";
import {
  MASTODON_CLIENT_NAME,
  MASTODON_CLIENT_WEBSITE,
} from "astro:env/client";

const isSameHost = MASTODON_CLIENT_WEBSITE
  ? MASTODON_CLIENT_WEBSITE.toLowerCase().includes(
    location.hostname.toLowerCase(),
  )
  : false;
const currentLocation = location.origin + location.pathname;
const DEFAULT_REDIRECT_URI = isSameHost
  ? MASTODON_CLIENT_WEBSITE
  : currentLocation;
const DEFAULT_SCOPE = "read write follow push";

export async function registerApplication(
  {
    instanceHostname,
    clientName = MASTODON_CLIENT_NAME,
    redirectUris = DEFAULT_REDIRECT_URI,
    scopes = DEFAULT_SCOPE,
    website = MASTODON_CLIENT_WEBSITE,
  }: {
    instanceHostname: string;
    clientName?: string;
    redirectUris?: string;
    scopes?: string;
    website?: string;
  },
) {
  const registrationParams = new URLSearchParams({
    client_name: clientName,
    redirect_uris: redirectUris,
    scopes,
    website,
  });

  const registrationResponse = await fetch(
    `https://${instanceHostname}/api/v1/apps`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: registrationParams,
    },
  );

  if (!registrationResponse.ok) {
    throw new Error("Application registration failed");
  }

  const { client_id, client_secret, vapid_key } = await registrationResponse
    .json() as {
      client_id: string;
      client_secret: string;
      vapid_key: string;
    };

  return {
    clientId: client_id,
    clientSecret: client_secret,
    vapidKey: vapid_key,
  };
}

export async function getPkceAuthorizationUrl(
  {
    instanceHostname,
    clientId,
    redirectUri = DEFAULT_REDIRECT_URI,
    scope = DEFAULT_SCOPE,
  }: {
    instanceHostname: string;
    clientId: string;
    redirectUri?: string;
    scope?: string;
  },
) {
  const codeVerifier = verifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const params = new URLSearchParams({
    client_id: clientId,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
  });
  const authorizationUrl = new URL(
    `https://${instanceHostname}/oauth/authorize`,
  );
  authorizationUrl.search = params.toString();
  return {
    url: authorizationUrl.toString(),
    codeVerifier,
  };
}

export async function getAuthorizationUrl({
  instanceHostname,
  clientId,
  redirectUri = DEFAULT_REDIRECT_URI,
  scope = DEFAULT_SCOPE,
}: {
  instanceHostname: string;
  clientId: string;
  redirectUri?: string;
  scope?: string;
}) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
  });
  const authorizationUrl = new URL(
    `https://${instanceHostname}/oauth/authorize`,
  );
  authorizationUrl.search = params.toString();
  return authorizationUrl.toString();
}
