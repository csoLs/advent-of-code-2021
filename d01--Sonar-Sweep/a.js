const fsInput = require('./input')

const fn = (input) => {
  let increase = 0

  input.map((val, i, arr) => {
    if(i === 0)
      return
    else if(val > arr[i-1])
      increase++
  })

  return increase
}
// console.log(fsInput.length)
console.log(fn(fsInput))

module.exports = fn


// 1721
