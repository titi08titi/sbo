import { Box } from '@mui/material'

import { DynamicDataTable } from '#components/common'
import { IColumnDefinition } from '#components/common/datatable/DynamicDataTable'
import { SynthesisIndicatorModel } from '#utils/global'

type SynthesisIndicatorsTableProps = {
  dataSet: SynthesisIndicatorModel[]
}

export default function SynthesisIndicatorsTable(props: SynthesisIndicatorsTableProps) {
  const { dataSet } = props
  const rows =
    dataSet != undefined
      ? [
          dataSet.reduce((acc, current) => {
            acc[current.indicators] = Number(current.value)
            return acc
          }, {} as { [key: string]: number | null }),
        ]
      : []

  const columns: IColumnDefinition[] = dataSet.map((item) => ({
    field: item.indicators,
    headerName: item.indicators,
    valueFormatter: (params) => {
      if (params.value == null) {
        return ''
      }
      return `${params.value.toLocaleString()} €`
    },
  }))

  return (
    <Box style={{ height: 'auto' }}>
      <DynamicDataTable columns={columns} rows={rows} alignRight={true} numberOfColumns={1} />
    </Box>
  )
}
