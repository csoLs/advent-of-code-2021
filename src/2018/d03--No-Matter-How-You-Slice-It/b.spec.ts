/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,
  expected: 3
}]

describe('d99--2018-d03 b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input.split('\n'))).toEqual(tc.expected)
    })
  })
})
