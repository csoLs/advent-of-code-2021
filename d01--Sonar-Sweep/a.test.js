const fn = require('./a')

const testcases = [{
    input: [
      199,
      200,
      208,
      210,
      200,
      207,
      240,
      269,
      260,
      263,
    ],
    expected: 7
  }
]

testcases.map(tc => {
    const res = fn(tc.input)
    console.log(res === tc.expected ? 'PASSED' : `FAILED WITH INPUT ${tc.input}, GOT ${res} EXPECTED ${tc.expected}`)
})
