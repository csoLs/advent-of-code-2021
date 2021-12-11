/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n'),
  expected: 195
}]

describe('d11--Dumbo-Octopus b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
