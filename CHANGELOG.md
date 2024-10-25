# Project Name

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.1.4] - 2024-10-26

- fix issues with file names

## [v2.1.3] - 2023-10-07

### Fixed

- useMySQLAPI() properly supports { apiUrl } now as an option

## [v2.1] - 2023-02-01

### Added

- uuid() method for useMySQLAPI to return a new UUID v4 string

## [v2] - 2022-12-30

### Changed

- Type
- LocalStorage
- Collection
- MySQLAPI
- MySQLCollection
- Google Auth

### Removed

- HelloWorld

## [v1.39] - 2022-12-29

### Added

- onGoogleAuth

### Changed

- useLocalStorage has null as default value
- useLocalStorage will remove items on null value

### Removed

- onGoogleSignin

## [v1.38.1] - 2022-12-29

### Fixed

- ref() not defined for useGoogleSignin

## [v1.38] - 2022-12-29

### Added

- useGoogleSignin

## [v1.37.1] - 2022-12-29

### Fixed

- useCollection did not update the local storage on setDocs

## [v1.37]

### Added

- Type to get the type of the value
- LocalStorage to have a reactive and persistent value

## [v1.36.2]

### Fixed

- setDocs bugfix for Collection

## [v1.36.1]

### Fixed

- setDocs bugfix for Collection

## [v1.36]

### Added

- setDocs method for Collection
- setDocs method for MySQLCollection

## [v1.35]

### Added

- logging on debug level instead of info

## [v1.34]

### Added

- syncFilter option for MySQLCollection

## [v1.33]

### Added

- MySQLCollection

## [v1.32] - 2022-12-26

### Added

- MySQL API
- Collection
- Hello World