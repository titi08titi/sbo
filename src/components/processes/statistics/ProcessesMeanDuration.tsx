import { Card, CardContent, Typography } from '@mui/material'

import moment from 'moment'
import { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'

import { renderCustomizedLabel } from '#components/helpers/PieChartsHelper'
import { ProcessStatistic } from '#utils/global'
import { PaletteColors } from '#utils/theme'

type Props = {
  dataset: ProcessStatistic[]
}

type ProcessesMeanDuration = {
  name: string
  value: number
}

export default function ProcessesMeanDuration({ dataset }: Props) {
  const [processesMeanDuration, setProcessesMeanDuration] = useState<ProcessesMeanDuration[]>([])

  useEffect(() => {
    return setProcessesMeanDuration(computeMeanProcessTime(dataset))
  }, [dataset])

  function computeMeanProcessTime(data: ProcessStatistic[]) {
    const meanProcessTime = dataset.reduce(
      (acc, curr) => {
        acc.waitDuration += moment.duration(curr.waitDuration).asMinutes()
        acc.importDuration += moment.duration(curr.importDuration).asMinutes()
        acc.computationDuration += moment.duration(curr.computationDuration).asMinutes()
        acc.exportDuration += moment.duration(curr.exportDuration).asMinutes()
        return acc
      },
      {
        waitDuration: 0,
        importDuration: 0,
        computationDuration: 0,
        exportDuration: 0,
      }
    )

    return [
      {
        name: 'wait',
        value: Math.round(meanProcessTime.waitDuration / data.length),
      },
      {
        name: 'import',
        value: Math.round(meanProcessTime.importDuration / data.length),
      },
      {
        name: 'computation',
        value: Math.round(meanProcessTime.computationDuration / data.length),
      },
      {
        name: 'export',
        value: Math.round(meanProcessTime.exportDuration / data.length),
      },
    ]
  }

  return (
    <Card sx={{ p: 2, m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          SAM Mean process duration
        </Typography>
        <PieChart
          margin={{
            top: 15,
          }}
          width={300}
          height={250}
        >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={processesMeanDuration}
            labelLine={false}
            label={renderCustomizedLabel}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#ec008c"
          >
            {processesMeanDuration.map((process, index) => (
              <Cell key={`cell-${process.name}`} fill={PaletteColors[index % PaletteColors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => {
              return `${value} min`
            }}
          />
          <Legend
            wrapperStyle={{ position: 'relative' }}
            payload={[
              { value: 'Wait', type: 'square', color: PaletteColors[0] },
              { value: 'Import', type: 'square', color: PaletteColors[1] },
              { value: 'Computation', type: 'square', color: PaletteColors[2] },
              { value: 'Export', type: 'square', color: PaletteColors[3] },
            ]}
          />
        </PieChart>
      </CardContent>
    </Card>
  )
}
