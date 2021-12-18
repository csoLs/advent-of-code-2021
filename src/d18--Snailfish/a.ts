import fsInput from './input'


const findSplit = (input: number | number[]): boolean => {
  if(typeof input === 'number') {
    return input >= 10
  } else {
    return input.find(findSplit) ? true : false
  }
}

const findExplode = (input: number | number[], depth: number): boolean => {
  if(typeof input === 'number') {
    return false
  } else if(depth > 4) {
    return true
  } else {
    return input.find(s => findExplode(s, depth+1)) ? true : false
  }
}


const reduceNumber = (nr: any[]) => {
  const newNr = [...nr]
  let reducing = true

  while (reducing) {
    console.log('looping')
    console.dir(newNr, { depth: null })
    if(findExplode(nr, 1)) {
      //find pair nested 4 levels deep; explode

      //the matches left value is added to the previous value if any
      //the matches right value is added to the next value if any
      //the pair is replaced by 0

      console.log('explode')
      
      for (let i1 = 0; i1 < newNr.length; i1++) {
        for (let i2 = 0; i2 < newNr[i1].length; i2++) {
          for (let i3 = 0; i3 < newNr[i1][i2].length; i3++) {
            for (let i4 = 0; i4 < newNr[i1][i2][i3].length; i4++) {

              if(Array.isArray(newNr[i1][i2][i3][i4])) {
                console.log(newNr[i1][i2][i3][i4], ` at index ${i1},${i2},${i3},${i4}`)
                const [v1,v2] = newNr[i1][i2][i3][i4]

                if(i4 > 0) {
                  // console.log(i4, newNr[i1][i2][i3])
                  // console.log(`adding ${v1} to i4 ${newNr[i1][i2][i3][i4-1]}`)
                  newNr[i1][i2][i3][i4-1] += v1
                } else if(i3 > 0) {
                  // console.log(i3, newNr[i1][i2])
                  // console.log(`adding ${v1} to i3 ${newNr[i1][i2][i3-1]}`)
                  newNr[i1][i2][i3-1][newNr[i1][i2][i3-1].length-1] += v1
                } else if (i2 > 0) {
                  // console.log(i2, newNr[i1][i2])
                  // console.log(`adding ${v1} to i2 ${newNr[i1][i2-1]}`)
                  newNr[i1][i2-1][newNr[i1][i2-1].length-1] += v1
                } else if (i1 > 0) {
                  // console.log(i1, newNr[i1])
                  // console.log(`adding ${v1} to i1 ${newNr[i1-1]}`)
                  newNr[i1-1][newNr[i1-1].length-1] += v1
                }
                
                if(i4 < newNr[i1][i2][i3].length-1) {
                  // console.log(i4, newNr[i1][i2][i3])
                  // console.log(`adding ${v2} to i4 ${newNr[i1][i2][i3][i4+1]}`)
                  if(typeof newNr[i1][i2][i3][i4+1] === 'number') newNr[i1][i2][i3][i4+1] += v2
                  else newNr[i1][i2][i3][i4+1][0] += v2
                } else if(i3 < newNr[i1][i2].length-1) {
                  // console.log(`adding ${v2} to i3 ${newNr[i1][i2][i3+1]}`)
                  if(typeof newNr[i1][i2][i3+1] === 'number') newNr[i1][i2][i3+1] += v2
                  else newNr[i1][i2][i3+1][0] += v2
                } else if(i2 < newNr[i1].length-1) {
                  // console.log(`adding ${v2} to i2 ${newNr[i1][i2+1]}`)
                  if(typeof newNr[i1][i2+1] === 'number') newNr[i1][i2+1] += v2
                  else newNr[i1][i2+1][0] += v2
                } else if(i1 < newNr[i1].length-1) {
                  // console.log(`adding ${v2} to i1 ${newNr[i1+1]}`)
                  if(typeof newNr[i1+1] === 'number') newNr[i1+1] += v2
                  else newNr[i1+1][0] += v2
                }

                newNr[i1][i2][i3][i4] = 0

                // i4 = newNr[i1][i2][i3].length +1
                // i3 = newNr[i1][i2].length
                // i2 = newNr[i1].length
                // i1 = newNr.length

                console.log('end explode')
                console.dir(newNr, { depth: null })
                break
              }
            }
          }
        }
      }
    } else if(findSplit(nr)) {
      //find number 10 or greater; split

      //replace match with a pair
      //left value = math.floor(match/2]
      //right value = math.ceil(match/2]

      for (let i1 = 0; i1 < newNr.length; i1++) {
        if(typeof newNr[i1] === 'number' && newNr[i1] >= 10) {
          newNr[i1] = [Math.floor(newNr[i1]/2),Math.ceil(newNr[i1]/2)]
          break
        } else {
          for (let i2 = 0; i2 < newNr[i1].length; i2++) {
            if(typeof newNr[i1][i2] === 'number' && newNr[i1][i2] >= 10) {
              newNr[i1][i2] = [Math.floor(newNr[i1][i2]/2),Math.ceil(newNr[i1][i2]/2)]
              break
            } else {
              for (let i3 = 0; i3 < newNr[i1][i2].length; i3++) {
                if(typeof newNr[i1][i2][i3] === 'number' && newNr[i1][i2][i3] >= 10) {
                  newNr[i1][i2][i3] = [Math.floor(newNr[i1][i2][i3]/2),Math.ceil(newNr[i1][i2][i3]/2)]
                  break
                } else {
                  for (let i4 = 0; i4 < newNr[i1][i2][i3].length; i4++) {
                    if(typeof newNr[i1][i2][i3][i4] === 'number' && newNr[i1][i2][i3][i4] >= 10) {
                      newNr[i1][i2][i3][i4] = [Math.floor(newNr[i1][i2][i3][i4]/2),Math.ceil(newNr[i1][i2][i3][i4]/2)]
                      break
                    }
                  }
                }
              }
            }
          }
        }
      }

      console.log('split')
      reducing = false
    } else {
      reducing = false
    }
  }

  return JSON.stringify(newNr)
}

const addNumbers = (nr1:any[],nr2:any[]) => [nr1,nr2]

const fn = (input: string[]) => {
  return input.map(s => JSON.parse(s)).reduce((acc,v) => reduceNumber(addNumbers(acc,v)))
}
// fn(fsInput)

export default fn
export { reduceNumber, addNumbers }
