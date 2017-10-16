#!/bin/bash
declare -A codes
codes[de]=German
codes[en]=English
codes[es]=Spanish
codes[fr]=French
codes[pt]=Portuguese
codes[ru]=Russian
codes[th]=Thai

dats='BaseItemTypes Mods'

for code in "${!codes[@]}"
do
  echo "exporting ${code}"
  pypoe_exporter dat json tmp/exports/${code}.json --files ${dats} --language ${codes[$code]}
done