import { Box, Chip } from '@mui/material'
import { GridCellParams, GridColDef } from '@mui/x-data-grid'

import React from 'react'

import { DownloadToolbar, NoRowsOverlay, StyledDataGrid } from '#components/common'
import { MAX_PAGE_SIZE } from '#utils/constants'
import { PurchaseOrderEvents } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

type PurchaseOrderEventsTableProps = {
  dataSet: PurchaseOrderEvents[]
  hideFooter?: boolean
}

type EventColor = {
  [key: string]: {
    color: string
  }
}

const eventColor: EventColor = {
  NEW_PO: { color: 'success' },
  CHANGE_LAST_ACCOUNTING_DATE: { color: 'success' },
  CHANGE_LAST_UPDATE_DATE: { color: 'success' },
  CHANGE_PO_STATUS: { color: 'warning' },
}

export default function PurchaseOrderEventsTable(props: PurchaseOrderEventsTableProps) {
  const { dataSet, hideFooter } = props
  const rows = dataSet.map((res, id) => ({ id, ...res }))
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90, editable: false },
    {
      field: 'event',
      headerName: 'Event',
      width: 270,
      renderCell: (params: GridCellParams) =>
        params.value && (
          <Chip
            label={params.value.toString()}
            // @ts-ignore override color value
            color={eventColor[params.value].color}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 },
            }}
          />
        ),
    },
    {
      field: 'currentUpdateDate',
      headerName: 'Current Update Date',
      width: 210,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
    {
      field: 'lastUpdateDate',
      headerName: 'Last Update Date',
      width: 210,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
  ]

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: rows.length === 0 ? 250 : 'auto' }}>
      <DownloadToolbar dataSet={dataSet != undefined ? dataSet : []} filename="purchase-order-events" />
      <StyledDataGrid
        rows={rows}
        hideFooter={hideFooter === true || rows.length === 0 || rows.length < MAX_PAGE_SIZE}
        columns={columns}
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
        }}
        density="compact"
        disableRowSelectionOnClick
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
      />
    </Box>
  )
}
