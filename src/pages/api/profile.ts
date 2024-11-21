import { Session } from 'next-auth/core/types'
import { getSession } from 'next-auth/react'

import { Role } from '#utils/constants'
import { intersection } from '#utils/helper'

export default async (req, res) => {
  const session: Session = await getSession({ req })
  if (session === null) {
    return res.status(204)
  }

  const roles = intersection([Role.admin, Role.support, Role.accountingUser, Role.accountingManager], session.user?.roles ?? [])
  if (roles.length === 0) {
    roles.push(Role.visitor)
  }
  return res.status(200).json({ name: session.user?.name, email: session.user?.email, roles: roles })
}
