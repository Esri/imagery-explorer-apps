/* Copyright 2025 Esri
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
import Sentinel2_Interesting_EmiKoussi from './thumbnails/Sentinel2_Interesting_EmiKoussi.jpg';
import Sentinel2_Interesting_Fucino from './thumbnails/Sentinel2_Interesting_Fucino.jpg';
import Sentinel2_Interesting_Kumpupintil from './thumbnails/Sentinel2_Interesting_Kumpupintil.jpg';
import Sentinel2_Interesting_Mississippi from './thumbnails/Sentinel2_Interesting_Mississippi.jpg';
import Sentinel2_Interesting_Richat from './thumbnails/Sentinel2_Interesting_Richat.jpg';
import Sentinel2_Interesting_RubAlKhali from './thumbnails/Sentinel2_Interesting_RubAlKhali.jpg';
import Sentinel2_Interesting_SantaCruz from './thumbnails/Sentinel2_Interesting_SantaCruz.jpg';
import Sentinel2_Interesting_Tanezrouft from './thumbnails/Sentinel2_Interesting_Tanezrouft.jpg';
import Sentinel2_Interesting_Wilpena from './thumbnails/Sentinel2_Interesting_Wilpena.jpg';

import { InterestingPlaceData } from '@typing/shared';

export const data: InterestingPlaceData[] = [
    {
        // name: 'Fucino',
        // label: 'Fucino Space Centre',
        // description:
        //     'Hidden in this agricultural area is the Fucino Space Centre, surrounded entirely by fields. Leveraging 170 antennas, the Fucino Space Centre is the largest teleport in the world for civilian control of artificial satellites. It houses one of the two control centers that manage Galileo, the European satellite positioning and navigation system.',
        name: 'fucino_name',
        label: 'fucino_label',
        description: 'fucino_description',
        location: {
            center: [13.60505, 41.97629],
            zoom: 13.953,
        },
        renderer: 'Color Infrared for Visualization',
        thumbnail: Sentinel2_Interesting_Fucino,
    },
    {
        // name: 'Mississippi',
        // label: 'Mississippi River Delta',
        // description:
        //     "The Mississippi River Delta is a three-million-acre (4,700 sq mi; 12,000 km2) area of land that stretches from Vermilion Bay on the west, to the Chandeleur Islands in the east, on Louisiana's southeastern coast. It is one of the largest areas of coastal wetlands in the United States and the 7th largest river delta on Earth.",
        name: 'mississippi_name',
        label: 'mississippi_label',
        description: 'mississippi_description',
        location: {
            center: [-89.51169, 29.37701],
            zoom: 12,
        },
        renderer: 'Short-wave Infrared for Visualization',
        thumbnail: Sentinel2_Interesting_Mississippi,
    },
    {
        // name: 'Rub’ al Khali',
        // label: 'Rub’ al Khali Desert',
        // description:
        //     "The Rub' al Khali, or Empty Quarter, is a desert encompassing most of the southern third of the Arabian Peninsula. Most of the terrain is ergs, with sand dunes up to 250 meters (820 ft) high, interspersed with gravel and gypsum plains. This area is characterized by sand dunes and brackish salt flats. The dunes are naturally reddish-orange in color due to the presence of feldspar.",
        name: 'rub_al_khali_name',
        label: 'rub_al_khali_label',
        description: 'rub_al_khali_description',
        location: {
            center: [55.0228, 21.38538],
            zoom: 13.027,
        },
        renderer: 'Natural Color for Visualization',
        thumbnail: Sentinel2_Interesting_RubAlKhali,
    },
    {
        // name: 'Wilpena Pound',
        // label: 'Wilpena Pound',
        // description:
        //     'Wilpena Pound is a major natural amphitheater located in the heart of the Ikara-Flinders Ranges National Park in South Australia. While the pound appears to be formed by a single mountain range, it is actually enclosed by two ranges. The highest peak in Wilpena Pound, which is also the highest of the Flinders Ranges, is St Mary Peak at 1,171 m. Pound is an old English term for a livestock enclosure usually surrounded by stone walls. Geologists use the term for rock formations that resemble such enclosures on a massive scale.',
        name: 'wilpena_pound_name',
        label: 'wilpena_pound_label',
        description: 'wilpena_pound_description',
        location: {
            center: [138.6031, -31.555],
            zoom: 12,
        },
        renderer: 'Agriculture for Visualization',
        thumbnail: Sentinel2_Interesting_Wilpena,
    },
    {
        // name: 'Richat',
        // label: 'Richat Structure (Eye of the Sahara)',
        // description:
        //     'The Richat Structure, also known as the Eye of the Sahara, is a prominent circular geological feature in the Sahara Desert. It is an eroded geological dome, 40 km (25 mi) in diameter, exposing sedimentary rock in layers that appear as concentric rings.',
        name: 'richat_name',
        label: 'richat_label',
        description: 'richat_description',
        location: {
            center: [-11.398, 21.124],
            zoom: 13,
        },
        renderer: 'Geology for Visualization',
        thumbnail: Sentinel2_Interesting_Richat,
    },
    {
        // name: 'Emi Koussi',
        // label: 'Emi Koussi',
        // description:
        //     'Emi Koussi is a pyroclastic shield volcano that lies at the southeast end of the Tibesti Mountains in northern Chad. The highest mountain of the Sahara, it reaches an elevation of 3,447 meters (11,309 feet). The summit of Emi Koussi is formed by two overlapping calderas, which together form a 15-by-11-kilometer (9.3 mi × 6.8 mi) wide elliptical caldera that extends from northwest to southeast.',
        name: 'emi_koussi_name',
        label: 'emi_koussi_label',
        description: 'emi_koussi_description',
        location: {
            center: [18.53636, 19.8656],
            zoom: 12,
        },
        renderer: 'Short-wave Infrared for Visualization',
        thumbnail: Sentinel2_Interesting_EmiKoussi,
    },
    {
        // name: 'Tanezrouft',
        // label: 'Tanezrouft',
        // description:
        //     "The Tanezrouft is a vast barren plain in Algeria, often referred to as the 'Land of Terror'. One of the most desolate part of the Sahara desert, the region has no permanent residents and is known for its soaring temperatures and scarce access to water and food. The terrain shows evidence of water erosion that occurred many years ago, when the Sahara Desert’s climate was much wetter. Today, the terrain is shaped by wind erosion and frequent sand storms.",
        name: 'tanezrouft_name',
        label: 'tanezrouft_label',
        description: 'tanezrouft_description',
        location: {
            center: [2.30945, 25.29752],
            zoom: 12,
        },
        renderer: 'Agriculture for Visualization',
        thumbnail: Sentinel2_Interesting_Tanezrouft,
    },
    {
        // name: 'Santa Cruz',
        // label: 'Santa Cruz Department',
        // description:
        //     "Santa Cruz is the largest of the nine constituent departments of Bolivia. The department's economy depends largely on agriculture and the agrarian expansion is increasing rapidly in the Santa Cruz area. The land cultivation and deforestation method depicted here is characterized by the radial patterns with small settlements at the center of each plot.",
        name: 'santa_cruz_name',
        label: 'santa_cruz_label',
        description: 'santa_cruz_description',
        location: {
            center: [-62.75816, -16.73662],
            zoom: 13.953,
        },
        renderer: 'Natural Color for Visualization',
        thumbnail: Sentinel2_Interesting_SantaCruz,
    },
    {
        // name: 'Kumpupintil',
        // label: 'Kumpupintil Lake',
        // description:
        //     'Formerly known as Lake Disappointment, the 33,000-hectare (82,000-acre) lake is typically dry, except during very wet periods. The lake known to the Western Desert Martu people as Kumpupintil, was named Lake Disappointment by the explorer Frank Hann in 1897. He noticed creeks in the area flowed inland, and followed them, expecting to find a large fresh water lake. He instead found disappointment.',
        name: 'kumpupintil_name',
        label: 'kumpupintil_label',
        description: 'kumpupintil_description',
        location: {
            center: [122.87724, -23.46876],
            zoom: 11,
        },
        renderer: 'Agriculture for Visualization',
        thumbnail: Sentinel2_Interesting_Kumpupintil,
    },
];
