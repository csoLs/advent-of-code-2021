import fsInput from './input'

const fn = (input: string[]) => {
  const parsed = input.map(s => s.split('').map(Number))
  const risk = []

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
        risk.push(parsed[i][j]+1)
      }
    }    
  }
  return risk.reduce((acc,v) => acc+v, 0)
}
console.log(fn(fsInput))

export default fn
