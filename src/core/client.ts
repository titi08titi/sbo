import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'

import { getEnvironment, getSambotApiUrl } from '#utils/helper'

let environment = process.env.CUSTOM_ENV
if (!environment && typeof window !== 'undefined') {
  environment = getEnvironment(window.location.hostname)
}

const sambotApiUrl = getSambotApiUrl(environment)
const sambotClient = axios.create({ baseURL: sambotApiUrl })

export const setBearer = (token: string) => {
  sambotClient.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => {
      throw error
    }
  )

  sambotClient.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const prevRequest = error.config
      if (error.code === 'ERR_NETWORK' && !prevRequest.sent) {
        prevRequest.sent = true
        signIn('keycloak')
      }
      if (error.response?.status == 401 && !prevRequest.sent) {
        prevRequest.sent = true
        const session = await getSession()
        prevRequest.headers.Authorization = `Bearer ${session.accessToken}`
        return sambotClient(prevRequest)
      }
      return Promise.reject(error)
    }
  )
}

export const getSambotClientWithToken = async () => {
  const session = await getSession()
  setBearer(session.accessToken)
  return sambotClient
}

export default sambotClient
