import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import moment from 'moment'
import React from 'react'

import { DownloadToolbar, NoRowsOverlay, StyledDataGrid } from '#components/common'
import { DefaultDateFormat, MAX_PAGE_SIZE } from '#utils/constants'
import { PlasticTaxHistoryArchiveModel } from '#utils/global'

import { DownloadReportButton } from '../DownloadReportButton'

interface PlaticTaxReportsTableProps {
  dataSet: PlasticTaxHistoryArchiveModel[]
  onDownloadClick?: (period: string) => void
  isDownloaded?: boolean
  hideFooter?: boolean
}

export default function PlaticTaxReportsTable(props: PlaticTaxReportsTableProps) {
  const { dataSet, hideFooter, isDownloaded, onDownloadClick } = props
  const sortedDataSet = dataSet.sort((a, b) => {
    const yearComparison = b.year - a.year
    if (yearComparison !== 0) {
      return yearComparison
    }
    return b.month - a.month
  })
  const rows = sortedDataSet.map((res, id) => ({ id, ...res }))

  const columnVisibilityModel = {
    processId: false,
    totalRows: false,
    comment: false,
    modificationDate: false,
    creationDate: false,
  }

  const columns: GridColDef[] = [
    { field: 'year', headerName: 'Year', width: 70 },
    { field: 'month', headerName: 'Month', width: 60, renderCell: (params) => params?.value.toString().padStart(2, '0') },
    { field: 'isOpen', headerName: 'Open', width: 60, type: 'boolean' },
    { field: 'processId', headerName: 'PID', width: 50 },
    { field: 'totalRows', headerName: 'Total Rows', width: 120, type: 'number' },
    { field: 'comment', headerName: 'Comment', width: 120 },
    {
      field: 'modificationDate',
      headerName: 'Modification Date',
      width: 100,
      valueFormatter: (value?: string) => moment(value).format(DefaultDateFormat),
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      width: 100,
      valueFormatter: (value?: string) => moment(value).format(DefaultDateFormat),
    },
    {
      field: 'action',
      headerName: 'Action',
      type: 'actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <>
            <DownloadReportButton
              year={params.row.year}
              month={params.row.month}
              onDownloadClick={onDownloadClick}
              isDownloaded={isDownloaded}
            />
          </>,
        ]
      },
    },
  ]

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: rows.length === 0 ? 250 : 'auto' }}>
      <DownloadToolbar dataSet={dataSet != undefined ? dataSet : []} filename="platic-tax-reports" />
      <StyledDataGrid
        rows={rows}
        hideFooter={hideFooter === true || dataSet.length === 0 || dataSet.length < MAX_PAGE_SIZE}
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
            columnVisibilityModel,
          },
        }}
        density="compact"
        disableRowSelectionOnClick
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
      />
    </Box>
  )
}
