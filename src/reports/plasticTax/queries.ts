import { useMutation, useQuery } from '@tanstack/react-query'

import { getSambotClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import { PlasticTaxHistoryArchiveModel } from '#utils/global'

import { splitPeriod } from '../helper'

const fetchDownloadPlasticTaxReport = async ({ queryKey }) => {
  const [, period] = queryKey
  const { month, year } = splitPeriod(period)

  const sambotClientWithToken = await getSambotClientWithToken()
  const searchParams = new URLSearchParams()
  searchParams.append('year', year)
  searchParams.append('month', month)
  return sambotClientWithToken
    .get(`${Endpoint.PLASTIC_TAX}/download?${searchParams.toString()}`, { responseType: 'blob' })
    .then((res) => res.data)
}

const fetchPlasticTaxHistoryArchives = async () => {
  return (await getSambotClientWithToken()).get(`${Endpoint.PLASTIC_TAX}/history-archives`).then((res) => res.data)
}
const usePlasticTaxHistoryArchives = () =>
  useQuery<PlasticTaxHistoryArchiveModel[]>(['ReportsPlasticTax_Get_HistoryArchives'], fetchPlasticTaxHistoryArchives)

const useDownloadPlasticTaxReport = (period: string) =>
  useQuery(['ReportsPlasticTax_Get_DownloadByPeriod', period], fetchDownloadPlasticTaxReport, {
    enabled: !!period,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

async function postPlasticTaxStockCodes({ queryKey }) {
  const [, stockCodes] = queryKey
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.post(`${Endpoint.PLASTIC_TAX}`, stockCodes).then((res) => res.data)
}

const usePlasticTaxStockCodes = () => {
  return useMutation(postPlasticTaxStockCodes)
}

export { useDownloadPlasticTaxReport, usePlasticTaxHistoryArchives, usePlasticTaxStockCodes }
