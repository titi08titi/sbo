import axios from 'axios'
import { JWT } from 'next-auth/jwt'

import { JWTToken } from '#utils/global'

export const getDateNowInSecond = () => Math.floor(Date.now() / 1000)
export function hasExpired(tokenExpiresAt: number | undefined) {
  return !!tokenExpiresAt && tokenExpiresAt < getDateNowInSecond()
}

export const refreshAccessToken = async (token: JWTToken) => {
  try {
    if (hasExpired(token?.refreshTokenExpiresAt)) throw Error('Refresh token has expired')

    // remember that client is "public" we don't have a client_secret
    const details = {
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      grant_type: ['refresh_token'],
      refresh_token: token.refreshToken,
    }

    // FormData() is not available in server side we have to convert "manually"
    const formBody: string[] = []
    Object.entries(details).forEach(([key, value]: [string, any]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)
      formBody.push(encodedKey + '=' + encodedValue)
    })
    const formData = formBody.join('&')
    const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
      credentials: 'include',
      method: 'POST',
    })

    const newToken = await response.json()
    if (newToken?.access_token) {
      return {
        ...token,
        accessToken: newToken?.access_token,
        accessTokenExpiresAt: getDateNowInSecond() + newToken?.expires_in,
        refreshToken: newToken?.refresh_token,
        refreshTokenExpiresAt: getDateNowInSecond() + newToken?.refresh_expires_in,
      }
    }
    return newToken
  } catch (error) {
    console.error('Access token refresh failed reason: ', error)
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}

export const logout = async (token: JWT) => {
  const params = new URLSearchParams()
  params.append('id_token_hint', token.id_token)
  try {
    await axios.get(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`)
  } catch (e) {
    console.error('Failed to logout from Keycloak', e)
  }
}
