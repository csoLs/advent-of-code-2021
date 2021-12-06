import fsInput from './input'

const fn = (input: string[]) => {
  let parsed = [...input].map(Number)

  for (let i = 0; i < 80; i++) {
    let newFish = 0

    parsed = parsed.map(nr => {
      if(nr > 0) {
        return nr-1
      } else {
        newFish++
        return 6
      }
    })

    for (let j = 0; j < newFish; j++) {
      parsed.push(8)
    }
  }

  return parsed.length
}
console.log(fn(fsInput))

export default fn
