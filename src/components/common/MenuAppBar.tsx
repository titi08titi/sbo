import IconRobot from '@/robot.svg'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BadgeIcon from '@mui/icons-material/Badge'
import CalculateIcon from '@mui/icons-material/Calculate'
import CampaignIcon from '@mui/icons-material/Campaign'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import DownloadIcon from '@mui/icons-material/Download'
import HeartIcon from '@mui/icons-material/Favorite'
import FeedIcon from '@mui/icons-material/Feed'
import HandshakeIcon from '@mui/icons-material/Handshake'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import HomeIcon from '@mui/icons-material/Home'
import HubIcon from '@mui/icons-material/Hub'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import InfoIcon from '@mui/icons-material/Info'
import InventoryIcon from '@mui/icons-material/Inventory'
import LinkIcon from '@mui/icons-material/Link'
import TagIcon from '@mui/icons-material/LocalOffer'
import LockIcon from '@mui/icons-material/Lock'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import MobiledataOffIcon from '@mui/icons-material/MobiledataOff'
import PreviewIcon from '@mui/icons-material/Preview'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import RecyclingIcon from '@mui/icons-material/Recycling'
import SavingsIcon from '@mui/icons-material/Savings'
import SchemaIcon from '@mui/icons-material/Schema'
import WidgetsIcon from '@mui/icons-material/Widgets'
import { Avatar, Chip, Switch } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SvgIcon from '@mui/material/SvgIcon'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import * as React from 'react'
import { useEffect } from 'react'

import { hasPageAccess } from '#core/authorizations'
import useAuth from '#hooks/useAuth'
import useLocalStorage from '#hooks/useLocalStorage'
import { isGlobalParameterEnabled, updateGlobalParameter } from '#modules/globalParameters/queries'
import { useUser } from '#modules/profile/queries'
import { GlobalParameter, MENU_MONITORING_ITEMS, MENU_ITEMS, MENU_USER_ITEMS, Role, SITE_NAME } from '#utils/constants'
import { getEnvironment } from '#utils/helper'
import { LeftDrawerHeader, RightDrawerHeader, EnvironmentColor } from '#utils/theme'

import NotificationCenter from './NotificationCenter'
import ThemeSwitcher from './ThemeSwitcher'
import { DialogElement } from './dialogs/BootstrapDialog'
import ConfirmDialog from './dialogs/ConfirmDialog'

const drawerWidth = 270
const iconFontSize = 25

const getMenuIcons = (iconName: string) => {
  switch (iconName) {
    case 'Account':
      return <AccountCircleIcon />
    case 'Accruals':
      return <CalculateIcon />
    case 'Campaigns':
      return <CampaignIcon />
    case 'CampaignsDetails':
    case 'ExportDetails':
    case 'FinancialStockPileDetails':
    case 'FspAggregatedReasons':
    case 'ItemsDetails':
    case 'ProcessesDetails':
    case 'PurchaseOrderDetails':
      return <FeedIcon />
    case 'Elastic':
      return <HubIcon />
    case 'Exports':
      return <ImportExportIcon />
    case 'ExternalLinks':
      return <LinkIcon />
    case 'FinancialStockPiles':
      return <InventoryIcon />
    case 'FspFlow':
      return <SchemaIcon />
    case 'GoodsReceipts':
      return <ReceiptLongIcon />
    case 'Home':
      return <HomeIcon />
    case 'Items':
      return <WidgetsIcon />
    case 'Info':
      return <InfoIcon />
    case 'JuneGapOverloads':
      return <MobiledataOffIcon />
    case 'Lock':
      return <LockIcon />
    case 'ManageExportsGoodsReceipts':
    case 'ManageExternalGoodsReceipts':
    case 'ManageIntrastat':
      return <ManageHistoryIcon />
    case 'PoVatCorrections':
      return <TagIcon />
    case 'Profile':
      return <AssignmentIndIcon />
    case 'Processes':
    case 'ReportsIntrastat':
    case 'ReportsSynthesis':
      return <DataUsageIcon />
    case 'PurchaseOrders':
      return <HandshakeIcon />
    case 'Reports':
      return <AssessmentIcon />
    case 'ReportsCogs':
      return <SavingsIcon />
    case 'ReportsPlasticTax':
      return <RecyclingIcon />
    case 'RightsMatrix':
      return <BadgeIcon />
    case 'Support':
      return <AdminPanelSettingsIcon />
    case 'SupportImports':
      return <DownloadIcon />
    case 'UserActionLogs':
      return <PreviewIcon />
    default:
      return <AddIcon />
  }
}

const StyledMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    ':hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.common.white,
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
    },
  },
  ':hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '& .MuiListItemIcon-root': {
      color: theme.palette.common.white,
    },
  },
}))

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}))

