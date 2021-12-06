/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `3,4,3,1,2`.split(','),
  expected: 5934
}]

describe('d06--Lanternfish a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
