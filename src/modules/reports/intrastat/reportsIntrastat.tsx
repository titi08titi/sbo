import Grid from '@mui/material/Grid2'

import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Loader, UnexpectedError } from '#components/common'

import { IntrastatReportsTable } from '#components'

import { splitPeriod } from '../helper'

import { useDownloadIntrastatReport, useIntrastatHistoryArchives } from './queries'

export default function ReportsIntrastat() {
  const {
    isLoading: isIntrastatArchivesLoading,
    isError: isIntrastatArchivesError,
    isSuccess: isIntrastatArchivesSuccess,
    error: errorIntrastatArchives,
    data: dataIntrastatHistoryArchives,
  } = useIntrastatHistoryArchives()

  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('')

  const {
    data: dataDownloadedFile,
    isError: isIntrastatDownloadedFileError,
    isFetched: isIntrastatDownloadedFileFetched,
    error: errorIntrastatDownloadedFile,
  } = useDownloadIntrastatReport(selectedPeriod)

  useEffect(() => {
    if (isIntrastatArchivesError) {
      toast.error(`Intrastrat archives error: ${errorIntrastatArchives}`)
    }
  }, [isIntrastatArchivesError, errorIntrastatArchives])

  useEffect(() => {
    if (isIntrastatDownloadedFileError) {
      toast.error(`Intrastat downloaded file error: ${errorIntrastatDownloadedFile}`)
    }
  }, [isIntrastatDownloadedFileError, errorIntrastatDownloadedFile])

  useEffect(() => {
    if (dataDownloadedFile) {
      toast.success(`Intrastrat downloaded file success for the period: ${selectedPeriod}`)
      const url = window.URL.createObjectURL(dataDownloadedFile)
      const link = document.createElement('a')
      link.href = url
      const { year, month } = splitPeriod(selectedPeriod)
      const filename = `intrastat_${year}_${month}.xlsx`
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
      <>
        {isIntrastatArchivesLoading && <Loader />}
        {isIntrastatArchivesError && <UnexpectedError />}
        {isIntrastatArchivesSuccess && (
          <IntrastatReportsTable
            dataSet={dataIntrastatHistoryArchives}
            onDownloadClick={handleDownloadReport}
            isDownloaded={isIntrastatDownloadedFileFetched}
          />
        )}
      </>
    )
  }

  return (
    <Grid container>
      <Grid size={12}>{renderReportsArchives()}</Grid>
    </Grid>
  )
}
