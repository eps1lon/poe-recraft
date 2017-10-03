# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/eps1lon/poe-mods/compare/v0.1.2...HEAD)

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