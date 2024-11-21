import SamImg from '@/sam.png'
import { Box, Card, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

import moment from 'moment'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Image, Loader, UnexpectedError } from '#components/common'
import HelloWorld from '#components/common/HelloWorld'
import { useSharedNotificationCenter } from '#components/context/notificationsContext'
import useLocalStorage from '#hooks/useLocalStorage'
import { DefaultDateTimeFormat } from '#utils/constants'

import { ProcessesIndicators, ProcessesTrend, ProcessTimeline } from '#components'

import styles from './home.module.css'
import { useProcessesInfoSummary, useProcessesStatistics } from './queries'

export default function Home() {
  const session = useSession()
  const lastProcessName = 'SendDataWarehouseRefresh'
  const isSessionLoading = session.status === 'loading'
  const [period, setPeriod] = useState('30')
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(period, 'd').format(DefaultDateTimeFormat),
    endDate: moment().format(DefaultDateTimeFormat),
  })

  const {
    isLoading: isProcessSummaryLoading,
    isError: isProcessSummaryError,
    isSuccess: isProcessSuccess,
    error: processSummaryError,
    data: processSummaryData,
  } = useProcessesInfoSummary()
  const {
    isLoading: isProcessStatisticsLoading,
    isError: isProcessStatisticsError,
    isSuccess: isProcessStatisticsSuccess,
    error: processStatisticsError,
    data: processStatisticsData,
  } = useProcessesStatistics(dateRange)
  const user = session.data.user
  const { add } = useSharedNotificationCenter()
  const [welcomeMessageDate, setWelcomeMessageDate] = useLocalStorage('welcomeMessageDateKey', null)

  useEffect(() => {
    if (processSummaryData && (welcomeMessageDate === null || moment().format('L') > moment(welcomeMessageDate).format('L'))) {
      const lastStep = processSummaryData.lastProcessesInfo.find((process) => process.processName === lastProcessName)
      if (!moment(lastStep.modificationDate).isSame(new Date(), 'day')) {
        add({
          content: 'Welcome to Sambot, SAM process is not started today',
          type: 'info',
        })
      } else {
        add({
          content: `Welcome to Sambot, SAM process is ${processSummaryData.areFinished ? 'finished' : 'running'} ${
            processSummaryData.areValid ? '' : 'with errors'
          }`,
          type: processSummaryData.areValid ? 'success' : 'error',
        })
      }
      setWelcomeMessageDate(Date.now)
    }
  }, [processSummaryData])

  useEffect(() => {
    if (isProcessSummaryError) {
      toast.error(`Processes error: ${processSummaryError}`)
    }
  }, [isProcessSummaryError, processSummaryError])

  useEffect(() => {
    if (isProcessStatisticsError) {
      toast.error(`Processes statistics error: ${processStatisticsError}`)
    }
  }, [isProcessStatisticsError, processStatisticsError])

  function handlePeriodChanged(event: SelectChangeEvent): void {
    const value = event.target.value
    setPeriod(value)
    setDateRange({
      startDate: moment().subtract(value, 'd').format(DefaultDateTimeFormat),
      endDate: moment().format(DefaultDateTimeFormat),
    })
  }

  const renderProcessTimeline = () => {
    if (isProcessSummaryLoading) {
      return <Loader />
    }
    if (isProcessSummaryError) {
      return <UnexpectedError />
    }

    if (isProcessSuccess) {
      return <ProcessTimeline processInfoSummary={processSummaryData} />
    }
    return <></>
  }

  const renderProcessIndicators = () => {
    if (isProcessStatisticsLoading) {
      return <Loader />
    }
    if (isProcessStatisticsError) {
      return <UnexpectedError />
    }

    if (isProcessStatisticsSuccess) {
      return <ProcessesIndicators dataset={{ statistics: processStatisticsData }} />
    }
    return <></>
  }

  const renderProcessesTrend = () => {
    if (isProcessStatisticsLoading) {
      return <Loader />
    }
    if (isProcessStatisticsError) {
      return <UnexpectedError />
    }

    if (isProcessStatisticsSuccess) {
      return <ProcessesTrend dataset={processStatisticsData} />
    }
    return <></>
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid container alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
          <h3 className={styles.title}>
            <HelloWorld user={user} loading={isSessionLoading} />
          </h3>
          <Image
            effect="opacity"
            src={SamImg}
            alt="SAM logo"
            width={25}
            className="rounded-md ml-5 sm:min-h-[25px]"
            wrapperClassName="max-w-full"
          />
        </Grid>
        <Grid container sx={{ marginTop: 1 }}>
          <Grid size={12}>
            <Card sx={{ padding: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                  <Select id="period-id" value={period} onChange={handlePeriodChanged} autoWidth>
                    <MenuItem value={30}>Last 30 days</MenuItem>
                    <MenuItem value={90}>Last 90 days</MenuItem>
                    <MenuItem value={183}>Last 6 months</MenuItem>
                    <MenuItem value={365}>Last year</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {renderProcessIndicators()}
            </Card>
          </Grid>
          <Grid size={12} sx={{ marginTop: 2 }}>
            <Card sx={{ padding: 2 }}>
              <Grid container alignContent={'center'} justifyContent={'center'} spacing={2}>
                <Grid size={4}>{renderProcessTimeline()}</Grid>
                <Grid size={4}>{renderProcessesTrend()}</Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
