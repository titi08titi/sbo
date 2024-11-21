import SvgIcon from '@mui/icons-material/AttachFile'
import UploadIcon from '@mui/icons-material/Upload'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import * as React from 'react'
import { MouseEvent, ChangeEvent } from 'react'

export interface UploadFileButtonProps {
  accept?: string
  multiple?: boolean
  onUpload: (files: FileList | null) => void
  children?: React.ReactNode
}

const Input = styled('input')({
  display: 'none',
})

export default function UploadFileButton(props: UploadFileButtonProps) {
  const { accept, multiple, onUpload, children } = props

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    onUpload(event.target.files)
  }

  function handleInputClick(event: MouseEvent<HTMLInputElement>): void {
    event.currentTarget.value = ''
  }

  return (
    <>
      <label htmlFor="icon-button-file">
        <Input
          accept={accept}
          id="icon-button-file"
          type="file"
          multiple={multiple}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        {children ? (
          children
        ) : (
          <Button
            color="secondary"
            variant="contained"
            component="span"
            startIcon={
              <SvgIcon fontSize="small">
                <UploadIcon />
              </SvgIcon>
            }
          >
            Upload
          </Button>
        )}
      </label>
    </>
  )
}
