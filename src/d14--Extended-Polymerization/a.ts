import fsInput from './input'

const parseInput = (input:string[]) => {
  const template = input[0]
  const rules = input.filter((_,i)=>i>1).map(s => s.split(' -> '))

  return {template,rules}

}
const fn = (input: string[]) => {
  const res = parseInput(input)
  console.dir(res, {depth: null})

  let str = res.template
  for (let loop = 0; loop < 10; loop++) {
    console.log(str)
    let newStr = ''

    for (let i = 0; i < str.length; i++) {
      const lkup = `${str}`.substring(i,i+2)
      const match = res.rules.find(([lookup]) => lookup === lkup)?.[1]
       newStr+=`${str.charAt(i)}${match||''}`
    }

    str = newStr
  }

  const set = str.split('').reduce((acc, v) => {
    if(acc.has(v)) acc.set(v, acc.get(v)+1)
    else acc.set(v, 1)

    return acc
  }, new Map())
  
  console.log(set.entries())
  const arr = Array.from(set.values()).sort((a,b)=>a-b)
  console.log(arr)

  return arr[arr.length-1]-arr[0]
}
console.log('res', fn(fsInput))

export default fn
