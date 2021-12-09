import fsInput from './input'

const calcBasin = (lowPoint: {x:number,y:number}, map: number[][]):number => {
  const coordsInBasin: {x:number,y:number}[] = []  
  
  const checkCoord = ({x,y}:{x:number,y:number}) => {
    if(x < 0 || x > map.length-1) return
    if(y < 0 || y > map[0].length-1) return
    if(map[x][y] === 9) return
    if(coordsInBasin.find(c => c.x === x && c.y === y)) return

    coordsInBasin.push({x,y})

    checkCoord({x:x+1,y})
    checkCoord({x:x-1,y})
    checkCoord({x,y:y+1})
    checkCoord({x,y:y-1})
  }

  checkCoord(lowPoint)

  return coordsInBasin.length
}

const fn = (input: string[]) => {
  const parsed = input.map(s => s.split('').map(Number))
  const lowPoint: {x:number,y:number}[] = []

  for (let i = 0; i < parsed.length; i++) {
    for (let j = 0; j < parsed[i].length; j++) {
      if(
        (
          i===0 ||
          (parsed[i-1][j] > parsed[i][j])
        ) &&
        (
          i===parsed.length-1 ||
          (parsed[i+1][j] > parsed[i][j])
        ) &&
        (
          j===0 ||
          (parsed[i][j-1] > parsed[i][j])
        ) &&
        (
          j===parsed[i].length-1 ||
          (parsed[i][j+1] > parsed[i][j])
        )
      ) {
        lowPoint.push({
          x: i,
          y: j,
        })
      }
    }    
  }

  const basins = lowPoint.map(coord => calcBasin(coord,parsed))

  return basins.sort((a,b) => b-a).splice(0,3).reduce((acc,v) => acc*v,1)
}
console.log(fn(fsInput))

export default fn
