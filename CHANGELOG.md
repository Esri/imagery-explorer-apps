# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2025-07-09

### NLCD Land Cover Explorer

#### Added
- Initial release of the NLCD Land Cover Explorer application, featuring:
  - Visual change analysis via **Animate Mode** and **Swipe Mode**
  - Dynamic statistical change summaries by year, map extent, and land cover class
  - Filtering by selected land cover class
  - Imagery Mode for visual investigation and validation
  - Support for multiple imagery renderers (e.g., SWIR for forest burn scar visualization)

---

### Sentinel-2 Land Cover Explorer

#### Added
- New end-to-end tests covering:
  - Classes List functionality
  - Land Cover Layer functionality
  - Map Popup functionality

#### Changed
- Enhanced animation controls with play/pause, speed adjustment, and year range selection
- Refactored to use `availableYears` from the Redux store instead of the `getAvailableYears` function

---

### Sentinel-2 Explorer

#### Added
- New end-to-end tests covering:
  - Find a Scene Mode
  - Swipe Mode
  - Animate Mode
  - Dynamic Mode
  - Index Mask Tool
  - Spectral Profile Tool
  - Save Panel
  - Map Popup

---

### Shared

#### Changed
- Improved error handling and messaging for animation loading
- Enhanced media layer element loading with better error reporting and logging
- Upgraded dependencies:
  - `@arcgis/core` to version 4.33.7
  - `@esri/calcite-components-react` to version 3.2.1

---

## 2025-03-28

### Shared

#### Added
- Internationalization support via `i18next`
- `/public/locales` directory for storing translation files to support multi-language functionality based on user preference or browser settings

---

## 2025-02-19

### Sentinel-2 Explorer

#### Added
- Initial release of Sentinel-2 Explorer application including:
  - Dynamic View
  - Find a Scene Mode
  - Swipe Mode
  - Animate Mode
  - Index Mask Tool
  - Temporal Profile Tool
  - Spectral Profile Tool
  - Change Detection Tool

---

### Shared

#### Added
- Save Panel for storing current app state or selected imagery to ArcGIS Online Web Map or Hosted Imagery Layer
- Auto-Swipe option for Swipe Mode
- Expanded Chart panel in Spectral Profile Tool
- Tooltip on Spectral Profile Tool chart
- "Click to Copy Coordinates" indicator in popup

---

## 2024 July Release

### Sentinel-1 Explorer

#### Added
- Temporal Composite Tool
- Change Detection Tool
- Index Mask Tool
- Temporal Profile Tool
- Orbit Direction Filter
- Locked relative orbit direction for Change Detection and Temporal Composite tools
- Footprint visualization for Change Compare and Temporal Composite tools
- Documentation Panel

---

### Landsat Explorer

#### Added
- Raster Function Templates from Landsat Level-2 service

#### Changed
- Scene Info table now displays ID on a single line
- Replaced several core data hooks and services with shared utility functions:
  - `useImageryLayerByObjectId`, `getFeatureByObjectId`, `getExtentByObjectId`, `intersectWithImageryScene`, `identify`
  - Replaced `LandsatLayer` with `ImageryLayerByObjectID`
  - Updated Swipe widget to `SwipeWidget4ImageryLayers`
  - `<LandsatMissionFilter />` is now passed as a child to `Calendar`
  - Updated `<Layout />` to use `useShouldShowSecondaryControls` hook
  - Updated `<MapPopup />` to use shared component
  - Updated `MaskLayer` and `ChangeCompareLayer` to use `ImageryLayerWithPixelFilter`
  - Updated `queryAvailableScenes` thunk to use `deduplicateListOfImageryScenes`

---

### Shared

#### Added
- Tooltip and click-to-copy feature in Scene Info component
- Play/Pause button for Animation Download Panel
- Estimated area calculation for Mask and Change Detection tools
- Map scale and pixel resolution display in Custom Attribution component
- Documentation Panel

#### Changed
- Upgraded `@arcgis/core` to version 4.29
- Animation panel now re-fetches frames when the bottom panel is minimized
- Environment variable `WEBPACK_DEV_SERVER_HOSTNAME` stored in `.env`
- Added `Zoom2ExtentContainer` to shared components
- Updated map popup to include X/Y coordinates
