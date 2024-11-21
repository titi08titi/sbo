import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import React from 'react'

import { DownloadToolbar, NoRowsOverlay, StyledDataGrid } from '#components/common'
import { renderOpenItemDetailsCell } from '#components/helpers/RenderCellsHelper'
import { MAX_PAGE_SIZE } from '#utils/constants'
import { PurchaseOrderDetails } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

type PurchaseOrderDetailsTableProps = {
  dataSet: PurchaseOrderDetails[]
  hideFooter?: boolean
}

export default function PurchaseOrderDetailsTable(props: PurchaseOrderDetailsTableProps) {
  const { dataSet, hideFooter } = props
  const rows = dataSet.map((res, id) => ({ id, ...res }))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90, editable: false },
    {
      field: 'itemId',
      headerName: 'Item ID',
      width: 100,
      renderCell: renderOpenItemDetailsCell,
    },
    {
      field: 'stockCode',
      headerName: 'StockCode',
      width: 170,
    },
    {
      field: 'siteId',
      headerName: 'SiteId',
      type: 'number',
      width: 70,
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      type: 'number',
      width: 90,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
    },
    {
      field: 'vatRate',
      headerName: 'VAT',
      align: 'right',
      width: 80,
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      width: 160,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
  ]

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: rows.length === 0 ? 250 : 'auto' }}>
      <DownloadToolbar dataSet={dataSet != undefined ? dataSet : []} filename="purchase-order-details" />
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
