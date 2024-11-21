import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { ExternalLinks } from '#modules/externalLinks'

const ExternalLinksPage: NextPage = () => {
  return <ExternalLinks />
}

export default withMainLayoutPage(ExternalLinksPage, {
  title: 'External links',
})
