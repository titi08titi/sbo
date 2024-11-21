import { useQuery } from '@tanstack/react-query'

import { getSambotClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import { SlackUserModel } from '#utils/global'

async function fetchUser() {
  const sambotClientWithToken = await getSambotClientWithToken()
  return sambotClientWithToken.get(Endpoint.USERS).then((res) => res.data)
}

const useUser = () => {
  return useQuery<SlackUserModel>(['Profile_Get_User'], fetchUser, {
    staleTime: 12 * (60 * 60 * 1000), // 12 hours
    cacheTime: 18 * (60 * 60 * 1000), // 18 hours
  })
}

export { useUser }
