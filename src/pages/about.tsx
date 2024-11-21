import { NextPage } from 'next/types'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { About } from '#modules/about'

const AboutPage: NextPage = () => {
  return <About />
}

export default withMainLayoutPage(AboutPage, () => ({
  title: 'About',
}))
