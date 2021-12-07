#!/bin/bash
. .env

currentYear=`date +'%Y'`
year=$currentYear
echo "What year should we init? ($year)"
read yearInput
[ -n "$yearInput" ] && year=$yearInput

echo What date should we init?
read d
if [[ $d -eq 0 ]] ; then
    echo 'Missing date parameter'
    exit 1
fi

echo What\'s todays title?
read title

printf -v fullDigit "%02d" $d

if [[ $year -eq $currentYear ]] ;
  then
    mkdir -p src/d$fullDigit--$title
    cd src/d$fullDigit--$title
  else
    mkdir -p src/${year}/d$fullDigit--$title
    cd src/${year}/d$fullDigit--$title
fi

input=$(curl 'https://adventofcode.com/'$year'/day/'$d'/input' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0' \
-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' \
-H 'Accept-Language: sv,en-US;q=0.7,en;q=0.3' --compressed \
-H 'Referer: https://adventofcode.com/'$year'/day/'$d'' \
-H 'Connection: keep-alive' \
-H 'Cookie: session='$SECRET_COOKIE'' \
-H 'Upgrade-Insecure-Requests: 1' \
-H 'Sec-Fetch-Dest: document' \
-H 'Sec-Fetch-Mode: navigate' \
-H 'Sec-Fetch-Site: same-origin' \
-H 'Sec-Fetch-User: ?1' \
-H 'Cache-Control: max-age=0')

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
  input: ``.split('\n'),
  expected: null
}]

describe('d$fullDigit--$title a', () => {
  testCases.forEach(tc => {
    it(\`should handle \${tc.name} test\`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})" > a.spec.ts

echo "/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: ``.split('\n'),
  expected: null
}]

describe('d$fullDigit--$title b', () => {
  testCases.forEach(tc => {
    it(\`should handle \${tc.name} test\`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})" > b.spec.ts

echo "const input = \`${input}\`

export default input.split('\n')" > input.ts

echo "## References
- https://adventofcode.com/$year/day/$d" > README.md
