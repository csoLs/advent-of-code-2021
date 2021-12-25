import fsInput from './input'

interface IRule {
  rule: string
  xFrom: number
  xTo: number
  yFrom: number
  yTo: number
  zFrom: number
  zTo: number
}

const parseRules = (input: string[]): IRule[] => {
  const regex = /(on|off)( x=)(-?\d+)(..)(-?\d+)(,y=)(-?\d+)(..)(-?\d+)(,z=)(-?\d+)(..)(-?\d+)/

  const res = input.map(s => {
    const [,rule,,xFrom,,xTo,,yFrom,,yTo,,zFrom,,zTo] = s.match(regex) ?? []
    return {
      rule,
      xFrom: parseInt(xFrom,10),
      xTo: parseInt(xTo,10),
      yFrom: parseInt(yFrom,10),
      yTo: parseInt(yTo,10),
      zFrom: parseInt(zFrom,10),
      zTo: parseInt(zTo,10),
    }
  })

  return res
}

const expandRule = (from:number, to:number) => {
  return Array.from({ length: (to-from)+1 }, (_,i) => i+from)
}

const expandedRules = (rules:IRule[]) => {
  return rules.map(r => ({...r, x: expandRule(r.xFrom,r.xTo), y: expandRule(r.yFrom,r.yTo), z: expandRule(r.zFrom,r.zTo) }))
}

const fn = (input: string[]) => {
  console.time()
  const parsed = parseRules(input)
  console.timeLog()
  // console.log(parsed)
  // const rulesInRange = parsed.filter(r => !(r.xTo < -50) && !(r.xFrom > 50) && !(r.yTo < -50) && !(r.yFrom > 50) && !(r.zTo < -50) && !(r.zFrom > 50))
  const rules = expandedRules(parsed)
  console.timeLog()
  // console.log(rules)
  
  const result = new Set()
  const extremeX = rules.reduce((acc, v) => ([Math.min(acc[0], v.xFrom),Math.max(acc[1], v.xTo)]), [0,0])
  const extremeY = rules.reduce((acc, v) => ([Math.min(acc[0], v.yFrom),Math.max(acc[1], v.yTo)]), [0,0])
  const extremeZ = rules.reduce((acc, v) => ([Math.min(acc[0], v.zFrom),Math.max(acc[1], v.zTo)]), [0,0])
  console.log('extremeX', extremeX, extremeY, extremeZ)
  
  // rules.forEach(rule => {
  //   rule.x.forEach(x => {
  //     rule.y.forEach(y => {
  //       rule.z.forEach(z => {
  //         if(rule.rule === 'on') {
  //           result.add(`${x},${y},${z}`)
  //         } else {
  //           result.delete(`${x},${y},${z}`)
  //         }
  //       })
  //     })
  //   })      
  // })
  console.timeEnd()

  // console.log(result)

  return result.size
}
// console.log(fn(fsInput))

export default fn
