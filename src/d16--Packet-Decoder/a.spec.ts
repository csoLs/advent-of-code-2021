/* eslint-env jest */

import fn from './a'

const testCases = [
  {
    name: 'basic A',
    input: `D2FE28`,
    expected: 6
  },
  {
    name: 'basic B',
    input: `38006F45291200`,
    expected: 9
  },
  {
    name: 'basic C',
    input: `EE00D40C823060`,
    expected: 14
  },
  {
    name: 'basic D',
    input: `8A004A801A8002F478`,
    expected: 16
  },
  {
    name: 'basic E',
    input: `620080001611562C8802118E34`,
    expected: 12
  },
  {
    name: 'basic F',
    input: `C0015000016115A2E0802F182340`,
    expected: 23
  },
  {
    name: 'basic G',
    input: `A0016C880162017C3686B18A3D4780`,
    expected: 31
  },
]

describe('d16--Packet-Decoder a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
