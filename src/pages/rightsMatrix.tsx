import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { RightsMatrix } from '#modules/rightsMatrix'

const RightsMatrixPage: NextPage = () => {
  return <RightsMatrix />
}

export default withMainLayoutPage(RightsMatrixPage, {
  title: 'Matrix des droits',
})
