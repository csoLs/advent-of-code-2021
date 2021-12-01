import fsInput from './input'

const fn = (input: number[]) => {
  let increase = 0
  
  input.map((val, i, arr) => {
    if(i === 0)
      return
    else if(val > arr[i-1])
      increase++
  })
  
  return increase
}
console.log(fn(fsInput))

export default fn
