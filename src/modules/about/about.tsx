import NicoAvatar from '@/avatar/T0F48V7E2-U03BJJCBV1V-f13eafc4ab70-72.jpg'
import { Card, CardContent, Avatar, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'

import React from 'react'

import { BASE_SLACK_URI } from '#utils/constants'

export default function About() {
  function getAvatarSlackUri(avatarId) {
    return `${BASE_SLACK_URI}/${avatarId}`
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Card>
          <CardContent>
            <h2>
              <a href="slack://channel?team=T0F48V7E2&id=CGPSQ8FTK">Stock Accounting Machine team</a>
            </h2>
            <Grid container spacing={2}>
              <Grid size={4}>
                <h3>IT manager</h3>
                <a href="slack://user?team=T0F48V7E2&id=U1A4PMDSA">
                  <Avatar alt="Daniel" title="Daniel THIMONIER" src={getAvatarSlackUri('T0F48V7E2-U1A4PMDSA-c37c1640cd00-192')} />
                </a>
              </Grid>
              <Grid size={4}>
                <h3>Lead developer</h3>
                <a href="slack://user?team=T0F48V7E2&id=U2NQVM9N1">
                  <Avatar alt="Sebastien" title="Sebastien LANDRIEUX" src={getAvatarSlackUri('T0F48V7E2-U2NQVM9N1-5e938592a82d-72')} />
                </a>
              </Grid>
              <Grid size={4}>
                <h3>Developers</h3>
                <Stack direction="row" spacing={3}>
                  <a href="slack://user?team=T0F48V7E2&id=U183W7690">
                    <Avatar alt="Arnaud" title="Arnaud BOUCHET" src={getAvatarSlackUri('T0F48V7E2-U183W7690-cd12b06bd49f-72')} />
                  </a>
                  <a href="slack://user?team=T0F48V7E2&id=U04BT4N2SCT">
                    <Avatar
                      alt="Michel"
                      title="Michel WAN YING CHING"
                      src={getAvatarSlackUri('T0F48V7E2-U04BT4N2SCT-7ced0dab879c-72')}
                    />
                  </a>
                </Stack>
              </Grid>
              <Grid size={4}>
                <h3>Product owner</h3>
                <a href="slack://user?team=T0F48V7E2&id=U4YM4E73K">
                  <Avatar alt="Valentin" title="Valentin LEROUX" src={getAvatarSlackUri('T0F48V7E2-U4YM4E73K-b94fc65fbcde-512')} />
                </a>
              </Grid>
              <Grid size={4}>
                <h3>Data analysts</h3>
                <Stack direction="row" spacing={3}>
                  <a href="slack://user?team=T0F48V7E2&id=U18NNQSNB">
                    <Avatar alt="Boris" title="Boris LEROYER" src={getAvatarSlackUri('T0F48V7E2-U18NNQSNB-4f72b17d5b39-72')} />
                  </a>
                  <a href="slack://user?team=T0F48V7E2&id=UB09A6K3J">
                    <Avatar alt="Carine" title="Carine BUTTEZ" src={getAvatarSlackUri('T0F48V7E2-UB09A6K3J-df235451d096-72')} />
                  </a>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <h2>
              <a href="slack://channel?team=T0F48V7E2&id=CE7TWN4AG">Supply & Stock tribe</a>
            </h2>
            <Grid container spacing={2}>
              <Grid size={4}>
                <h3>Lead IT</h3>
                <a href="slack://user?team=T0F48V7E2&id=U2E6EKLNB">
                  <Avatar alt="Julien" title="Julien HAYOTTE" src={getAvatarSlackUri('T0F48V7E2-U2E6EKLNB-1a8d2f2d9c81-72')} />
                </a>
              </Grid>
              <Grid size={4}>
                <h3>Lead PO</h3>
                <a href="slack://user?team=T0F48V7E2&id=UE384GV1Q">
                  <Avatar alt="Alan" title="Alan OSERS" src={getAvatarSlackUri('T0F48V7E2-UE384GV1Q-89d8171fb5d3-512')} />
                </a>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <h2>Honourable members</h2>
            <Grid container spacing={2}>
              <Grid size={4}>
                <h3>At Veepee</h3>
                <Stack direction="row" spacing={3}>
                  <a href="slack://user?team=T0F48V7E2&id=UKPFV32MC">
                    <Avatar alt="Christine" title="Christine LUAYEL" src={getAvatarSlackUri('T0F48V7E2-UKPFV32MC-2144d35820a2-72')} />
                  </a>
                  <a href="slack://user?team=T0F48V7E2&id=UG2QVD708">
                    <Avatar
                      alt="Kateline"
                      title="Kateline JENATTON-SPECHT"
                      src={getAvatarSlackUri('T0F48V7E2-UG2QVD708-079766597092-512')}
                    />
                  </a>
                </Stack>
              </Grid>
              <Grid size={4}>
                <h3>Not reachable at Veepee</h3>
                <Stack direction="row" spacing={3}>
                  <Avatar alt="Nicolas" title="Nicolas NATHAN" src={NicoAvatar.src} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
