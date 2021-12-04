/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `dabAcCaCBAcCcaDA`,
  expected: 10
}]

describe('d05--Alchemical-Reduction a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
