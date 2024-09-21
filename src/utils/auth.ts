import {
  generateCodeChallenge,
  supportsPkce,
  verifier,
} from "@/utils/oauth-pkce";
import { MASTODON_CLIENT_WEBSITE } from "astro:env/client";
import ky from "ky";

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

export async function getRealInstanceHost(instanceName: string) {
  let realInstanceHost: string = instanceName;
  const text = await ky(`https://${instanceName}/.well-known/host-meta`).text();

  // Parse XML
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(text, "text/xml");

  // Get Link[template]
  const link = xmlDocument.getElementsByTagName("Link")[0];
  const template = link?.getAttribute("template");

  if (!template) {
    throw new Error("Error parsing host-meta");
  }

  const url = new URL(template);
  const { host } = url;
  if (instanceName !== host) {
    realInstanceHost = host;
  }

  return realInstanceHost;
}

export async function getMatchingAuthorizationUrl(
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
): Promise<{ url: string; codeVerifier?: string }> {
  const isPkceSupported = await supportsPkce({ instanceHostname });

  if (isPkceSupported) {
    const { url, codeVerifier } = await getPkceAuthorizationUrl({
      instanceHostname,
      clientId,
      redirectUri,
      scope,
    });

    return { url, codeVerifier };
  }

  const url = await getAuthorizationUrl({
    instanceHostname,
    clientId,
    redirectUri,
    scope,
  });
  return { url };
}

export async function getPkceAuthorizationUrl(
  {
    instanceHostname,
    clientId,
    redirectUri = DEFAULT_REDIRECT_URI,
    scope = DEFAULT_SCOPE,
  }: {
    instanceHostname: RealInstanceKey;
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
  instanceHostname: RealInstanceKey;
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
