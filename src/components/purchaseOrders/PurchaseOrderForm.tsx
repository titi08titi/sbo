import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid2'

import React, { useEffect, useRef } from 'react'

import { GuidTextField } from '#components/common'

export interface PurchaseOrderFormData {
  purchaseOrderUuid?: string
}

export type PurchaseOrderFormProps = {
  onFormDataChanged?: (formData: PurchaseOrderFormData) => void
  currentPurchaseOrderUuid?: string
}

export default function PurchaseOrderForm(props: PurchaseOrderFormProps) {
  const { onFormDataChanged, currentPurchaseOrderUuid } = props
  const [purchaseOrderUuid, setPurchaseOrderUuid] = React.useState<string>(currentPurchaseOrderUuid)
  const textInputRef = useRef(null)

  useEffect(() => {
    setPurchaseOrderUuid(currentPurchaseOrderUuid)
  }, [currentPurchaseOrderUuid])

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus()
    }
  }, [])

  return (
    <Grid container>
      <Grid size={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, width: 475 }} size="small">
            <GuidTextField
              id="purchaseOrderUuid"
              label="Purchase Order uuid"
              size="small"
              required
              currentValue={purchaseOrderUuid}
              inputRef={textInputRef}
              onGuidValueChange={(value: string) => {
                setPurchaseOrderUuid(value)
                onFormDataChanged?.({ purchaseOrderUuid: value })
              }}
            />
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  )
}
