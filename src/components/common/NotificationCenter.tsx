import CheckIcon from '@mui/icons-material/Check'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import WarningIcon from '@mui/icons-material/Warning'
import {
  AlertColor,
  Badge,
  Box,
  IconButton,
  Popper,
  Fade,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ClickAwayListener,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import React, { useState } from 'react'

import { useSharedNotificationCenter } from '#components/context/notificationsContext'

export default function NotificationCenter() {
  const { notifications, clear, markAllAsRead, markAsRead, unreadCount } = useSharedNotificationCenter()
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()

  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }

  const toggleFilter = () => {
    setShowUnreadOnly(!showUnreadOnly)
  }

  function getNotificationIcon(type: string) {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="secondary" />
      case 'info':
        return <InfoIcon color="secondary" />
      case 'warning':
        return <WarningIcon color="secondary" />
      case 'error':
        return <ErrorIcon color="secondary" />
      default:
        return <InfoIcon color="secondary" />
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box>
        <IconButton size="small" color="inherit" onClick={toggleNotificationCenter}>
          <Badge badgeContent={unreadCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popper sx={{ paddingTop: 1 }} open={isOpen} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box>
                <Box
                  sx={{
                    background: theme.palette.secondary.main,
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <NotificationsActiveIcon sx={{ color: 'white', marginRight: theme.spacing(1) }} />
                  <Typography variant="body1" color="white" sx={{ flexGrow: 1 }}>
                    Notification center
                  </Typography>
                  <IconButton sx={{ color: 'white' }} onClick={() => setIsOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Stack
                  sx={{
                    height: '400px',
                    width: 'min(60ch, 100ch)',
                    background: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],
                    overflowY: 'auto',
                    justifyContent: !notifications.length || (showUnreadOnly && unreadCount === 0) ? 'center' : 'normal',
                    alignItems: !notifications.length || (showUnreadOnly && unreadCount === 0) ? 'center' : 'normal',
                  }}
                >
                  {(!notifications.length || (unreadCount === 0 && showUnreadOnly)) && (
                    <Typography variant="body1">No notifications</Typography>
                  )}
                  {notifications.length > 0 && (
                    <List dense>
                      {(showUnreadOnly ? notifications.filter((v) => !v.read) : notifications).map((notification) => {
                        return (
                          <ListItem key={notification.id} divider>
                            <ListItemIcon sx={{ minWidth: 0 }}>{getNotificationIcon(notification.type as AlertColor)}</ListItemIcon>
                            <Box sx={{ flexGrow: 1, alignContent: 'flex-start', paddingLeft: 1 }}>
                              {notification.content as React.ReactNode}
                            </Box>
                            <ListItemIcon>
                              {notification.read ? (
                                <IconButton edge="end" color="secondary" aria-label="notification read" component="span">
                                  <CheckIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  edge="end"
                                  color="secondary"
                                  aria-label="notification unread"
                                  component="span"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <MarkChatReadIcon />
                                </IconButton>
                              )}
                            </ListItemIcon>
                          </ListItem>
                        )
                      })}
                    </List>
                  )}
                </Stack>
                <Box
                  sx={{
                    background: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
                    padding: theme.spacing(1),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      sx={{ marginLeft: 1 }}
                      control={<Switch color="secondary" onChange={toggleFilter} checked={showUnreadOnly} />}
                      label="Show unread only"
                    />
                  </FormGroup>
                  <Button variant="contained" size="small" color="secondary" onClick={clear}>
                    Clear All
                  </Button>
                  <Button variant="outlined" size="small" color="secondary" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
