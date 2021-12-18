/* eslint-env jest */

import fn from './b'

const testCases = [
  {
    name: 'basic A',
    input: `C200B40A82`,
    expected: 3
  },
  {
    name: 'basic B',
    input: `04005AC33890`,
    expected: 54
  },
  {
    name: 'basic C',
    input: `880086C3E88112`,
    expected: 7
  },
  {
    name: 'basic D',
    input: `CE00C43D881120`,
    expected: 9
  },
  {
    name: 'basic E',
    input: `D8005AC2A8F0`,
    expected: 1
  },
  {
    name: 'basic F',
    input: `F600BC2D8F`,
    expected: 0
  },
  {
    name: 'basic G',
    input: `9C005AC2F8F0`,
    expected: 0
  },
  {
    name: 'basic H',
    input: `9C0141080250320F1802104A08`,
    expected: 1
  },
]

describe('d16--Packet-Decoder b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
