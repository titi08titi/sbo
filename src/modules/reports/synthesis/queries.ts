import { useQuery } from '@tanstack/react-query'

import { getSambotClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import { SynthesisHistoryModel, SynthesisIndicatorModel } from '#utils/global'

import { splitPeriod } from '../helper'

const fetchSynthesisHistoryArchives = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.SYNTHESIS}/history-archives`).then((res) => res.data)
}

const useSynthesisHistoryArchives = () =>
  useQuery<SynthesisHistoryModel[]>(['ReportsSynthesis_Get_SynthesisHistoryArchives'], fetchSynthesisHistoryArchives)

const fetchSynthesisLastHistoryArchive = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.SYNTHESIS}/history-archives/last`).then((res) => res.data)
}

const useSynthesisLastHistoryArchive = () =>
  useQuery<SynthesisIndicatorModel[]>(['ReportsSynthesis_Get_SynthesisLastHistoryArchive'], fetchSynthesisLastHistoryArchive)

const fetchDownloadSynthesisReport = async ({ queryKey }) => {
  const [, period] = queryKey
  const { month, year } = splitPeriod(period)

  const sambotClientWithToken = await getSambotClientWithToken()
  const searchParams = new URLSearchParams()
  searchParams.append('year', year)
  searchParams.append('month', month)
  return sambotClientWithToken
    .get(`${Endpoint.SYNTHESIS}/download?${searchParams.toString()}`, { responseType: 'blob' })
    .then((res) => res.data)
}

const useDownloadSynthesisReport = (period: string) =>
  useQuery(['ReportsSynthesis_Get_DownloadSynthesisReport', period], fetchDownloadSynthesisReport, {
    enabled: !!period,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

export { useSynthesisHistoryArchives, useSynthesisLastHistoryArchive, useDownloadSynthesisReport }
