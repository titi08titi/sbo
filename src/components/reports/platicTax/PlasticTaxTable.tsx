import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, TableHead, TablePagination } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow'

import Papa from 'papaparse'
import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { DataTablePaginationActions, Loader, NoRowsOverlay, StyledDataTableRow } from '#components/common'
import StyledDataTableCell from '#components/common/datatable/StyledDataTableCell'
import { MAX_PAGE_SIZE } from '#utils/constants'
import { ErrorInfo } from '#utils/global'

import PlasticTaxTableToolbar from './PlasticTaxTableToolbar'

export interface PlasticTaxTableProps {
  onUploading?: () => void
  onFileUploaded?: (file: File | null, stockCodes: string[]) => void
  onDelete?: (stockCodes: string[]) => void
  onSave?: (stockCodes: string[]) => void
  onParseErrors?: (errors: Papa.ParseError[]) => void
  onErrors?: (errors: ErrorInfo[]) => void
}

export default function PlasticTaxTable(props: PlasticTaxTableProps) {
  const { onUploading, onFileUploaded, onDelete, onSave, onErrors, onParseErrors } = props
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const [rows, setRows] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleUpload = (files: FileList | null) => {
    const errors: ErrorInfo[] = []
    onUploading?.()
    setRows([])
    setLoading(true)

    if (!files) return
    const file = files[0]

    // @ts-ignore no overload matches this call
    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy',
      delimiter: ';',
      columns: ['stockCode'],
      error: (error) => {
        toast.error(`Import error: ${error}`)
        setLoading(false)
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          onParseErrors?.(results.errors)
          return
        }

        if (results.meta.fields.includes('stockCode') === false) {
          errors.push({ message: 'Missing header "stockCode" column', line: 1 })
          onErrors?.(errors)
          setLoading(false)
          return
        }

        const stockCodes = results.data.map((row) => {
          return row['stockCode']
        })
        if (errors.length > 0) {
          onErrors?.(errors)
        }
        const filteredStockCodes = stockCodes.filter((row) => row !== undefined)
        setRows(filteredStockCodes)
        setLoading(false)
        onFileUploaded?.(file, filteredStockCodes)
      },
    })
  }
  const handleSave = () => {
    onSave?.(rows)
  }

  function handleDelete(stockCode: string): void {
    setRows((prevRows) => prevRows.filter((r) => r !== stockCode))
    onDelete?.(rows.filter((r) => r == stockCode))
  }

  return (
    <TableContainer component={Paper}>
      <PlasticTaxTableToolbar onUpload={handleUpload} onSave={handleSave} disableSave={rows.length === 0} />
      <Table sx={{ minWidth: 500 }} size="small">
        <TableHead>
          <TableRow>
            <StyledDataTableCell align="left" width={'1%'} />
            <StyledDataTableCell align="left">Stock code</StyledDataTableCell>
            <StyledDataTableCell align="left">Action</StyledDataTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
            <StyledDataTableRow key={`export-external-gr-${index}`}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row}</TableCell>
              <TableCell align="left">
                <IconButton onClick={() => handleDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </StyledDataTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
          {rows.length === 0 && (
            <TableRow style={{ height: 250 }}>
              <TableCell align="center" colSpan={12}>
                {loading ? <Loader /> : <NoRowsOverlay />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {rows.length > MAX_PAGE_SIZE && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={DataTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  )
}
