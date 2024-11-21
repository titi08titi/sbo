import NextHead from 'next/head'
import React from 'react'

import { SITE_NAME } from '#utils/constants'

export interface HeadProps {
  title: string
  children?: React.ReactNode
}

export default function Head(props: HeadProps) {
  const { title = SITE_NAME, children } = props

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {children}
    </NextHead>
  )
}
