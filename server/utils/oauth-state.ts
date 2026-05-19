import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'

type OAuthStatePayload = {
  nonce: string
  exp: number
}

const OAUTH_STATE_MAX_AGE_SECONDS = 60 * 10

const toBase64Url = (value: string) => Buffer.from(value, 'utf8').toString('base64url')
const fromBase64Url = (value: string) => Buffer.from(value, 'base64url').toString('utf8')

const getAuthSecret = () => {
  const config = useRuntimeConfig()

  if (!config.authSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing AUTH_SECRET or SESSION_SECRET in environment variables.'
    })
  }

  return config.authSecret
}

const signPayload = (payloadBase64: string, secret: string) => {
  return createHmac('sha256', secret).update(payloadBase64).digest('base64url')
}

export const createOAuthState = () => {
  const secret = getAuthSecret()
  const payload: OAuthStatePayload = {
    nonce: randomUUID(),
    exp: Math.floor(Date.now() / 1000) + OAUTH_STATE_MAX_AGE_SECONDS
  }

  const payloadBase64 = toBase64Url(JSON.stringify(payload))
  const signature = signPayload(payloadBase64, secret)

  return `${payloadBase64}.${signature}`
}

export const verifyOAuthState = (state: string) => {
  const secret = getAuthSecret()
  const [payloadBase64, signature] = state.split('.')

  if (!payloadBase64 || !signature) {
    return false
  }

  const expectedSignature = signPayload(payloadBase64, secret)

  try {
    const incoming = Buffer.from(signature)
    const expected = Buffer.from(expectedSignature)

    if (incoming.length !== expected.length || !timingSafeEqual(incoming, expected)) {
      return false
    }

    const payload = JSON.parse(fromBase64Url(payloadBase64)) as OAuthStatePayload

    return Boolean(payload.exp && payload.exp >= Math.floor(Date.now() / 1000) && payload.nonce)
  } catch {
    return false
  }
}