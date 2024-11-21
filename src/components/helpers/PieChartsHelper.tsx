export type PieChartRepartition = {
  name: string
  value: number
  type?: {
    type: string
    count: number
  }[]
}

export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function compute(
  summary: any[],
  typeProperty: string,
  countProperty: string,
  ignoredEnum: string = null
): PieChartRepartition[] {
  const meanRepartition = summary.reduce((acc, curr) => {
    if (ignoredEnum === null || (curr[typeProperty] != null && curr[typeProperty] !== ignoredEnum)) {
      const key = curr[typeProperty]
      if (!acc[key]) {
        acc[key] = {
          type: [
            {
              type: curr[typeProperty],
              count: curr[countProperty],
            },
          ],
          value: curr[countProperty],
        }
      } else {
        if (acc[key].type.find((t) => t.type === curr[typeProperty])) {
          acc[key].type.find((t) => t.type === curr[typeProperty]).count += curr[countProperty]
        } else {
          acc[key].type.push({
            type: curr[typeProperty],
            count: curr[countProperty],
          })
        }
        acc[key].value += curr[countProperty]
      }
    }
    return acc
  }, {})

  const repartition = Object.keys(meanRepartition).map((key) => ({
    name: key.toString(),
    value: meanRepartition[key].value,
    type: meanRepartition[key].type,
  }))

  return repartition.sort((a, b) => (a.name > b.name ? 1 : -1))
}

export function computeWithAdditionalKey(
  summary: any[],
  prefixKeyProperty: string,
  typeProperty: string,
  countProperty: string,
  ignoredEnum: string = null
): PieChartRepartition[] {
  const meanRepartition = summary.reduce((acc, curr) => {
    if (curr[typeProperty] != null && curr[typeProperty] !== ignoredEnum) {
      if (ignoredEnum === null || (curr[typeProperty] != null && curr[typeProperty] !== ignoredEnum)) {
        const key = curr[prefixKeyProperty] + '-' + curr[typeProperty]
        if (!acc[key]) {
          acc[key] = {
            type: [
              {
                type: curr[typeProperty],
                count: curr[countProperty],
              },
            ],
            value: curr[countProperty],
          }
        } else {
          if (acc[key].type.find((t) => t.type === curr[typeProperty])) {
            acc[key].type.find((t) => t.type === curr[typeProperty]).count += curr[countProperty]
          } else {
            acc[key].type.push({
              type: curr[typeProperty],
              count: curr[countProperty],
            })
          }
          acc[key].value += curr[countProperty]
        }
      }
    }
    return acc
  }, {})

  const repartition = Object.keys(meanRepartition).map((key) => ({
    name: key.toString(),
    value: meanRepartition[key].value,
    type: meanRepartition[key].type,
  }))

  return repartition.sort((a, b) => (a.name > b.name ? 1 : -1))
}
