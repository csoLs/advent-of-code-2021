import fsInput from './input'

const fn = (input: number[]) => {
  return input.reduce((acc, val, i, arr) => acc + (i === 0 || val <= arr[i-1] ? 0 : 1), 0)
}
console.log(fn(fsInput))

export default fn
