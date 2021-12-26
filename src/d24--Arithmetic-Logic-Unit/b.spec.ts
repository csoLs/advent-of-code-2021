/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: ``.split('\n'),
  expected: null
}]

describe('d24--Arithmetic-Logic-Unit b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
