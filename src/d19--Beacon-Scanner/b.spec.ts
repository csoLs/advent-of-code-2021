/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: ''.split('\n'),
  expected: null
}]

describe('d19--Beacon-Scanner b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