type Props = { children: React.ReactNode }

export default function MenuAppBar({ children }: Props) {
  const theme = useTheme()
  const menuDrawerOpenKey = 'drawerOpen'
  const [open, setOpen] = useLocalStorage(menuDrawerOpenKey, false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { isAuthenticated, userRoles } = useAuth()
  const [roles, setRoles] = React.useState<string[]>([Role.visitor])
  const router = useRouter()
  const { data: user } = useUser()

  useEffect(() => {
    MENU_ITEMS.forEach((menuItem) => {
      if (menuItem.children !== undefined) {
        menuItem.expanded = menuItem.children.some((child) => {
          return isSelected(child.href)
        })
      }
    })
  }, [router.asPath, open])

  useEffect(() => {
    if (userRoles.length !== 0) {
      setRoles(userRoles)
    }
  }, [userRoles])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [adminDrawerState, setAdminDrawerState] = React.useState<boolean>(false)
  const [exportsEnabled, setExportsEnabled] = React.useState<boolean>(true)
  const [samEnabled, setSamEnabled] = React.useState<boolean>(true)
  const [globalParameter, setGlobalParameter] = React.useState<GlobalParameter>(null)
  const dialogRef = React.useRef<DialogElement>(null)
  const [confirmMessage, setConfirmMessage] = React.useState<string>(null)
  useEffect(() => {
    const fetchData = async () => {
      const isSamEnabled = await isGlobalParameterEnabled(GlobalParameter.SamEnabled)
      setSamEnabled(isSamEnabled ? isSamEnabled : null)
      const isExportsEnabled = await isGlobalParameterEnabled(GlobalParameter.ExportsEnabled)
      setExportsEnabled(isExportsEnabled ? isExportsEnabled : null)
    }
    fetchData()
  }, [user])

  function isAdmin() {
    return roles.indexOf(Role.admin) >= 0
  }

  const handleAdminDrawer = (open: boolean) => () => {
    setAdminDrawerState(open)
  }

  const handleSamEnabled = () => {
    if (isAdmin()) {
      setGlobalParameter(GlobalParameter.SamEnabled)
      setConfirmMessage(`Do you confirm the ${samEnabled ? 'deactivation' : 'activation'} of SAM?`)
      dialogRef.current?.open()
    }
  }

  const handleExportsEnabled = () => {
    if (isAdmin()) {
      setGlobalParameter(GlobalParameter.ExportsEnabled)
      setConfirmMessage(`Do you confirm the ${exportsEnabled ? 'deactivation' : 'activation'} of exports?`)
      dialogRef.current?.open()
    }
  }

  const handleGlobalParameterUpdate = async () => {
    let isUpdated = false
    switch (globalParameter) {
      case GlobalParameter.ExportsEnabled:
        isUpdated = await updateGlobalParameter(globalParameter, !exportsEnabled)
        break
      case GlobalParameter.SamEnabled:
        isUpdated = await updateGlobalParameter(globalParameter, !samEnabled)
        break
    }
    setGlobalParameter(null)
    setConfirmMessage(null)
    if (isUpdated) {
      switch (globalParameter) {
        case GlobalParameter.ExportsEnabled:
          setExportsEnabled(!exportsEnabled)
          break
        case GlobalParameter.SamEnabled:
          setSamEnabled(!samEnabled)
          break
      }
    }
  }

  const paths = React.useMemo(
    function getPaths() {
      const asPathWithoutQuery = router.asPath.split('?')[0]
      const asPathNestedRoutes = asPathWithoutQuery.split('/').filter((v) => v.length > 0)

      const paths = asPathNestedRoutes.map((subpath, idx) => {
        const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
        return { href, text: subpath }
      })

      if (paths.length === 0) {
        paths.push({ href: '/', text: 'Home' })
      }

      return paths
    },
    [router.asPath]
  )

  function isSelected(href: string) {
    const pathWithoutQuery = href.split('?')[0]
    return paths.findIndex((p) => p.href === pathWithoutQuery) > -1
  }

  function hasRights(menuItem: any, roles: string[]) {
    let hasPageRights = false
    if (!menuItem.href && menuItem.children !== undefined) {
      hasPageRights = menuItem.children.some((child) => {
        return hasRights(child, roles)
      })
    }
    if (!menuItem.href && !menuItem.child) {
      return hasPageRights
    }
    return hasPageAccess(menuItem.href, roles)
  }

  function getAuthorizedMenuItems(menuItems) {
    return menuItems.filter((menuItem) => hasRights(menuItem, roles))
  }

  function renderMenuItem(menuItem): JSX.Element {
    if (menuItem.children !== undefined) {
      return (
        <div key={menuItem.title}>
          <StyledLink href={''}>
            <ListItem dense onClick={() => (menuItem.expanded = !menuItem.expanded)}>
              <ListItemIcon>{getMenuIcons(menuItem.icon)}</ListItemIcon>
              <ListItemText primary={menuItem.title} />
              {menuItem.expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </StyledLink>
          <Collapse in={menuItem.expanded}>{menuItem.children.map((child) => renderMenuItem(child))}</Collapse>
        </div>
      )
    } else {
      if (!hasRights(menuItem, roles)) {
        return
      }

      return (
        <StyledLink href={menuItem.href} key={menuItem.title} passHref>
          <ListItem key={menuItem.title} disablePadding dense sx={{ ...(menuItem.child && { paddingLeft: theme.spacing(2) }) }}>
            <StyledListItemButton selected={isSelected(menuItem.href)}>
              <ListItemIcon sx={{ color: isSelected(menuItem.href) ? 'white' : null }}>{getMenuIcons(menuItem.icon)}</ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </StyledListItemButton>
          </ListItem>
        </StyledLink>
      )
    }
  }

  function renderHeart() {
    if (samEnabled && exportsEnabled) {
      return <HeartIcon color="success" />
    }
    return samEnabled || exportsEnabled ? <HeartIcon color="warning" /> : <HeartBrokenIcon color="error" />
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={open}>
        <Toolbar variant="dense">
          <IconButton color="inherit" size="large" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
            <SvgIcon component={IconRobot} sx={{ fontSize: iconFontSize }} inheritViewBox />
          </IconButton>
          <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1 }}>
            {SITE_NAME}
          </Typography>
          <Chip
            label={getEnvironment(window.location.hostname)}
            // @ts-ignore override color value
            color={EnvironmentColor[getEnvironment(window.location.hostname)].color}
          />
          <IconButton onClick={handleAdminDrawer(true)} aria-label="admin menu" aria-controls="admin-menu-appbar" aria-haspopup="true">
            {renderHeart()}
          </IconButton>
          <NotificationCenter />
          <ThemeSwitcher />
          {isAuthenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user?.profile?.image_32} sx={{ width: iconFontSize, height: iconFontSize }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {MENU_USER_ITEMS.map((menuItem) => (
                  <MenuItem
                    sx={{
                      '&:hover': { backgroundColor: theme.palette.secondary.main, color: 'white' },
                      color: theme.palette.mode === 'dark' ? 'white' : 'black',
                      padding: 0,
                    }}
                    key={menuItem.title}
                    onClick={handleClose}
                    dense
                  >
                    <StyledLink
                      sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                      href={menuItem.href}
                      key={menuItem.title}
                      passHref
                    >
                      {menuItem.title}
                    </StyledLink>
                  </MenuItem>
                ))}
                <MenuItem
                  sx={{
                    '&:hover': { backgroundColor: theme.palette.secondary.main, color: 'white' },
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    padding: 0,
                  }}
                  onClick={() => signOut()}
                  dense
                >
                  <StyledLink
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      paddingLeft: 1,
                      paddingRight: 1,
                    }}
                    href={'/'}
                    key={'Logout'}
                    passHref
                  >
                    Logout
                  </StyledLink>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <LeftDrawerHeader>
          <IconButton size="medium" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </LeftDrawerHeader>
        <Divider />
        <List>{getAuthorizedMenuItems(MENU_ITEMS).map((menuItem) => renderMenuItem(menuItem))}</List>
        <Divider />
        <List>{getAuthorizedMenuItems(MENU_USER_ITEMS).map((menuItem) => renderMenuItem(menuItem))}</List>
        <Divider />
        <List>{getAuthorizedMenuItems(MENU_MONITORING_ITEMS).map((menuItem) => renderMenuItem(menuItem))}</List>
      </Drawer>
      <StyledMain open={open}>
        <LeftDrawerHeader />
        {children}
      </StyledMain>
      <ConfirmDialog ref={dialogRef} title="Confirm" fullWidth maxWidth="md" onConfirm={handleGlobalParameterUpdate}>
        {confirmMessage}
      </ConfirmDialog>
      <Drawer anchor="right" open={adminDrawerState}>
        <RightDrawerHeader>
          <IconButton onClick={handleAdminDrawer(false)}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </RightDrawerHeader>
        <Divider />
        <List>
          <ListItem key="switch-sam-enabled" disablePadding>
            <ListItemButton>
              <Switch color="success" checked={samEnabled} onChange={handleSamEnabled} />
              <ListItemText primary="SAM" />
            </ListItemButton>
          </ListItem>
          <ListItem key="switch-exports-enabled" disablePadding>
            <ListItemButton>
              <Switch color="success" checked={exportsEnabled} onChange={handleExportsEnabled} />
              <ListItemText primary="Exports" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
