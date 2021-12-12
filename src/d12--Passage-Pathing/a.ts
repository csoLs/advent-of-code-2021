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

  const calcRoute = (steps: string[]) => {
    map[steps[steps.length-1]].nodes.forEach(element => {
      if(!element.bigCave && steps.includes(element.name))
        return
      if(element.endPoint) {
        routes.push([...steps, element.name].join(','))
      }

      return calcRoute([...steps, element.name])
    })
  }

  calcRoute(['start'])
  
  return routes.length
}
console.log(fn(fsInput))

export default fn
