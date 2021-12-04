import fsInput from './input'
import calculateLength from './a'

const fn = (input:string) => {
  const res = []

  for (let i = 65; i < 91; i++) {
    const find = String.fromCharCode(i)
    const regex = new RegExp(find, 'gi')
    const checkStr = `${input}`.replace(regex, '')
    res.push(calculateLength(checkStr))
  }
  res.sort((a,b) => a-b)

  return res[0]
}
console.log(fn(fsInput))

export default fn
