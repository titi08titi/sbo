import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Role } from '#utils/constants'

export default function useAuth() {
  const { data: session } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRoles, setUserRoles] = useState<string[]>([Role.visitor])

  useEffect(() => {
    if (session === null) {
      setIsAuthenticated(false)
    } else if (session !== undefined) {
      setIsAuthenticated(true)
      setUserRoles(session.user.roles)
    }
  }, [session])

  return { isAuthenticated, userRoles }
}
