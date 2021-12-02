import fsInput from './input'

const fn = (input: string[]) => {
  let x = 0
  let y = 0
  let aim = 0

  input.map(cmd => {
    const [op, val] = cmd.split(' ')

    if(op === 'forward') {
      x += parseInt(val,10)
      y += aim*parseInt(val,10)
    }
    if(op === 'down') aim += parseInt(val,10)
    if(op === 'up') aim -= parseInt(val,10)
  })

  return x*y
}
console.log(fn(fsInput))

export default fn
