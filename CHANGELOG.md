# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/eps1lon/poe-i18n/compare/v0.9.1...HEAD)

## [0.9.1](https://github.com/eps1lon/poe-i18n/compare/v0.9.0...v0.9.1) (2018-05-30)
### Fixed
- Unexpected token when using CommonJS format.

## [0.9.0](https://github.com/eps1lon/poe-i18n/compare/v0.8.0...v0.9.0) (2018-05-30)
### Added 
- `locale-data` for Path Of Exile@`3.2.4c` ([#48](https://github.com/eps1lon/poe-i18n/pull/48))
- `locale-data` for Path Of Exile@`3.2.0` ([#28](https://github.com/eps1lon/poe-i18n/pull/28))
- `groupMods()` to generate a fitting translation for a collection of mods 
  (e.g. mods of a `correct_group`). ([#30](https://github.com/eps1lon/poe-i18n/pull/30))
- `textToStats` (also available in `Format`) which finds every combination
  of stats that could've produced a given text. Check the API docs for more info. ([#24](https://github.com/eps1lon/poe-i18n/pull/24))

### Changed
- Browser build should be used via `unpkg`. Using the `dist/` directly from github
  was a bad idea to begin with. ([#49](https://github.com/eps1lon/poe-i18n/issues/49))
- Value ranges should now be displayed ordered. 
  This caused [#32](https://github.com/eps1lon/poe-i18n/issues/32) and 
  was fixed with [#37](https://github.com/eps1lon/poe-i18n/pull/37).

- Stats with zero or equivalent (range 0 - 0) are now ignored by default. 
  This matches ingame behavior. ([#29](https://github.com/eps1lon/poe-i18n/pull/29)
  and [#39](https://github.com/eps1lon/poe-i18n/pull/39))

### Fixes
- Some translations had standard printf syntax which is not understood by
  `formatStats`. This caused [#34](https://github.com/eps1lon/poe-i18n/issues/34) and is fixed with [#35](https://github.com/eps1lon/poe-i18n/pull/35).
- False positive in `base_chance_to_freeze%` which threw 
  `no param given for formatter`. This fixed [#33](https://github.com/eps1lon/poe-i18n/issues/33) with [#36](https://github.com/eps1lon/poe-i18n/pull/36).
### Removed
- `Format` singleton instance. We do not encourage this pattern. If you rely on
  this pattern can easily create an additional file which exports a singleton.
  ([#45](https://github.com/eps1lon/poe-i18n/issues/45))
  

## [0.8.0](https://github.com/eps1lon/poe-i18n/compare/v0.7.1...v0.8.0) (2018-02-16)
### Added 
- `locale-data` for Path Of Exile@3.1.3 ([#14](https://github.com/eps1lon/poe-i18n/pull/14))
- Typescript declaration files ([#18](https://github.com/eps1lon/poe-i18n/pull/18))
### Internal
- Upgraded `tslint-eslint-rules` to 5.0.0 ([#20](https://github.com/eps1lon/poe-i18n/pull/20))

## [0.7.1](https://github.com/eps1lon/poe-i18n/compare/v0.7.0...v0.7.1) (2017-10-25)
### Fixed
- Fixed bundling error caused by require instead of import.

## [0.7.0](https://github.com/eps1lon/poe-i18n/compare/v0.6.1...v0.7.0) (2017-10-24)
### Added
- Plenty more locale data for *.dat files
### Changed
- formatStats*#configure was removed. Global configuration can be achieved
  with `format
- `formatStats` doesn't immediately throws if no locale datas are provided. 
  Instead it will implicitly fail because the provided stats won't be 
  translated.
### Removed
- replaced `loadLocaleDatas` with `requiredLocaleDatas`. The new method only
  lists and not automatically requires the locale data to prevent webpack
  from automatically bundling all locale datas.

## [0.6.1](https://github.com/eps1lon/poe-i18n/compare/v0.6.0...v0.6.1) (2017-10-20)
### Changed
- build target is now ES5 to support UglifyJS

## [0.6.0](https://github.com/eps1lon/poe-i18n/compare/v0.5.0...v0.6.0) (2017-10-18)
### Added
- Gender and pluralization inflection rules for certain languages for Mods by using 
  [ICU message syntax](http://userguide.icu-project.org/formatparse/messages).
- `inflectionIdentifier` helper for the added inflection rules
### Fixed
- wrong locale codes for simplified and traditional chinese `tw` and `cn` never
  were correct locale codes but country codes. The correct locales are `zh-tw` 
  and `zh-cn`.

## [0.5.0](https://github.com/eps1lon/poe-i18n/compare/v0.4.0...v0.5.0) (2017-10-17)
### Added
- BaseItemTypes and Mods for Simplified Chinese and Traditional Chinese
### Changed
- renamed `zh-Hans` to `cn` and `zh-Hant` to `tw` for easier integration with
  other i18n packages.

## [0.4.0](https://github.com/eps1lon/poe-i18n/compare/v0.3.1...v0.4.0) (2017-10-16)
### Added
- locale data from Path of Exile version 3.0.2

## [0.3.1](https://github.com/eps1lon/poe-i18n/compare/v0.3.0...v0.3.1) (2017-10-11)
### Added
- Locale data for `BaseItemTypes` and `Mods`. They only include names. Currently
  only supports en, pt, ru and thai since those are the only ones supported by
  the steam client. If someone has access to the chinese client please open an
  issue.
### Fixed
- `Cannot find module skill_meta.json`. Typescript does not include build related
  tasks. May revert to json format when using webpack or rollup.

## [0.3.0](https://github.com/eps1lon/poe-i18n/compare/v0.2.1...v0.3.0) (2017-10-10)
### Added
- `formatGemStats`. Check the API docs for more info.
- `loadLocaleDatas` and `loadLocaleDatasFor` helpers. Check the API docs for more info.
### Changed
- Ranges where min and max value are equal are now displayed as single values. (Closes [#2](https://github.com/eps1lon/poe-i18n/issues/2))

## [0.2.1](https://github.com/eps1lon/poe-i18n/compare/v0.2.0...v0.2.1) (2017-20-04)
### Added
- `formatStats` now supports a range as a stat value. Check out the API documentation
  for further information.

## [0.2.0](https://github.com/eps1lon/poe-i18n/compare/v0.1.3...v0.2.0) (2017-20-03)
### Added
- `formatStats` now has a `fallback` option. Possible options can be found in
  the documentation.
### Changed
- `formatStats` now defaults to `0` for stats not provided instead of throwing.
  This was necessary to translate e.g. `chance_to_freeze` on Wands which didn't
  include `always_freeze`. By defaulting to 0 we are able to translate it but 
  allow translations like `5 - 0 added Physical Damage` when omitting 
  `local_maximum_added_physical_damage`.
- `formatStats` is now called with an options object instead of the whole locale data.
  At the same time you can permanently set it via `formatStats.configure`. 
  `configure` just takes the same option argument and `formatStats` will use
  those as default for future calls.

## [0.1.3](https://github.com/eps1lon/poe-i18n/compare/v0.1.2...v0.1.3) (2017-20-03)
### Fixed
- Error when attempting to translate stats with reminder strings. Translation for
  those is currently not supported.
- An error when translating aliased stats. They were considered as required 
  params.

## [0.1.2](https://github.com/eps1lon/poe-i18n/compare/v0.1.1...v0.1.2) (2017-20-03)
### Added
- Some missing translations in `locale-data`. They were missing because of some
  rogue whitespace in the descriptions.txt
### Changed
- Hidden stats are now returned as `{stat_id} (hidden)` instead of throwing

## [0.1.1](https://github.com/eps1lon/poe-i18n/compare/v0.1.0...v0.1.1) (2017-10-02)
### Added
- `locale-data` to package parsed from the game client
### Improved
- Docs with API documentation, detailed readme and usage examples

## [0.1.0](https://github.com/eps1lon/poe-i18n/compare/v0.0.1-apha...v0.1.0) (2017-10-02)
### Improved
- Test coverage for `formatStats`. Seems stable but needs more test cases in 
  production

## 0.0.1-alpha (2017-09-29)
### Added
- locale-data for stat_descriptions
- unstable `formatStats`
