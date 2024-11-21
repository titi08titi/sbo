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

import moment from 'moment'
import * as React from 'react'

import { DateRangePicker } from '#components/common'
import { DateRangePickerValueType } from '#components/common/DateRangePicker'
import { DefaultDateFormat, ProcessStatus } from '#utils/constants'
import { ProcessNameModel } from '#utils/global'
import { DefaultMenuProps, getDefaultMenuItemStyles } from '#utils/theme'

export interface ProcessDetailFormData {
  names: string[]
  statuses: string[]
  variationDateRange?: DateRangePickerValueType | null
  creationDateRange?: DateRangePickerValueType | null
  modificationDateRange?: DateRangePickerValueType | null
}

export type ProcessesDetailFormProps = {
  currentCreationDate?: Date
  processNames?: ProcessNameModel[]
  onFormDataChanged?: (formData: ProcessDetailFormData) => void
}

export default function ProcessesDetailForm(props: ProcessesDetailFormProps) {
  const { currentCreationDate, processNames, onFormDataChanged } = props
  const theme = useTheme()
  const [names, setNames] = React.useState<string[]>([])
  const [statuses, setStatuses] = React.useState<string[]>([])
  const [variationDateRange, setVariationDateRange] = React.useState<DateRangePickerValueType | null>(null)
  const [creationDateRange, setCreationDateRange] = React.useState<DateRangePickerValueType | null>({
    start: currentCreationDate ? moment(currentCreationDate) : null,
    end: null,
  })
  const [modificationDateRange, setModificationDateRange] = React.useState<DateRangePickerValueType | null>(null)

  const handleNamesChange = (event: SelectChangeEvent<typeof names>) => {
    const {
      target: { value },
    } = event

    const newNames = typeof value === 'string' ? value.split(',') : value
    setNames(newNames)
  }

  const handleStatusesChange = (event: SelectChangeEvent<typeof statuses>) => {
    const {
      target: { value },
    } = event
    const newStatuses = typeof value === 'string' ? value.split(',') : value
    setStatuses(newStatuses)
  }

  function onSubmitButtonClick(): void {
    onFormDataChanged?.({ names, statuses, variationDateRange, creationDateRange, modificationDateRange })
  }

  function onClearButtonClick(): void {
    setNames([])
    setStatuses([])
    setVariationDateRange({ start: null, end: null })
    setCreationDateRange({ start: null, end: null })
    setModificationDateRange({ start: null, end: null })
    onFormDataChanged?.({ names: [], statuses: [], creationDateRange: null, modificationDateRange: null })
  }

  return (
    <Grid container margin={2}>
      <Grid size={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <InputLabel id="name-label" color="secondary">
              Names
            </InputLabel>
            <Select
              labelId="name-label"
              id="name"
              multiple
              color="secondary"
              value={names}
              onChange={handleNamesChange}
              input={<OutlinedInput label="Names" />}
              MenuProps={DefaultMenuProps}
            >
              {processNames
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((model) => (
                  <MenuItem key={model.name} value={model.name} style={getDefaultMenuItemStyles(model.name, names, theme)}>
                    {model.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <InputLabel id="statuses-label" color="secondary">
              Statuses
            </InputLabel>
            <Select
              labelId="statuses-label"
              id="statuses"
              multiple
              color="secondary"
              value={statuses}
              onChange={handleStatusesChange}
              input={<OutlinedInput label="Statuses" />}
              MenuProps={DefaultMenuProps}
            >
              {Object.values(ProcessStatus)
                .sort((a, b) => (a > b ? 1 : -1))
                .map((status) => (
                  <MenuItem key={status} value={status} style={getDefaultMenuItemStyles(status, statuses, theme)}>
                    {status}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="us">
            <DateRangePicker
              value={variationDateRange}
              format={DefaultDateFormat}
              sx={{ m: 1, width: 298 }}
              startLabel="Variation date start"
              endLabel="Variation date end"
              onChange={setVariationDateRange}
            />
            <DateRangePicker
              value={modificationDateRange}
              format={DefaultDateFormat}
              sx={{ m: 1, width: 298 }}
              startLabel="Modification date start"
              endLabel="Modification date end"
              onChange={setModificationDateRange}
            />
            <DateRangePicker
              value={creationDateRange}
              format={DefaultDateFormat}
              sx={{ m: 1, width: 297 }}
              startLabel="Creation date start"
              endLabel="Creation date end"
              onChange={setCreationDateRange}
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
