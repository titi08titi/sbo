import { useQuery } from '@tanstack/react-query'

import moment from 'moment'

import { getSambotClientWithToken } from '#core/client'
import { DefaultDateFormat, Endpoint } from '#utils/constants'
import { Process, ProcessInfoSummary, ProcessNameModel } from '#utils/global'

const ROWS_LIMIT = '1000'

export interface ProcessFilterKey {
  names: string[] | null
  statuses: string[] | null
  variationDateStart?: string
  variationDateEnd?: string
  creationDateStart?: string
  creationDateEnd?: string
  modificationDateStart?: string
  modificationDateEnd?: string
}

async function fetchProcessesDetail({ queryKey }) {
  const [, filters] = queryKey
  const searchParams = new URLSearchParams()
  const sambotClientWithToken = await getSambotClientWithToken()

  searchParams.append('limit', ROWS_LIMIT)
  if (filters) {
    if (filters.creationDateStart) {
      searchParams.append('fromCreationDate', moment(filters.creationDateStart).format(DefaultDateFormat))
    }
    if (filters.creationDateEnd) {
      searchParams.append('toCreationDate', moment(filters.creationDateEnd).format(DefaultDateFormat))
    }
    if (filters.variationDateStart) {
      searchParams.append('fromVariationDate', moment(filters.variationDateStart).format(DefaultDateFormat))
    }
    if (filters.variationDateEnd) {
      searchParams.append('toVariationDate', moment(filters.variationDateEnd).format(DefaultDateFormat))
    }
    if (filters.modificationDateStart) {
      searchParams.append('fromModificationDate', moment(filters.modificationDateStart).format(DefaultDateFormat))
    }
    if (filters.modificationDateEnd) {
      searchParams.append('toModificationDate', moment(filters.modificationDateEnd).format(DefaultDateFormat))
    }
    if (filters.names) {
      filters.names.forEach((name: string) => {
        searchParams.append('names', name)
      })
    }
    if (filters.statuses) {
      filters.statuses.forEach((status: string) => {
        searchParams.append('statuses', status)
      })
    }
  }

  return sambotClientWithToken.get(`${Endpoint.PROCESSES}?${searchParams.toString()}`).then((res) => res.data)
}
const useProcessesDetail = (filterKey?: ProcessFilterKey) => {
  return useQuery<Process[]>(['ProcessesDetails_Get_ProcessesDetail', filterKey], fetchProcessesDetail, {
    staleTime: 5000,
  })
}

const fetchProcessesSummary = async ({ queryKey }) => {
  const [, creationDate] = queryKey
  let buildUrl = `${Endpoint.PROCESSES}/summary`
  const searchParams = new URLSearchParams()
  const sambotClientWithToken = await getSambotClientWithToken()

  if (creationDate) {
    searchParams.append('creationDate', moment(creationDate).format(DefaultDateFormat))
    buildUrl += `?${searchParams.toString()}`
  }
  return sambotClientWithToken.get(buildUrl).then((res) => res.data)
}
const useProcessesSummary = (creationDate?: Date) =>
  useQuery<ProcessInfoSummary>(['ProcessesDetails_Get_ProcessesSummary', creationDate], fetchProcessesSummary)

const updateStatusById = async (processId: number) => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return await sambotClientWithToken.patch(`${Endpoint.PROCESSES}/${processId}/check-error`).then((response) => response.data)
}

const fetchProcessNames = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.PROCESSES}/names`).then((res) => res.data)
}
const useProcessNames = () => useQuery<ProcessNameModel[]>(['ProcessesDetails_Get_ProcessNames'], fetchProcessNames)

export { updateStatusById, useProcessesDetail, useProcessesSummary, useProcessNames }
