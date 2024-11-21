import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers'
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker'

import * as React from 'react'

import { DefaultDateTimeFormat } from '#utils/constants'

export interface DateTimeRangePickerValueType {
  start: any
  end: any
}

export interface DateTimeRangePickerProps extends Omit<DatePickerProps<any>, 'value'> {
  value: DateTimeRangePickerValueType | null
  startLabel?: string
  endLabel?: string
  formatDate?: string
  onChange?: (value: DateTimeRangePickerValueType | null) => void
}

const DateRangePickerStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}))

export default function DateTimeRangePicker(props: DateTimeRangePickerProps) {
  const { value, startLabel, endLabel, format, onChange, ...rest } = props
  const [startDate, setStartDate] = React.useState(value?.start)
  const [endDate, setEndDate] = React.useState(value?.end)

  React.useEffect(() => {
    setStartDate(value?.start)
    setEndDate(value?.end)
  }, [value])

  return (
    <DateRangePickerStyled>
      <DateTimePicker
        views={['year', 'day', 'hours', 'minutes', 'seconds']}
        // @ts-ignore ignore unknown property
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        format={format || DefaultDateTimeFormat}
        label={startLabel || 'Start Date'}
        value={startDate}
        maxDateTime={endDate}
        slotProps={{ textField: { size: 'small', color: 'secondary' } }}
        onChange={(date) => {
          setStartDate(date)
          onChange?.({ start: date, end: endDate })
        }}
        {...rest}
      />
      <Box> - </Box>
      <DateTimePicker
        views={['year', 'day', 'hours', 'minutes', 'seconds']}
        // @ts-ignore ignore unknown property
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        format={format || DefaultDateTimeFormat}
        label={endLabel || 'End Date'}
        value={endDate}
        minDateTime={startDate}
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
