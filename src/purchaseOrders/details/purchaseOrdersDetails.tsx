import Grid from '@mui/material/Grid2'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ExpandableCard, Loader, UnexpectedError } from '#components/common'
import PurchaseOrderAwpEventsTable from '#components/purchaseOrders/PurchaseOrderAwpEventsTable'
import PurchaseOrderDetailsTable from '#components/purchaseOrders/PurchaseOrderDetailsTable'
import PurchaseOrderEventsTable from '#components/purchaseOrders/PurchaseOrderEventsTable'
import { PurchaseOrderFormData } from '#components/purchaseOrders/PurchaseOrderForm'
import PurchaseOrdersTable from '#components/purchaseOrders/PurchaseOrdersTable'
import { SamBotPage } from '#utils/constants'
import { PurchaseOrderModel } from '#utils/global'

import { PurchaseOrderAwpListTable, PurchaseOrderForm } from '#components'

import {
  getPurchaseOrder,
  usePurchaseOrderDetails,
  usePurchaseOrderEvents,
  usePurchaseOrderAwpEvents,
  usePurchaseOrderAwpList,
} from './queries'

export default function PurchaseOrders() {
  const [purchaseOrderUuid, setPurchaseOrderUuid] = React.useState<string>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const [purchaseOrder, setPurchaseOrder] = React.useState<PurchaseOrderModel>(null)
  useEffect(() => {
    const fetchData = async () => {
      const po = await getPurchaseOrder(purchaseOrderUuid)
      setPurchaseOrder(po ? po : null)
    }
    fetchData()
  }, [purchaseOrderUuid])

  const {
    isLoading: isPoDetailsLoading,
    isError: isPoDetailsError,
    isSuccess: isPoDetailsSuccess,
    error: PoDetailsError,
    data: dataPoDetails,
  } = usePurchaseOrderDetails(purchaseOrderUuid)

  const {
    isLoading: isPoEventsLoading,
    isError: isPoEventsError,
    isSuccess: isPoEventsSuccess,
    error: PoEventsError,
    data: dataPoEvents,
  } = usePurchaseOrderEvents(purchaseOrderUuid)

  const {
    isLoading: isPoAwpEventsLoading,
    isError: isPoAwpEventsError,
    isSuccess: isPoAwpEventsSuccess,
    error: PoAwpEventsError,
    data: dataPoAwpEvents,
  } = usePurchaseOrderAwpEvents(purchaseOrderUuid)

  useEffect(() => {
    if (isPoDetailsError) {
      toast.error(`Purchase Order Details error: ${PoDetailsError}`)
    }
  }, [isPoDetailsError, PoDetailsError])

  useEffect(() => {
    if (isPoEventsError) {
      toast.error(`Purchase Order Events error: ${PoEventsError}`)
    }
  }, [isPoEventsError, PoEventsError])

  useEffect(() => {
    if (isPoAwpEventsError) {
      toast.error(`Purchase Order Awp Events error: ${PoAwpEventsError}`)
    }
  }, [isPoAwpEventsError, PoAwpEventsError])

  useEffect(() => {
    const purchaseOrderUuidParam = searchParams.get('uuid')
    if (purchaseOrderUuidParam?.length > 0) {
      setPurchaseOrderUuid(purchaseOrderUuidParam)
    }
  }, [])

  const handlePurchaseOrderFormDataChanged = (purchaseOrderFormData: PurchaseOrderFormData) => {
    const purchaseOrderQuery = {}

    if (purchaseOrderFormData.purchaseOrderUuid) {
      purchaseOrderQuery['uuid'] = purchaseOrderFormData.purchaseOrderUuid
    }

    router.push({
      pathname: SamBotPage.purchaseOrderDetails,
      query: purchaseOrderQuery,
    })
    setPurchaseOrderUuid(purchaseOrderFormData.purchaseOrderUuid)
  }

  const renderPurchaseOrders = () => {
    return (
      <ExpandableCard className="mb-5" title={'Purchase order'} open={purchaseOrder != null}>
        <PurchaseOrdersTable dataSet={purchaseOrder} />
      </ExpandableCard>
    )
  }

  const renderPurchaseOrderDetails = () => {
    return (
      <ExpandableCard className="mb-5" title={'Purchase orders - Details'} open={isPoDetailsSuccess && dataPoDetails?.length > 0}>
        {isPoDetailsLoading && <Loader />}
        {isPoDetailsError && <UnexpectedError />}
        {isPoDetailsSuccess && <PurchaseOrderDetailsTable dataSet={dataPoDetails} />}
      </ExpandableCard>
    )
  }

  const renderPurchaseOrdersEvents = () => {
    return (
      <ExpandableCard className="mb-5" title={'Purchase orders - Events'} open={isPoEventsSuccess && dataPoEvents?.length > 0}>
        {isPoEventsLoading && <Loader />}
        {isPoEventsError && <UnexpectedError />}
        {isPoEventsSuccess && <PurchaseOrderEventsTable dataSet={dataPoEvents} />}
      </ExpandableCard>
    )
  }

  const {
    isLoading: awpIsLoading,
    isError: awpIsError,
    isSuccess: awpIsSuccess,
    error: awpError,
    data: awpData,
  } = usePurchaseOrderAwpList(purchaseOrderUuid)

  useEffect(() => {
    if (awpIsError) {
      toast.error(`PO AWP error: ${awpError}`)
    }
  }, [awpIsError, awpError])

  const renderPurchaseOrdersAwpList = () => {
    const rowsCount = awpData?.length || 0
    return (
      <ExpandableCard className="mb-5" title={'Purchase orders - Average weighted prices'} open={awpIsSuccess && rowsCount > 0}>
        {awpIsLoading && <Loader />}
        {awpIsError && <UnexpectedError />}
        {awpIsSuccess && <PurchaseOrderAwpListTable dataSet={awpData} />}
      </ExpandableCard>
    )
  }

  const renderPurchaseOrdersAwpEvents = () => {
    const rowsPoAwpCount = dataPoAwpEvents?.length || 0
    return (
      <ExpandableCard className="mb-5" title={'Purchase orders - AWP events'} open={isPoEventsSuccess && rowsPoAwpCount > 0}>
        {isPoAwpEventsLoading && <Loader />}
        {isPoAwpEventsError && <UnexpectedError />}
        {isPoAwpEventsSuccess && <PurchaseOrderAwpEventsTable dataSet={dataPoAwpEvents} />}
      </ExpandableCard>
    )
  }

  return (
    <Grid container>
      <Grid size={12}>
        <PurchaseOrderForm currentPurchaseOrderUuid={purchaseOrderUuid} onFormDataChanged={handlePurchaseOrderFormDataChanged} />
      </Grid>
      <Grid size={12}>{renderPurchaseOrders()}</Grid>
      <Grid size={12}>{renderPurchaseOrdersEvents()}</Grid>
      <Grid size={12}>{renderPurchaseOrdersAwpList()}</Grid>
      <Grid size={12}>{renderPurchaseOrdersAwpEvents()}</Grid>
      <Grid size={12}>{renderPurchaseOrderDetails()}</Grid>
    </Grid>
  )
}
