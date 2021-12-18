import fsInput from './input'


const parseTargetArea = (input: string) => {
  const [x, y] = input.replace('target area: x=', '').replace('y=', '').split(', ').map(s => s.split('..').map(Number).sort((a,b) => a-b))
  return {x,y}
}

const fn = (input: string) => {
  const {x,y} = parseTargetArea(input)  
  const match = []

  console.log(x,y)

  const probeTemplate = {
    x: 0,
    y: 0,
    volX: 0,
    volY: 0
  }

  // for (let volX = 7; volX <= 7; volX++) {
  //   for (let volY = 2; volY <= 2; volY++) {
  for (let volX = 1; volX <= x[1]; volX++) {
    for (let volY = 1; volY < 1000; volY++) {
      const probe = {...probeTemplate, volX, volY }
      let maxY = 0
      // console.log('***************** checking probe **************\n', probe)
      let check = true
      while (check) {
        probe.x += probe.volX
        probe.y += probe.volY
        probe.volX = probe.volX - (probe.volX > 0 ? 1 : probe.volX < 0 ? -1 : 0)
        probe.volY = probe.volY - 1
        
        maxY = Math.max(maxY, probe.y)

        // console.log('probe', probe)

        if(
          probe.x >= x[0] && probe.x <= x[1] &&
          probe.y >= y[0] && probe.y <= y[1]
        ) {
          // console.log('\n\n* found match *\n\n')
          match.push({volX,volY, maxY})
          check = false
        }

        if(probe.x > x[1]) {
          // console.log(`probe.x > x[1]`, probe, x)
          check = false
        }
        if(probe.y < y[0]) {
          // console.log(`probe.y < y[0]`, probe, y)
          check = false
        }
      }
    }
  }

  return match.reduce((acc, v) => Math.max(v.maxY, acc), 0)
}

console.log('res',fn(fsInput))

export default fn

// 7381
