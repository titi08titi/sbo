import RobotImg from '@/robot-error.png'
import { Stack, Typography } from '@mui/material'

import Image from 'next/image'

export default function UnexpectedError() {
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Typography variant="body1">Something went wrong</Typography>
      <Image src={RobotImg} alt="500 - Unexpected Error" width={200} height={200} />
    </Stack>
  )
}
