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

const findPrevIndex = (arr: any[], index: number[]) => {
  for (let i1 = index[0]; i1 >= 0; i1--) {
    if(typeof arr[i1] === 'number') {
      return [i1]
    } else {
      for (let i2 = i1 === index[0] ? index[1] : arr[i1].length-1; i2 >= 0; i2--) {
        if(typeof arr[i1][i2] === 'number') {
          return [i1,i2]
        } else {
          for (let i3 = i1 === index[0] && i2 === index[1] ? index[2] : arr[i1][i2].length-1; i3 >= 0; i3--) {
            if(typeof arr[i1][i2][i3] === 'number') {
              return [i1,i2,i3]
            } else {
              for (let i4 = i1 === index[0] && i2 === index[1] && i3 === index[2] ? index[3] : arr[i1][i2][i3].length-1 ; i4 >= 0; i4--) {
                if(typeof arr[i1][i2][i3][i4] === 'number'){
                  return [i1,i2,i3,i4]
                } else {
                  for (let i5 = i1 === index[0] && i2 === index[1] && i3 === index[2] && i4 === index[3] ? index[4] : arr[i1][i2][i3][i4].length-1; i5 >= 0; i5--) {
                    if(typeof arr[i1][i2][i3][i4][i5] === 'number' && !(i1===index[0] && i2===index[1] && i3===index[2] && i4===index[3] && i5===index[4])){
                      return [i1,i2,i3,i4,i5]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return []
}

const findNextIndex = (arr: any[], index: number[]) => {
  for (let i1 = index[0]; i1 < arr.length; i1++) {
    if(typeof arr[i1] === 'number') {
      return [i1]
    } else {
      for (let i2 = i1 === index[0] ? index[1] : 0; i2 < arr[i1].length; i2++) {
        if(typeof arr[i1][i2] === 'number') {
          return [i1,i2]
        } else {
          for (let i3 = i1 === index[0] && i2 === index[1] ? index[2] : 0; i3 < arr[i1][i2].length; i3++) {
            if(typeof arr[i1][i2][i3] === 'number') {
              return [i1,i2,i3]
            } else {
              for (let i4 = i1 === index[0] && i2 === index[1] && i3 === index[2] ? index[3] : 0; i4 < arr[i1][i2][i3].length; i4++) {
                if(typeof arr[i1][i2][i3][i4] === 'number'){
                  return [i1,i2,i3,i4]
                } else {
                  for (let i5 = i1 === index[0] && i2 === index[1] && i3 === index[2] && i4 === index[3] ? index[4] : 0; i5 < arr[i1][i2][i3][i4].length; i5++) {
                    if(typeof arr[i1][i2][i3][i4][i5] === 'number' && !(i1===index[0] && i2===index[1] && i3===index[2] && i4===index[3] && i5===index[4])){
                      return [i1,i2,i3,i4,i5]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return []
}


const reduceNumber = (nr: any[], asString = true) => {
  const newNr = [...nr]
  let reducing = true

  let reduceCount = 0

  while (reducing) {
    if(findExplode(nr, 1)) {
      //find pair nested 4 levels deep; explode

      //the matches left value is added to the previous value if any
      //the matches right value is added to the next value if any
      //the pair is replaced by 0

      loop_block: {
        for (let i1 = 0; i1 < newNr.length; i1++) {
          for (let i2 = 0; i2 < newNr[i1].length; i2++) {
            for (let i3 = 0; i3 < newNr[i1][i2].length; i3++) {
              for (let i4 = 0; i4 < newNr[i1][i2][i3].length; i4++) {
                if(Array.isArray(newNr[i1][i2][i3][i4])) {
                  const [v1,v2] = newNr[i1][i2][i3][i4]

                  const prevIndex = findPrevIndex(newNr, [i1,i2,i3,i4,0])
                  const nextIndex = findNextIndex(newNr, [i1,i2,i3,i4,1])

                  if(prevIndex.length === 1) {
                    newNr[prevIndex[0]] += v1
                  } else if(prevIndex.length === 2) {
                    newNr[prevIndex[0]][prevIndex[1]] += v1
                  } else if(prevIndex.length === 3) {
                    newNr[prevIndex[0]][prevIndex[1]][prevIndex[2]] += v1
                  } else if(prevIndex.length === 4) {
                    newNr[prevIndex[0]][prevIndex[1]][prevIndex[2]][prevIndex[3]] += v1
                  } else if(prevIndex.length === 5) {
                    newNr[prevIndex[0]][prevIndex[1]][prevIndex[2]][prevIndex[3]][prevIndex[4]] += v1
                  }

                  if(nextIndex.length === 1) {
                    newNr[nextIndex[0]] += v2
                  } else if(nextIndex.length === 2) {
                    newNr[nextIndex[0]][nextIndex[1]] += v2
                  } else if(nextIndex.length === 3) {
                    newNr[nextIndex[0]][nextIndex[1]][nextIndex[2]] += v2
                  } else if(nextIndex.length === 4) {
                    newNr[nextIndex[0]][nextIndex[1]][nextIndex[2]][nextIndex[3]] += v2
                  } else if(nextIndex.length === 5) {
                    newNr[nextIndex[0]][nextIndex[1]][nextIndex[2]][nextIndex[3]][nextIndex[4]] += v2
                  }

                  newNr[i1][i2][i3][i4] = 0
                  break loop_block
                }
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

      loop_block: {
        for (let i1 = 0; i1 < newNr.length; i1++) {
          if(typeof newNr[i1] === 'number' && newNr[i1] >= 10) {
            newNr[i1] = [Math.floor(newNr[i1]/2),Math.ceil(newNr[i1]/2)]
            break loop_block
          } else {
            for (let i2 = 0; i2 < newNr[i1].length; i2++) {
              if(typeof newNr[i1][i2] === 'number' && newNr[i1][i2] >= 10) {
                newNr[i1][i2] = [Math.floor(newNr[i1][i2]/2),Math.ceil(newNr[i1][i2]/2)]
                break loop_block
              } else {
                for (let i3 = 0; i3 < newNr[i1][i2].length; i3++) {
                  if(typeof newNr[i1][i2][i3] === 'number' && newNr[i1][i2][i3] >= 10) {
                    newNr[i1][i2][i3] = [Math.floor(newNr[i1][i2][i3]/2),Math.ceil(newNr[i1][i2][i3]/2)]
                    break loop_block
                  } else {
                    for (let i4 = 0; i4 < newNr[i1][i2][i3].length; i4++) {
                      if(typeof newNr[i1][i2][i3][i4] === 'number' && newNr[i1][i2][i3][i4] >= 10) {
                        newNr[i1][i2][i3][i4] = [Math.floor(newNr[i1][i2][i3][i4]/2),Math.ceil(newNr[i1][i2][i3][i4]/2)]
                        break loop_block
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      reducing = false
    }

    reduceCount++
    // if(reduceCount > 20) reducing = false
  }

  return asString ? JSON.stringify(newNr) : newNr
}

const addNumbers = (nr1:any[],nr2:any[]) => [nr1,nr2]

const fn = (input: string[]) => {
  return JSON.stringify(input.map(s => JSON.parse(s)).reduce((acc,v) => reduceNumber(addNumbers(acc,v), false)))
}
// fn(fsInput)

export default fn
export { reduceNumber, addNumbers }
