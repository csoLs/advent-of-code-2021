const fsInput = require('./input')

const fn = (input) => {
  let ret = 0
  for (let index = 3; index < input.length; index++) {
    const val1 = input[index-3]+input[index-2]+input[index-1]
    const val2 = input[index-2]+input[index-1]+input[index]

    if(val2 > val1)
      ret++
  }

  return ret
}
console.log(fn(fsInput))

module.exports = fn
