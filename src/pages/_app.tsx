import '../styles/bundle.css'
import StyleProvider from '@concrete-ui/styleprovider'
import darkScrollbar from '@mui/material/darkScrollbar'
import { createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { createContext, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { NotificationsProvider } from '#components/context/notificationsContext'
import useLocalStorage from '#hooks/useLocalStorage'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = createContext({ toggleColorMode: () => {} })

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [mode, setMode] = useLocalStorage('colorMode', 'light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // @ts-ignore override palette mode otherwise it doesn't work
          primary: {
            main: '#F3F3F3',
          },
          // @ts-ignore override palette mode otherwise it doesn't work
          secondary: {
            main: '#EC008C',
          },
        },
        MuiCssBaseline: {
          styleOverrides: (themeParam) => ({
            body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
          }),
        },
      }),
    [mode]
  )
  return (
    <ColorModeContext.Provider value={colorMode}>
      <StyleProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <>
            <Head>
              <meta charSet="utf-8" />
              <title>Veepee - Sambot</title>
            </Head>
            <QueryClientProvider client={queryClient}>
              <ToastContainer toastStyle={{ backgroundColor: theme.palette.background.default }} />
              <NotificationsProvider>
                <Component {...pageProps} />
              </NotificationsProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </>
        </SessionProvider>
      </StyleProvider>
    </ColorModeContext.Provider>
  )
}

export default MyApp
