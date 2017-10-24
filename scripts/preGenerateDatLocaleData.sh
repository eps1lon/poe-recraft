#!/bin/bash

declare -A codes
case "$1" in
"steam")
  codes[de]=German
  codes[en]=English
  codes[es]=Spanish
  codes[fr]=French
  codes[pt]=Portuguese
  codes[ru]=Russian
  codes[th]=Thai
  ;;
"tencent")
  codes["zh-cn"]="Simplified Chinese"
  ;;
"garena")
  codes["zh-tw"]="Traditional Chinese"
  ;;
*)
  echo "set distributor as first arg" 1>&2
  exit 64
  ;;
esac

dats='AchievementItems Achievements ActiveSkills Ascendancy BaseItemTypes BuffDefinitions Characters CharacterStartStates Chests CraftingBenchOptions Commands CurrencyItems DailyMissions ItemClasses ItemThemes LabyrinthSecrets Labyrinths MapPins Mods MonsterVarieties NPCs PantheonPanelLayout PassiveSkills Prophecies Quest Realms ShopItem ShopToken Shrines SkillGems WarbandsPackMonsters WorldAreas'

for code in "${!codes[@]}"
do
  echo "exporting ${code}"
  pypoe_exporter dat json tmp/exports/${code}.json --files ${dats} --language "${codes[$code]}"
done