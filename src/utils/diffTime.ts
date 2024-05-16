import type dayjs from 'dayjs'

export const diffTime = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  const remainTime = end.diff(start, 's')
  const h = Math.floor(remainTime / 3600)
  const m = Math.floor((remainTime - h * 3600) / 60)
  const s = remainTime - h * 3600 - m * 60

  return { h, m, s, remainTime }
}
