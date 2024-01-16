import Ganges from './thumbnails/landsat/Ganges_SWIR.jpg';
import GrandCanyon from './thumbnails/landsat/GrandCanyon.jpg';
import Richat from './thumbnails/landsat/Richat.jpg';
import KalahariDunes from './thumbnails/landsat/KalahariDunes.jpg';
import KuisebCanyon from './thumbnails/landsat/KuisebCanyon.jpg';
import Quelccaya from './thumbnails/landsat/Quelccaya.jpg';
import RupertBay from './thumbnails/landsat/RupertBay.jpg';
import ThreeGorges from './thumbnails/landsat/ThreeGorges.jpg';
import DashteKevir from './thumbnails/landsat/Dasht-eKevir.jpg';
import Ouarkziz from './thumbnails/landsat/Ouarkziz.jpg';
import EtoshaPan from './thumbnails/landsat/EtoshaPan.jpg';
import LakeMackay from './thumbnails/landsat/LakeMackay.jpg';
import { InterestingPlaceData } from '@typing/shared';

export const data: InterestingPlaceData[] = [
    {
        name: 'Ganges Delta',
        location: {
            center: [89.08, 21.909],
            zoom: 11.557,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: Ganges,
        description:
            "The Ganges Delta is a river delta in Eastern South Asia. It is the world's largest river delta and it empties into the Bay of Bengal with the combined waters of several river systems.",
    },
    {
        name: 'Grand Canyon',
        location: {
            center: [-112.913, 36.242],
            zoom: 12.43,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: GrandCanyon,
        description:
            'The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles (446 km) long, up to 18 miles (29 km) wide and attains a depth of more than one mile (1,857 meters).',
    },
    {
        name: 'Lake Mackay',
        location: {
            center: [128.736, -22.494],
            zoom: 12,
        },
        renderer: 'Agriculture with DRA',
        thumbnail: LakeMackay,
        description:
            'Lake Mackay, known as Wilkinkarra to the Indigenous Pintupi people. With a surface area of 3,494 sq km (1,349 sq mi), it is the largest of hundreds of ephemeral salt lakes scattered throughout Western Australia and the Northern Territory.',
    },
    {
        name: 'Richat',
        location: {
            center: [-11.398, 21.124],
            zoom: 12.43,
        },
        renderer: 'Geology with DRA',
        thumbnail: Richat,
        label: 'Richat Structure',
        description:
            'The Richat Structure is a prominent circular geological feature in the Sahara Desert. It is an eroded geological dome, 40 km (25 mi) in diameter, exposing sedimentary rock in layers that appear as concentric rings.',
    },
    {
        name: 'Kalahari Dunes',
        location: {
            center: [18.476, -23.914],
            zoom: 11.692,
        },
        renderer: 'Geology with DRA',
        thumbnail: KalahariDunes,
        description:
            'The Kalahari Desert is a large semi-arid sandy savanna in Southern Africa. Linear dunes, such as these, typically form in arid environments with consistent wind patterns.',
    },
    {
        name: 'Kuiseb Canyon',
        location: {
            center: [15.398, -23.68],
            zoom: 12.43,
        },
        renderer: 'Color Infrared with DRA',
        thumbnail: KuisebCanyon,
        description:
            'The Kuiseb Canyon has been carved out over millions of years by the ephemeral Kuiseb River in this barren and inaccessible area of Namibia, Africa. It is characterized by its rock formations, steep cliffs, and unique ecosystems.',
    },
    {
        name: 'Quelccaya',
        location: {
            center: [-70.819, -13.943],
            zoom: 12.43,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: Quelccaya,
        label: 'Quelccaya Ice Cap',
        description:
            'The Quelccaya Ice Cap is the second largest glaciated area in the tropics. Located in tropical highlands of the Andes mountains in southern Peru, the cap covers an area of 42.8 sq km (16.5 sq mi) with ice up to 200 meters (660 ft) thick.',
    },
    {
        name: 'Rupert Bay',
        location: {
            center: [-78.993, 51.73],
            zoom: 11,
        },
        renderer: 'Color Infrared with DRA',
        thumbnail: RupertBay,
        description:
            'Rupert Bay is a large bay located on the south-east shore of James Bay, in Canada. This view shows fresh river water colliding with the ocean. Sediment and dissolved organic matter from nearby peatlands give the water its unique characteristics.',
    },
    {
        name: 'Three Gorges',
        location: {
            center: [110.947, 30.862],
            zoom: 12.43,
        },
        renderer: 'Agriculture with DRA',
        thumbnail: ThreeGorges,
        label: 'Three Gorges Dam',
        description:
            "The Three Gorges Dam is a hydroelectric gravity dam that spans the Yangtze River in central China, downstream of the Three Gorges. It is the world's largest power station in terms of installed capacity, but it also serves to reduce the potential for flooding downstream, which historically plagued the Yangtze Plain.",
    },
    {
        name: 'Dasht-e Kevir',
        location: {
            center: [54.557, 34.57],
            zoom: 11,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: DashteKevir,
        description:
            'Dasht-e Kavir, also known as the Great Salt Desert, is a large desert lying in the middle of the Iranian Plateau. The unique landscape here is comprised of sinuous valleys, shallow lakes, mudflats, and salt marshes.',
    },
    {
        name: 'Ouarkziz',
        location: {
            center: [-7.531, 29.021],
            zoom: 12,
        },
        renderer: 'Agriculture with DRA',
        thumbnail: Ouarkziz,
        label: 'Ouarkziz Crater',
        description:
            'Ouarkziz is a meteorite impact crater in Algeria. It is 3.5 kilometers in diameter and the age is estimated to be less than 70 million years. Originally called Tindouf, the crater has been heavily eroded since its formation. Its circular morphology is highlighted by exposures of older sedimentary rock layers.',
    },
    {
        name: 'Etosha Pan',
        location: {
            center: [16.4, -18.746],
            zoom: 10,
        },
        renderer: 'Short-wave Infrared with DRA',
        thumbnail: EtoshaPan,
        description:
            'The Etosha Pan is a large endorheic salt pan in the north of Namibia. Measuring 120 km (75 mi) long, this vast lakebed is periodically flooded with a thin layer of water, which is heavily salted by the mineral deposits on the surface.',
    },
];
