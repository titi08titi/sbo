import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import React from 'react'

import { DownloadToolbar, NoRowsOverlay, StyledDataGrid } from '#components/common'
import { renderOpenItemDetailsCell } from '#components/helpers/RenderCellsHelper'
import { MAX_PAGE_SIZE } from '#utils/constants'
import { PurchaseOrderAwpModel } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

type PurchaseOrderAwpListTableProps = {
  dataSet: PurchaseOrderAwpModel[]
  hideFooter?: boolean
}

export default function PurchaseOrderAwpListTable(props: PurchaseOrderAwpListTableProps) {
  const { dataSet, hideFooter } = props
  const rows = dataSet.map((res, id) => ({ id, ...res }))
  const columns: GridColDef[] = [
    { field: 'awpId', headerName: 'Id', type: 'number', editable: false },
    {
      field: 'purchaseOrder',
      headerName: 'PO',
    },
    {
      field: 'stockCode',
      headerName: 'Stock code',
    },
    {
      field: 'itemId',
      headerName: 'Item ID',
      type: 'number',
      renderCell: renderOpenItemDetailsCell,
    },
    {
      field: 'awpPrice',
      headerName: 'Price',
      type: 'number',
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 60,
    },
    {
      field: 'vatRate',
      headerName: 'Vat rate',
      type: 'number',
    },
    {
      field: 'isActive',
      headerName: 'Active',
      type: 'boolean',
    },
    {
      field: 'poLastAccountingDate',
      headerName: 'Last accounting date',
      width: 160,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
    {
      field: 'modificationDate',
      headerName: 'Modification',
      width: 160,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
    {
      field: 'creationDate',
      headerName: 'Creation',
      width: 160,
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
              purchaseOrder: false,
              isActive: false,
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
