import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import { ErrorInfo } from '#utils/global'

import ExpandableCard, { ExpandableCardProps } from './ExpandableCard'

export interface ExpandableErrorPanelProps extends ExpandableCardProps {
  errors: ErrorInfo[]
  message?: string
}

export default function ExpandableErrorPanel(props: ExpandableErrorPanelProps) {
  const { errors, title, message, className, open } = props

  return (
    <ExpandableCard open={open} title={title ? title : 'Error'} className={className}>
      {message && <Box>{message}</Box>}
      <List dense sx={{ width: '100%' }}>
        {errors.map((error) => (
          <ListItem key={`expandable-error-${error.line}`}>
            <ListItemIcon>
              <ErrorOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={`Line : ${error.line} - Cause : ${error.message}`} />
          </ListItem>
        ))}
      </List>
    </ExpandableCard>
  )
}
