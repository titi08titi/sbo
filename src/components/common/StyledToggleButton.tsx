import { ToggleButton, styled } from '@mui/material'

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
}))

export default StyledToggleButton
