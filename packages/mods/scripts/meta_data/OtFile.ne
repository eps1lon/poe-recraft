# text attributes:
# - blank lines removed
# - comments removed

main -> OtFile

OtFile -> 
  OtVersion Blankline
  Extends Blankline:?
  OtFascades
  {% ([version, , _extends, , fascades]) => ({version, extends: _extends, ...entriesToObj(fascades)}) %}

OtVersion -> "version" Whitespaces Number {% ([,, version]) => version %}
Extends -> "extends" Whitespaces StringLiteral {% ([,, _extends]) => _extends %}
OtFascades ->
  (OtFascade Blankline:*):*
  {% ([result]) => result.map(([[f]]) => f) %}
OtFascade -> 
  Base 
  | Mods 
  | LocalStats 
  | AttributeRequirements 
  | Sockets 
  | Quality 
  | Armour
  | Charges
  | Map
  | Weapon
  | Shield
  | Imprint
  | Usable
  | Stack
  | CapturedMonster
  | Prophecy
  | Flask
  | SkillGem
  | Quest

# macros
Fascade[NAME, PROPS] -> 
  $NAME Blankline 
  "{" Blankline 
  $PROPS:*
  "}"
  {% ([,,,,result]) => entriesToObj(result.map(([[prop]]) => prop)) %}
FascadeProp[NAME, VALUE_TYPE] ->
  Whitespaces $NAME Whitespaces "=" Whitespaces $VALUE_TYPE Blankline
  {% ([,,,,,[value]]) => value %}

# fascades
Base ->
  Fascade["Base", BaseProp]
  {% entry('base', obj => arrayCast(obj, 'tags', 'remove_tags')) %}
BaseProp -> 
  BaseXSize
  | BaseYSize
  | BaseTag
  | BaseLevel
  | BaseDescription
  | BaseRemoveTag
BaseLevel ->
  FascadeProp["base_level", Number]
  {% entry('base_level') %}
BaseTag -> FascadeProp["tag", StringLiteral]  {% entry('tags') %}
BaseXSize -> FascadeProp["x_size", Number]  {% entry('x_size') %}
BaseYSize -> FascadeProp["y_size", Number]  {% entry('y_size') %}
BaseDescription -> 
  FascadeProp["description_text", StringLiteral]
  {% entry('description') %}
BaseRemoveTag ->
  FascadeProp["remove_tag", StringLiteral]
  {% entry('remove_tags') %}
 
Mods -> Fascade["Mods", ModsProp] {% entry('mods') %}
ModsProp -> 
  ModsDescriptionsList | ModEnableRarity | ModDisableRarity | ModsInventoryType
ModsDescriptionsList ->
  FascadeProp["stat_description_list", StringLiteral] 
  {% entry('stat_description_list') %}
ModEnableRarity ->
  FascadeProp["enable_rarity", StringLiteral] 
  {% entry('enable_rarities') %}
ModDisableRarity ->
  FascadeProp["disable_rarity", StringLiteral] 
  {% entry('disable_rarities') %}
ModsInventoryType -> 
	FascadeProp["inventory_type", StringLiteral] 
	{% entry('inventory_type') %}

LocalStats ->
  Fascade["LocalStats", LocalStatsProp]
  {% entry('local_stats') %}
LocalStatsProp -> NoProp
  
AttributeRequirements -> 
  Fascade["AttributeRequirements", AttributeRequirementsProp] 
  {% entry('attribute_requirements') %}
AttributeRequirementsProp -> 
  AttributeRequirementsStr | AttributeRequirementsInt | AttributeRequirementsDex
AttributeRequirementsStr ->
  FascadeProp["strength_requirement", Number] 
  {% entry('strength') %}
AttributeRequirementsInt ->
  FascadeProp["intelligence_requirement", Number] 
  {% entry('intelligence') %}
AttributeRequirementsDex ->
  FascadeProp["dexterity_requirement", Number] 
  {% entry('dexterity') %}

Sockets ->
  Fascade["Sockets", SocketsProps]
  {% entry('sockets') %}
SocketsProps -> SocketsInfo | SocketsLockWhenFull
SocketsInfo ->
  FascadeProp["socket_info", StringLiteral] 
  {% entry('info') %}
SocketsLockWhenFull ->
  FascadeProp["lock_sockets_when_full", Boolean] 
  {% entry('lock_when_full') %}
  
Quality ->
  Fascade["Quality", QualityProp]
  {% entry('quality') %}
QualityProp -> QualityMax
QualityMax ->
  FascadeProp["max_quality", Number] 
  {% entry('max') %}
  
Armour ->
  Fascade["Armour", ArmourProp]
  {% entry('armour') %}
ArmourProp -> NoProp

Charges ->
  Fascade["Charges", ChargesProp]
  {% entry('charges') %}
ChargesProp -> ChargesMax | ChargesConsumed
ChargesMax ->
  FascadeProp["max_charges", Number] 
  {% entry('max') %}
ChargesConsumed ->
  FascadeProp["charges_per_use", Number] 
  {% entry('consumed_per_use') %}

Map ->
  Fascade["Map", MapProp]
  {% entry('map') %}
MapProp -> NoProp

Weapon ->
  Fascade["Weapon", WeaponProp]
  {% entry('weapon') %}
WeaponProp -> 
  WeaponClass
  | WeaponMinAttackDistance 
  | WeaponMaxAttackDistance
  | WeaponMinDamage
  | WeaponMaxDamage
  | WeaponSpeed
  | WeaponCritChance
  | WeaponAccuracy
WeaponClass ->
  FascadeProp["weapon_class", StringLiteral] 
  {% entry('weapon_class') %}
