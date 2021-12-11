import fsInput from './input'

const fn = (input: string[]) => {
  const parsed = input.map(s => s.split('').map(Number))
  let flashed = 0

  const checkOOB = ({x,y}:{x:number,y:number}) => {
    return !(x < 0 || y < 0 || x >= parsed[0].length || y >= parsed.length)
  }

  for (let i = 0; i < 100; i++) {
    let _flashed:{x:number,y:number}[] = []
    let _toFlash:{x:number,y:number}[] = []

    const flashCoord = ({x,y}:{x:number,y:number}) => {
      if(checkOOB({x:x-1,y:y+1})) parsed[y+1][x-1]++
      if(checkOOB({x:x,y:y+1})) parsed[y+1][x]++
      if(checkOOB({x:x+1,y:y+1})) parsed[y+1][x+1]++

      if(checkOOB({x:x+1,y:y})) parsed[y][x+1]++
      if(checkOOB({x:x-1,y:y})) parsed[y][x-1]++

      if(checkOOB({x:x-1,y:y-1})) parsed[y-1][x-1]++
      if(checkOOB({x:x,y:y-1})) parsed[y-1][x]++
      if(checkOOB({x:x+1,y:y-1})) parsed[y-1][x+1]++
    }

    for (let y = 0; y < parsed.length; y++) {
      for (let x = 0; x < parsed[0].length; x++) {
        parsed[y][x]++

        if(parsed[y][x] > 9) {
          _toFlash.push({x,y})
        }
      }
    }

    while(_toFlash.length > 0) {
      _toFlash.map(flashCoord)
      _flashed =[..._flashed, ..._toFlash]
      _toFlash = []

      for (let y = 0; y < parsed.length; y++) {
        for (let x = 0; x < parsed[0].length; x++) {
          if(parsed[y][x] > 9 && !_flashed.find(f => f.x ===x && f.y===y)) {
            _toFlash.push({x,y})
          }
        }
      }
    }

    flashed+= _flashed.length

    for (let y = 0; y < parsed.length; y++) {
      for (let x = 0; x < parsed[0].length; x++) {
        if(parsed[y][x] > 9) {
          parsed[y][x] = 0
        }
      }
    }
  }
  return flashed
}
console.log(fn(fsInput))

export default fn
