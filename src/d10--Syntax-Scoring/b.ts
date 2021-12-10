import fsInput from './input'

const open = ['(', '[', '{', '<']
const close = [')', ']', '}', '>']

const fn = (input: string[]) => {
  const incorr = input.map(str => {
    let newStr = str
    let replaced = true

    while (replaced) {
      const _str = newStr
      newStr = newStr
        .replace('()', '')
        .replace('[]', '')
        .replace('{}', '')
        .replace('<>', '')

      if(_str === newStr) replaced=false
    }
    return newStr
  })

  const incomplete = incorr.filter(i => i.split('').every(i => open.includes(i)))
  const completion = incomplete
    .map(i => i
      .split('')
      .reverse()
      .map(j => close[open.indexOf(j)])
      .join('')
    )
  const points = completion.map(c => {
    return c.split('').reduce((acc, v) => {
      return acc*5 + (v === ')' ? 1 : v === ']' ? 2 :  v === '}' ? 3 : 4)
    }, 0)
  }).sort((a,b) => b-a)


  return points[Math.floor(points.length/2)]
}
console.log(fn(fsInput))

export default fn
