const fn = require('./b')

const testcases = [{
    input: '',
    expected: ''
  }
]

testcases.map(tc => {
    const res = fn(tc.input)
    console.log(res === tc.expected ? 'PASSED' : `FAILED WITH INPUT ${tc.input}, GOT ${res} EXPECTED ${tc.expected}`)
})
