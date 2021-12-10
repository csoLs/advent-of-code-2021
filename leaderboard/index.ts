import chalk from 'chalk'

import data2021 from './data.2021.json'

const PRINT_TIME_TO_BOTH = true

interface IEvent {
  owner_id: string
  event: string
  members: { [key: string]: {
    id: string
    stars: number
    name: string|null
    local_score: number
    global_score: number
    last_star_ts: number|string
    completion_day_level: { [key: string]: {
      [key: string]: {
        get_star_ts: number
      },
    }}
  }}
}

const renderFat = (string: string, day: number, offset: number) => 25+offset >= day ? chalk.bold(string) : chalk.dim(string)

const renderYearHeader = (year:number) => {
  const padding = '          '
  console.log(chalk.bold.gray.bgYellowBright(`${padding}${padding}${padding}Leaderboard for AoC ${year}${padding}${padding}${padding}`))
  const oneDay = 60*60*24*1000
  const today = new Date().valueOf()
  const lastDay = new Date().setFullYear(year,11,25)
  const offset = Math.ceil((today-lastDay)/oneDay)
  console.log(`
${padding}                  ${renderFat('1',10,offset)} ${renderFat('1',11,offset)} ${renderFat('1',12,offset)} ${renderFat('1',13,offset)} ${renderFat('1',14,offset)} ${renderFat('1',15,offset)} ${renderFat('1',16,offset)} ${renderFat('1',17,offset)} ${renderFat('1',18,offset)} ${renderFat('1',19,offset)} ${renderFat('2',20,offset)} ${renderFat('2',21,offset)} ${renderFat('2',22,offset)} ${renderFat('2',23,offset)} ${renderFat('2',24,offset)} ${renderFat('2',25,offset)}
${padding}${renderFat('1',1,offset)} ${renderFat('2',2,offset)} ${renderFat('3',3,offset)} ${renderFat('4',4,offset)} ${renderFat('5',5,offset)} ${renderFat('6',6,offset)} ${renderFat('7',7,offset)} ${renderFat('8',8,offset)} ${renderFat('9',9,offset)} ${renderFat('0',10,offset)} ${renderFat('1',11,offset)} ${renderFat('2',12,offset)} ${renderFat('3',13,offset)} ${renderFat('4',14,offset)} ${renderFat('5',15,offset)} ${renderFat('6',16,offset)} ${renderFat('7',17,offset)} ${renderFat('8',18,offset)} ${renderFat('9',19,offset)} ${renderFat('0',20,offset)} ${renderFat('1',21,offset)} ${renderFat('2',22,offset)} ${renderFat('3',23,offset)} ${renderFat('4',24,offset)} ${renderFat('5',25,offset)}
  `)
}

const renderUser = (name:string, score: number, stars:{pt1:boolean, pt2: boolean, time: string|undefined}[], place: number) => {
  const padPlace = place>=100?0:place>=10?1:2
  const padScore = score>=1000?0:score>=100?1:score>=10?2:3
console.log(chalk.bold(`${' '.repeat(padPlace)}${place}) ${' '.repeat(padScore)}${score} `) + chalk.yellow(`${stars.map(s => s.pt2 ? '★' :s.pt1 ? '☆' : ' ').join(' ')} `) + name)
if(PRINT_TIME_TO_BOTH)
  console.log(stars.map(({time}, i) => time ? chalk.dim(`Time to both on day ${' '.repeat(i<9?1:0)}${i+1}: `) + time:undefined).filter(Boolean).join('\n'))
}

const printData = (data: IEvent) => {
  const year = parseInt(data.event,10)
  renderYearHeader(year)

  Object.values(data.members)
    .sort((a,b) => b.local_score - a.local_score)
    .map((member,i) => {
      const days: {pt1:boolean, pt2: boolean, time: string|undefined}[] = Array.from({ length: 25 }, () => ({ pt1: false, pt2: false, time: undefined }))
      Object.entries(member.completion_day_level).map(([day, data]) => {
        const timeForBoth = data['2']?.get_star_ts ? data['2'].get_star_ts-data['1'].get_star_ts : undefined
        const printTime = timeForBoth ? new Date(timeForBoth * 1000).toISOString().substr(11, 8) : undefined
        days[parseInt(day,10)-1] = {
          pt1: true,
          pt2: !!timeForBoth,
          time: printTime
        }
      })

      renderUser(member.name || `Anonymous user #${member.id}`, member.stars, days, i+1)
  })
}
printData(data2021)

export default printData
