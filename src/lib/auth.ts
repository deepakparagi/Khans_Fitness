import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'kf_admin_session'
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set')
  return secret
}

// Convert ArrayBuffer to hex string
function arrayBufferToHexString(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  const hexParts: string[] = [];
  for (let i = 0; i < byteArray.length; i++) {
    const hex = byteArray[i].toString(16);
    const paddedHex = ('00' + hex).slice(-2);
    hexParts.push(paddedHex);
  }
  return hexParts.join('');
}

async function getCryptoKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(getSecret()); 
  
  return await crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function sign(value: string): Promise<string> {
  const key = await getCryptoKey();
  const encoder = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(value)
  );
  return arrayBufferToHexString(signatureBuffer);
}

export async function createSessionToken(): Promise<string> {
  const expiry = Date.now() + SESSION_DURATION_MS
  const payload = `admin:${expiry}`
  const signature = await sign(payload)
  return `${payload}.${signature}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [payload, signature] = parts
  const expectedSignature = await sign(payload)

  // Timing safe equal replacement
  if (signature.length !== expectedSignature.length) return false;
  
  let result = 0;
  for (let i = 0; i < signature.length; i++) {
    result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  if (result !== 0) return false;

  const [prefix, expiryStr] = payload.split(':')
  if (prefix !== 'admin') return false

  const expiry = parseInt(expiryStr, 10)
  if (isNaN(expiry) || Date.now() > expiry) return false

  return true
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return await verifySessionToken(token)
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  const token = await createSessionToken()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: SESSION_DURATION_MS / 1000,
    path: '/',
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export function verifyPassword(inputPassword: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD
  if (!correctPassword) throw new Error('ADMIN_PASSWORD is not set')

  if (inputPassword.length !== correctPassword.length) return false
  
  let result = 0;
  for (let i = 0; i < inputPassword.length; i++) {
    result |= inputPassword.charCodeAt(i) ^ correctPassword.charCodeAt(i);
  }
  return result === 0;
}
