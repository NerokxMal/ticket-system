import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function timeAgo(date) {
  return formatDistanceToNow(date, { addSuffix: true, locale: es })
}

export function clsx(...classes) {
  return classes.filter(Boolean).join(' ')
}
