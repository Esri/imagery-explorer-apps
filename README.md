# Imagery Explorer Apps
This repository contains a collection of Imagery Explorer applications developed by the Esri's Living Atlas team.

## Getting Started
Before we begin, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) and NPM installed. The current Long Term Support (LTS) release is an ideal starting point.

To get started, clone this repository (or your fork) to your local machine:
```sh
git clone https://github.com/vannizhang/imagery-explorer-apps.git
```

Navigate to the root directory of the project and install the necessary packages (dependencies):
```sh
npm install
```

## Landsat Explorer

The Landsat Explorer app offers an intuitive user experience, it leverages a variety of ArcGIS capabilities to explore and begin to unlock the wealth of information that Landsat provides. 

[View it live](https://livingatlas.arcgis.com/landsatexplorer/)

![App](./public/thumbnails/landsat.jpg)

### Features:
- Visual exploration of a Dynamic global mosaic of the best available Landsat scenes.
- On-the-fly multispectral band combinations and indices for visualization and analysis.
- Interactive Find a Scene by location, sensor, time, and cloud cover.
- Visual change by time, and comparison of different renderings, with Swipe and Animation modes.
- Analysis such as threshold masking and temporal profiles for vegetation, water, land surface temperature, and more.

### Usage
Before running the application, you may need to create a proxy item for the [Landsat-Level-2](https://www.arcgis.com/home/item.html?id=bd6b545b95654d91a0b7faf7b5e010f5) service with your credentials embedded (Learn more about [storing credentials with service item](https://doc.arcgis.com/en/arcgis-online/reference/arcgis-server-services.htm#ESRI_SECTION1_FEB0DF92DA064B6A970DFB59A18AA4C2)). Please note that the proxy items utilized by the application hosted on the Living Atlas server only allow usage from the Living Atlas domain.

Next, update the `landsat-level-2` URLs in the [`config.json`](./src/config.json) to use the URL of the proxy service you just created.

[`config.json`](./src/config.json):
```js
{
    //...
    "services": {
        "landsat-level-2": {
            "development": "URL_OF_YOUR_PROXY_SERVICE_FOR_LANDSAT_LEVEL_2",
            "production": "URL_OF_YOUR_PROXY_SERVICE_FOR_LANDSAT_LEVEL_2"
        }
    }
}
```

To run and test the app on your local machine:
```sh
npm run start-landsat
```

To build the app, you can run the command below, this will place all files needed for deployment into the `/dist/landsat` directory.
```sh
npm run build-landsat
```

## Resources
- [Landsat Level-2 archive available in Living Atlas](https://www.esri.com/arcgis-blog/products/arcgis-living-atlas/imagery/landsat-level-2-science-products-and-landsat-explorer/)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing

### Landsat Level-2 Imagery
- Source Image Products - USGS. USGS-authored or produced data and information are considered to be in the U.S. Public Domain and may be used without restriction. [Acknowledging or Crediting USGS](https://www.usgs.gov/information-policies-and-instructions/acknowledging-or-crediting-usgs)
- Image Service - Esri. This work is licensed under the Esri Master License Agreement. [View Summary](https://downloads2.esri.com/arcgisonline/docs/tou_summary.pdf) | [View Terms of Use](https://www.esri.com/en-us/legal/terms/full-master-agreement)

### Landsat Explorer App
This apps are licensed under the Esri Master License Agreement. [View Summary](https://downloads2.esri.com/arcgisonline/docs/tou_summary.pdf) | [View Terms of Use](https://www.esri.com/en-us/legal/terms/full-master-agreement)