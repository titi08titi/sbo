import moment from 'moment-timezone'

import { DefaultDateTimeFormat, Environment, SambotApiUrl } from './constants'
import { Order } from './global'

export function getEnvironment(hostname: string) {
  let environment = Environment.LOCALHOST
  if (hostname.includes('prd')) {
    environment = Environment.PRODUCTION
  } else if (hostname.includes('stg')) {
    environment = Environment.STAGING
  } else if (hostname.includes('int')) {
    environment = Environment.INTEGRATION
  }
  return environment
}

export function getSambotApiUrl(environment: string) {
  const targetApiEnvironment = process.env.NEXT_PUBLIC_TARGET_API_ENVIRONMENT?.toLowerCase()
  const environments = Object.values(Environment).map((env) => env.toLowerCase())
  if (targetApiEnvironment && environments.includes(targetApiEnvironment)) {
    environment = targetApiEnvironment
  }

  switch (environment) {
    case Environment.LOCALHOST:
      return SambotApiUrl.LOCALHOST
    case Environment.STAGING:
      return SambotApiUrl.STAGING
    case Environment.PRODUCTION:
      return SambotApiUrl.PRODUCTION
    default:
      return SambotApiUrl.STAGING
  }
}

export function isGuidValid(guid: string) {
  const guidRegex = new RegExp('^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$')
  return guidRegex.test(guid)
}

export function intersection<T>(array1: T[], array2: T[]) {
  return array1.filter((value) => array2.includes(value))
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

export function groupBy(list, keyGetter) {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

export function dateTimeToUtcAsString(date?: moment.Moment) {
  return date ? moment.utc(date).format('YYYY-MM-DD HH:mm:ss') : null
}

export function utcDateTimeAsStringToLocal(dateTimeAsString?: string) {
  return dateTimeAsString
    ? moment.utc(dateTimeAsString).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(DefaultDateTimeFormat)
    : null
}
