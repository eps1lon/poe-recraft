# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased](https://github.com/eps1lon/poe-mods/compare/v1.12.0...HEAD)
### Breaking
- Path of Exile@`3.5.0` data. Includes MasterBench overhaul.
  ([#93](https://github.com/eps1lon/poe-mods/pull/93)).

### Fixed
- `BestiaryMods` being considered implicts. ([#85](https://github.com/eps1lon/poe-mods/pull/85))

## [1.12.0](https://github.com/eps1lon/poe-mods/compare/v1.11.0...v1.12.0) (2018-06-24)
### Added
- `IncursionTempleMods` for mods that can spawn on items from chests in T3
  Temples. ([#69](https://github.com/eps1lon/poe-mods/pull/69))
- Explicit ypings for `data/**/*.json` files. This removed and added some properties. 
  These files were always supposed to match interfaces in `schema`. Every
  json file has a corresponding type in `schema` e.g. ´data/items.json` is of 
  type `schema.Items`. ([#72](https://github.com/eps1lon/poe-mods/pull/72))
- Complete socketing, linking and coloring capability to Item.Sockets.
  ([#74](https://github.com/eps1lon/poe-mods/pull/74))
- `MasterBenchOption` now supports sockets, links, remove crafted Mod etc. This
  changed the behavior of `MasterBenchOption.isModApplicableTo()`. It returns
  now truthy flags for white items because it assumes that the rarity is upgraded.

  `MasterBench` no has all options. Zana's "Fortune favours the brave" is still
  not supported.
  ([#79](https://github.com/eps1lon/poe-mods/pull/79))
- `SemanticSerializer` for items which aims at providing a relativley flat 
  property tree for given items. It can serialize and deserialize.
  ([#83](https://github.com/eps1lon/poe-mods/pull/83))
### Fixed
- Fixed master meta mods not being applicable to items.
  ([#77](https://github.com/eps1lon/poe-mods/pull/77))
### Changed
- Browser build should be used via `unpkg`. Using the `dist/` directly from github
  was a bad idea to begin with. ([#81](https://github.com/eps1lon/poe-i18n/issues/81))

## [1.11.0](https://github.com/eps1lon/poe-mods/compare/v1.10.0...v1.11.0) (2018-05-31)
### Added
- Path of Exile@`3.3.0` data. Some mod domains were changed.
  ([#67](https://github.com/eps1lon/poe-mods/pull/67)).

## [1.10.0](https://github.com/eps1lon/poe-mods/compare/v1.9.0...v1.10.0) (2018-05-30)

### Added 
- Path of Exile@`3.2.4c` data ([#62](https://github.com/eps1lon/poe-mods/pull/62)).

### Changed
- Bumped `lodash` dependency to `^4.17.10` which fixes a security invulnerability.
  ([#65](https://github.com/eps1lon/poe-mods/pull/65))

### Internal
- Moved to `jest@^23.0.1`. ([#64](https://github.com/eps1lon/poe-mods/pull/64))

## [1.9.0](https://github.com/eps1lon/poe-mods/compare/v1.8.0...v1.9.0) (2018-05-30)

### Added
- various generators for certain mod groups (`BestiaryAspectMods`, `ElderMods`, 
  `MasterSignatureMods`, `ShapedMods`, `WarbandsMods`). 
  ([#47](https://github.com/eps1lon/poe-mods/pull/47))
- `Essence` mod generator. Adds one guarenteed mod (the essence mod) and fills
  up the rest like an Alchemy. `Essence.modsFor` only returns the guaranteed mod.  and fills
  up the rest like an Alchemy. `Essence.modsFor` only returns the guaranteed mod. 
  Properties for all essences are included in `data/essences.json`. ([#43](https://github.com/eps1lon/poe-mods/pull/43))
- Added `ignore_meta_mods` option to `Scouring.applyTo` which ignores locked
  prefixes and locked suffixes meta mods. ([#43](https://github.com/eps1lon/poe-mods/pull/43))

### Fixed
- Fixed `ItemShowcase` returning true from `isApplicableTo`  ([#41](https://github.com/eps1lon/poe-mods/pull/42)). 
  It is not supposed to provide any functionallity upon application. 
  ([#42](https://github.com/eps1lon/poe-mods/pull/42))
- Wrong mods for Abyss Jewels being listed. ([#45](https://github.com/eps1lon/poe-mods/pull/45))
- Fixed item quality not affecting Armour, Evasion, Energy Shield and Physical 
  Damage. Reported in [#38](https://github.com/eps1lon/poe-mods/issues/38) and
  fixed in [#52](https://github.com/eps1lon/poe-mods/pull/52)
- Reduced attribute requirements mod not applying to attribute requirements. 
  Reported in [#35](https://github.com/eps1lon/poe-mods/issues/35) and
  fixed in [#53](https://github.com/eps1lon/poe-mods/pull/53).
- Fixed Normal items with quality not being prefixed with `Superior`. 
  Reported in [#59](https://github.com/eps1lon/poe-mods/issues/59) and
  fixed in [#60](https://github.com/eps1lon/poe-mods/pull/60).

## [1.8.0](https://github.com/eps1lon/poe-mods/compare/v1.7.0...v1.8.0) (2018-03-04)

### Added
- 3.2.0 data ([#39](https://github.com/eps1lon/poe-mods/pull/39))
- generated API docs https://eps1lon.github.io/poe-mods ([#26](https://github.com/eps1lon/poe-mods/pull/26))
- usable items and mods as json that work with this package. Note that this
  data is extensive and contains entities that have no meaning in this package.
  It is adviced to filter this data for your own usage if you use it in a online
  propduction environment. ([#33](https://github.com/eps1lon/poe-mods/pull/33))
- Data for equipment, prefix and suffix only was included. ([c70b406969e23ae68f77fd170a6c207975ea3a1b](https://github.com/eps1lon/poe-mods/commit/c70b406969e23ae68f77fd170a6c207975ea3a1b))
- Shield and Weapon properties. This also changed the api of armour properties.
  ([#36](https://github.com/eps1lon/poe-mods/pull/36))

### Changed
- props schema now uses string ids as primary whenever possible. The primaries
  originated from the row number and changed between patches which needlessly 
  broke dependent packages. ([#32](https://github.com/eps1lon/poe-mods/pull/32))
- Updated meta_datas (AbstractJewels and probably other important ones were missing) ([#34](https://github.com/eps1lon/poe-mods/pull/34))

### Removed
- `AtlasNode#humanId()` was a bad idea after all. We just use the actual id
  with no mention about wheather this is human readable or not. ([#32](https://github.com/eps1lon/poe-mods/pull/32))

## [1.7.0](https://github.com/eps1lon/poe-mods/compare/v1.6.0...v1.7.0) (2018-02-10)
### Added
- shaper and elder items (and therefore ability to check for those mods) ([#23](https://github.com/eps1lon/poe-mods/pull/23)) 
- `PropsTable#fromId`, `PropsTable#fromName` and `PropsTable#fromProp` ([#22](https://github.com/eps1lon/poe-mods/pull/22))

## [1.6.0](https://github.com/eps1lon/poe-mods/compare/v1.5.3...v1.6.0) (2018-02-10)
### Changed
- Moved from Flow to Typescript (PR [#18](https://github.com/eps1lon/poe-mods/pull/18))

## [1.5.3](https://github.com/eps1lon/poe-mods/compare/v1.5.2...v1.5.3) (2017-10-30)
### Changed
- Armour properties now correctly round their values with zero precision (floored just like ingame).

## [1.5.2](https://github.com/eps1lon/poe-mods/compare/v1.5.1...v1.5.2)
### Fixed
- Generators ignored wether a mod was contained in Implicits or Affixes when checking if the mod group was already present. (Fixes [#1](https://github.com/eps1lon/poe-mods/issues/1))

## [1.5.1](https://github.com/eps1lon/poe-mods/compare/v1.5.0...v1.5.1)
### Changed
- `Itemshowcase` now considers the item to be rare. Previously possible explicit
  mods were hidden once the Item had one prefix or suffix.
### Fixed
- `Container` interface is now exported correctly

## [1.5.0](https://github.com/eps1lon/poe-mods/compare/v1.4.0...v1.5.0) (2017-09-29)
### Breaking
- Removed the `Stats` component from `Item` for Stats from Mods can directly be
  access via `#stats`. Things like ES or damage are now properties of 
  specialized classes.
- `ValueRange` is now a specialized class as opposed to being a tuple
### Added
- `Container#any` and `ItemComponent#any` helpers
- `Properties` item component. Currently only `ArmourProperties` are implemented.

## [1.4.0](https://github.com/eps1lon/poe-mods/compare/v1.3.5...v1.4.0) (2017-09-27)
### Breaking
- public API for `Item`: Items now have different components. This was necessary
  for future additions of stats, links and more. The class itself got to bloated
  and this helps to discover the API. Component methods that would mutate the 
  Component return a new Item instance with these values.
### Added
- `PropsTable#from(finder)` builds an instance from the props for which the predicate is true
- polymorphic types `Generator` and `Container` to exports
### Changed
- Duplicate affecting Mods are now excluded on `AtlasNode`

## [1.3.5](https://github.com/eps1lon/poe-mods/compare/v1.3.4...v1.3.5) (2017-09-25)
### Added
- Orb Generators now consider the spawnweight when choosing a Mod
- Maximum number of sockets for Items
### Fixed
- Output path in `dev:schema` script
### Changed
- Reduced required properties for `AtlasNodeProps`, `BaseItemTypeProps`, `CraftingBenchOptionsProps` and `ModProps`.

  Basically unnecessary properties were removed
- Removed unsafe getter/setter option in flowconfig. It was ignored if the package
  was consumed by a third party so we added potentially more dangerous `$FlowFixMe`
  annotations. They should periodically be ignored on a Flow check.
- Sextants now reroll instead of adding Mods

## [1.3.4](https://github.com/eps1lon/poe-mods/compare/v1.3.3...v1.3.4)  (2017-09-23)
### Added
- Added `AtlasNode`, `Mod`, `Implicits`, `Item`, `Stat` and `anySet` to API exports 
- Added `Flags` and `GeneratorDetails` type exports
- Added `AtlasNode#humanId` for easier usage in `Atlas#method(HumanId)`

## [1.3.3](https://github.com/eps1lon/poe-mods/compare/v1.3.2...v1.3.3)  (2017-09-23)
### Changed
- Import of Orb of Annulment is now possible via ```import { Annulment } from 'poe-mods'```. It was previously hidden under `poe-mods/lib/generators/item_orbs/index`
- Explicitly name the exports in `index.js` for easier lookup of available methods
- Follow module resolution convention that `module` is resolved to `module/index` if `module.js` is not available.

## [1.3.2](https://github.com/eps1lon/poe-mods/compare/v1.3.1...v1.3.2)  (2017-09-23)
### Fixed
- Added missing dependency `flow-runtime`. It used to be in devDependency.

## [1.3.1](https://github.com/eps1lon/poe-mods/compare/v1.3.0...v1.3.1)  (2017-09-22)
### Changed
- `Generators`, `Mods` and `Containers` now don't hold a table of all properties. This was moved to a generic `PropsTable`. 
  
  The old behavior was achieved with mixins which caused problems with `instanceOf` and `constructor.name` and was thefore disbanded. For static methods at least mixins weren't a good idea.

## [1.3.0](https://github.com/eps1lon/poe-mods/compare/v1.2.1...v1.3.0)  (2017-09-21)
This release was aimed at a better usage of the API.
### Added
- Classes now hold a table of all available properties to build the classes
### Removed
- MetaData is not a part of the API anymore. It doesn't add any value for the enduser

## [1.2.1](https://github.com/eps1lon/poe-mods/compare/v1.2.0...v1.2.1)  (2017-09-21)
### Added
- Orb of Annulment

## [1.2.0](https://github.com/eps1lon/poe-mods/compare/v1.1.0...v1.2.0)  (2017-09-21)
### Added
- Immutable data structure for the Atlas
### Changed
- Sextants now have types (Apprentice, Journeyman, Master) and check for map tier groups

## [1.1.0](https://github.com/eps1lon/poe-mods/compare/v1.0.0...v1.1.0)  (2017-09-21)
### Added
- `AtlasNodes` i.e. Maps on the Atlas
- `Sextants`
- `Generator#isApplicableTo` boolean helper that checks if any flag was set from `#applicableTo`. Generally all `#is*` methods should return boolean while `#*` returns Flags.

### Changed
- `Generator#spawnweightOfMod` was moved to `Mod#spawnweightFor`
- `Container` are now typed with a custom `Builder`

### Improved
- Typings for immutable classes. They now return `this` type. This fixed a possible bug where changing an implementation of Container would not return the implementation but a dumb container.

## [1.0.0](https://github.com/eps1lon/poe-mods/compare/v0.1.1...v1.0.0)  (2017-09-21)
This was not meant as a MAJOR release but I thought `npm version` also published so I just went ahead since the packaged isn't used by anyone at the moment anyway.

### Changed
- Decoupled `Mods` from their `Container`. `Generators` only know of their Interaction.

### Improved
- Typings for `GeneratorDetails`. They now preserve the type of their `Mod`.

## [0.1.1](https://github.com/eps1lon/poe-mods/compare/v0.1.0...v0.1.1)  (2017-09-21)

### Improved
- Flow typings by adding missing Flow annotations.

## [0.1.0](https://github.com/eps1lon/poe-mods/compare/v0.0.2...v0.1.0)  (2017-09-21)
### Added
- Tests for around 60% coverage

## 0.0.2 (2017-09-21)
Rewrite from [PoE Mod Repository](https://github.com/eps1lon/poe_mod_repository/)