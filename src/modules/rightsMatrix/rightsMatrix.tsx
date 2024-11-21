import Grid from '@mui/material/Grid2'

import React from 'react'

import { RightsMatrixTable } from '#components'

export default function RightsMatrix() {
  return (
    <Grid container>
      <Grid size={12}>
        <RightsMatrixTable />
      </Grid>
    </Grid>
  )
}
