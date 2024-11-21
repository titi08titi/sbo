import { createContext, useContext } from 'react'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center'

const NotificationsContext = createContext<ReturnType<typeof useNotificationCenter>>({} as any)
export const NotificationsProvider = ({ children }) => {
  return <NotificationsContext.Provider value={useNotificationCenter()}>{children}</NotificationsContext.Provider>
}
export const useSharedNotificationCenter = () => useContext(NotificationsContext)
