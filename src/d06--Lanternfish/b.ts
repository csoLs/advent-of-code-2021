import fsInput from './input'

const extraAfterNDay = (n:number, arr:number[]) => {
  return arr.filter(s => s === n).length
}
const fn = (input: string[]) => {
  const parsed = [...input].map(Number).sort()
  let extra = {
    d0: extraAfterNDay(0,parsed),
    d1: extraAfterNDay(1,parsed),
    d2: extraAfterNDay(2,parsed),
    d3: extraAfterNDay(3,parsed),
    d4: extraAfterNDay(4,parsed),
    d5: extraAfterNDay(5,parsed),
    d6: extraAfterNDay(6,parsed),
    d7: extraAfterNDay(7,parsed),
    d8: extraAfterNDay(8,parsed),
  }

  for (let i = 0; i < 256; i++) {
    const newExtra = {
      d0: extra.d1,
      d1: extra.d2,
      d2: extra.d3,
      d3: extra.d4,
      d4: extra.d5,
      d5: extra.d6,
      d6: extra.d7+extra.d0,
      d7: extra.d8,
      d8: extra.d0,
    }
    extra = newExtra
  }

  const val = BigInt(extra.d0+extra.d1+extra.d2+extra.d3+extra.d4+extra.d5+extra.d6+extra.d7+extra.d8)

  return val
}
console.log(fn(fsInput))

export default fn
