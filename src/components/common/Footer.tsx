import IconVercel from '@/vercel.svg'
import { Box, Stack, Typography } from '@mui/material'

import Link from 'next/link'

import { SVG } from '#components/common'

export default function Footer() {
  return (
    <Box
      color="primary"
      component="footer"
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'secondary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Stack sx={{ margin: 'auto', textAlign: 'center' }}>
        <Typography variant="subtitle2">
          Powered by
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVG fill="currentColor" color="white" src={IconVercel} height={16} />
          </Link>
        </Typography>
        <Typography variant="caption">Copyright {new Date().getFullYear()} Veepee Inc.</Typography>
      </Stack>
    </Box>
  )
}
