/**
 * Converts a number to a two-digit hexadecimal string.
 *
 * @param dec - The number to convert to a two-digit hexadecimal string.
 * @returns The two-digit hexadecimal string representation of the number.
 */
function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, "0");
}

export function verifier() {
  const array = new Uint32Array(56 / 2);
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

/**
 * Computes the SHA-256 digest of a given string.
 *
 * @param text - The string to compute the digest of.
 * @returns A Promise that resolves to the SHA-256 digest of `text`.
 */
async function sha256(text: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return await crypto.subtle.digest("SHA-256", data);
}

/**
 * Encodes a Uint8Array as a base64 string, but modified to
 * use URL-safe characters.
 *
 * @param input - The Uint8Array to encode.
 * @returns The URL-safe base64 encoded string.
 */
function base64urlencode(input: Uint8Array) {
  const strings: string[] = [];
  for (const byte of input) {
    strings.push(String.fromCharCode(byte));
  }
  return btoa(strings.join("")).replace(/\+/g, "-").replace(/\//g, "_").replace(
    /=+$/,
    "",
  );
}

export async function generateCodeChallenge(v: string) {
  const hashed = await sha256(v);
  return base64urlencode(new Uint8Array(hashed));
}

/**
 * Checks if a given instance supports the PKCE flow.
 *
 * The function fetches the oauth-authorization-server .well-known endpoint
 * of the given instance and checks if it supports the S256
 * challenge method.
 *
 * @param {object} args
 * @param {string} [args.instanceHostname] - The instance to check.
 * @returns true if the instance supports PKCE, false otherwise.
 */
export async function supportsPkce(
  { instanceHostname }: { instanceHostname?: string },
) {
  if (!instanceHostname) {
    return false;
  }
  try {
    const response = await fetch(
      `https://${instanceHostname}/.well-known/oauth-authorization-server`,
    );
    if (!response.ok || response.status !== 200) {
      return false;
    }
    const body = await response.json() as {
      code_challenge_methods_supported?: string[];
    };
    return body.code_challenge_methods_supported?.includes("S256");
  } catch (error) {
    return false;
  }
}
