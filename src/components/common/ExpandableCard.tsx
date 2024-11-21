import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Card, CardHeader, IconButton, Collapse, CardContent, Container, styled } from '@mui/material'

import { useEffect, useState } from 'react'

export interface ExpandableCardProps {
  className?: string
  title: string
  children?: React.ReactNode
  open?: boolean
}

const CCardHeader = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.common.white,
  padding: '0.5rem',
  cursor: 'pointer',
}))

export default function ExpandableCard({ title, open, children, className }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <Card square className={className}>
      <CCardHeader
        onClick={() => setIsOpen(!isOpen)}
        title={title}
        titleTypographyProps={{ variant: 'subtitle2' }}
        action={
          <IconButton onClick={() => setIsOpen(!isOpen)} aria-label="expand" size="small">
            {isOpen ? <KeyboardArrowUpIcon sx={{ color: 'white' }} /> : <KeyboardArrowDownIcon sx={{ color: 'white' }} />}
          </IconButton>
        }
      ></CCardHeader>
      <div>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <CardContent>
            <Container maxWidth={false} disableGutters>
              {children}
            </Container>
          </CardContent>
        </Collapse>
      </div>
    </Card>
  )
}
