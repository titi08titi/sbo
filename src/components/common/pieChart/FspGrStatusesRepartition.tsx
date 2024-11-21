import { Card, CardContent, CardHeader, Typography } from '@mui/material'

import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

import { PieChartRepartition, renderCustomizedLabel } from '#components/helpers/PieChartsHelper'
import { FinancialStockPilesStatus } from '#utils/constants'
import { ItemFspAggregatedReasonsStatusColor } from '#utils/theme'

type FspGrStatusesRepartitionProps = {
  grStatuses: PieChartRepartition[]
}

export default function FspGrStatusesRepartition(props: FspGrStatusesRepartitionProps) {
  const { grStatuses } = props

  function getGrStatusLabelColor(label: string) {
    return ItemFspAggregatedReasonsStatusColor[label]?.color
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <Card>
          <CardHeader
            title={
              <Typography variant="body1">
                <span style={{ color: getGrStatusLabelColor(data.name) }}>GR status: {data.name}</span>
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            {data.type.map((t) => {
              return (
                <Typography key={t.type} sx={{ fontSize: 16 }}>
                  {t.count}
                </Typography>
              )
            })}
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <Card sx={{ p: 2, height: '390px', width: '314px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          FSP GR statuses
        </Typography>
        <PieChart width={250} height={285}>
          <Pie data={grStatuses} dataKey="value" cx="50%" cy="50%" outerRadius={100} label={renderCustomizedLabel} labelLine={false}>
            {grStatuses.map((m) => (
              <Cell key={`cell-${m.name}`} fill={getGrStatusLabelColor(m.name)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
        </PieChart>
        <Legend
          wrapperStyle={{ position: 'relative' }}
          payload={[
            {
              value: FinancialStockPilesStatus.PROCESSED,
              type: 'square',
              color: getGrStatusLabelColor(FinancialStockPilesStatus.PROCESSED),
            },
            {
              value: FinancialStockPilesStatus.BLOCKED,
              type: 'square',
              color: getGrStatusLabelColor(FinancialStockPilesStatus.BLOCKED),
            },
          ]}
        />
      </CardContent>
    </Card>
  )
}
