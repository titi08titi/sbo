import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import * as React from 'react'

import { DateTimeRangePicker } from '#components/common'
import { DateTimeRangePickerValueType } from '#components/common/DateTimeRangePicker'
import { DefaultDateTimeFormat, SambotHistoryAction, SambotHistoryBusinessUnit } from '#utils/constants'
import { DefaultMenuProps, getDefaultMenuItemStyles } from '#utils/theme'

export interface UserActionLogsFormData {
  actions: string[]
  businessUnits: string[]
  creationDate?: DateTimeRangePickerValueType | null
}

export type UserActionLogsFormProps = {
  onFormDataChanged?: (formData: UserActionLogsFormData) => void
}

export default function ExportsDetailForm(props: UserActionLogsFormProps) {
  const { onFormDataChanged } = props
  const theme = useTheme()
  const [actions, setActions] = React.useState<string[]>([])
  const [businessUnits, setBusinessUnits] = React.useState<string[]>([])
  const [creationDate, setCreationDate] = React.useState<DateTimeRangePickerValueType | null>(null)

  const handleActionsChange = (event: SelectChangeEvent<typeof actions>) => {
    const {
      target: { value },
    } = event
    const newActions = typeof value === 'string' ? value.split(',') : value
    setActions(newActions)
  }

  const handleBusinessUnitsChange = (event: SelectChangeEvent<typeof businessUnits>) => {
    const {
      target: { value },
    } = event
    const newBusinessUnits = typeof value === 'string' ? value.split(',') : value
    setBusinessUnits(newBusinessUnits)
  }

  function onSubmitButtonClick(): void {
    onFormDataChanged?.({ actions, businessUnits, creationDate })
  }

  function onClearButtonClick(): void {
    setActions([])
    setBusinessUnits([])
    setCreationDate({ start: null, end: null })
    onFormDataChanged?.({
      actions: [],
      businessUnits: [],
      creationDate: null,
    })
  }

  return (
    <Grid container margin={2}>
      <Grid size={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <InputLabel id="actions-label" color="secondary">
              Actions
            </InputLabel>
            <Select
              labelId="actions-label"
              id="actions"
              multiple
              color="secondary"
              value={actions}
              onChange={handleActionsChange}
              input={<OutlinedInput label="Actions" />}
              MenuProps={DefaultMenuProps}
            >
              {Object.values(SambotHistoryAction).map((action) => (
                <MenuItem key={action} value={action} style={getDefaultMenuItemStyles(action, actions, theme)}>
                  {action}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <InputLabel id="businessUnits-label" color="secondary">
              Business units
            </InputLabel>
            <Select
              labelId="businessUnits-label"
              id="businessUnits"
              multiple
              color="secondary"
              value={businessUnits}
              onChange={handleBusinessUnitsChange}
              input={<OutlinedInput label="Business units" />}
              MenuProps={DefaultMenuProps}
            >
              {Object.values(SambotHistoryBusinessUnit).map((businessUnit) => (
                <MenuItem key={businessUnit} value={businessUnit} style={getDefaultMenuItemStyles(businessUnit, businessUnits, theme)}>
                  {businessUnit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="us">
            <DateTimeRangePicker
              value={creationDate}
              format={DefaultDateTimeFormat}
              sx={{ m: 1, width: 297 }}
              startLabel="Creation date start"
              endLabel="Creation date end"
              onChange={(dateRange) => {
                setCreationDate(dateRange as DateTimeRangePickerValueType)
              }}
            />
          </LocalizationProvider>
        </Box>
      </Grid>
      <Grid size={12} container justifyContent="center">
        <Button
          sx={{ height: '35px', marginRight: '1rem' }}
          variant="contained"
          color="secondary"
          size="small"
          endIcon={<SearchIcon />}
          onClick={onSubmitButtonClick}
        >
          Search
        </Button>
        <Button
          sx={{ height: '35px' }}
          variant="outlined"
          color="secondary"
          size="small"
          endIcon={<ClearIcon />}
          onClick={onClearButtonClick}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  )
}
