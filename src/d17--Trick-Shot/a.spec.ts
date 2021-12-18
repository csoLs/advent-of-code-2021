/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: 'target area: x=20..30, y=-10..-5',
  expected: 45
}]

describe('d17--Trick-Shot a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
