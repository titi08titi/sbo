import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ReportsPlasticTax } from '#modules/reports'

const ReportsPlasticTaxPage: NextPage = () => {
  return <ReportsPlasticTax />
}

export default withMainLayoutPage(ReportsPlasticTaxPage, {
  title: 'Reports plastic tax',
})
