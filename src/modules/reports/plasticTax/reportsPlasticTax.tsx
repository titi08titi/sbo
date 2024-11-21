import Grid from '@mui/material/Grid2'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ExpandableCard, ExpandableErrorPanel, Loader, UnexpectedError } from '#components/common'
import { hasFeatureAccess } from '#core/authorizations'
import useAuth from '#hooks/useAuth'
import { Feature, SamBotPage } from '#utils/constants'
import { ErrorInfo } from '#utils/global'

import { PlasticTaxReportsTable, PlasticTaxTable } from '#components'

import { splitPeriod } from '../helper'

import { useDownloadPlasticTaxReport, usePlasticTaxHistoryArchives, usePlasticTaxStockCodes } from './queries'

export default function ReportsPlasticTax() {
  const [stockCodes, setStockCodes] = React.useState<string[]>([])
  const [csvErrors, setCsvErrors] = useState<ErrorInfo[]>([])
  const { userRoles } = useAuth()
  const [hasRightsToUpload, setHasRightsToUpload] = useState<boolean>(false)

  useEffect(() => {
    const hasRightsToUploadInputs = hasFeatureAccess(SamBotPage.reportPlasticTax, Feature.uploadPlasticTaxInputs, userRoles)
    setHasRightsToUpload(hasRightsToUploadInputs)
  }, [userRoles])

  function handleUploading(): void {
    setCsvErrors([])
  }

  const { mutate: mutatePostStockCodes, isSuccess: isPostStockCodesSuccess, error: errorPostStockCodes } = usePlasticTaxStockCodes()

  useEffect(() => {
    if (isPostStockCodesSuccess) {
      toast.success('External goods receipts created successfully')
    } else if (errorPostStockCodes) {
      toast.error(`An error occurred during creation of external goods receipts: ${errorPostStockCodes}`)
    }
  }, [isPostStockCodesSuccess, errorPostStockCodes])

  function handleFileUploaded(file: File | null, uploadedStockCodes: string[]): void {
    setStockCodes(uploadedStockCodes)
    toast.info(`File uploaded successfully ${file.name}`)
  }

  function handleSave(savedStockCodes: string[]): void {
    setStockCodes(savedStockCodes)
    mutatePostStockCodes({ queryKey: ['ReportsPlasticTax_Post_StockCodes', stockCodes] })
  }

  function handleErrors(errors: ErrorInfo[]): void {
    setCsvErrors(errors)
  }

  function handleParseErrors(errors: Papa.ParseError[]): void {
    toast.error(`Import errors: ${errors.flatMap((e) => e.message).join(', ')}`)
  }

  const {
    isLoading: isPlasticTaxArchivesLoading,
    isError: isPlasticTaxArchivesError,
    isSuccess: isPlasticTaxArchivesSuccess,
    error: errorPlasticTaxArchives,
    data: dataPlasticTaxHistoryArchives,
  } = usePlasticTaxHistoryArchives()

  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('')

  const {
    data: dataDownloadedFile,
    isError: isPlasticTaxDownloadedFileError,
    isFetched: isPlasticTaxDownloadedFileFetched,
    error: errorPlasticTaxDownloadedFile,
  } = useDownloadPlasticTaxReport(selectedPeriod)

  useEffect(() => {
    if (isPlasticTaxArchivesError) {
      toast.error(`Plastic tax archives error: ${errorPlasticTaxArchives}`)
    }
  }, [isPlasticTaxArchivesError, errorPlasticTaxArchives])

  useEffect(() => {
    if (isPlasticTaxDownloadedFileError) {
      toast.error(`Plastic tax downloaded file error: ${errorPlasticTaxDownloadedFile}`)
    }
  }, [isPlasticTaxDownloadedFileError, errorPlasticTaxDownloadedFile])

  useEffect(() => {
    if (dataDownloadedFile) {
      toast.success(`Plastic tax downloaded file success for the period: ${selectedPeriod}`)
      const url = window.URL.createObjectURL(dataDownloadedFile)
      const link = document.createElement('a')
      link.href = url
      const { year, month } = splitPeriod(selectedPeriod)
      const filename = `plastic_tax_${year}_${month}.xlsx`
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    }
  }, [dataDownloadedFile])

  const handleDownloadReport = (period: string) => {
    setSelectedPeriod(period)
  }

  const renderReports = () => {
    return (
      <ExpandableCard title={'Reports'} open={true}>
        {isPlasticTaxArchivesLoading && <Loader />}
        {isPlasticTaxArchivesError && <UnexpectedError />}
        {isPlasticTaxArchivesSuccess && (
          <PlasticTaxReportsTable
            dataSet={dataPlasticTaxHistoryArchives}
            onDownloadClick={handleDownloadReport}
            isDownloaded={isPlasticTaxDownloadedFileFetched}
          />
        )}
      </ExpandableCard>
    )
  }

  const renderUpload = () => {
    return (
      <ExpandableCard title={'Import stock codes'} open={true}>
        <PlasticTaxTable
          onUploading={handleUploading}
          onFileUploaded={handleFileUploaded}
          onSave={handleSave}
          onErrors={handleErrors}
          onParseErrors={handleParseErrors}
        />
      </ExpandableCard>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid size={12}>{renderReports()}</Grid>
      {csvErrors.length > 0 ? (
        <Grid size={12}>
          <ExpandableErrorPanel
            open
            className="mb-5"
            errors={csvErrors}
            message="Error occurred during import process some lines are not imported"
            title={'Error'}
          />
        </Grid>
      ) : null}
      {hasRightsToUpload && <Grid size={12}>{renderUpload()}</Grid>}
    </Grid>
  )
}
