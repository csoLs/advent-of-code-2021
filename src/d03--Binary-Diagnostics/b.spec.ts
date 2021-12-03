/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: [`00100`,
`11110`,
`10110`,
`10111`,
`10101`,
`01111`,
`00111`,
`11100`,
`10000`,
`11001`,
`00010`,
`01010`],
  expected: 230
}]

describe('d03--Binary-Diagnostics b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
