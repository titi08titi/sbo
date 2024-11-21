import { NextRequest, NextResponse } from 'next/server'
import { encode, getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { hasPageAccess } from '#core/authorizations'
import { hasExpired, refreshAccessToken } from '#pages/api/auth/utils'
import { TIME_SECURITY_MARGIN, Role } from '#utils/constants'
import { JWTToken } from '#utils/global'

const SESSION_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token'
const SESSION_TIMEOUT = 60 * 60 * 24 * 7 // 1 week
const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith('https://') || false
const SIGNIN_SUB_URL = '/api/auth/signin'
const COOKIE_CHUNK_SIZE = 3933

function shouldUpdateToken(token: JWTToken): boolean {
  const expired = hasExpired(token?.accessTokenExpiresAt - TIME_SECURITY_MARGIN)
  return expired
}

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/api/auth/signin', request.url))

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes(SESSION_COOKIE)) response.cookies.delete(cookie.name)
  })

  return response
}

function updateCookie(sessionToken: string | null, request: NextRequest, response: NextResponse): NextResponse {
  if (!sessionToken) {
    request.cookies.delete(SESSION_COOKIE)
    return NextResponse.redirect(new URL(SIGNIN_SUB_URL, request.url))
  }

  // Set the session token in the request and response cookies for a valid session
  const regex = new RegExp('.{1,' + COOKIE_CHUNK_SIZE + '}', 'g')

  // split the string into an array of strings
  const tokenChunks = sessionToken.match(regex)

  // set request cookies for the incoming getServerSession to read new session
  tokenChunks.forEach((tokenChunk, index) => {
    request.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk)
  })

  // updated request cookies can only be passed to server if its passdown here after setting its updates
  response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  if (tokenChunks) {
    // set response cookies to send back to browser
    tokenChunks.forEach((tokenChunk, index) => {
      response.cookies.set(`${SESSION_COOKIE}.${index}`, tokenChunk, {
        httpOnly: true,
        maxAge: SESSION_TIMEOUT,
        secure: SESSION_SECURE,
        sameSite: 'lax',
      })
    })
  }

  return response
}

function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.set('Access-Control-Max-Age', '86400')
  return response
}

// middleware is applied to all routes, use conditionals to select
export default withAuth(
  async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })

    if (token === null) {
      return signOut(request)
    }

    // retrieve the current response
    let response = NextResponse.next()

    // add the CORS headers to the response
    response = addCorsHeaders(response)
    const updateToken = shouldUpdateToken(token as unknown as JWTToken)
    if (updateToken) {
      const newToken = await refreshAccessToken(token as unknown as JWTToken)
      const newSessionToken = await encode({
        secret: process.env.NEXTAUTH_SECRET,
        token: newToken,
        maxAge: SESSION_TIMEOUT,
      })
      // Update session token with new access token
      response = updateCookie(newSessionToken, request, response)
    }
    return response
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        if (token === null) {
          return false
        }

        const roles = token.user.roles
        if (roles.length === 0) {
          roles.push(Role.visitor)
        }

        const { pathname } = req.nextUrl

        if (pathname.includes('/api')) {
          return true
        }

        const pathnameWithoutParams = pathname.split('?')[0]
        return hasPageAccess(pathnameWithoutParams, roles)
      },
    },
  }
)
