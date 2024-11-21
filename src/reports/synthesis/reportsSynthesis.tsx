import Grid from '@mui/material/Grid2'

import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ExpandableCard, Loader, UnexpectedError } from '#components/common'

import { SynthesisIndicatorsTable, SynthesisReportsTable } from '#components'

import { splitPeriod } from '../helper'

import { useDownloadSynthesisReport, useSynthesisHistoryArchives, useSynthesisLastHistoryArchive } from './queries'

export default function ReportsSynthesis() {
  const {
    isLoading: isSynthesisArchivesLoading,
    isError: isSynthesisArchivesError,
    isSuccess: isSynthesisArchivesSuccess,
    error: errorSynthesisArchives,
    data: dataSynthesisHistoryArchives,
  } = useSynthesisHistoryArchives()

  useEffect(() => {
    if (isSynthesisArchivesError) {
      toast.error(`Synthesis archives error: ${errorSynthesisArchives}`)
    }
  }, [isSynthesisArchivesError, errorSynthesisArchives])

  const {
    isLoading: isSynthesisIndicatorsLoading,
    isError: isSynthesisIndicatorsError,
    isSuccess: isSynthesisIndicatorsSuccess,
    error: errorSynthesisIndicators,
    data: dataSynthesisHistoryIndicators,
  } = useSynthesisLastHistoryArchive()

  useEffect(() => {
    if (isSynthesisIndicatorsError) {
      toast.error(`Synthesis indicators error: ${errorSynthesisIndicators}`)
    }
  }, [isSynthesisIndicatorsError, errorSynthesisIndicators])

  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('')

  const {
    data: dataDownloadedFile,
    isError: isSynthesisDownloadedFileError,
    isFetched: isSynthesisDownloadedFileFetched,
    error: errorSynthesisDownloadedFile,
  } = useDownloadSynthesisReport(selectedPeriod)

  useEffect(() => {
    if (isSynthesisDownloadedFileError) {
      toast.error(`Synthesis downloaded file error: ${errorSynthesisDownloadedFile}`)
    }
  }, [isSynthesisDownloadedFileError, errorSynthesisDownloadedFile])

  useEffect(() => {
    if (dataDownloadedFile) {
      toast.success(`Synthesis downloaded file success for the period: ${selectedPeriod}`)
      const url = window.URL.createObjectURL(dataDownloadedFile)
      const link = document.createElement('a')
      link.href = url
      const { year, month } = splitPeriod(selectedPeriod)
      const filename = `synthesis_${year}_${month}.xlsx`
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    }
  }, [dataDownloadedFile])

  const handleDownloadReport = (period: string) => {
    setSelectedPeriod(period)
  }

  const renderReportsArchives = () => {
    return (
      <ExpandableCard title={'Synthesis - Reports'} open={true}>
        {isSynthesisArchivesLoading && <Loader />}
        {isSynthesisArchivesError && <UnexpectedError />}
        {isSynthesisArchivesSuccess && (
          <SynthesisReportsTable
            dataSet={dataSynthesisHistoryArchives}
            onDownloadClick={handleDownloadReport}
            isDownloaded={isSynthesisDownloadedFileFetched}
          />
        )}
      </ExpandableCard>
    )
  }

  const renderIndicators = () => {
    return (
      <ExpandableCard title={'Synthesis - Current details'} open={true}>
        {isSynthesisIndicatorsLoading && <Loader />}
        {isSynthesisIndicatorsError && <UnexpectedError />}
        {isSynthesisIndicatorsSuccess && <SynthesisIndicatorsTable dataSet={dataSynthesisHistoryIndicators} />}
      </ExpandableCard>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid size={12}>{renderReportsArchives()}</Grid>
      <Grid size={12}>{renderIndicators()}</Grid>
    </Grid>
  )
}
