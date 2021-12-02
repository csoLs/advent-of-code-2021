/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
  ],
  expected: 900
}]
describe('d02--Drive! b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
