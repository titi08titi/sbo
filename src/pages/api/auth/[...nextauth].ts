import jwt_decode from 'jwt-decode'
import NextAuth, { TokenSet } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'

import { KeycloakJwtPayload } from '#pages/api/auth/nextauth'
import { JWTToken } from '#utils/global'

import { getDateNowInSecond, hasExpired, logout, refreshAccessToken } from './utils'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // Set to true for more detailed logs
  debug: !!process.env.NEXTAUTH_DEBUG,

  session: {
    strategy: 'jwt',
  },

  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      ...KeycloakProvider({
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        // we don't have a client secret because our keycloak client is "public"
        clientSecret: '',
        issuer: process.env.KEYCLOAK_ISSUER,
      }),
      profile(profile: KeycloakProfile, tokens: TokenSet) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          expiresAt: tokens.expires_at,
        }
      },
      client: {
        // these are set to none because we don't have a client secret
        token_endpoint_auth_method: 'none',
        introspection_endpoint_auth_method: 'none',
        revocation_endpoint_auth_method: 'none',
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const decodedJWT = jwt_decode<KeycloakJwtPayload>(account.access_token)
        const roles = decodedJWT.resource_access['oidc_stock-accounting-machine_sam-sambot-ui_pub']?.roles ?? []
        token.accessTokenExpiresAt = account.expires_at
        token.refreshTokenExpiresAt = getDateNowInSecond() + Number(account.refresh_expires_in)
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.user = { ...user, roles: roles }
        return token
      }

      if (!hasExpired(Number(token?.accessTokenExpiresAt))) return token

      // force cast because we can't specify custom type for token param
      const refreshedToken = await refreshAccessToken(token as unknown as JWTToken)

      // force cast because we can't specify return type of this function
      return refreshedToken as unknown as JWT
    },

    session: async ({ session, token }) => {
      session.user = token.user
      return {
        ...session,
        ...token,
      }
    },

    // Allow only Keycloak SSO
    signIn: async ({ account }) => account.provider === 'keycloak',
  },
  events: {
    signOut: async ({ token }) => {
      logout(token)
    },
  },
  theme: {
    colorScheme: 'auto',
  },
})
