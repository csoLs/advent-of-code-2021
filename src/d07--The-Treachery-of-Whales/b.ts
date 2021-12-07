import fsInput from './input'

const calcIndCost = (times:number,cost:number):number => {
  return times===0
  ? cost
  : cost + calcIndCost(times-1,cost+1)
}
const calcCost = (pos:number,input:number[]) => {
  return input.reduce((acc,v) => acc + calcIndCost(Math.abs(v-pos),0), 0)
}

const fn = (input: string[]) => {
  const parsed = input.map(Number).sort((a,b)=>a-b)
  const res = []
  
  for (let i = 0; i <= parsed[parsed.length-1]; i++) {
    res.push({
      level: i,
      cost: calcCost(i,[...parsed])
    })
  }
  
  return res.sort((a,b) => a.cost - b.cost)[0].cost
}
console.log(fn(fsInput))

export default fn
