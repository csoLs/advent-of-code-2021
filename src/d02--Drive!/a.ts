import fsInput from './input'

const fn = (input: string[]) => {
  let x = 0
  let y = 0

  input.map(cmd => {
    const [op, val] = cmd.split(' ')

    if(op === 'forward') x += parseInt(val,10)
    if(op === 'down') y += parseInt(val,10)
    if(op === 'up') y -= parseInt(val,10)
  })

  return x*y
}
console.log(fn(fsInput))

export default fn
