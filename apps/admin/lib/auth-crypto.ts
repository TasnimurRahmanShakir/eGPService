export const ADMIN_COOKIE_NAME = 'egp_admin_session';

const SECRET = process.env.ADMIN_SESSION_SECRET || 'egp-command-enterprise-ultra-secure-secret-key-2026';

function strToUint8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function toBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    strToUint8(SECRET) as unknown as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export interface SessionPayload {
  user: string;
  iat: number;
  exp: number;
  nonce: string;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token.
 * Payload includes issuance timestamp, expiration (7 days), and a unique random nonce.
 */
export async function createSessionToken(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    user: username,
    iat: now,
    exp: now + 7 * 24 * 60 * 60, // 7 days
    nonce: crypto.randomUUID(),
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = toBase64Url(strToUint8(payloadStr));

  const key = await getHmacKey();
  const signatureBuf = await crypto.subtle.sign(
    'HMAC',
    key,
    strToUint8(payloadB64) as unknown as BufferSource
  );
  const signatureB64 = toBase64Url(signatureBuf);

  return `${payloadB64}.${signatureB64}`;
}

/**
 * Verifies the integrity, HMAC signature, and expiration of the session token.
 * Returns true only if the token was signed with the server secret and is unexpired.
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadB64, signatureB64] = parts;

  try {
    const key = await getHmacKey();
    const signatureBytes = fromBase64Url(signatureB64);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      strToUint8(payloadB64) as unknown as BufferSource
    );

    if (!isValid) return false;

    const payloadStr = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload: SessionPayload = JSON.parse(payloadStr);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return false; // Expired
    }

    return true;
  } catch {
    return false;
  }
}
