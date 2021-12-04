import data2021 from './data.2021.json'

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
      1: {
        get_star_ts: number
      },
      2: {
        get_star_ts: number
      } | undefined,
    }}
  }}
}

const printData = (data: IEvent) => {
  console.log(data.event)

  Object.values(data.members)
    .sort((a,b) => b.local_score - a.local_score)
    .map(member => {
      console.log(`${member.name || `Anonymous user #${member.id}`}: ${member.stars} stars`)

      Object.entries(member.completion_day_level).map(([day, data]) => {
        const timeForBoth = data['2']?.get_star_ts ? data['2'].get_star_ts-data['1'].get_star_ts : undefined
        const printTime = timeForBoth ? new Date(timeForBoth * 1000).toISOString().substr(11, 8) : null
        console.log(` Day ${day}`)
        // console.log(`   Time to stars: ${data['1'].get_star_ts},${data['2']?.get_star_ts}`)
        if(timeForBoth) {
          console.log(`   Time to both: ${printTime}`)
        }
      })
  })
}
printData(data2021)

export default data2021
