import CheckIcon from '@mui/icons-material/Check'
import { Button, Stack, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { ConfirmDialog } from '#components/common'
import { DialogElement } from '#components/common/dialogs/BootstrapDialog'
import { hasFeatureAccess } from '#core/authorizations'
import useAuth from '#hooks/useAuth'
import { Feature, SamBotPage } from '#utils/constants'

type IntrastatValidationFormProps = {
  selectedPeriod?: string
  onPeriodValidate?: () => void
}

export default function IntrastatValidationForm(props: IntrastatValidationFormProps) {
  const { selectedPeriod, onPeriodValidate } = props
  const { userRoles } = useAuth()
  const [hasRightsToValidate, setHasRightsToValidate] = useState<boolean>(false)
  const [confirmMessage, setConfirmMessage] = React.useState<string>(null)
  const dialogRef = React.useRef<DialogElement>(null)

  useEffect(() => {
    const hasRightsToValidate = hasFeatureAccess(SamBotPage.intrastat, Feature.validateIntrastat, userRoles)
    setHasRightsToValidate(hasRightsToValidate)
  }, [userRoles])

  function handleOnClick() {
    if (hasRightsToValidate) {
      setConfirmMessage(`Do you confirm the validation of the intrastat report for the period ${selectedPeriod} ?`)
      dialogRef.current?.open()
    }
  }

  function handleValidationConfirmClick(): void | Promise<void> {
    onPeriodValidate?.()
  }

  return (
    <Stack spacing={2} minHeight={400}>
      <ConfirmDialog ref={dialogRef} title="Intrastat validation" fullWidth maxWidth="md" onConfirm={handleValidationConfirmClick}>
        {confirmMessage}
      </ConfirmDialog>
      {hasRightsToValidate ? (
        <>
          <Typography variant="body1" color="inherit" component="div">
            Do you want to validate the intrastat report for the period {selectedPeriod} ?
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ width: 100 }}
            startIcon={<CheckIcon />}
            onClick={handleOnClick}
          >
            Validate
          </Button>
        </>
      ) : (
        <Typography>You don&apos;t have rights to validate the intrastat report for the period {selectedPeriod}</Typography>
      )}
    </Stack>
  )
}
