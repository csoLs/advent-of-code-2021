/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `3,4,3,1,2`.split(','),
  expected: BigInt(26984457539)
}]

describe('d06--Lanternfish b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
