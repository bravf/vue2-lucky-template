import dayjs from 'dayjs'

const idayjs = o => (o ? dayjs(o) : dayjs())
const format = date => idayjs(date).format('YYYY-MM-DD')
const format2 = date => idayjs(date).format('YYYY-MM')
const format3 = date => idayjs(date).format('HH:mm:ss')
const format4 = date => idayjs(date).format('HH:mm')
const format5 = date => idayjs(date).format('YYYY-MM-DD HH:mm:ss')

const isBeforeToday = time => time.getTime() <= Date.now()
const isBeforeToday2 = time => time.getTime() <= Date.now() - 24 * 60 * 60 * 1000

export default {
  idayjs,
  format,
  format2,
  format3,
  format4,
  format5,
  isBeforeToday,
  isBeforeToday2,
}
