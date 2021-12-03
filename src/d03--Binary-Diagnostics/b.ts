import fsInput from './input'

const mostCommon = (input: string[], i: number):[number,string[]] => {
  const one = input.filter(s => s[i] ===  '1')
  const zero = input.filter(s => s[i] === '0')
  
  if(zero.length > one.length) {
    return [0, zero]
  }
  return [1, one]
}
const leastCommon = (input: string[], i: number):string[] => {
  const one = input.filter(s => s[i] ===  '1')
  const zero = input.filter(s => s[i] === '0')
  
  if(zero.length <= one.length) {
    return zero
  }
  return one
}

const fn = (input: string[]) => {
  let tmpInput = input
  const oxyGenRating: number[] = []
  for (let i = 0; i < input[0].length; i++) {
    const [bit, newInput] = mostCommon(tmpInput, i)
    tmpInput = newInput
    oxyGenRating[i] = bit
  }

  let tmpInput2 = input
  for (let i = 0; i < input[0].length; i++) {
    const newInput = leastCommon(tmpInput2, i)
    tmpInput2 = newInput
    if(newInput.length ===1) break
  }    

  return parseInt(oxyGenRating.join(''),2)*parseInt(tmpInput2.join(''),2)
}
console.log(fn(fsInput))

export default fn
