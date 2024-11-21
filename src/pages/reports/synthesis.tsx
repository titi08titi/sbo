import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ReportsSynthesis } from '#modules/reports'

const ReportsSynthesisPage: NextPage = () => {
  return <ReportsSynthesis />
}

export default withMainLayoutPage(ReportsSynthesisPage, {
  title: 'Reports synthesis',
})
