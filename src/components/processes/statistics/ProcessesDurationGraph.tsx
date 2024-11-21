import { Card, CardContent, CardHeader, Typography } from '@mui/material'

import moment from 'moment'
import { CartesianGrid, XAxis, YAxis, Legend, Bar, BarChart, Tooltip, Brush } from 'recharts'

import { ProcessStatistic } from '#utils/global'
import { PaletteColors } from '#utils/theme'

type ProcessesDurationGraphProps = {
  dataset: ProcessStatistic[]
}

export default function ProcessesDurationGraph({ dataset }: ProcessesDurationGraphProps) {
  const data = dataset
    .sort((d1, d2) => d1.eventId - d2.eventId)
    .map((data) => {
      return {
        name: moment(data.simEventDate).format('DD-MM'),
        waitDuration: moment.duration(data.waitDuration).asMinutes().toFixed(2),
        importDuration: moment.duration(data.importDuration).asMinutes().toFixed(2),
        computationDuration: moment.duration(data.computationDuration).asMinutes().toFixed(2),
        exportDuration: moment.duration(data.exportDuration).asMinutes().toFixed(2),
      }
    })

  const labelColor = [
    { value: 'wait', color: PaletteColors[0] },
    { value: 'import', color: PaletteColors[1] },
    { value: 'computation', color: PaletteColors[2] },
    { value: 'export', color: PaletteColors[3] },
  ]

  function getLabelColor(label: string) {
    return labelColor.find((l) => l.value === label)?.color
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card>
          <CardHeader title={<Typography variant="body1">{label}</Typography>} sx={{ pb: 0 }} />
          <CardContent>
            {payload.map((p) => {
              const dataKey = p.dataKey.toString().replace(/Duration/g, '')
              return (
                <Typography key={dataKey} sx={{ fontSize: 16 }}>
                  <span style={{ color: getLabelColor(dataKey) }}>{dataKey}</span> : {p.value} min
                </Typography>
              )
            })}
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          SAM process duration
        </Typography>
        <BarChart
          width={650}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="min" />
          <Legend
            payload={[
              { value: 'Wait', type: 'square', color: PaletteColors[0] },
              { value: 'Import', type: 'square', color: PaletteColors[1] },
              { value: 'Computation', type: 'square', color: PaletteColors[2] },
              { value: 'Export', type: 'square', color: PaletteColors[3] },
            ]}
          />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Bar dataKey="waitDuration" stackId="1" fill={PaletteColors[0]} />
          <Bar dataKey="importDuration" stackId="1" fill={PaletteColors[1]} />
          <Bar dataKey="computationDuration" stackId="1" fill={PaletteColors[2]} />
          <Bar dataKey="exportDuration" stackId="1" fill={PaletteColors[3]} />
          <Brush dataKey="name" height={30} />
        </BarChart>
      </CardContent>
    </Card>
  )
}
