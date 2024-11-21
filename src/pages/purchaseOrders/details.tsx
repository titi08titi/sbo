import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { PurchaseOrdersDetails } from '#modules/purchaseOrders'

const PurchaseOrdersPage: NextPage = () => {
  return <PurchaseOrdersDetails />
}

export default withMainLayoutPage(PurchaseOrdersPage, {
  title: 'PurchaseOrders',
})
