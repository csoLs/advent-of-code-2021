import fsInput from './input'

const parseInput = (i:string[]) => {
  const map = i.filter(i => i!=='' && !i.startsWith('fold')).map(i => {
    const [x,y] = i.split(',').map(Number)
    return {x,y}
  })
  const instructions = i.filter(i => i.startsWith('fold')).map(s => {
    const [inst,fold] = s.split('=')
    if(inst === 'fold along y') return { y: parseInt(fold,10)}
    return { x: parseInt(fold,10)}
  })
  const size = map.reduce((acc, v) => {
    return {
      x: Math.max(acc.x, v.x+1),
      y: Math.max(acc.y, v.y+1),
    }
  }, { x:0,y:0 })

  return {map, instructions, size}
}

const fold = (map:{x:number,y:number}[], size: {x:number,y:number}, fold: {x?:number,y?:number}) => {
  if(fold.x) {
    const x = fold.x

    const newMap = [...map].map(coords => {
      if(coords.x < x) return coords

      return {
        x: x - (coords.x-x),
        y: coords.y
      }
    })
    return { map: newMap, size: {x, y: size.y }}
  } else if(fold.y) {
    const y = fold.y

    const newMap = [...map].map(coords => {
      if(coords.y < y) return coords

      return {
        x: coords.x,
        y: y - (coords.y-y)
      }
    })

    return { map: newMap, size: {x: size.x, y }}
  } else {
    console.error('sum thing wrong')

    return { map, size }
  }
}

const fn = (input: string[]) => {
  const { map, size, instructions } = parseInput(input)
  const { map: _map } = fold(map,size,instructions[0])
  const countUnique = Array.from(new Set([..._map].map(s => `${s.x},${s.y}`))).length
  return countUnique 
}
console.log(fn(fsInput))

export default fn
