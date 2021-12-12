/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split('\n'),
  expected: 10
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
  expected: 19
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
  expected: 226
},
]

describe('d12--Passage-Pathing a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
