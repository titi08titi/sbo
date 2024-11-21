import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { Home } from '#modules/home'

const HomePage: NextPage = () => {
  return <Home />
}
export default withMainLayoutPage(HomePage, {
  title: 'Homepage',
})
