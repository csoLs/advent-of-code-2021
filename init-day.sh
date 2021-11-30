#!/bin/bash

echo What date should we init?
read d
echo What\'s todays title?
read title

mkdir d$d--$title
cd d$d--$title

touch a.ts a.test.ts b.ts b.test.ts input.ts README.md

echo "import fsInput from './input'

const fn = () =>
fn(fsInput)

export.default = fn" | tee a.ts > b.ts

echo "import fn from './a'

const testcases = [{
    input: '',
    expected: ''
  }
]

testcases.map(tc => {
    const res = fn(tc.input)
    console.log(res === tc.expected ? 'PASSED' : \`FAILED WITH INPUT \${tc.input}, GOT \${res} EXPECTED \${tc.expected}\`)
})" | tee a.test.ts > b.test.ts

echo "const input = ``

export.default = input.split('\n')" > input.ts

echo "## References
- https://adventofcode.com/2021/day/$d" > README.md
