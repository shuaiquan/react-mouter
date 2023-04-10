# Change Log

## [1.0.2] - 2023.04.11
### Fixed
- `MounterProvider` unmount will trigger `MounterConsumer` re-render.
### Changed
- `MounterConsumer` won't render view in a default div.

## [1.0.1] - 2023.04.10
### Added
- `MounterConsumer` added `fallback` prop to provide fallback ui when there are nothing to mount.