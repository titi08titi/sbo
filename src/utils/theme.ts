import { Theme, styled } from '@mui/material/styles'

import { Environment, ExportStatus, ExportStatusGroup, ExportType, FinancialStockPilesStatus, ProcessStatus } from './constants'

export const EnvironmentColor: StatusColor = {
  [Environment.LOCALHOST]: { color: 'info' },
  [Environment.INTEGRATION]: { color: 'success' },
  [Environment.STAGING]: { color: 'warning' },
  [Environment.PRODUCTION]: { color: 'error' },
}

type StatusColor = {
  [key: string]: {
    color: string
  }
}

export const ProcessStatusColor: StatusColor = {
  [ProcessStatus.InProgress]: { color: 'info' },
  [ProcessStatus.Done]: { color: 'success' },
  [ProcessStatus.Error]: { color: 'error' },
  [ProcessStatus.Ignored]: { color: 'warning' },
  [ProcessStatus.ErrorChecked]: { color: 'success' },
}

export const ExportStatusColor: StatusColor = {
  [ExportStatus.INIT]: { color: 'warning' },
  [ExportStatus.WAITING_FINHUB]: { color: 'warning' },
  [ExportStatus.PENDING]: { color: 'warning' },
  [ExportStatus.FAILED]: { color: 'error' },
  [ExportStatus.OK_FINHUB]: { color: 'success' },
  [ExportStatus.KO_FINHUB]: { color: 'error' },
  [ExportStatus.TO_RETRY]: { color: 'warning' },
  [ExportStatus.TO_CANCEL]: { color: 'warning' },
  [ExportStatus.OK_TO_CANCEL_FINHUB]: { color: 'success' },
  [ExportStatus.KO_TO_CANCEL_FINHUB]: { color: 'error' },
  [ExportStatus.OK_SAP]: { color: 'success' },
  [ExportStatus.KO_SAP]: { color: 'error' },
  [ExportStatus.OK_CANCELLED_SAP]: { color: 'success' },
  [ExportStatus.KO_CANCELLED_SAP]: { color: 'error' },
  [ExportStatus.IGNORED]: { color: 'success' },
  [ExportStatus.PENDING_LOCKED]: { color: 'error' },
}

export const ExportStatusForBusinessColor: StatusColor = {
  [ExportStatus.INIT]: { color: 'info' },
  [ExportStatus.WAITING_FINHUB]: { color: 'info' },
  [ExportStatus.PENDING]: { color: 'info' },
  [ExportStatus.FAILED]: { color: 'error' },
  [ExportStatus.OK_FINHUB]: { color: 'info' },
  [ExportStatus.KO_FINHUB]: { color: 'error' },
  [ExportStatus.TO_RETRY]: { color: 'info' },
  [ExportStatus.TO_CANCEL]: { color: 'info' },
  [ExportStatus.OK_TO_CANCEL_FINHUB]: { color: 'info' },
  [ExportStatus.KO_TO_CANCEL_FINHUB]: { color: 'success' },
  [ExportStatus.OK_SAP]: { color: 'success' },
  [ExportStatus.KO_SAP]: { color: 'error' },
  [ExportStatus.OK_CANCELLED_SAP]: { color: 'error' },
  [ExportStatus.KO_CANCELLED_SAP]: { color: 'success' },
  [ExportStatus.IGNORED]: { color: 'error' },
  [ExportStatus.PENDING_LOCKED]: { color: 'warning' },
}

export const FinancialStockPilesStatusColor: StatusColor = {
  [FinancialStockPilesStatus.NEW]: { color: 'info' },
  [FinancialStockPilesStatus.RETRY]: { color: 'info' },
  [FinancialStockPilesStatus.VALID]: { color: 'info' },
  [FinancialStockPilesStatus.PROCESSED]: { color: 'success' },
  [FinancialStockPilesStatus.BLOCKED]: { color: 'error' },
  [FinancialStockPilesStatus.IGNORED]: { color: 'warning' },
}

