import { Chip, Link, Stack, Typography } from '@mui/material'
import { GridCellParams } from '@mui/x-data-grid'

import { FlagIcon, FlagIconCode } from 'react-flag-kit'

import { ExportStatusColor, ExportStatusForBusinessColor, FinancialStockPilesStatusColor, ProcessStatusColor } from '#utils/theme'

import { openCampaignDetailsTab, openItemDetailsTab, openPurchaseOrderDetailsTab } from './OpenTabsHelper'

export function renderChipExportStatusCell(params: GridCellParams) {
  return (
    params.value && (
      <Chip
        label={params.value.toString()}
        // @ts-ignore override color value
        color={ExportStatusColor[params.value].color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 500 },
        }}
      />
    )
  )
}

export function renderChipExportStatusForBusinessCell(params: GridCellParams) {
  return (
    params.value && (
      <Chip
        label={params.value.toString()}
        // @ts-ignore override color value
        color={ExportStatusForBusinessColor[params.value].color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 500 },
        }}
      />
    )
  )
}

export function renderChipFinancialStockPilesStatusCell(params: GridCellParams) {
  if (params.value === null) {
    return null
  }
  return (
    <Chip
      label={params.value.toString()}
      // @ts-ignore override color value
      color={FinancialStockPilesStatusColor[params.value].color}
      sx={{
        height: 24,
        fontSize: '0.75rem',
        textTransform: 'capitalize',
        '& .MuiChip-label': { fontWeight: 500 },
      }}
    />
  )
}

export function renderChipProcessStatusCell(params: GridCellParams) {
  return (
    <Chip
      label={params.value.toString()}
      // @ts-ignore override color value
      color={ProcessStatusColor[params.value].color}
      sx={{
        height: 24,
        fontSize: '0.75rem',
        textTransform: 'capitalize',
        '& .MuiChip-label': { fontWeight: 500 },
      }}
    />
  )
}

export function renderFlagCell(params: GridCellParams) {
  const countryCode = params.value?.toString().toUpperCase()
  if (countryCode === null || countryCode === '') {
    return null
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{countryCode}</Typography>
      <FlagIcon code={countryCode as FlagIconCode} size={15} />
    </Stack>
  )
}

function renderLinkCell(value, onClickCallback) {
  if (!value) {
    return null
  }

  return (
    <Link component="button" color="inherit" onClick={() => onClickCallback(value)}>
      {value}
    </Link>
  )
}

export function renderOpenCampaignDetailsCell(params: GridCellParams) {
  return renderLinkCell(params.value?.toString(), openCampaignDetailsTab)
}

export function renderOpenItemDetailsCell(params: GridCellParams) {
  return renderLinkCell(params.value?.toString(), openItemDetailsTab)
}

export function renderOpenPurchaseOrderDetailsCell(params: GridCellParams) {
  return renderLinkCell(params.value?.toString(), openPurchaseOrderDetailsTab)
}