WeaponMinAttackDistance ->
  FascadeProp["minimum_attack_distance", Number] 
  {% entry('minimum_attack_distance') %}
WeaponMaxAttackDistance ->
  FascadeProp["maximum_attack_distance", Number] 
  {% entry('maximum_attack_distance') %}
WeaponMinDamage ->
  FascadeProp["minimum_damage", Number] 
  {% entry('minimum_damage') %}
WeaponMaxDamage ->
  FascadeProp["maximum_damage", Number] 
  {% entry('maximum_damage') %}
WeaponSpeed ->
  FascadeProp["weapon_speed", Number] 
  {% entry('weapon_speed') %}
WeaponCritChance ->
  FascadeProp["critical_chance", Number] 
  {% entry('critical_chance') %}
WeaponAccuracy ->
  FascadeProp["accuracy_rating", Number] 
  {% entry('accuracy_rating') %}
  
Shield ->
  Fascade["Shield", ShieldProp]
  {% entry('shield') %}
ShieldProp -> ShieldBlock
ShieldBlock ->
  FascadeProp["block_percentage", Number] 
  {% entry('block') %}
  
Imprint ->
  Fascade["Imprint", ImprintProp]
  {% entry('imprint') %}
ImprintProp -> NoProp

Usable ->
  Fascade["Usable", UsableProp]
  {% entry('usable') %}
UsableProp -> UsableType | UsableAction | UsableWhenSocketsLocked
UsableType ->
  FascadeProp["use_type", StringLiteral] 
  {% entry('type') %}
UsableAction ->
  FascadeProp["action", StringLiteral] 
  {% entry('action') %}
UsableWhenSocketsLocked ->
  FascadeProp["usable_when_sockets_locked", Boolean] 
  {% entry('usable_when_sockets_locked') %}


Stack ->
  Fascade["Stack", StackProp]
  {% entry('stack') %}
StackProp -> StackMax | StackFunction
StackMax ->
  FascadeProp["max_stack_size", Number] 
  {% entry('max_size') %}
StackFunction ->
  FascadeProp["function_text", StringLiteral] 
  {% entry('function_text') %}

CapturedMonster ->
  Fascade["CapturedMonster", CapturedMonsterProp]
  {% entry('captured_monster') %}
CapturedMonsterProp -> NoProp

Prophecy ->
  Fascade["Prophecy", ProphecyProp]
  {% entry('prophecy') %}
ProphecyProp -> NoProp

Flask ->
  Fascade["Flask", FlaskProp]
  {% entry('flask') %}
FlaskProp -> NoProp

SkillGem ->
  Fascade["SkillGem", SkillGemProp]
  {% entry('skill_gem') %}
SkillGemProp -> NoProp

Quest ->
  Fascade["Quest", QuestProp]
  {% entry('quest') %}
QuestProp -> 
  QuestRemoveFlag 
  | QuestLeagueRemoveFlag
  | QuestGrantFlag
  | QuestUseFlag
  | QuestExtraFlag
  | QuestExtraFlag2
  | QuestIsMap
  | QuestCanSell
QuestRemoveFlag ->
  FascadeProp["remove_flag", StringLiteral] 
  {% entry('remove_flags') %}
QuestLeagueRemoveFlag ->
  FascadeProp["league_remove_flag", StringLiteral] 
  {% entry('league_remove_flags') %}
QuestGrantFlag ->
  FascadeProp["grant_flag", StringLiteral] 
  {% entry('grant_flags') %}
QuestUseFlag ->
  FascadeProp["use_flag", StringLiteral] 
  {% entry('use_flags') %}
QuestExtraFlag ->
  FascadeProp["extra_flag", StringLiteral] 
  {% entry('extra_flag') %}
QuestExtraFlag2 ->
  FascadeProp["extra_flag2", StringLiteral] 
  {% entry('extra_flag2') %}
QuestIsMap ->
  FascadeProp["is_map", Boolean] 
  {% entry('is_map') %}
QuestCanSell ->
  FascadeProp["can_sell", Boolean] 
  {% entry('can_sell') %}

NoProp -> Blankline {% () => ['__has_blanks__', true] %}

# primitives
Number -> 
  ("+" | "-" | null) [0-9]:+ 
  {% ([[sign], digits]) => +`${sign || '+'}${digits.join('')}` %}
StringLiteral -> "\"" [^"]:+ "\"" {% ([, text]) => text.join('') %}
Boolean -> ("true" | "false") {% ([[flag]]) => flag === "true" %}

# util
Newline -> "\r":? "\n" {% id %}
Blankline -> Whitespaces:? Newline
Whitespace -> " " | "\t"
Whitespaces -> Whitespace:+ {% ebnfToString %}

@{%
  const ebnfToString = ([chars]) => chars.join('');
  // reverse of Object.entries() with the addition of merging duplicate keys
  // into an array
  const entriesToObj = entries => entries.reduce((acc, [key, value]) => {
	  
	  if (Array.isArray(acc[key])) {
	  	acc[key].push(value)
	  } else if (acc.hasOwnProperty(key)) {
	  	acc[key] = [acc[key], value];
	  } else {
	  	acc[key] = value;
	  }
	  return acc;
  }, {});
  // returns a function that is imilar to nearleys builtin id but returns
  // an entry pair for obj
  const entry = (key, transform = id => id) => ([value]) => [key, transform(value)];
  // forces {keys} to be an array type, if the property is undefined
  // an empty array is set (= type never[])
  const arrayCast = (obj, ...keys) => {
    for (const key of keys) {
      if (obj[key] === undefined) {
        obj[key] = [];
      } else if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]]
      }
    }
    return obj;
  }
%}