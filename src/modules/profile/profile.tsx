import { EmailRounded } from '@mui/icons-material'
import BadgeIcon from '@mui/icons-material/Badge'
import PersonIcon from '@mui/icons-material/Person'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import { Image } from '#components/common'
import { Role } from '#utils/constants'

import { useUser } from './queries'

export default function Profile() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [profile, setprofile] = useState({ name: 'anonymous', email: 'N/A', roles: [Role.visitor] })
  const { data: user } = useUser()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/profile')
      const profile = await res.json()
      if (profile) {
        setprofile(profile)
      }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) {
    return null
  }

  // If no session exists, display access denied message
  if (!session) {
    return null
  }

  // If session exists, display content
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {user?.profile?.image_192 && (
            <Grid size={12}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Image src={user?.profile?.image_192} />
              </Stack>
            </Grid>
          )}
          <Grid size={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <PersonIcon sx={{ color: '#9e9e9e' }} />
              <Typography variant="body1">{profile?.name}</Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <EmailRounded sx={{ color: '#9e9e9e' }} />
              <Typography variant="body1">{profile?.email}</Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <BadgeIcon sx={{ color: '#9e9e9e' }} />
              <Typography variant="body1">{profile?.roles.join(',')}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
