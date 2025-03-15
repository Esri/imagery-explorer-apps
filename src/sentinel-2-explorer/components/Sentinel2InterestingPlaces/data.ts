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
        key: 'fucino',
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
        key: 'mississippi',
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
        key: 'rub_al_khali',
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
        key: 'wilpena_pound',
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
        key: 'richat',
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
        key: 'emi_koussi',
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
        key: 'tanezrouft',
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
        key: 'santa_cruz',
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
        key: 'kumpupintil',
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
