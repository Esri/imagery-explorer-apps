import { calcSpectralIndex } from '@shared/services/landsat-2/helpers';
import Point from 'esri/geometry/Point';

export const getLoadingIndicator = () => {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = `<calcite-loader scale="s"></calcite-loader>`;
    return popupDiv;
};

export const getMainContent = (values: number[], mapPoint: Point) => {
    const lat = Math.round(mapPoint.latitude * 1000) / 1000;
    const lon = Math.round(mapPoint.longitude * 1000) / 1000;

    const popupDiv = document.createElement('div');

    /**
     * Degree Symbol for Farhenheit: ℉
     */
    const farhenheitSign = `&#176;F`;

    /**
     * Degree Symbol for Celcius: C
     */
    const celciusSign = `&#176;C`;

    const surfaceTempFarhenheit =
        calcSpectralIndex('temperature farhenheit', values).toFixed(0) +
        farhenheitSign;

    const surfaceTempCelcius =
        calcSpectralIndex('temperature celcius', values).toFixed(0) +
        celciusSign;

    const vegetationIndex = calcSpectralIndex('vegetation', values).toFixed(3);

    const waterIndex = calcSpectralIndex('water', values).toFixed(3);

    popupDiv.innerHTML = `
        <div class='text-custom-light-blue text-xs'>
            <div class='mb-2'>
                <span><span class='text-custom-light-blue-50'>Surface Temp:</span> ${surfaceTempFarhenheit} / ${surfaceTempCelcius}</span>
                <br />
                <span><span class='text-custom-light-blue-50'>NDVI:</span> ${vegetationIndex}</span>
                <span class='ml-2'><span class='text-custom-light-blue-50'>MNDWI:</span> ${waterIndex}</span>
            </div>
            <div class='flex'>
                <p><span class='text-custom-light-blue-50'>x</span> ${lon}</p>
                <p class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</p>
            </div>
        </div>
    `;

    return popupDiv;
};
