/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`.split('\n'),
  expected: null
}]

describe('d25--Sea-Cucumber b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
