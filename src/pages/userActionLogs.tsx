import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { UserActionLogs } from '#modules/userActionLogs'

const UserActionLogsPage: NextPage = () => {
  return <UserActionLogs />
}

export default withMainLayoutPage(UserActionLogsPage, {
  title: 'User action logs',
})
