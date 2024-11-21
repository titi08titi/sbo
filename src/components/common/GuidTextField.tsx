import ClearIcon from '@mui/icons-material/Clear'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import { IconButton, TextField, TextFieldProps } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask'

interface GuidTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  onGuidValueChange: (value: string) => void
  currentValue?: string
}

interface GuidMaskCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const GuidMaskCustom = React.forwardRef<HTMLInputElement, GuidMaskCustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...rest } = props
  const [previousValue, setPreviousValue] = useState('')

  function handleAccept(value: any) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    if (regex.test(value)) {
      setPreviousValue(value)
      onChange({ target: { name: props.name, value } })
    } else {
      if (value.length === 0) {
        setPreviousValue('')
        onChange({ target: { name: props.name, value: '' } })
      } else {
        onChange({ target: { name: props.name, value: previousValue } })
      }
    }
  }

  return (
    <IMaskInput
      {...rest}
      mask="00000000-0000-0000-0000-000000000000" // GUID format
      definitions={{
        '0': /[0-9a-fA-F]/, // Regular expression pattern for a hexadecimal digit
      }}
      inputRef={ref}
      onAccept={handleAccept}
      overwrite
    />
  )
})

export default function GuidTextField(props: GuidTextFieldProps) {
  const { onGuidValueChange, currentValue, ...rest } = props
  const [value, setValue] = useState<string>(currentValue)

  useEffect(() => {
    setValue(currentValue)
  }, [currentValue])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    onGuidValueChange(newValue)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }

  const handleClear = () => {
    setValue('')
    onGuidValueChange('')
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      color="secondary"
      slotProps={{
        input: {
          inputComponent: GuidMaskCustom as any,
          endAdornment: (
            <>
              <IconButton onClick={handleCopy}>
                <FileCopyIcon />
              </IconButton>
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </>
          ),
        },
        htmlInput: { maxLength: 36 },
      }}
      {...rest}
    />
  )
}
