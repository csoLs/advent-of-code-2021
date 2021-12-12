import fsInput from './input'

const parseRow = (str:string) => {
  const [start,end] = str.split('-')

  return [
    {
      name: start,
      startPoint: start === 'start',
      endPoint: start === 'end',
      bigCave: start.charCodeAt(0) < 97
    },
    {
      name: end,
      startPoint: end === 'start',
      endPoint: end === 'end',
      bigCave: end.charCodeAt(0) < 97
    },
  ]
}

const fn = (input: string[]) => {
  const map: {[key: string]: { nodes: {name: string, startPoint: boolean, endPoint: boolean, bigCave: boolean}[], name: string, startPoint: boolean, endPoint: boolean, bigCave: boolean }} = {}
  input.map(r => {
    const res = parseRow(r)
    
    if(map[res[0].name]) {
      map[res[0].name].nodes.push(res[1])
    } else {
      map[res[0].name] = {...res[0], nodes: [res[1]]}
    }
    
    if(map[res[1].name]) {
      map[res[1].name].nodes.push(res[0])
    } else {
      map[res[1].name] = {...res[1], nodes: [res[0]]}
    }
    return res
  })

  const routes: string[] = []

  const calcRoute = (steps: string[], caveToVisitTwice: string) => {
    map[steps[steps.length-1]].nodes.forEach(element => {
      if(!element.bigCave && steps.includes(element.name)) {
        if(caveToVisitTwice !== element.name || (caveToVisitTwice === element.name && steps.filter(s => s === element.name).length >= 2)) {
          return 
        }
      }
      if(element.endPoint) {
        const route = [...steps, element.name].join(',')
        if(!routes.find(r => r === route)) {
          routes.push(route)
        }
        return
      }

      return calcRoute([...steps, element.name], caveToVisitTwice)
    })
  }

  const smallCaves = Object.values(map).filter(v => !v.bigCave && !v.startPoint && !v.endPoint).map(v => v.name)

  smallCaves.forEach(cave => {
    calcRoute(['start'], cave)    
  })

  return routes.length
}
console.log(fn(fsInput))

export default fn
