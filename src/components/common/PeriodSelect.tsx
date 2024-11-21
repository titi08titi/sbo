import { Stack, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material'

import React from 'react'

import { NoData } from '#components/common'
import { PeriodModel } from '#utils/global'
import { DefaultMenuProps } from '#utils/theme'

type PeriodSelectProps = {
  periods: PeriodModel[]
  selectedPeriod?: string
  onPeriodChanged?: (period: string) => void
}

export default function PeriodSelect(props: PeriodSelectProps) {
  const { periods, selectedPeriod, onPeriodChanged } = props

  const handlePeriodChanged = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event
    onPeriodChanged?.(value)
  }

  return periods?.length > 0 ? (
    <Stack spacing={2}>
      <Typography color="text.primary">Select the monthly period: </Typography>
      <FormControl sx={{ width: 300 }} size="small">
        <InputLabel id="name-label" color="secondary">
          Period
        </InputLabel>
        <Select
          labelId="name-label"
          id="period"
          color="secondary"
          value={selectedPeriod}
          onChange={handlePeriodChanged}
          input={<OutlinedInput label="Period" />}
          MenuProps={DefaultMenuProps}
        >
          {periods.map((period) => (
            <MenuItem
              key={`${period.year}-${period.month.toString().padStart(2, '0')}`}
              value={`${period.year}-${period.month.toString().padStart(2, '0')}`}
            >
              {period.year}-{period.month.toString().padStart(2, '0')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  ) : (
    <NoData message="No period available" />
  )
}
