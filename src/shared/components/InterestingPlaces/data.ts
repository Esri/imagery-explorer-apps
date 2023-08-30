// import AralSea from './thumbnails/AralSea.jpg';
// import Singapore from './thumbnails/Singapore.jpg';
// import Everest from './thumbnails/Everest.jpg';
// import Manicouagan from './thumbnails/Manicouagan.jpg';
// import Giza from './thumbnails/Pyramids.jpg';
import Ganges from './thumbnails/landsat/GangesDelta.jpg';
// import Fuji from './thumbnails/MtFuji.jpg';
import GrandCanyon from './thumbnails/landsat/GrandCanyon.jpg';
import Richat from './thumbnails/landsat/Richat.jpg';
// import Irrigation from './thumbnails/Irrigation.jpg';
import KeyWest from './thumbnails/landsat/KeyWest.jpg';
// import Kilimanjaro from './thumbnails/Kilimanjaro.jpg';
import KalahariDunes from './thumbnails/landsat/KalahariDunes.jpg';
import KuisebCanyon from './thumbnails/landsat/KuisebCanyon.jpg';
import Quelccaya from './thumbnails/landsat/Quelccaya.jpg';
import RupertBay from './thumbnails/landsat/RupertBay.jpg';

import ThreeGorges from './thumbnails/landsat/ThreeGorges.jpg';
import DashteKevir from './thumbnails/landsat/Dasht-eKevir.jpg';
import Ouarkziz from './thumbnails/landsat/Ouarkziz.jpg';
import EtoshaPan from './thumbnails/landsat/EtoshaPan.jpg';

type InterestingPlaceData = {
    name: string;
    location: {
        center: number[];
        zoom: number;
    };
    renderer: string;
    thumbnail: any;
};

const LandsatInterestingPlaces: InterestingPlaceData[] = [
    // {
    //     name: 'Aral Sea',
    //     location: {
    //         center: [59.311, 45.091],
    //         zoom: 9.493,
    //     },
    //     renderer: 'Natural Color with DRA',
    //     thumbnail: AralSea,
    // },
    // {
    //     name: 'Everest',
    //     location: {
    //         center: [86.983, 27.952],
    //         zoom: 11.557,
    //     },
    //     renderer: 'Natural Color with DRA',
    //     thumbnail: Everest,
    // },
    {
        name: 'Ganges Delta',
        location: {
            center: [89.08, 21.909],
            zoom: 11.557,
        },
        renderer: 'NDVI Colorized',
        thumbnail: Ganges,
    },
    // {
    //     name: 'Giza Pyramids',
    //     location: {
    //         center: [31.13, 29.977],
    //         zoom: 14.497,
    //     },
    //     renderer: 'Natural Color with DRA',
    //     thumbnail: Giza,
    // },
    {
        name: 'Grand Canyon',
        location: {
            center: [-112.913, 36.242],
            zoom: 12.43,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: GrandCanyon,
    },
    // {
    //     name: 'Irrigation',
    //     location: {
    //         center: [-99.383, 37.616],
    //         zoom: 12,
    //     },
    //     renderer: 'Agriculture with DRA',
    //     thumbnail: Irrigation,
    // },
    {
        name: 'Key West',
        location: {
            center: [-81.694, 24.615],
            zoom: 12,
        },
        renderer: 'Bathymetric with DRA',
        thumbnail: KeyWest,
    },
    // {
    //     name: 'Kilimanjaro',
    //     location: {
    //         center: [37.356, -3.066],
    //         zoom: 12,
    //     },
    //     renderer: 'Landsat_TIRS1_Temperature_Farhenheit_Colorized',
    //     thumbnail: Kilimanjaro,
    // },
    // {
    //     name: 'Manicouagan',
    //     location: {
    //         center: [-68.631, 51.389],
    //         zoom: 10,
    //     },
    //     renderer: 'Short-wave Infrared with DRA',
    //     thumbnail: Manicouagan,
    // },
    // {
    //     name: 'Mt. Fuji',
    //     location: {
    //         center: [138.731, 35.367],
    //         zoom: 12.958,
    //     },
    //     renderer: 'Color Infrared with DRA',
    //     thumbnail: Fuji,
    // },
    {
        name: 'Richat',
        location: {
            center: [-11.398, 21.124],
            zoom: 12.43,
        },
        renderer: 'Geology with DRA',
        thumbnail: Richat,
    },
    // {
    //     name: 'Singapore',
    //     location: {
    //         center: [103.775, 1.235],
    //         zoom: 11.557,
    //     },
    //     renderer: 'Natural Color with DRA',
    //     thumbnail: Singapore,
    // },
    {
        name: 'Kalahari Dunes',
        location: {
            center: [18.476, -23.914],
            zoom: 11.692,
        },
        renderer: 'Geology with DRA',
        thumbnail: KalahariDunes,
    },
    {
        name: 'Kuiseb Canyon',
        location: {
            center: [15.398, -23.68],
            zoom: 12.43,
        },
        renderer: 'Color Infrared with DRA',
        thumbnail: KuisebCanyon,
    },
    {
        name: 'Quelccaya',
        location: {
            center: [-70.819, -13.943],
            zoom: 12.43,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: Quelccaya,
    },
    {
        name: 'Rupert Bay',
        location: {
            center: [-78.993, 51.73],
            zoom: 11,
        },
        renderer: 'Color Infrared with DRA',
        thumbnail: RupertBay,
    },
    {
        name: 'Three Gorges',
        location: {
            center: [110.947, 30.862],
            zoom: 12.43,
        },
        renderer: 'Agriculture with DRA',
        thumbnail: ThreeGorges,
    },
    {
        name: 'Dasht-e Kevir',
        location: {
            center: [54.557, 34.57],
            zoom: 11,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: DashteKevir,
    },
    {
        name: 'Ouarkziz',
        location: {
            center: [-7.531, 29.021],
            zoom: 12,
        },
        renderer: 'Agriculture with DRA',
        thumbnail: Ouarkziz,
    },
    {
        name: 'Etosha Pan',
        location: {
            center: [16.4, -18.746],
            zoom: 10,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: EtoshaPan,
    },
];

let data: InterestingPlaceData[] = [];

if (IMAGERY_SERVICE === 'landsat') {
    data = LandsatInterestingPlaces;
}

export { data };
