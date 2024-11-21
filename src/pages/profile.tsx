import { NextPage } from 'next'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import { Profile } from '#modules/profile'

const ProfilePage: NextPage = () => {
  return <Profile />
}

export default withMainLayoutPage(ProfilePage, {
  title: 'Profile',
})
