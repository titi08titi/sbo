import DataUsageIcon from '@mui/icons-material/DataUsage'
import FeedIcon from '@mui/icons-material/Feed'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

import moment from 'moment'
import { useEffect, useState } from 'react'

import { NoData } from '#components/common'
import { ProcessStatistic } from '#utils/global'
import { PaletteColors } from '#utils/theme'

type ProcessesTrendProps = {
  dataset: ProcessStatistic[]
}

type ProcessesTrend = {
  name: string
  value: number
  icon?: JSX.Element
  color?: string
}

export default function ProcessesTrend({ dataset }: ProcessesTrendProps) {
  const [processesTrend, setProcessesTrend] = useState<ProcessesTrend[]>([])

  useEffect(() => {
    return setProcessesTrend(computeTrend(dataset))
  }, [dataset])

  function calculateTrendPourcentage(currentDurationValue: string, previousDurationValue: string) {
    const currentDuration = moment.duration(currentDurationValue ?? 0).asMinutes()
    const previousDuration = moment.duration(previousDurationValue ?? 0).asMinutes()
    if (currentDuration === 0 || previousDuration === 0) return 0
    return Math.round(((currentDuration - previousDuration) / previousDuration) * 100)
  }

  function computeTrend(data: ProcessStatistic[]) {
    const processes = data.slice(-2)

    if (processes.length < 2) {
      return []
    }

    const waitDurationTrendPourcentage = calculateTrendPourcentage(processes[1].waitDuration, processes[0].waitDuration)
    const importDurationTrendPourcentage = calculateTrendPourcentage(processes[1].importDuration, processes[0].importDuration)
    const computationDurationTrendPourcentage = calculateTrendPourcentage(
      processes[1].computationDuration,
      processes[0].computationDuration
    )
    const exportDurationTrendPourcentage = calculateTrendPourcentage(processes[1].exportDuration, processes[0].exportDuration)

    return [
      {
        name: 'wait',
        value: waitDurationTrendPourcentage,
        icon: <HourglassEmptyIcon />,
        color: PaletteColors[0],
      },
      {
        name: 'import',
        value: importDurationTrendPourcentage,
        icon: <ImportExportIcon />,
        color: PaletteColors[1],
      },
      {
        name: 'computation',
        value: computationDurationTrendPourcentage,
        icon: <DataUsageIcon />,
        color: PaletteColors[2],
      },
      {
        name: 'export',
        value: exportDurationTrendPourcentage,
        icon: <FeedIcon />,
        color: PaletteColors[3],
      },
    ]
  }

  function getTrendColor(value: number) {
    if (value < 0) {
      return 'success.main'
    }
    if (value > 0) {
      return 'error.main'
    }
    return 'text.primary'
  }

  function renderTrending(processValue: number) {
    if (processValue === 0) {
      return <TrendingFlatIcon />
    }
    return processValue > 0 ? <TrendingDownIcon /> : <TrendingUpIcon />
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          SAM process daily trend
        </Typography>
        <Box sx={{ paddingTop: 2 }}>
          {processesTrend.length === 0 && <NoData />}
          {processesTrend.length > 0 &&
            processesTrend.map((process) => {
              return (
                <Stack direction="row" key={`processTrend-${process.name}`} spacing={1} margin={2}>
                  {process.icon}
                  <Typography variant="body1" component="div" color={process.color}>
                    {process.name}:
                  </Typography>
                  {renderTrending(process.value)}
                  <Typography variant="body1" component="div" color={getTrendColor(process.value)}>
                    {Math.abs(process.value)}%
                  </Typography>
                </Stack>
              )
            })}
        </Box>
      </CardContent>
    </Card>
  )
}
