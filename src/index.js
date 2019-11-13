/* @flow */
import React, {Component} from 'react'
import dateParser from './dateParser'
import moment from 'moment'

export type Props = {
  /** If the component should update itself over time */
  +live: boolean,
  /** minimum amount of time in seceonds between re-renders */
  +minPeriod: number,
  /** Maximum time between re-renders in seconds.
   * The component should update at least once every `x` seconds
   */
  +maxPeriod: number,
  /**
   * A title used for setting the title attribute if a <time> Element is used.
   */
  +title?: string,
  /** The Date to display. An actual Date object or something that can be fed
   * to new Date
   */
  +date: string | number | Date,
  /** A function that returns what Date.now would return. Primarily for server
   * rendering.
   */
  +now: () => number
}

type DefaultProps = {
  +live: boolean,
  +minPeriod: number,
  +maxPeriod: number,
  +now: () => number
}

const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
//const WEEK = DAY * 7
//const MONTH = DAY * 30
const YEAR = DAY * 365

const format = (num) => num < 10 ? `0${num}` : num

export default class TimeAgo extends Component<DefaultProps, Props, void> {
  static displayName = 'TimeAgo'
  static defaultProps = {
    live: true,
    minPeriod: 0,
    maxPeriod: Infinity,
    now: () => Date.now()
  }

  timeoutId: ?number
  isStillMounted: boolean = false

  tick = (refresh: ?boolean): void => {
    if (!this.isStillMounted || !this.props.live) {
      return
    }

    const then = dateParser(this.props.date).valueOf()
    if (!then) {
      console.warn('[timeAgo] Invalid Date provided')
      return
    }

    const now = this.props.now()
    const seconds = Math.round(Math.abs(now - then) / 1000)

    const unboundPeriod
      = seconds < MINUTE
      ? 1000
      : seconds < HOUR
        ? 1000 * MINUTE
        : seconds < DAY
          ? 1000 * HOUR
          : 0
    const period = Math.min(
      Math.max(unboundPeriod, this.props.minPeriod * 1000),
      this.props.maxPeriod * 1000
    )

    if (period) {
      this.timeoutId = setTimeout(this.tick, period)
    }

    if (!refresh) {
      this.forceUpdate()
    }
  }

  componentDidMount () {
    this.isStillMounted = true
    if (this.props.live) {
      this.tick(true)
    }
  }

  componentDidUpdate (lastProps: Props) {
    if (this.props.live !== lastProps.live || this.props.date !== lastProps.date) {
      if (!this.props.live && this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.tick()
    }
  }

  componentWillUnmount () {
    this.isStillMounted = false
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }

  render (): ?React$Element<*> {
    /* eslint-disable no-unused-vars */
    const {
      date,
      live,
      minPeriod,
      maxPeriod,
      title,
      ...passDownProps
    } = this.props
    /* eslint-enable no-unused-vars */
    const parseDate = dateParser(date);
    const then = parseDate.valueOf()
    if (!then) {
      return null
    }
    const now = this.props.now()
    const seconds = Math.round(Math.abs(now - then) / 1000)
    //const suffix = then < now ? 'ago' : 'from now'

    const minutes = format(parseDate.getMinutes()),
      hour = format(parseDate.getHours()),
      days = format(parseDate.getDate()),
      months = format(parseDate.getMonth() + 1),
      year = parseDate.getFullYear();

    const yesterdayZero = new Date(moment(now - 1000 * 60 * 60 * 24).format('YYYY-MM-DD 00:00:00')).valueOf();

    const value
      = seconds < MINUTE
      ? '刚刚'
      : seconds < HOUR
        ? `${Math.round(seconds / MINUTE)}分钟前`
        : seconds < DAY
          ? `${Math.round(seconds / HOUR)}小时前`
          : (seconds < DAY * 2 && then >= yesterdayZero)
            ? `昨天${hour}:${minutes}`
            : seconds < YEAR && year === new Date(now).getFullYear()
              ? `${months}-${days} ${hour}:${minutes}` 
              : `${year}-${months}-${days}`

    const passDownTitle = typeof title === 'undefined'
      ? (typeof date === 'string'
        ? date
        : dateParser(date).toISOString().substr(0, 16).replace('T', ' '))
      : title

    passDownProps.dateTime = dateParser(date).toISOString()
    delete passDownProps.now
    return (
      <time {...passDownProps}
            title={passDownTitle}
      >
        {value}
      </time>
    )
  }
}
