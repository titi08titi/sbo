import EngineeringIcon from '@mui/icons-material/Engineering'
import HotelIcon from '@mui/icons-material/Hotel'
import HubIcon from '@mui/icons-material/Hub'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Card } from '@mui/material'
import Typography from '@mui/material/Typography'

import moment from 'moment'
import * as React from 'react'

import { DefaultDateFormat, DefaultTimeFormat } from '#utils/constants'
import { ProcessInfoSummary } from '#utils/global'

interface ProcessTimelineProps {
  processInfoSummary: ProcessInfoSummary
}

type ProcessTimelineInfo = {
  startTime?: string
  importTime?: string
  processTime?: string
  exportTime?: string
  sleepTime?: string
  processStepInError: TimelineStep[]
}

enum TimelineStep {
  START = 0,
  IMPORT = 1,
  PROCESS = 2,
  EXPORT = 3,
  SLEEP = 4,
}

export default function ProcessTimeline(props: ProcessTimelineProps) {
  const { processInfoSummary } = props
  const lastStepName = 'SendDataWarehouseRefresh'
  const processTimelineInfo = getProcessTimelineInfo()

  function getProcessTimelineInfo(): ProcessTimelineInfo {
    const processTimelineInfo: ProcessTimelineInfo = {
      processStepInError: [],
    }

    if (processInfoSummary.lastProcessesInfo.length === 0) {
      return processTimelineInfo
    }

    const processSortByDate = processInfoSummary.lastProcessesInfo.sort((a, b) => (a?.modificationDate > b?.modificationDate ? 1 : -1))
    if (!processSortByDate.some((process) => moment(process.modificationDate).isSame(new Date(), 'day'))) {
      return processTimelineInfo
    }

    const processLastDate = processSortByDate[processSortByDate.length - 1]
    const processSameDate = processSortByDate.filter((process) =>
      moment(processLastDate.modificationDate).isSame(process.modificationDate, 'day')
    )

    const firstProcess = processSameDate[0]
    const lastProcess = processSameDate.find((p) => p.processName === lastStepName)

    const firstProcessImport = processSameDate.find((process) => process.processName.startsWith('Import'))
    const firstProcessWork = processSameDate.find((process) => process.processName.startsWith('Process'))
    const firstProcessExport = processSameDate.find((process) => process.processName.startsWith('Send'))

    if (firstProcess) {
      processTimelineInfo.startTime = moment(firstProcess.modificationDate).format(DefaultDateFormat)
      processTimelineInfo.processStepInError.push(firstProcess.hasFailed ? TimelineStep.START : null)
    }
    if (firstProcessImport) {
      processTimelineInfo.importTime = moment(firstProcessImport.modificationDate).format(DefaultTimeFormat)
      processTimelineInfo.processStepInError.push(processInfoSummary.processesInError.includes('Import') ? TimelineStep.IMPORT : null)
    }
    if (firstProcessWork) {
      processTimelineInfo.processTime = moment(firstProcessWork.modificationDate).format(DefaultTimeFormat)
      processTimelineInfo.processStepInError.push(
        processInfoSummary.processesInError.includes('Process') ? TimelineStep.PROCESS : null
      )
    }
    if (firstProcessExport) {
      processTimelineInfo.exportTime = moment(firstProcessExport.modificationDate).format(DefaultTimeFormat)
      processTimelineInfo.processStepInError.push(processInfoSummary.processesInError.includes('Send') ? TimelineStep.EXPORT : null)
    }
    if (lastProcess && lastProcess.processName === lastStepName) {
      processTimelineInfo.sleepTime = moment(lastProcess.modificationDate).format(DefaultTimeFormat)
      processTimelineInfo.processStepInError.push(lastProcess.hasFailed ? TimelineStep.SLEEP : null)
    }

    return processTimelineInfo
  }

  function isCurrentActiveTimelineStep(step: TimelineStep): boolean {
    return getCurrentActiveTimelineStep() === step
  }

  function getCurrentActiveTimelineStep(): number | null {
    const { startTime, importTime, processTime, exportTime, sleepTime } = processTimelineInfo

    if (startTime && !importTime && !processTime && !exportTime && !sleepTime) {
      return TimelineStep.START
    }
    if (startTime && importTime && !processTime && !exportTime && !sleepTime) {
      return TimelineStep.IMPORT
    }
    if (startTime && importTime && processTime && !exportTime && !sleepTime) {
      return TimelineStep.PROCESS
    }
    if (startTime && importTime && processTime && exportTime && !sleepTime) {
      return TimelineStep.EXPORT
    }
    if (startTime && importTime && processTime && exportTime && sleepTime) {
      return TimelineStep.SLEEP
    }
    return TimelineStep.START
  }

  function getTimelineStepColor(timelineStep: TimelineStep): 'inherit' | 'secondary' | 'error' {
    const { processStepInError } = processTimelineInfo
    if (processStepInError.includes(timelineStep)) {
      return 'error'
    }
    if (isCurrentActiveTimelineStep(timelineStep)) {
      return 'secondary'
    }
    return 'inherit'
  }

  const { startTime, importTime, processTime, exportTime, sleepTime } = getProcessTimelineInfo()
  return (
    <Card>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
            {startTime || 'Not started'}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color={getTimelineStepColor(TimelineStep.START)}>
              <PlayCircleOutlineIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Start
            </Typography>
            <Typography>Wake up SAM !</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
            {importTime || 'Not started'}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={getTimelineStepColor(TimelineStep.IMPORT)}>
              <LabelImportantIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Import
            </Typography>
            <Typography>Prepare your bench</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
            {processTime || 'Not started'}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={getTimelineStepColor(TimelineStep.PROCESS)}>
              <EngineeringIcon />
            </TimelineDot>
            <TimelineConnector color="primary" />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Process
            </Typography>
            <Typography>Because is good for health !</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
            {exportTime || 'Not started'}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={getTimelineStepColor(TimelineStep.EXPORT)}>
              <HubIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Export
            </Typography>
            <Typography>Together we go further !</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
            {sleepTime || 'Not started'}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={getTimelineStepColor(TimelineStep.SLEEP)}>
              <HotelIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Sleep
            </Typography>
            <Typography>Because you need rest !</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Card>
  )
}
