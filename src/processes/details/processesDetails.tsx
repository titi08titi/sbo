import Grid from '@mui/material/Grid2'

import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ExpandableCard, Loader, UnexpectedError } from '#components/common'
import { ProcessDetailFormData } from '#components/processes/details/ProcessesDetailForm'
import { DefaultDateFormat } from '#utils/constants'

import { ProcessesDetailForm, ProcessesDetailTable } from '#components'

import { ProcessFilterKey, updateStatusById, useProcessNames, useProcessesDetail } from './queries'

export default function Processes() {
  const currentDate = new Date()
  const [processFilterKey, setProcessFilterKey] = React.useState<ProcessFilterKey>({
    names: [],
    statuses: [],
    creationDateStart: moment(currentDate).format(DefaultDateFormat),
  })

  const handleProcessDetailFormDataChanged = (processDetailFormData: ProcessDetailFormData) => {
    setProcessFilterKey({
      names: processDetailFormData.names,
      statuses: processDetailFormData.statuses,
      variationDateStart: (processDetailFormData.variationDateRange?.start as Moment)?.format(DefaultDateFormat),
      variationDateEnd: (processDetailFormData.variationDateRange?.end as Moment)?.format(DefaultDateFormat),
      creationDateStart: (processDetailFormData.creationDateRange?.start as Moment)?.format(DefaultDateFormat),
      creationDateEnd: (processDetailFormData.creationDateRange?.end as Moment)?.format(DefaultDateFormat),
      modificationDateStart: (processDetailFormData.modificationDateRange?.start as Moment)?.format(DefaultDateFormat),
      modificationDateEnd: (processDetailFormData.modificationDateRange?.end as Moment)?.format(DefaultDateFormat),
    })
  }
  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    isSuccess: isDetailSuccess,
    data,
    error: detailError,
    refetch,
  } = useProcessesDetail(processFilterKey)

  useEffect(() => {
    if (isDetailError) {
      toast.error(`Processes error: ${detailError}`)
    }
  }, [isDetailError, detailError])

  const {
    isError: isProcessNamesError,
    isLoading: isProcessNamesLoading,
    isSuccess: isProcessNamesSuccess,
    data: dataProcessNames,
    error: processNamesError,
  } = useProcessNames()

  useEffect(() => {
    if (isProcessNamesError) {
      toast.error(`Process names error: ${processNamesError}`)
    }
  }, [isProcessNamesError, processNamesError])

  function handleErrorChecked(processId: number): void {
    updateStatusById(processId).then(() => {
      refetch()
    })
  }

  const renderProcessesDetail = () => {
    return (
      <ExpandableCard className="mb-5" title={'Processes'} open={true}>
        {(isDetailLoading || isProcessNamesLoading) && <Loader />}
        {(isDetailError || isProcessNamesError) && <UnexpectedError />}
        {isProcessNamesSuccess && (
          <ProcessesDetailForm
            onFormDataChanged={handleProcessDetailFormDataChanged}
            currentCreationDate={currentDate}
            processNames={dataProcessNames}
          />
        )}
        {isDetailSuccess && <ProcessesDetailTable dataSet={data} onErrorCheck={handleErrorChecked} />}
      </ExpandableCard>
    )
  }

  return (
    <Grid container>
      <Grid size={12}>{renderProcessesDetail()}</Grid>
    </Grid>
  )
}
