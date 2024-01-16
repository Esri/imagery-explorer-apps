/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost:8080/"}
 */
import { getQueryParams4MainSceneFromHashParams } from './queryParams4ImageryScene';

// use Friday, January 5, 2024 12:00:00 AM GMT as system time
const FAKE_SYSTEM_TIME = 1704412800000;
jest.useFakeTimers().setSystemTime(FAKE_SYSTEM_TIME);

/**
 * mock `window.location` object using the input href
 * @param href
 */
const mockWindowLocation = (href: string) => {
    delete window.location;

    Object.defineProperty(window, 'location', {
        value: new URL(href),
        configurable: true,
    });
};

describe('test getQueryParams4MainSceneFromHashParams', () => {
    it(`should return null if "mainScene" is not found in URL Hash params`, () => {
        mockWindowLocation('https://localhost:8080/');
        expect(getQueryParams4MainSceneFromHashParams()).toBeNull();
    });

    it(`should return QueryParams object if "mainScene" is found in URL Hash params`, () => {
        mockWindowLocation(
            'https://localhost:8080/#mainScene=2022-05-01%7CAgriculture+with+DRA%7C12345'
        );

        expect(getQueryParams4MainSceneFromHashParams()).toMatchObject({
            acquisitionDate: '2022-05-01',
            acquisitionDateRange: {
                startDate: '2022-01-01',
                endDate: '2022-12-31',
            },
            objectIdOfSelectedScene: 12345,
            rasterFunctionName: 'Agriculture with DRA',
            uniqueId: null,
        });
    });

    it(`should return QueryParams object with default acquisitionDateRange (Past 12 months) if "mainScene" does not have acquisitionDate in it`, () => {
        mockWindowLocation(
            'https://localhost:8080/#mainScene=%7CColor+Infrared+with+DRA%7C'
        );

        expect(getQueryParams4MainSceneFromHashParams()).toMatchObject({
            acquisitionDate: '',
            acquisitionDateRange: {
                startDate: '2023-02-01',
                endDate: '2024-01-31',
            },
            objectIdOfSelectedScene: null,
            rasterFunctionName: 'Color Infrared with DRA',
            uniqueId: null,
        });
    });
});