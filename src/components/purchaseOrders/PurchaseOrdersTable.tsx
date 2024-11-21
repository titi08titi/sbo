import { Box, Chip } from '@mui/material'
import { GridCellParams } from '@mui/x-data-grid'

import { DynamicDataTable } from '#components/common'
import { IColumnDefinition } from '#components/common/datatable/DynamicDataTable'
import { renderFlagCell, renderOpenCampaignDetailsCell } from '#components/helpers/RenderCellsHelper'
import { PurchaseOrderModel } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

type PurchaseOrdersTableProps = {
  dataSet: PurchaseOrderModel
}

type StatusColor = {
  [key: string]: {
    color: string
  }
}

const statusColor: StatusColor = {
  SENT: { color: 'success' },
  VALIDATED: { color: 'success' },
  CANCELLED: { color: 'error' },
  READ_BY_SUPPLIER: { color: 'success' },
}

export default function PurchaseOrdersTable(props: PurchaseOrdersTableProps) {
  const { dataSet } = props
  const rows = dataSet != undefined ? [dataSet].map((res, id) => ({ id, ...res })) : []

  const columns: IColumnDefinition[] = [
    { field: 'id', headerName: 'Id' },
    {
      field: 'campaignCode',
      headerName: 'Campaign',
      renderCell: renderOpenCampaignDetailsCell,
    },
    { field: 'alias', headerName: 'Alias' },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params: any) =>
        params.value && (
          <Chip
            label={params.value.toString()}
            color={statusColor[params.value].color as any}
            sx={{ height: 24, fontSize: '0.75rem', textTransform: 'capitalize', '& .MuiChip-label': { fontWeight: 500 } }}
          />
        ),
    },
    { field: 'contractType', headerName: 'Contract Type' },
    { field: 'flowType', headerName: 'Flow Type' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'originatingCountry', headerName: 'Origin', renderCell: renderFlagCell },
    { field: 'originatingCountryFiscal', headerName: 'Origin Fiscal', renderCell: renderFlagCell },
    { field: 'deliveryCountry', headerName: 'Delivery', renderCell: renderFlagCell },
    { field: 'deliveryCountryFiscal', headerName: 'Delivery Fiscal', renderCell: renderFlagCell },
    {
      field: 'lastUpdateDate',
      headerName: 'Last Update Date',
      renderCell: (params: GridCellParams) => <>{utcDateTimeAsStringToLocal(params.value.toString())}</>,
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      renderCell: (params: GridCellParams) => <>{utcDateTimeAsStringToLocal(params.value.toString())}</>,
    },
  ]

  return (
    <Box style={{ height: 'auto' }}>
      <DynamicDataTable columns={columns} rows={rows} />
    </Box>
  )
}
