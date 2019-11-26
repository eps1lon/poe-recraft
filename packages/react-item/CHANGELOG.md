# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/eps1lon/poe-react-item/compare/v0.4.1...HEAD)
### Added
- default poe colors as an alternative to `*.scss`. 
  `import { colors } from "poe-components-item"`.

### Fixed
- BREAKING: Use `typescript@3.2.x`
- Implicits, utility mods and Enchantments not being displayed in any `Popup`.
- Mod groups not being separated correctly.

## [0.4.1](https://github.com/eps1lon/poe-react-item/compare/v0.4.0...v0.4.1) (2018-06-23)
### Fixed
- ItemPopupIntl throwing with `no formatter given.`.

## [0.4.0](https://github.com/eps1lon/poe-react-item/compare/v0.3.0...v0.4.0) (2018-06-23)
### Added
- `extended` prop for `ApiPopup` and `ItemPopup` which has the same shape as 
  the official trade API and displays tiers and ranges for stats

### Changed
- Use consistent display of value ranges (i.e. use en-dash for ranges).

### Fixed
- Providing a name for the base item did not actually use this value as a fallback.
  It now correctly checks first for the id and tries i18n and then considers
  the name property.

## [0.3.0](https://github.com/eps1lon/poe-react-item/compare/v0.2.1...v0.3.0) (2018-06-16)
### Added
- `PopupIntl` and `ApiPopupIntl` for i18n support via `react-intl`. The original 
  versions (`Popup` and `ApiPopup`) now have a `messages` prop which enables
  i18n support. The `*Intl` components take their messages from an `IntlProvider`
  component from `react-intl` in the component tree. 

## [0.2.1](https://github.com/eps1lon/poe-react-item/compare/v0.2.0...v0.2.1) (2018-06-12)
### Fixed
- physical damage not showing
- false negatives on type checker

## [0.2.0](https://github.com/eps1lon/poe-react-item/compare/v0.1.1...v0.2.0) (2018-06-12)
### Added
* `Corrupted` display
### Fixed
* missing `themes/` dir
### Changed
* Popups can  now have either a fixed width or compute their width which 
  should result in the same width as items on the PoE website.