import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Box, IconButton, Stack } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'

import moment from 'moment'
import { useEffect, useState } from 'react'

import { renderChipProcessStatusCell } from '#components/helpers/RenderCellsHelper'
import { hasFeatureAccess } from '#core/authorizations'
import useAuth from '#hooks/useAuth'
import { DefaultDateFormat, Feature, MAX_PAGE_SIZE, ProcessStatus, SamBotPage } from '#utils/constants'
import { Process } from '#utils/global'
import { utcDateTimeAsStringToLocal } from '#utils/helper'

import { NoRowsOverlay, StyledDataGrid } from '../../common'

type ProcessesDetailTableProps = {
  dataSet: Process[]
  hideFooter?: boolean
  onErrorCheck?: (processId: number) => void
}

export default function ProcessesDetailTable(props: ProcessesDetailTableProps) {
  const { dataSet, hideFooter, onErrorCheck } = props
  const sortedDataSet = [...dataSet]?.sort((a, b) => b.id - a.id)
  const { userRoles } = useAuth()
  const [hasRightsToCheckError, setHasRightsToCheckError] = useState<boolean>(false)
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    action: false,
  })
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 80, editable: false },
    {
      field: 'name',
      headerName: 'Name',
      width: 350,
    },
    {
      field: 'nbProcessedRows',
      headerName: 'Rows updated',
      width: 120,
      type: 'number',
    },
    {
      field: 'variationDate',
      headerName: 'Variation',
      width: 100,
      valueFormatter: (value?: string) => (value ? moment(value).format(DefaultDateFormat) : null),
    },
    {
      field: 'modificationDate',
      headerName: 'Modification',
      width: 155,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
    {
      field: 'creationDate',
      headerName: 'Creation',
      width: 155,
      valueFormatter: (value?: string) => utcDateTimeAsStringToLocal(value),
    },
    {
      field: 'assemblyVersion',
      headerName: 'Assembly',
      width: 80,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: renderChipProcessStatusCell,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 110,
    },
    {
      field: 'comment',
      headerName: 'Comment',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 70,
      renderCell: (params) => {
        return (
          <Stack direction="row">
            {hasRightsToCheckError && params.row.status === ProcessStatus.Error && (
              <IconButton
                aria-label="check error"
                color="secondary"
                onClick={() => onErrorCheck?.(params.row.id)}
                size="small"
                title="Check error"
              >
                <CheckBoxIcon />
              </IconButton>
            )}
          </Stack>
        )
      },
    },
  ]

  useEffect(() => {
    const hasRightsToCheckError = hasFeatureAccess(SamBotPage.processesDetails, Feature.checkErrorProcess, userRoles)
    setHasRightsToCheckError(hasRightsToCheckError)
    setColumnVisibilityModel({ action: hasRightsToCheckError })
  }, [userRoles])

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: sortedDataSet.length === 0 ? 250 : 'auto' }}>
      <StyledDataGrid
        rows={sortedDataSet}
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
        }}
        columnVisibilityModel={columnVisibilityModel}
        density="compact"
        disableRowSelectionOnClick
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
      />
    </Box>
  )
}
