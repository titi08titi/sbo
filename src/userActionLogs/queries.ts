import { useQuery } from '@tanstack/react-query'

import moment from 'moment'

import { getSambotClientWithToken } from '#core/client'
import { DefaultDateTimeFormat, Endpoint } from '#utils/constants'
import { UserActionLog } from '#utils/global'

export interface UserActionLogFilterKey {
  actions: string[] | null
  businessUnits: string[] | null
  fromCreationDate?: string
  toCreationDate?: string
}

async function fetchUserActionLogs({ queryKey }) {
  const [, filters] = queryKey
  const searchParams = new URLSearchParams()
  const sambotClientWithToken = await getSambotClientWithToken()

  if (filters) {
    if (filters.actions) {
      filters.actions.forEach((action: string) => {
        searchParams.append('actions', action)
      })
    }
    if (filters.businessUnits) {
      filters.businessUnits.forEach((businessUnit: string) => {
        searchParams.append('businessUnits', businessUnit)
      })
    }
    if (filters.fromCreationDate) {
      searchParams.append('fromCreationDate', moment(filters.fromCreationDate, DefaultDateTimeFormat).format(DefaultDateTimeFormat))
    }
    if (filters.toCreationDate) {
      searchParams.append('toCreationDate', moment(filters.toCreationDate, DefaultDateTimeFormat).format(DefaultDateTimeFormat))
    }
  }
  return sambotClientWithToken.get(`${Endpoint.SAMBOT_HISTORIES}?${searchParams.toString()}`).then((res) => res.data)
}

const useUserActionLogs = (filterKey?: UserActionLogFilterKey) => {
  return useQuery<UserActionLog[]>(['UserActionLogs_Get_SambotHistories', filterKey], fetchUserActionLogs)
}

export { useUserActionLogs }
