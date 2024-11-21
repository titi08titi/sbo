import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { Elastic } from '#modules/elastic'

const ElasticPage: NextPage = () => {
  return <Elastic />
}

export default withMainLayoutPage(ElasticPage, {
  title: 'Elastic',
})
