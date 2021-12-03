import fsInput from './input'

const parseRow = (row: string) => {
  const regex = /\[1518-(\d{2}-\d{2}) (\d{2}:\d{2})] (.+)/
  const [_str, date, time, action] = row.match(regex) ?? []

  return {date, time, action}
}

const calculateMostCommon = (ranges: number[][]) => {
  const minutes = Array.from({ length: 60 }, () => 0)
  ranges.map(range => {
    for (let i = range[0]; i < range[1]; i++) {
      minutes[i-1]++
    }
  })
  const highestSleepMinute = [...minutes].sort((a,b) => b - a)[0]
  return minutes.findIndex(v => highestSleepMinute === v) +1
}
const fn = (input: string[]) => {
  const parsedInput = input
    .map(parseRow)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  const guardSleepTime: {[key: string]: {
    guardId: number,
    sleeptime: number
    sleepRanges: number[][]
  }} = {}
  let guard = undefined

  for (let i = 0; i < parsedInput.length; i++) {
    if (!['wakes up', 'falls asleep'].includes(parsedInput[i].action)) {
      const [_, guardId] = parsedInput[i].action.match(/(\d+)/) || []
      guard = guardId
    } else if (guard && parsedInput[i].action === 'falls asleep' && parsedInput[i+1].action === 'wakes up') {
      const start = parseInt(parsedInput[i].time.split(':')[1],10)
      const end = parseInt(parsedInput[i+1].time.split(':')[1],10)
      const sleepTime = end-start
      if(!guardSleepTime[guard]) {
        guardSleepTime[guard] = { guardId: parseInt(guard,10), sleeptime: 0, sleepRanges: [] }
      } 
      guardSleepTime[guard].sleeptime +=sleepTime
      guardSleepTime[guard].sleepRanges.push([start, end])
    }
  }

  const relevantGuard = Object.values(guardSleepTime).sort((a,b) => b.sleeptime - a.sleeptime)[0]

  return relevantGuard.guardId*calculateMostCommon(relevantGuard.sleepRanges)
}
console.log(fn(fsInput))

export default fn
