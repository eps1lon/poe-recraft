#!/bin/bash
declare -A codes
codes[en]=English
codes[pt]=Portuguese
codes[ru]=Russian
codes[th]=Thai

dats='BaseItemTypes Mods'

for code in "${!codes[@]}"
do
  echo "exporting ${code}"
  pypoe_exporter dat json tmp/exports/${code}.json --files ${dats} --language ${codes[$code]}
done