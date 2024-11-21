import { Button, Dialog, DialogActions, DialogContent, DialogProps, styled } from '@mui/material'

import * as React from 'react'

import BootstrapDialogTitle, { DialogElement } from './BootstrapDialog'

type State = { open: boolean; error?: Error }

export type SimpleDialogProps = Omit<DialogProps, 'open'>

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const SimpleDialog = React.forwardRef<DialogElement, SimpleDialogProps>(function ConfirmDialog(props, ref) {
  const { title, children, ...other } = props
  const [state, setState] = React.useState<State>({ open: false })
  const handleClose = () => setState({ open: false })

  React.useImperativeHandle(ref, () => ({
    open() {
      setState({ open: true })
    },
  }))

  return (
    <BootstrapDialog open={state.open} onClose={handleClose} {...other}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
})

export default SimpleDialog
