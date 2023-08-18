import AralSea from './thumbnails/AralSea.jpg';
import Singapore from './thumbnails/Singapore.jpg';
import Everest from './thumbnails/Everest.jpg';
import Manicouagan from './thumbnails/Manicouagan.jpg';
import Giza from './thumbnails/Pyramids.jpg';
import Ganges from './thumbnails/GangesDelta.jpg';
import Fuji from './thumbnails/MtFuji.jpg';
import GrandCanyon from './thumbnails/GrandCanyon.jpg';
import Richat from './thumbnails/Richat.jpg';
import Irrigation from './thumbnails/Irrigation.jpg';
import KeyWest from './thumbnails/KeyWest.jpg';
import Kilimanjaro from './thumbnails/Kilimanjaro.jpg';

export const data = [
    {
        name: 'Aral Sea',
        location: {
            center: [59.311, 45.091],
            zoom: 9.493,
        },
        renderer: 'Natural Color with DRA',
        thumbnail: AralSea,
    },
    {
        name: 'Everest',
        location: {
            center: [86.983, 27.952],
            zoom: 11.557,
        },
        renderer: 'Natural Color with DRA',
        thumbnail: Everest,
    },
    {
        name: 'Ganges Delta',
        location: {
            center: [89.08, 21.909],
            zoom: 11.557,
        },
        renderer: 'NDVI Colorized',
        thumbnail: Ganges,
    },
    {
        name: 'Giza Pyramids',
        location: {
            center: [31.13, 29.977],
            zoom: 14.497,
        },
        renderer: 'Natural Color with DRA',
        thumbnail: Giza,
    },
    {
        name: 'Grand Canyon',
        location: {
            center: [-112.913, 36.242],
            zoom: 12.43,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: GrandCanyon,
    },
    {
        name: 'Irrigation',
        location: {
            center: [-99.383, 37.616],
            zoom: 12,
        },
        renderer: 'Agriculture with DRA',
        thumbnail: Irrigation,
    },
    {
        name: 'Key West',
        location: {
            center: [-81.694, 24.615],
            zoom: 12,
        },
        renderer: 'Bathymetric with DRA',
        thumbnail: KeyWest,
    },
    {
        name: 'Kilimanjaro',
        location: {
            center: [37.356, -3.066],
            zoom: 12,
        },
        renderer: 'Landsat_TIRS1_Temperature_Farhenheit_Colorized',
        thumbnail: Kilimanjaro,
    },
    {
        name: 'Manicouagan',
        location: {
            center: [-68.631, 51.389],
            zoom: 10,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: Manicouagan,
    },
    {
        name: 'Mt. Fuji',
        location: {
            center: [138.731, 35.367],
            zoom: 12.958,
        },
        renderer: 'Color Infrared with DRA',
        thumbnail: Fuji,
    },
    {
        name: 'Richat',
        location: {
            center: [-11.398, 21.124],
            zoom: 12.43,
        },
        renderer: 'Geology with DRA',
        thumbnail: Richat,
    },
    {
        name: 'Singapore',
        location: {
            center: [103.775, 1.235],
            zoom: 11.557,
        },
        renderer: 'Natural Color with DRA',
        thumbnail: Singapore,
    },
];
