# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/eps1lon/poe-mods/compare/v0.2.0...HEAD)
### Added
- `formatStats` now supports a range as a stat value. Check out the API documentation
  for further information.

## [0.2.0](https://github.com/eps1lon/poe-mods/compare/v0.1.3...v0.2.0) (2017-20-03)
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

## [0.1.3](https://github.com/eps1lon/poe-mods/compare/v0.1.2...v0.1.3) (2017-20-03)
### Fixed
- Error when attempting to translate stats with reminder strings. Translation for
  those is currently not supported.
- An error when translating aliased stats. They were considered as required 
  params.

## [0.1.2](https://github.com/eps1lon/poe-mods/compare/v0.1.1...v0.1.2) (2017-20-03)
### Added
- Some missing translations in `locale-data`. They were missing because of some
  rogue whitespace in the descriptions.txt
### Changed
- Hidden stats are now returned as `{stat_id} (hidden)` instead of throwing

## [0.1.1](https://github.com/eps1lon/poe-mods/compare/v0.1.0...v0.1.1) (2017-10-02)
### Added
- `locale-data` to package parsed from the game client
### Improved
- Docs with API documentation, detailed readme and usage examples

## [0.1.0](https://github.com/eps1lon/poe-mods/compare/v0.0.1-apha...v0.1.0) (2017-10-02)
### Improved
- Test coverage for `formatStats`. Seems stable but needs more test cases in 
  production

## 0.0.1-alpha (2017-09-29)
### Added
- locale-data for stat_descriptions
- unstable `formatStats`