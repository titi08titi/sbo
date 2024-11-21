import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import React from 'react'

import { NoRowsOverlay, StyledDataGrid } from '#components/common'
import { MAX_PAGE_SIZE } from '#utils/constants'
import { UserActionLog } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

type UserActionLogsTableProps = {
  userActionLogs: UserActionLog[]
  hideFooter?: boolean
}

export default function UserActionLogsTable(props: UserActionLogsTableProps) {
  const { userActionLogs, hideFooter } = props

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 0 },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
    },
    {
      field: 'businessUnit',
      headerName: 'Business unit',
      width: 250,
    },
    {
      field: 'comment',
      headerName: 'Comment',
      width: 300,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'json',
      headerName: 'json',
      flex: 1,
    },
    {
      field: 'creationDate',
      headerName: 'Date',
      width: 160,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
  ]

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', minHeight: userActionLogs.length === 0 ? 250 : 'auto' }}>
        <StyledDataGrid
          rows={userActionLogs}
          hideFooter={hideFooter === true || userActionLogs.length === 0 || userActionLogs.length < MAX_PAGE_SIZE}
          columns={columns}
          disableRowSelectionOnClick
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
            sorting: {
              sortModel: [{ field: 'creationDate', sort: 'desc' }],
            },
          }}
          density="compact"
          getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        />
      </Box>
    </>
  )
}
