import { Stack } from '@mui/material'

import { NoData } from '#components/common'
import { ProcessStatistic } from '#utils/global'

import ProcessesDurationGraph from './ProcessesDurationGraph'
import ProcessesMeanDuration from './ProcessesMeanDuration'

type ProcessesIndicatorsProps = {
  dataset: {
    statistics: ProcessStatistic[]
  }
}

export default function ProcessesIndicators(props: ProcessesIndicatorsProps) {
  const { dataset } = props

  return (
    <Stack direction="row" spacing={2} justifyContent={'center'}>
      {dataset.statistics.length > 0 ? (
        <>
          <ProcessesDurationGraph dataset={dataset.statistics} />
          <ProcessesMeanDuration dataset={dataset.statistics} />
        </>
      ) : (
        <NoData />
      )}
    </Stack>
  )
}
