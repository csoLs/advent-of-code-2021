import fsInput from './input'

const fn = (input: string[]) => {
  const gammaRate: number[] = []
  const epsilonRate: number[] = []

  for (let i = 0; i < input[0].length; i++) {
    let _g = 0
    let _e = 0 

    input.map(str => str[i] === '1' ? _g++ : _e++)
    
    gammaRate[i] = _g>_e ? 1:0 
    epsilonRate[i] = _g>_e ? 0:1 
  }

  return parseInt(gammaRate.join(''),2)*parseInt(epsilonRate.join(''),2) 
}
console.log(fn(fsInput))

export default fn
