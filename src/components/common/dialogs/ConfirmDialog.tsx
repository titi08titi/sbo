import { Button, Dialog, DialogActions, DialogContent, DialogProps, styled } from '@mui/material'

import * as React from 'react'

import BootstrapDialogTitle, { DialogElement } from './BootstrapDialog'

type State = { open: boolean; error?: Error }
type ConfirmHandler = () => Promise<void> | void

export type ConfirmDialogProps = Omit<DialogProps, 'open'> & {
  onConfirm?: ConfirmHandler
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const ConfirmDialog = React.forwardRef<DialogElement, ConfirmDialogProps>(function ConfirmDialog(props, ref) {
  const { title, children, onConfirm, ...other } = props
  const [state, setState] = React.useState<State>({ open: false })
  const handleClose = () => setState({ open: false })
  const handleConfirm = () => {
    onConfirm?.()
    setState({ open: false })
  }

  React.useImperativeHandle(ref, () => ({
    open() {
      setState({ open: true })
    },
  }))

  return (
    <BootstrapDialog open={state.open} {...other}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          OK
        </Button>
        <Button color="secondary" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
})

export default ConfirmDialog
