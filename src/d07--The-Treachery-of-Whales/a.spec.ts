/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `16,1,2,0,4,2,7,1,2,14`.split(','),
  expected: 37
}]

describe('d07--The-Treachery-of-Whales a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
