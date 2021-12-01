#!/bin/bash

echo What date should we init?
read d
echo What\'s todays title?
read title

mkdir -p src/d$d--$title
cd src/d$d--$title

touch a.ts a.spec.ts b.ts b.spec.ts input.ts README.md

echo "import fsInput from './input'

const fn = (input: any) => {
  return null
}
fn(fsInput)

export default fn" | tee a.ts > b.ts

echo "/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: [],
  expected: null
}]

describe('d$d--$title a', () => {
  testCases.forEach(tc => {
    it(\`should handle \${tc.name} test\`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})" | tee a.spec.ts

echo "/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: [],
  expected: null
}]

describe('d$d--$title b', () => {
  testCases.forEach(tc => {
    it(\`should handle \${tc.name} test\`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})" | tee b.spec.ts

echo "const input = \`\`

export default input.split('\n')" > input.ts

echo "## References
- https://adventofcode.com/2021/day/$d" > README.md