const errorColor = '#d32f2f'
const infoColor = '#0288d1'
const primaryColor = '#42a5f5'
const secondaryColor = '#ab47bc'
const successColor = '#2e7d32'
const warningColor = '#ed6c02'
const pinkColor = '#f15bb5' //veepee
const yellowColor = '#fee440'
const ignoreColor = 'lightgray'
export const PaletteColors = [secondaryColor, pinkColor, yellowColor, primaryColor]
export const DefaultPaletteColors = [errorColor, successColor, warningColor, infoColor]

export const AggregatedExportStatusesColor: StatusColor = {
  [ExportStatusGroup.OK]: { color: successColor },
  [ExportStatusGroup.KO]: { color: errorColor },
  [ExportStatusGroup.WAITING]: { color: warningColor },
  [ExportStatusGroup.OTHER]: { color: infoColor },
}

export const ItemExportsStatusesColor: StatusColor = {
  [ExportStatus.INIT]: { color: warningColor },
  [ExportStatus.WAITING_FINHUB]: { color: warningColor },
  [ExportStatus.PENDING]: { color: warningColor },
  [ExportStatus.FAILED]: { color: errorColor },
  [ExportStatus.OK_FINHUB]: { color: successColor },
  [ExportStatus.KO_FINHUB]: { color: errorColor },
  [ExportStatus.TO_RETRY]: { color: warningColor },
  [ExportStatus.TO_CANCEL]: { color: warningColor },
  [ExportStatus.OK_TO_CANCEL_FINHUB]: { color: successColor },
  [ExportStatus.KO_TO_CANCEL_FINHUB]: { color: errorColor },
  [ExportStatus.OK_SAP]: { color: successColor },
  [ExportStatus.KO_SAP]: { color: errorColor },
  [ExportStatus.OK_CANCELLED_SAP]: { color: successColor },
  [ExportStatus.KO_CANCELLED_SAP]: { color: errorColor },
  [ExportStatus.IGNORED]: { color: ignoreColor },
  [ExportStatus.PENDING_LOCKED]: { color: errorColor },
}

export const ItemExportsStatusesForBusinessColor: StatusColor = {
  [ExportStatus.INIT]: { color: infoColor },
  [ExportStatus.WAITING_FINHUB]: { color: infoColor },
  [ExportStatus.PENDING]: { color: infoColor },
  [ExportStatus.FAILED]: { color: errorColor },
  [ExportStatus.OK_FINHUB]: { color: infoColor },
  [ExportStatus.KO_FINHUB]: { color: errorColor },
  [ExportStatus.TO_RETRY]: { color: infoColor },
  [ExportStatus.TO_CANCEL]: { color: infoColor },
  [ExportStatus.OK_TO_CANCEL_FINHUB]: { color: infoColor },
  [ExportStatus.KO_TO_CANCEL_FINHUB]: { color: successColor },
  [ExportStatus.OK_SAP]: { color: successColor },
  [ExportStatus.KO_SAP]: { color: errorColor },
  [ExportStatus.OK_CANCELLED_SAP]: { color: successColor },
  [ExportStatus.KO_CANCELLED_SAP]: { color: successColor },
  [ExportStatus.IGNORED]: { color: errorColor },
  [ExportStatus.PENDING_LOCKED]: { color: warningColor },
}

export const ItemExportsTypesColor: StatusColor = {
  [ExportType.GR_EXT]: { color: pinkColor },
  [ExportType.GR_EXT_AX]: { color: yellowColor },
  [ExportType.GR_INT]: { color: primaryColor },
  [ExportType.VM]: { color: secondaryColor },
}

export const ItemFspAggregatedReasonsStatusColor: StatusColor = {
  [FinancialStockPilesStatus.NEW]: { color: infoColor },
  [FinancialStockPilesStatus.RETRY]: { color: infoColor },
  [FinancialStockPilesStatus.VALID]: { color: primaryColor },
  [FinancialStockPilesStatus.PROCESSED]: { color: successColor },
  [FinancialStockPilesStatus.BLOCKED]: { color: errorColor },
  [FinancialStockPilesStatus.IGNORED]: { color: warningColor },
  ['N/A']: { color: ignoreColor },
}

export const LeftDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  minHeight: '49px !important',
}))

export const RightDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  minHeight: '49px !important',
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const DefaultMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
}

export function getDefaultMenuItemStyles(item: string, items: string[], theme: Theme) {
  return {
    fontWeight: items.indexOf(item) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}
