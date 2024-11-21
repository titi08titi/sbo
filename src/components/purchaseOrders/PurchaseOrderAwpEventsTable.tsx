import { Box, Chip } from '@mui/material'
import { GridCellParams, GridColDef } from '@mui/x-data-grid'

import React from 'react'

import { DownloadToolbar, NoRowsOverlay, StyledDataGrid } from '#components/common'
import { MAX_PAGE_SIZE } from '#utils/constants'
import { PurchaseOrderAwpEvents } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

type PurchaseOrderAwpEventsTableProps = {
  dataSet: PurchaseOrderAwpEvents[]
  hideFooter?: boolean
}

type StatusColor = {
  [key: string]: {
    color: string
  }
}

const statusColor: StatusColor = {
  NEW: { color: 'warning' },
  PROCESSED: { color: 'success' },
}

type EventColor = {
  [key: string]: {
    color: string
  }
}

const eventColor: EventColor = {
  MISSING_ITEMS: { color: 'error' },
  PRICE_CHANGED: { color: 'success' },
  PRICE_AT_0: { color: 'error' },
  ADDING_ITEMS: { color: 'success' },
  CHANGE_VAT_RATE: { color: 'warning' },
  CHANGE_CURRENCY: { color: 'warning' },
}

export default function PurchaseOrderAwpEventsTable(props: PurchaseOrderAwpEventsTableProps) {
  const { dataSet, hideFooter } = props
  const rows = dataSet.map((res, id) => ({ id, ...res }))
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90, editable: false },
    {
      field: 'awpEvent',
      headerName: 'Awp Event',
      width: 200,
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
      field: 'status',
      headerName: 'Status',
      width: 170,
      renderCell: (params: GridCellParams) =>
        params.value && (
          <Chip
            label={params.value.toString()}
            // @ts-ignore override color value
            color={statusColor[params.value].color}
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
      field: 'nbRef',
      headerName: 'Nb Ref',
      type: 'number',
      width: 70,
    },
    {
      field: 'minCreationDate',
      headerName: 'Min CreationDate',
      width: 190,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
    {
      field: 'maxCreationDate',
      headerName: 'Max CreationDate',
      width: 190,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
  ]

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: rows.length === 0 ? 250 : 'auto' }}>
      <DownloadToolbar dataSet={dataSet != undefined ? dataSet : []} filename="purchase-order-awp-events" />
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
