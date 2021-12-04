#!/bin/bash
. .env

currentYear=`date +'%Y'`
year=$currentYear
echo "What year should we init? ($year)"
read yearInput
[ -n "$yearInput" ] && year=$yearInput

mkdir -p leaderboard
cd leaderboard

input=$(curl 'https://adventofcode.com/'$year'/leaderboard/private/view/'$LEADERBOARD_ID'.json' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0' \
-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' \
-H 'Accept-Language: sv,en-US;q=0.7,en;q=0.3' --compressed \
-H 'Referer: https://adventofcode.com/'$year'' \
-H 'Connection: keep-alive' \
-H 'Cookie: session='$SECRET_COOKIE'' \
-H 'Upgrade-Insecure-Requests: 1' \
-H 'Sec-Fetch-Dest: document' \
-H 'Sec-Fetch-Mode: navigate' \
-H 'Sec-Fetch-Site: same-origin' \
-H 'Sec-Fetch-User: ?1' \
-H 'Cache-Control: max-age=0')

touch "data.$year.json"

echo "$input" > "data.${year}.json"
