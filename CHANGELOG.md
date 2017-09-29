# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/eps1lon/poe-mods/compare/v1.5.0...HEAD)
### Changed
- `Itemshowcase` now considers the item to be rare. Previously possible explicit
  mods were hidden once the Item had one prefix or suffix.

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