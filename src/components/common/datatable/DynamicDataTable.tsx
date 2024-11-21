import { Box, Grid, TableContainer, Table, TableBody, Typography } from '@mui/material'

import StyledDataTableCell from './StyledDataTableCell'
import StyledDataTableRow from './StyledDataTableRow'

export interface IColumnDefinition {
  field: string
  headerName: string
  valueFormatter?: (params: any) => string
  renderCell?: (params: any) => JSX.Element
}

type DynamicDataTableProps = {
  columns: IColumnDefinition[]
  rows: any[]
  numberOfColumns?: number
  alignRight?: boolean | false
}

export default function DynamicDataTable(props: DynamicDataTableProps) {
  const { columns, rows, numberOfColumns, alignRight } = props
  const filteredColumns = columns.filter((item) => rows[0]?.[item.field] !== null && item.field !== undefined && item.field !== 'id')
  const chunkedColumns = chunkArray(filteredColumns, numberOfColumns ?? 3)

  function chunkArray(array: any[], chunkSize: number): any[][] {
    let index = 0
    const arrayLength = array.length
    const tempArray = []

    for (index = 0; index < arrayLength; index += chunkSize) {
      const chunk = array.slice(index, index + chunkSize)
      tempArray.push(chunk)
    }

    return tempArray
  }

  const getFormattedValue = (value: any, formatter: (params: any) => string) => {
    if (value == null) {
      return null
    }
    if (formatter) {
      return formatter({ value })
    }
    return value.toString()
  }

  const renderCell = (params: any) => {
    const value = params.value?.toString()
    if (value == null) {
      return null
    }

    if (params.renderCell) {
      return params.renderCell(params)
    }
    return (
      <Typography variant="body2" color="text.primary" sx={{ textAlign: alignRight ? 'right' : 'left', width: '100%' }}>
        {getFormattedValue(params.value, params.valueFormatter)}
      </Typography>
    )
  }

  return (
    <Grid container spacing={1}>
      <TableContainer style={{ width: '100%' }}>
        <Table size="small">
          <TableBody>
            {chunkedColumns.map((item, index) => (
              <StyledDataTableRow key={`row-${index}`}>
                {item.map((subItem, index) => {
                  const row = rows[0]
                  return (
                    <StyledDataTableCell key={`cell-${index}`} align="left" style={{ width: 400 }}>
                      <Box display="flex" gap={5}>
                        <Typography sx={{ minWidth: 120, fontWeight: 'bold' }} variant="subtitle2" color="text.secondary">
                          {subItem.headerName}
                        </Typography>
                        {renderCell({
                          value: row?.[subItem.field],
                          renderCell: subItem.renderCell,
                          valueFormatter: subItem.valueFormatter,
                        })}
                      </Box>
                    </StyledDataTableCell>
                  )
                })}
              </StyledDataTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}
