import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'

import * as React from 'react'

import { DefaultDateFormat } from '#utils/constants'

export interface DateRangePickerValueType {
  start: any
  end: any
}

export interface DateRangePickerProps extends Omit<DatePickerProps<any>, 'value'> {
  value: DateRangePickerValueType | null
  startLabel?: string
  endLabel?: string
  formatDate?: string
  onChange?: (value: DateRangePickerValueType | null) => void
}

const DateRangePickerStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))

export default function DateRangePicker(props: DateRangePickerProps) {
  const { value, startLabel, endLabel, format, onChange, ...rest } = props
  const [startDate, setStartDate] = React.useState(value?.start)
  const [endDate, setEndDate] = React.useState(value?.end)

  React.useEffect(() => {
    setStartDate(value?.start)
    setEndDate(value?.end)
  }, [value])

  return (
    <DateRangePickerStyled>
      <DatePicker
        label={startLabel || 'Start Date'}
        format={format || DefaultDateFormat}
        value={startDate}
        maxDate={endDate}
        slotProps={{ textField: { size: 'small', color: 'secondary' } }}
        onChange={(date) => {
          setStartDate(date)
          onChange?.({ start: date, end: endDate })
        }}
        {...rest}
      />
      <Box> - </Box>
      <DatePicker
        label={endLabel || 'End Date'}
        format={format || DefaultDateFormat}
        value={endDate}
        minDate={startDate}
        slotProps={{ textField: { size: 'small', color: 'secondary' } }}
        onChange={(date) => {
          setEndDate(date)
          onChange?.({ start: startDate, end: date })
        }}
        {...rest}
      />
    </DateRangePickerStyled>
  )
}
