/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: .split('\n'),
  expected: null
}]

describe('d23--Amphipod b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
