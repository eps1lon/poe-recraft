# Developer Documentation

## Find translation in formatStats for stat id `id`
Idea is that `meta.include` are fallback files. Sometimes translations 
are accessed direct by id sometimes the ids are included in stats.

1. Use `description` in `datas` value for key `options.start_file`
2. If `description` undefined goto #9 else goto #3
3. Try `value` for key `id` in `description.data`
4. If `value` undefined goto #5 else translate with `value`
5. Find `value` in values of `description.data` for which `value.stats` includes `id`
6. If `value` undefined goto #7 else translate with `value`
7. Set `description` to value in `datas` for key `description.meta.include`
8. Goto #2
9. mark `id` as untranslated

## About inflection rules
`Dat` files in `Content.ggpk` include inflection rules for some languages. It
appears that the proper translation is determined by identifiers which include
grammatical gender and plural form (e.g. `MS` for `masculine singular`). The 
proper inflection rule is determined from the context (e.g. BaseItemTypes have 
a inflection field which gets passed to it's prefix and suffix mods in case it's magic
rarity).

## On the purpose of skillpopup_filter
Initially I though those are stat ids that are whitelisted when displaying
granted effects. Problem is that e.g. Arctic Breath has `spell_minimum_base_cold_damage`
which is not included anywhere. There is however the `spell_damage` group which
includes `spell_cold_damage_range` which is an alias in `skil_stat_descriptions`
but the required stats only include`spell_minimum_cold_damage`.

So in this case it clearly doesn't function as a whitelist. Just using every
granted effect stat also doesn't work because there are e.g. `base_is_projectile`
which is nevery displayed anywhere.

UPDATE: 
Using the filter as a lookup strategy. First remove the `base_` infix in the 
provided stats. Then search in every mentioned description in the filter for the 
stats. If none is found mark the stat as NO_DESCRIPTION.

UPDATE2:
Removing the `base_` infix is problematic on Arctic Breath. It should use
the translation from stat_descriptions but already finds a match in skill_stat_descriptions
with the infix removed

UPDATE3:
skillpopup_filter might only have to do something with tooltip.