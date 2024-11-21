import CheckIcon from '@mui/icons-material/Check'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import React from 'react'

import { NoRowsOverlay, StyledDataGrid } from '#components/common'
import { Authorizations } from '#core/authorizations'
import { Role } from '#utils/constants'

type RightsMatrixTableProps = {
  hideFooter?: boolean
}

export default function RightsMatrixTable(props: RightsMatrixTableProps) {
  const { hideFooter } = props

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id' },
    { field: 'page', headerName: 'Page', width: 350, headerAlign: 'center' },
    { field: 'feature', headerName: 'Feature', width: 250, headerAlign: 'center' },
    {
      field: Role.admin,
      headerName: Role.admin,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row.admin && <CheckIcon />,
    },
    {
      field: Role.support,
      headerName: Role.support,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row.support && <CheckIcon />,
    },
    {
      field: Role.accountingManager,
      headerName: Role.accountingManager,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row.accountingManager && <CheckIcon />,
    },
    {
      field: Role.accountingUser,
      headerName: Role.accountingUser,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row.accountingUser && <CheckIcon />,
    },
    {
      field: Role.fiscalreportManager,
      headerName: Role.fiscalreportManager,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row.fiscalreportManager && <CheckIcon />,
    },
    {
      field: Role.visitor,
      headerName: Role.visitor,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row.visitor && <CheckIcon />,
    },
  ]

  const rows = []
  Authorizations.forEach((authorization, authorizationIndex) => {
    const index = (authorizationIndex + 1) * 1000
    rows.push({
      id: index,
      page: authorization.page,
      feature: null,
      admin: authorization.authorizedRoles.some((role) => role == Role.admin),
      support: authorization.authorizedRoles.some((role) => role == Role.support),
      accountingManager: authorization.authorizedRoles.some((role) => role == Role.accountingManager),
      accountingUser: authorization.authorizedRoles.some((role) => role == Role.accountingUser),
      fiscalreportManager: authorization.authorizedRoles.some((role) => role == Role.fiscalreportManager),
      visitor: authorization.authorizedRoles.some((role) => role == Role.visitor),
    })
    authorization.features.forEach((feature, featureIndex) => {
      rows.push({
        id: index + (featureIndex + 1),
        page: authorization.page,
        feature: feature.feature,
        admin: feature.authorizedRoles.some((role) => role == Role.admin),
        support: feature.authorizedRoles.some((role) => role == Role.support),
        accountingManager: feature.authorizedRoles.some((role) => role == Role.accountingManager),
        accountingUser: feature.authorizedRoles.some((role) => role == Role.accountingUser),
        fiscalreportManager: feature.authorizedRoles.some((role) => role == Role.fiscalreportManager),
        visitor: feature.authorizedRoles.some((role) => role == Role.visitor),
      })
    })
  })

  return (
    <Box style={{ height: '725px' }}>
      <StyledDataGrid
        columns={columns}
        density="compact"
        disableRowSelectionOnClick
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        hideFooter={hideFooter}
        rows={rows}
        slots={{
          noRowsOverlay: NoRowsOverlay,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
      />
    </Box>
  )
}
