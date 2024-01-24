/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost:8080/"}
 */
// import { mockWindowLocation } from '../jest-helpers/helpers';
import { mockWindowLocation } from '@shared/utils/__jest_utils__/jest-helpers';
import { getSpectralProfileToolDataFromHashParams } from './spectralTool';

describe('test getSpectralProfileToolDataFromHashParams', () => {
    it(`should return null if "spectral" is not found in URL Hash params`, () => {
        mockWindowLocation('https://localhost:8080/');
        expect(getSpectralProfileToolDataFromHashParams()).toBeNull();
    });

    it(`should return SpectralProfileToolState with queryLocation if "spectral" is found in URL Hash params`, () => {
        mockWindowLocation(
            'https://localhost:8080/#mapCenter=-78.993%2C51.730%2C11.000&mode=analysis&mainScene=2023-09-04%7CColor+Infrared+with+DRA%7C8976749&tool=spectral&spectral=-78%2C51'
        );

        expect(getSpectralProfileToolDataFromHashParams()).toMatchObject({
            queryLocation: {
                x: -78,
                y: 51,
                longitude: -78,
                latitude: 51,
                spatialReference: {
                    wkid: 4326,
                },
            },
        });
    });
});
