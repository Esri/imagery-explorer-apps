/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Singapre from './thumbnails/Singapre.jpg';
import Amazon from './thumbnails/Amazon.jpg';
import CraterLake from './thumbnails/CraterLakeAlt.jpg';
import Garig from './thumbnails/Garig.jpg';
import Richat from './thumbnails/Richat.jpg';
import Torshavn from './thumbnails/Torshavn.jpg';

import { InterestingPlaceData } from '@typing/shared';

export const data: InterestingPlaceData[] = [
    {
        name: 'Singapore',
        location: {
            center: [103.82475, 1.25343],
            zoom: 13.953,
        },
        renderer: 'VV dB Colorized',
        label: 'Port of Singapore',
        thumbnail: Singapre,
        description:
            'Due to its strategic location in maritime Southeast Asia, the city of Singapore is home to one of the of the busiest shipping ports in the world. One fifth of the worlds shipping containers pass through the Port of Singapore. Here you can visually depict shipping vessels in the waters off the southern tip of the Malay Peninsula.',
    },
    {
        name: 'Crater Lake',
        location: {
            center: [-122.10872, 42.94143],
            zoom: 13,
        },
        renderer: 'SWI Colorized',
        label: '',
        thumbnail: CraterLake,
        description:
            'Crater Lake sits in a volcanic crater in South-central Oregon in the Western United States. The lake partially fills the caldera left by the collapse of Mount Mazama thousands of years ago. With a maximum depth of 2,148 feet (655 meters) it is the deepest lake in the United States and ranks tenth deepest in the world. Here, the body of the lake is depicted using the Sentinel-1 SAR Water Index (SWI).',
    },
    {
        name: 'Tórshavn',
        location: {
            center: [-6.75967, 62.00664],
            zoom: 12,
        },
        renderer: 'False Color dB with DRA',
        label: 'Tórshavn, Faroe Islands',
        thumbnail: Torshavn,
        description:
            'Tórshavn is the capital and largest city of the Faroe Islands. It is among the cloudiest places in the world averaging only 2.4 hours of sunshine per day and 840 hours per year. Since SAR signals penetrate clouds, Sentinel-1 can collect imagery of the islands even when they are enshrouded with clouds.',
    },
    {
        name: 'Amazon Estuary',
        location: {
            center: [-51.05776, -0.39478],
            zoom: 11,
        },
        renderer: 'Water Anomaly Index Colorized',
        label: '',
        thumbnail: Amazon,
        description:
            'The Amazon River in South America is the largest river by discharge volume of water in the world and two of the top ten rivers by discharge are tributaries of the Amazon. The river has an average discharge of about 6,591–7,570 km³ (1,581–1,816 mi³) per year, greater than the next seven largest independent rivers combined. The high concentrations of sediment the Amazon carries, and discharges into the Atlantic Ocean, lights up here with this rendering of a water anomaly index.',
    },
    {
        name: 'Richat',
        location: {
            center: [-11.398, 21.124],
            zoom: 12,
        },
        renderer: 'VH dB Colorized',
        label: 'Richat Structure (Eye of the Sahara)',
        thumbnail: Richat,
        description:
            'The Richat Structure, also known as the Eye of the Sahara, is a prominent circular geological feature in the Sahara Desert. It is an eroded geological dome, 40 km (25 mi) in diameter, exposing sedimentary rock in layers that appear as concentric rings.',
    },
    {
        name: 'Gunak Barlu',
        location: {
            center: [132.21062, -11.36392],
            zoom: 11,
        },
        renderer: 'False Color dB with DRA',
        label: 'Garig Gunak Barlu National Park',
        thumbnail: Garig,
        description:
            'Garig Gunak Barlu is a national park in the Northern Territory of Australia on the Cobourg Peninsula. Its name derives from the local Garig language, and the words gunak (land) and barlu (deep water). It is categorized as an IUCN Category II protected area and is home to all six species of Australian marine turtles: green sea turtles, hawksbill sea turtles, flatback sea turtles, leatherback sea turtles, and olive ridley sea turtles.',
    },
];
