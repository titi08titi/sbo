import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ProcessesDetails } from '#modules/processes'

const ProcessesPage: NextPage = () => {
  return <ProcessesDetails />
}

export default withMainLayoutPage(ProcessesPage, {
  title: 'Processes',
})
