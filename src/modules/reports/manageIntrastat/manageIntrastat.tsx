import { Box, StepLabel, Typography, Button, Stepper, Step, styled } from '@mui/material'
import Grid from '@mui/material/Grid2'

import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Loader, UnexpectedError } from '#components/common'
import IntrastatPeriodForm from '#components/reports/intrastat/IntrastatPeriodForm'

import { IntrastatResultsErrorsTable, IntrastatValidationForm } from '#components'

import {
  useDownloadIntrastatReport,
  useInstrastatValidate,
  useIntrastatErrors,
  useIntrastatHistoryArchives,
  useIntrastatMissingTaxNumbers,
  useIntrastatResults,
  useIntrastatWithoutCode,
} from './queries'

enum ManageIntrastatSteps {
  selectIntrastatReportPeriod,
  seeResultsErrors,
  validate,
  end,
}

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed': {
    color: theme.palette.success.main,
  },
}))

export default function ManageIntrastat() {
  const [activeStep, setActiveStep] = React.useState(0)

  const steps = [
    {
      label: 'Select intrastat report period',
    },
    {
      label: 'See results and errors',
    },
    {
      label: 'Validate',
    },
  ]
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('')

  const {
    isLoading: isIntrastatArchivesLoading,
    isError: isIntrastatArchivesError,
    isSuccess: isIntrastatArchivesSuccess,
    error: errorIntrastatArchives,
    data: dataIntrastatHistoryArchives,
  } = useIntrastatHistoryArchives()

  const {
    isLoading: isIntrastatResultsLoading,
    isError: isIntrastatResultsError,
    isSuccess: isIntrastatResultsSuccess,
    error: errorIntrastatResults,
    data: dataIntrastatResults,
  } = useIntrastatResults(selectedPeriod)

  const {
    isError: isIntrastatErrorsError,
    isSuccess: isIntrastatErrorsSuccess,
    error: errorIntrastatErrors,
    data: dataIntrastatErrors,
  } = useIntrastatErrors(selectedPeriod)

  const {
    mutate: mutateIntrastatValidate,
    isSuccess: isIntrastatValidateSuccess,
    error: errorIntrastatError,
  } = useInstrastatValidate(selectedPeriod)

  const {
    data: dataDownloadedFile,
    isError: isIntrastatDownloadedFileError,
    isFetching: isIntrastatDownloadedFileRefetching,
    error: errorIntrastatDownloadedFile,
    refetch: refetchDownloadedFile,
  } = useDownloadIntrastatReport(selectedPeriod)

  const { data: dataItemsWithoutCode, isError: isItemsWithoutCodeError, error: errorItemsWithoutCode } = useIntrastatWithoutCode()
  const {
    data: dataCampaignsWithMissingTaxNumber,
    isError: isCampaignsWithMissingTaxNumberError,
    error: errorCampaignsWithMissingTaxNumber,
  } = useIntrastatMissingTaxNumbers()

  useEffect(() => {
    if (isCampaignsWithMissingTaxNumberError) {
      toast.error(`Intrastrat campaigns with missing tax number error: ${errorCampaignsWithMissingTaxNumber}`)
    }
  }, [isCampaignsWithMissingTaxNumberError, errorCampaignsWithMissingTaxNumber])

  useEffect(() => {
    if (isIntrastatArchivesError) {
      toast.error(`Intrastrat archives error: ${errorIntrastatArchives}`)
    }
  }, [isIntrastatArchivesError, errorIntrastatArchives])

  useEffect(() => {
    if (isIntrastatResultsError) {
      toast.error(`Intrastrat results error: ${errorIntrastatResults}`)
    }
  }, [isIntrastatResultsError, errorIntrastatResults])

  useEffect(() => {
    if (isIntrastatErrorsError) {
      toast.error(`Intrastrat errors error: ${errorIntrastatErrors}`)
    }
  }, [isIntrastatErrorsError, errorIntrastatErrors])

  useEffect(() => {
    if (isIntrastatValidateSuccess) {
      toast.success(`Intrastrat validation success for the period: ${selectedPeriod}`)
    }
  }, [isIntrastatValidateSuccess])

  useEffect(() => {
    if (errorIntrastatError) {
      toast.error(`Intrastrat validation error: ${errorIntrastatError}`)
    }
  }, [errorIntrastatError])

  useEffect(() => {
    if (isIntrastatDownloadedFileError) {
      toast.error(`Intrastrat downloaded file error: ${errorIntrastatDownloadedFile}`)
    }
  }, [isIntrastatDownloadedFileError, errorIntrastatDownloadedFile])

  useEffect(() => {
    if (isItemsWithoutCodeError) {
      toast.error(`Intrastrat items without code error: ${errorItemsWithoutCode}`)
    }
  }, [isItemsWithoutCodeError, errorItemsWithoutCode])

  useEffect(() => {
    if (dataDownloadedFile) {
      toast.success(`Intrastrat downloaded file success for the period: ${selectedPeriod}`)
      const url = window.URL.createObjectURL(dataDownloadedFile)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'preview-instrastat.xlsx')
      document.body.appendChild(link)
      link.click()
    }
  }, [dataDownloadedFile])

  useEffect(() => {
    if (isIntrastatArchivesSuccess && dataIntrastatHistoryArchives.length != 0) {
      const archives = dataIntrastatHistoryArchives.filter((period) => period.isOpen)
      const firstPeriod = `${archives[0].year}-${archives[0].month.toString().padStart(2, '0')}`
      setSelectedPeriod(firstPeriod)
    }
  }, [isIntrastatArchivesSuccess, dataIntrastatHistoryArchives])

  const isLastStep = () => {
    return activeStep === steps.length
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handlePeriodChanged = (period: string) => {
    setSelectedPeriod(period)
  }

  const handlePeriodValidate = () => {
    mutateIntrastatValidate({ period: selectedPeriod })
    setActiveStep(activeStep + 1)
  }

  const handleDownloadReport = () => {
    refetchDownloadedFile()
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case ManageIntrastatSteps.selectIntrastatReportPeriod:
        return renderSelectIntrastatReportPeriod()
      case ManageIntrastatSteps.seeResultsErrors:
        return renderSeeResultsErrors()
      case ManageIntrastatSteps.validate:
        return <IntrastatValidationForm selectedPeriod={selectedPeriod} onPeriodValidate={handlePeriodValidate} />
      case ManageIntrastatSteps.end:
        return renderEnd()
      default:
        return <div>Unknown step</div>
    }
  }

  const renderSelectIntrastatReportPeriod = () => {
    return (
      <>
        {isIntrastatArchivesLoading && <Loader />}
        {errorIntrastatArchives && <UnexpectedError />}
        {isIntrastatArchivesSuccess && (
          <IntrastatPeriodForm
            intrastatHistoryArchives={dataIntrastatHistoryArchives}
            selectedPeriod={selectedPeriod}
            onPeriodChanged={handlePeriodChanged}
          />
        )}
      </>
    )
  }

  const renderSeeResultsErrors = () => {
    return (
      <>
        {isIntrastatResultsLoading && <Loader />}
        {isIntrastatResultsError && <UnexpectedError />}
        {isIntrastatResultsSuccess && isIntrastatErrorsSuccess && (
          <IntrastatResultsErrorsTable
            dataSets={{
              results: dataIntrastatResults,
              errors: dataIntrastatErrors,
              itemsWithoutCode: dataItemsWithoutCode,
              campaignsWithMissingTaxNumber: dataCampaignsWithMissingTaxNumber,
            }}
            isDownloadLoading={isIntrastatDownloadedFileRefetching}
            onDownloadClick={handleDownloadReport}
          />
        )}
      </>
    )
  }

  const canGoToNextStep = () => {
    return selectedPeriod !== null && selectedPeriod !== '' && !isIntrastatResultsError
  }

  const renderEnd = () => {
    return (
      <React.Fragment>
        <Typography color="text.primary">Intrastrat validation success for the period: {selectedPeriod}</Typography>
      </React.Fragment>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={`${step.label}`}>
                <StyledStepLabel>{step.label}</StyledStepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>
      <Grid size={12}>
        {!isLastStep() ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button variant="contained" size="small" color="secondary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            {activeStep !== ManageIntrastatSteps.validate && (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                disabled={!canGoToNextStep()}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button variant="contained" size="small" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
        <Box sx={{ pt: 2 }}>{renderStepContent(activeStep)}</Box>
      </Grid>
    </Grid>
  )
}
