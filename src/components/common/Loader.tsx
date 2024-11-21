import { CircularProgress, Container } from '@mui/material'

export default function Loader() {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color="secondary" />
    </Container>
  )
}
