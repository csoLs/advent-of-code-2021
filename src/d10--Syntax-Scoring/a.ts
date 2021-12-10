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

  const corrupted = incorr.filter(i => i.split('').find(i => close.includes(i)))

  const illegalChars = corrupted.map(i => i.split('').find(j => close.includes(j)))
  const count = close.reduce((acc, char) => {
    const ill = illegalChars.filter(s => s === char)

    return acc + (ill.length * (char === ')' ? 3 : char === ']' ? 57 : char === '}' ? 1197 : 25137))
  }, 0)

  return count
}
console.log(fn(fsInput))

export default fn
