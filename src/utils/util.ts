export const formatTime = (date: Date) => {
  const year = date.getFullYear()
      , month = date.getMonth() + 1
      , day = date.getDate()
      , hour = date.getHours()
      , minute = date.getMinutes()
      , second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

  