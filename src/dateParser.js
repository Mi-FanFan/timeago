// @flow
import moment from 'moment'
export default function dateParser (date: string | number | Date): Date {
  const parsed = moment(date).toDate()
  if (!Number.isNaN(parsed.valueOf())) {
    return parsed
  }

  let parts: ?$ReadOnlyArray<string> = String(date).match(/\d+/g)
  if (parts === null || parts.length <= 2) {
    return parsed
  } else {
    const [firstP, secondP, ...restPs] = parts.map(x => parseInt(x))
    const correctedParts = [firstP, secondP - 1, ...restPs]
    return new Date(Date.UTC(...correctedParts))
  }
}