import { Card, CardContent, CardHeader, Typography } from '@mui/material'

import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

import { PieChartRepartition, renderCustomizedLabel } from '#components/helpers/PieChartsHelper'
import { ExportStatusGroup, ExportType } from '#utils/constants'
import {
  DefaultPaletteColors,
  ItemExportsStatusesColor,
  ItemExportsStatusesForBusinessColor,
  ItemExportsTypesColor,
} from '#utils/theme'

type ExportsRepartitionProps = {
  statuses: PieChartRepartition[]
  types: PieChartRepartition[]
  isBusinessColor: boolean
}

export default function ExportsRepartition(props: ExportsRepartitionProps) {
  const { statuses, types, isBusinessColor } = props

  function getTypeLabelColor(label: string) {
    return ItemExportsTypesColor[label]?.color
  }

  function getStatusLabelColor(label: string) {
    return isBusinessColor
      ? ItemExportsStatusesForBusinessColor[label.slice(label.indexOf('-') + 1)]?.color
      : ItemExportsStatusesColor[label.slice(label.indexOf('-') + 1)]?.color
  }

  function getStatusFromLabel(label: string) {
    return label.slice(label.indexOf('-') + 1)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <Card>
          <CardHeader
            title={
              <Typography variant="body1">
                {Object.values(ExportType).includes(data.name) ? (
                  <span style={{ color: getTypeLabelColor(data.name) }}>Type: {data.name}</span>
                ) : (
                  <span style={{ color: getStatusLabelColor(getStatusFromLabel(data.name)) }}>
                    Status: {getStatusFromLabel(data.name)}
                  </span>
                )}
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

  let legend: Payload[] = [
    { value: ExportType.GR_INT.toString(), type: 'square', color: getTypeLabelColor(ExportType.GR_INT) },
    { value: ExportType.VM.toString(), type: 'square', color: getTypeLabelColor(ExportType.VM) },
  ]
  if (isBusinessColor) {
    legend = [
      { value: 'LOCKED', type: 'square', color: DefaultPaletteColors[2] },
      { value: ExportStatusGroup.WAITING, type: 'square', color: DefaultPaletteColors[3] },
      { value: 'IN', type: 'square', color: DefaultPaletteColors[1] },
      { value: 'OUT', type: 'square', color: DefaultPaletteColors[0] },
      ...legend,
    ]
  } else {
    legend = [
      { value: ExportStatusGroup.OK, type: 'square', color: DefaultPaletteColors[1] },
      { value: ExportStatusGroup.KO, type: 'square', color: DefaultPaletteColors[0] },
      { value: ExportStatusGroup.WAITING, type: 'square', color: DefaultPaletteColors[2] },
      { value: ExportStatusGroup.OTHER, type: 'square', color: DefaultPaletteColors[3] },
      ...legend,
    ]
  }

  return (
    <Card sx={{ p: 2, height: '390px', width: '364px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
          Exports {isBusinessColor ? '(SAP view)' : '(TECH view)'}
        </Typography>
        <PieChart width={300} height={270}>
          <Pie data={types} dataKey="value" cx="50%" cy="50%" outerRadius={75} label={renderCustomizedLabel} labelLine={false}>
            {types.map((m) => (
              <Cell key={`cell-${m.name}`} fill={getTypeLabelColor(m.name)} />
            ))}
          </Pie>
          <Pie data={statuses} dataKey="value" cx="50%" cy="50%" innerRadius={80} outerRadius={100} label>
            {statuses.map((m) => (
              <Cell key={`cell-${m.name}`} fill={getStatusLabelColor(getStatusFromLabel(m.name))} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
        </PieChart>
        <Legend wrapperStyle={{ position: 'relative' }} payload={legend} />
      </CardContent>
    </Card>
  )
}
