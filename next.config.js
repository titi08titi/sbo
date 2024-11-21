// eslint-disable-next-line @typescript-eslint/no-var-requires
const headers = require('./headers.config')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('./webpack.config')

/** @see https://nextjs.org/docs/api-reference/next.config.js/introduction */
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers,
  webpack,
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CUSTOM_ENV: process.env.CUSTOM_ENV,
  },
}

module.exports = nextConfig
