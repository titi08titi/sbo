// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    res.send({
      error: 'You must be signed in to view the protected content on this page.',
    })

    return
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // Raw gives the un-decoded JWT
    raw: true,
  })

  res.send({
    content: `This is protected content. Your name is ${token}`,
  })
}
