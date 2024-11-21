import Grid from '@mui/material/Grid2'

import React from 'react'

import { Loader, UnexpectedError } from '#components/common'
import UserActionLogsForm, { UserActionLogsFormData } from '#components/userActionLogs/UserActionLogsForm'
import UserActionLogsTable from '#components/userActionLogs/UserActionLogsTable'
import { dateTimeToUtcAsString } from '#utils/helper'

import { UserActionLogFilterKey, useUserActionLogs } from './queries'

export default function UserActionLogs() {
  const [userActionLogFilterKey, setUserActionLogFilterKey] = React.useState<UserActionLogFilterKey>()

  const handleUserActionLogsFormDataChanged = (userActionLogsFormData: UserActionLogsFormData) => {
    setUserActionLogFilterKey({
      actions: userActionLogsFormData.actions,
      businessUnits: userActionLogsFormData.businessUnits,
      // @ts-ignore ignore unknown property
      fromCreationDate: dateTimeToUtcAsString(userActionLogsFormData.creationDate?.start),
      // @ts-ignore ignore unknown property
      toCreationDate: dateTimeToUtcAsString(userActionLogsFormData.creationDate?.end),
    })
  }

  const {
    isLoading: isDetailLoading,
    isError: isDetailError,
    isSuccess: isDetailSuccess,
    data: data,
  } = useUserActionLogs(userActionLogFilterKey)

  return (
    <Grid container>
      <Grid size={12}>
        <UserActionLogsForm onFormDataChanged={handleUserActionLogsFormDataChanged} />
        {isDetailLoading && <Loader />}
        {isDetailError && <UnexpectedError />}
        {isDetailSuccess && <UserActionLogsTable userActionLogs={data} />}
      </Grid>
    </Grid>
  )
}
