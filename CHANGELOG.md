# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## Sentinel-2 Explorer

### Added

### Changed

### Fixed

### Removed


## Shared

### Added

### Changed
- add `useMaskLayerVisibility` custom hook
- add `getChangeCompareLayerRasterFunction` helper function
- add `useDataFromSelectedImageryScene` custom hook

### Fixed

### Removed

## 2024 July Release

## Sentinel-1 Explorer

### Added
- add Temporal Composite Tool 
- add Change Detection Tool
- add Index Mask Tool 
- add Temporal Profile Tool
- add Orbit Direction Filter
- lock relative orbit orbit direction for Change Detection tool and Temporal Composite Tool 
- show Foot Print for Change Compare and Temporal Composite tool
- add documentation panel

## Landsat Explorer

### Added
- add Raster Function Templates of the Landsat Level-2 service

### Changed
- Scene Info table should display ID in one line
- use `useImageryLayerByObjectId` custom hook from `shared/hooks` to get Landsat Layer
- use `getFeatureByObjectId` from `shared/services/helpers`
- use `getExtentByObjectId` from `shared/services/helpers`
- use `intersectWithImageryScene` from `shared/services/helpers`
- use `identify` from `shared/services/helpers`
- update `queryAvailableScenes` in `/@shared/store/Landsat/thunks` to use `deduplicateListOfImageryScenes`
- use `@shared/components/ImageryLayer/ImageryLayerByObjectID` instead of `LandsatLayer`
- use `@shared/components/SwipeWidget/SwipeWidget4ImageryLayers`
- `<LandsatMissionFilter />` should be passed as a child components to `Calendar`.
- update `<Layout />` to use `useShouldShowSecondaryControls` hook
- use `<MapPopup />` `from @shared/components/MapPopup`
- use `Change Compare Tool` from `@shared/components/ChandCompareTool`
- update `MaskLayer` to use `ImageryLayerWithPixelFilter`
- update `ChangeCompareLayer` to use `ImageryLayerWithPixelFilter`

## Shared

### Added
- add tooltip and click to copy feature to Scene Info component
- add Play/Pause button to AnimationDownloadPanel
- include estimated area calculation for Mask tool
- include estimated area calculation for Change Detection
- display current map scale and pixel resolution in Custom Attribution component
- add Documentation Panel

### Changed
- upgrade @arcgis/core to use version 4.29
- update animation panel to re-fetch animation images when user minimizes bottom panel
- use `.env` to save `WEBPACK_DEV_SERVER_HOSTNAME`
- add Zoom2ExtentContainer to shared components
- update map popup to include X/Y coordinates
