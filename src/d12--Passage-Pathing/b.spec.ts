/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split('\n'),
  expected: 36
},
{
  name: 'larger',
  input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.split('\n'),
  expected: 103
},
{
  name: 'largest',
  input: `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split('\n'),
  expected: 3509
},
]

describe('d12--Passage-Pathing b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
