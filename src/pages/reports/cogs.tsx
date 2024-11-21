import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ReportsCogs } from '#modules/reports'

const ReportsCogsPage: NextPage = () => {
  return <ReportsCogs />
}

export default withMainLayoutPage(ReportsCogsPage, {
  title: 'Reports COGS',
})
