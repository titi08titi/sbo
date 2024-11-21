import { Card, CardContent, CardHeader, Typography } from '@mui/material'

import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

import { PieChartRepartition, renderCustomizedLabel } from '#components/helpers/PieChartsHelper'
import { FinancialStockPilesStatus } from '#utils/constants'
import { ItemFspAggregatedReasonsStatusColor } from '#utils/theme'

type FspStatusesRepartitionProps = {
  statuses: PieChartRepartition[]
}

export default function FspStatusesRepartition(props: FspStatusesRepartitionProps) {
  const { statuses } = props

  function getLabelColor(label: string) {
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
                <span style={{ color: getLabelColor(data.name) }}>Status: {data.name}</span>
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
          FSP statuses
        </Typography>
        <PieChart width={250} height={285}>
          <Pie data={statuses} dataKey="value" cx="50%" cy="50%" outerRadius={100} label={renderCustomizedLabel} labelLine={false}>
            {statuses.map((m) => (
              <Cell key={`cell-${m.name}`} fill={getLabelColor(m.name)} />
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
              color: getLabelColor(FinancialStockPilesStatus.PROCESSED),
            },
            { value: FinancialStockPilesStatus.BLOCKED, type: 'square', color: getLabelColor(FinancialStockPilesStatus.BLOCKED) },
          ]}
        />
      </CardContent>
    </Card>
  )
}
