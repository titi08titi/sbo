import { TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledDataTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
  },
}))

export default StyledDataTableRow
