import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ManageIntrastat } from '#modules/reports'

const ManageIntrastatPage: NextPage = () => {
  return <ManageIntrastat />
}

export default withMainLayoutPage(ManageIntrastatPage, {
  title: 'Manage intrastat',
})
