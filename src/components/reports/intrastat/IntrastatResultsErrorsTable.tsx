import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PreviewIcon from '@mui/icons-material/Preview'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import moment from 'moment'
import { CSVLink } from 'react-csv'

import { ExpandableCard, NoRowsOverlay, StyledDataGrid } from '#components/common'
import { renderFlagCell, renderOpenCampaignDetailsCell } from '#components/helpers/RenderCellsHelper'
import { DefaultDateFormat, MAX_PAGE_SIZE } from '#utils/constants'
import {
  IntrastatCampaignWithoutTaxNumberModel,
  IntrastatErrorModel,
  IntrastatItemWithoutCodeModel,
  IntrastatResultModel,
} from '#utils/global'

type IntrastatResultsErrorsTableProps = {
  dataSets: {
    results: IntrastatResultModel[]
    errors: IntrastatErrorModel[]
    itemsWithoutCode?: IntrastatItemWithoutCodeModel[]
    campaignsWithMissingTaxNumber?: IntrastatCampaignWithoutTaxNumberModel[]
  }
  hideFooter?: boolean
  isDownloadLoading?: boolean
  onDownloadClick?: () => void
}

export default function IntrastatResultsErrorsTable(props: IntrastatResultsErrorsTableProps) {
  const { dataSets, hideFooter, isDownloadLoading, onDownloadClick } = props
  const resultsRows = dataSets != undefined && dataSets.results != undefined ? dataSets.results.map((res, id) => ({ id, ...res })) : []
  const errorsRows = dataSets != undefined && dataSets.errors != undefined ? dataSets.errors.map((res, id) => ({ id, ...res })) : []

  const resultsColumns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90, editable: false },
    { field: 'year', headerName: 'Year', width: 55, editable: false },
    {
      field: 'month',
      headerName: 'Month',
      width: 50,
      editable: false,
      renderCell: (params) => params?.value.toString().padStart(2, '0'),
    },
    { field: 'type', headerName: 'Type', width: 150, editable: false },
    {
      field: 'campaign',
      headerName: 'Campaign',
      width: 170,
      editable: false,
      renderCell: renderOpenCampaignDetailsCell,
    },
    { field: 'originCountry', headerName: 'Origin country', width: 90, editable: false, renderCell: renderFlagCell },
    { field: 'destinationCountry', headerName: 'Destination country', width: 90, editable: false, renderCell: renderFlagCell },
    { field: 'intrastatCode', headerName: 'Intrastat code', width: 90, editable: false },
    { field: 'supplier', headerName: 'Supplier', width: 180, editable: false },
    { field: 'supplierTaxNumber', headerName: 'Supplier tax number', width: 150, editable: false },
    { field: 'customer', headerName: 'Customer', width: 180, editable: false },
    { field: 'customerTaxNumber', headerName: 'Customer tax number', width: 150, editable: false },
    { field: 'quantity', headerName: 'Quantity', width: 90, type: 'number', editable: false },
    { field: 'amount', headerName: 'Amount', width: 110, type: 'number', editable: false },
    { field: 'currency', headerName: 'Currency', width: 70, editable: false },
    { field: 'weight', headerName: 'Weight', width: 90, type: 'number', editable: false },
    {
      field: 'isError',
      headerName: 'Is error',
      width: 60,
      editable: false,
      type: 'boolean',
    },
    {
      field: 'modificationDate',
      headerName: 'Modification date',
      width: 120,
      editable: false,
      valueFormatter: (value?: string) => moment(value).format(DefaultDateFormat),
    },
  ]

  const errorsColumns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90, editable: false },
    { field: 'year', headerName: 'Year', width: 55, editable: false },
    {
      field: 'month',
      headerName: 'Month',
      width: 50,
      editable: false,
      renderCell: (params) => params?.value.toString().padStart(2, '0'),
    },
    { field: 'type', headerName: 'Type', width: 150, editable: false },
    { field: 'intrastatMissing', headerName: 'Missing', width: 90, editable: false, type: 'number' },
    { field: 'taxNumberMissing', headerName: 'Tax missing', width: 90, editable: false, type: 'number' },
    { field: 'weightMissing', headerName: 'Weight missing', width: 120, editable: false, type: 'number' },
    {
      field: 'modificationDate',
      headerName: 'Modification Date',
      width: 130,
      editable: false,
      valueFormatter: (value?: string) => moment(value).format(DefaultDateFormat),
    },
  ]

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: 250 }}>
      <Stack direction="row" spacing={1}>
        <LoadingButton
          variant="outlined"
          size="small"
          color="secondary"
          loading={isDownloadLoading}
          loadingPosition="start"
          onClick={onDownloadClick}
          startIcon={<PreviewIcon />}
        >
          Preview report
        </LoadingButton>
        <Button variant="outlined" size="small" color="secondary" sx={{ mr: 1 }} startIcon={<FileDownloadIcon />}>
          <CSVLink
            data={dataSets.itemsWithoutCode}
            enclosingCharacter={``}
            separator={';'}
            filename={'items-without-intrastat-code.csv'}
          >
            Missing intrastat code
          </CSVLink>
        </Button>
        <Button variant="outlined" size="small" color="secondary" sx={{ mr: 1 }} startIcon={<FileDownloadIcon />}>
          <CSVLink
            data={dataSets.campaignsWithMissingTaxNumber}
            enclosingCharacter={``}
            separator={';'}
            filename={'campaigns-with-missing-tax-number.csv'}
          >
            Missing tax number
          </CSVLink>
        </Button>
      </Stack>
      <ExpandableCard title="Errors" className="mt-5" open>
        <StyledDataGrid
          rows={errorsRows}
          hideFooter={hideFooter === true || errorsRows.length < MAX_PAGE_SIZE}
          columns={errorsColumns}
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
      </ExpandableCard>
      <ExpandableCard title="Results" className="mt-5" open>
        <StyledDataGrid
          rows={resultsRows}
          hideFooter={hideFooter === true || resultsRows.length < MAX_PAGE_SIZE}
          columns={resultsColumns}
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
      </ExpandableCard>
    </Box>
  )
}
