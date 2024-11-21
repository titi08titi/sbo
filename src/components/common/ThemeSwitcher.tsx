import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import React from 'react'

import { ColorModeContext } from '#pages/_app'

export default function ThemeSwitcher() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const iconFontSize = 25

  return (
    <IconButton size="large" onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness4Icon sx={{ fontSize: iconFontSize }} />
      ) : (
        <Brightness7Icon sx={{ fontSize: iconFontSize }} />
      )}
    </IconButton>
  )
}
