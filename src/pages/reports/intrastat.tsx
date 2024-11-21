import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ReportsIntrastat } from '#modules/reports'

const ReportsIntrastatPage: NextPage = () => {
  return <ReportsIntrastat />
}

export default withMainLayoutPage(ReportsIntrastatPage, {
  title: 'Reports intrastat',
})
