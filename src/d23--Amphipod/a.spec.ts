/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: .split('\n'),
  expected: null
}]

describe('d23--Amphipod a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
