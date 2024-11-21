import { useQuery } from '@tanstack/react-query'

import { getSambotClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import {
  PurchaseOrderModel,
  PurchaseOrderDetails,
  PurchaseOrderEvents,
  PurchaseOrderAwpEvents,
  PurchaseOrderAwpModel,
} from '#utils/global'

const getPurchaseOrder = async (purchaseOrderUuid: string) => {
  if (!purchaseOrderUuid) return
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.PURCHASE_ORDERS}/${purchaseOrderUuid}`).then<PurchaseOrderModel>((res) => res.data)
}

const fetchPurchaseOrdersDetails = async ({ queryKey }) => {
  const [, purchaseOrderUuid] = queryKey
  if (!purchaseOrderUuid) {
    return Promise.resolve([])
  }
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.PURCHASE_ORDERS}/${purchaseOrderUuid}/details`).then((res) => res.data)
}
const usePurchaseOrderDetails = (purchaseOrderUuid: string) =>
  useQuery<PurchaseOrderDetails[]>(['PurchaseOrdersDetails_Get_PurchaseOrderDetails', purchaseOrderUuid], fetchPurchaseOrdersDetails)

const fetchPurchaseOrderEvents = async ({ queryKey }) => {
  const [, purchaseOrderUuid] = queryKey
  if (!purchaseOrderUuid) {
    return Promise.resolve([])
  }
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.PURCHASE_ORDERS}/${purchaseOrderUuid}/events`).then((res) => res.data)
}
const usePurchaseOrderEvents = (purchaseOrderUuid: string) =>
  useQuery<PurchaseOrderEvents[]>(['PurchaseOrdersDetails_Get_PurchaseOrderEvents', purchaseOrderUuid], fetchPurchaseOrderEvents)

const fetchPurchaseOrderAwpEvents = async ({ queryKey }) => {
  const [, purchaseOrderUuid] = queryKey
  if (!purchaseOrderUuid) {
    return Promise.resolve([])
  }
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.PURCHASE_ORDERS}/${purchaseOrderUuid}/awp-events`).then((res) => res.data)
}
const usePurchaseOrderAwpEvents = (purchaseOrderUuid: string) =>
  useQuery<PurchaseOrderAwpEvents[]>(
    ['PurchaseOrdersDetails_Get_PurchaseOrderAwpEvents', purchaseOrderUuid],
    fetchPurchaseOrderAwpEvents
  )

const fetchPurchaseOrderAwpList = async ({ queryKey }) => {
  const [, purchaseOrderUuid] = queryKey
  if (!purchaseOrderUuid) {
    return Promise.resolve([])
  }
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(`${Endpoint.PURCHASE_ORDERS}/${purchaseOrderUuid}/awp`).then((res) => res.data)
}
const usePurchaseOrderAwpList = (purchaseOrderUuid: string) =>
  useQuery<PurchaseOrderAwpModel[]>(['PurchaseOrdersDetails_Get_PurchaseOrderAwpList', purchaseOrderUuid], fetchPurchaseOrderAwpList)

export { getPurchaseOrder, usePurchaseOrderDetails, usePurchaseOrderEvents, usePurchaseOrderAwpEvents, usePurchaseOrderAwpList }
