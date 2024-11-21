import { useMutation, useQuery } from '@tanstack/react-query'

import { getSambotClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import {
  IntrastatCampaignWithoutTaxNumberModel,
  IntrastatErrorModel,
  IntrastatHistoryModel,
  IntrastatItemWithoutCodeModel,
  IntrastatResultModel,
} from '#utils/global'

import { splitPeriod } from '../helper'

const fetchIntrastatHistoryArchives = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.INTRASTRASTS}/history-archives`).then((res) => res.data)
}

const useIntrastatHistoryArchives = () =>
  useQuery<IntrastatHistoryModel[]>(['ReportsManageIntrastat_Get_IntrastatHistoryArchives'], fetchIntrastatHistoryArchives)

const fetchIntrastatResults = async ({ queryKey }) => {
  const [, period] = queryKey
  const { month, year } = splitPeriod(period)

  const sambotClientWithToken = await getSambotClientWithToken()
  const searchParams = new URLSearchParams()
  searchParams.append('year', year)
  searchParams.append('month', month)

  return sambotClientWithToken.get(`${Endpoint.INTRASTRASTS}/results?${searchParams.toString()}`).then((res) => res.data)
}

const useIntrastatResults = (period: string) =>
  useQuery<IntrastatResultModel[]>(['ReportsManageIntrastat_Get_IntrastatResults', period], fetchIntrastatResults, {
    enabled: !!period,
  })

const fetchIntrastatErrors = async ({ queryKey }) => {
  const [, period] = queryKey
  const { month, year } = splitPeriod(period)

  const sambotClientWithToken = await getSambotClientWithToken()
  const searchParams = new URLSearchParams()
  searchParams.append('year', year)
  searchParams.append('month', month)

  return sambotClientWithToken.get(`${Endpoint.INTRASTRASTS}/errors?${searchParams.toString()}`).then((res) => res.data)
}

const useIntrastatErrors = (period: string) =>
  useQuery<IntrastatErrorModel[]>(['ReportsManageIntrastat_Get_IntrastatErrors', period], fetchIntrastatErrors, { enabled: !!period })

const postInstrastatValidate = async (data) => {
  const { period } = data
  const { month, year } = splitPeriod(period)

  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.post(`${Endpoint.INTRASTRASTS}/validate`, { month, year })
}

const useInstrastatValidate = (period: string) => {
  return useMutation(['ReportsManageIntrastat_Post_IntrastatValidate', period], postInstrastatValidate)
}

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
  useQuery(['ReportsManageIntrastat_Get_DownloadIntrastatReport', period], fetchDownloadIntrastatReport, {
    enabled: false,
    cacheTime: 0,
  })

const fetchIntrastatWithoutCode = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.INTRASTRASTS}/items-without-code`).then((res) => res.data)
}

const useIntrastatWithoutCode = () =>
  useQuery<IntrastatItemWithoutCodeModel[]>(['ReportsManageIntrastat_Get_IntrastatWithoutCode'], fetchIntrastatWithoutCode)

const fetchIntrastatMissingTaxNumbers = async () => {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.INTRASTRASTS}/missing-tax-numbers`).then((res) => res.data)
}

const useIntrastatMissingTaxNumbers = () =>
  useQuery<IntrastatCampaignWithoutTaxNumberModel[]>(
    ['ReportsManageIntrastat_Get_IntrastatMissingTaxNumbers'],
    fetchIntrastatMissingTaxNumbers
  )

export {
  useIntrastatHistoryArchives,
  useIntrastatResults,
  useIntrastatErrors,
  useInstrastatValidate,
  useDownloadIntrastatReport,
  useIntrastatWithoutCode,
  useIntrastatMissingTaxNumbers,
}
