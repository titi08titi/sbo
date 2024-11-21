import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { useRouter } from 'next/router'
import React from 'react'

import { MENU_MONITORING_ITEMS, MENU_ITEMS, MENU_USER_ITEMS } from '#utils/constants'
import { capitalizeFirstLetter } from '#utils/helper'

// Each individual "crumb" in the breadcrumbs list
function Crumb({ text, href, last = false }) {
  // The last crumb is rendered as normal text since we are already on the page
  if (last) {
    return (
      <Typography color="text.primary" variant="subtitle2">
        {capitalizeFirstLetter(text)}
      </Typography>
    )
  }

  // All other crumbs will be rendered as links that can be visited
  return (
    <Link underline="hover" color="text.primary" variant="subtitle2" href={href}>
      {capitalizeFirstLetter(text)}
    </Link>
  )
}

type BreadCrumbsProps = {
  className?: string
}

export default function BreadCrumbs(props: BreadCrumbsProps) {
  const { className } = props
  const router = useRouter()

  function findItemPath(children, href) {
    const path = []
    return (function search(children) {
      return children?.some((child) => {
        path.push({ title: child.title, href: child.href })

        if (child.href === href || search(child.children)) {
          return true
        }
        path.pop()
      })
    })(children)
      ? path
      : null
  }

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      const pathWithoutParameters = router.asPath.split('?')[0]
      const searchPath = pathWithoutParameters.endsWith('/') ? pathWithoutParameters.slice(0, -1) : pathWithoutParameters
      const itemPaths = findItemPath([...MENU_ITEMS, ...MENU_USER_ITEMS, ...MENU_MONITORING_ITEMS], searchPath)
      const crumblist =
        itemPaths?.map((item) => {
          return { href: item.href, text: item.title }
        }) ?? []
      return [{ href: '/', text: 'Home' }, ...crumblist]
    },
    [router.asPath]
  )

  return (
    <Breadcrumbs aria-label="breadcrumb" className={className}>
      {/*
            Iterate through the crumbs, and render each individually.
            We "mark" the last crumb to not have a link.
          */}
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={`breadcrumb-${idx}`} last={idx === breadcrumbs.length - 1} />
      ))}
    </Breadcrumbs>
  )
}
