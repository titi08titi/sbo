import { useQuery } from '@tanstack/react-query'

import { getSambotClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import { IntrastatHistoryModel } from '#utils/global'

import { splitPeriod } from '../helper'

const fetchIntrastatHistoryArchives = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.INTRASTRASTS}/history-archives`).then((res) => res.data)
}

const useIntrastatHistoryArchives = () =>
  useQuery<IntrastatHistoryModel[]>(['ReportsIntrastat_Get_IntrastatHistoryArchives'], fetchIntrastatHistoryArchives)

const fetchDownloadIntrastatReport = async ({ queryKey }) => {
  const [, period] = queryKey
  const { month, year } = splitPeriod(period)

  const sambotClientWithToken = await getSambotClientWithToken()
  const searchParams = new URLSearchParams()
  searchParams.append('year', year)
  searchParams.append('month', month)
  return sambotClientWithToken
    .get(`${Endpoint.INTRASTRASTS}/download?${searchParams.toString()}`, { responseType: 'blob' })
    .then((res) => res.data)
}

const useDownloadIntrastatReport = (period: string) =>
  useQuery(['ReportsIntrastat_Get_DownloadIntrastatReport', period], fetchDownloadIntrastatReport, {
    enabled: !!period,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

export { useIntrastatHistoryArchives, useDownloadIntrastatReport }
