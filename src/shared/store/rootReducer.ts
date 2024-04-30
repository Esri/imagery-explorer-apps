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

import { combineReducers } from 'redux';
import Map from './Map/reducer';
import ImageryScenes from './ImageryScene/reducer';
import Sentinel2 from './Sentinel2/reducer';
import UI from './UI/reducer';
import TrendTool from './TrendTool/reducer';
import MaskTool from './MaskTool/reducer';
import SpectralProfileTool from './SpectralProfileTool/reducer';
import ChangeCompareTool from './ChangeCompareTool/reducer';
import Landsat from './Landsat/reducer';
import SpectralSamplingTool from './SpectralSamplingTool/reducer';
import TemporalCompositeTool from './TemporalCompositeTool/reducer';
import LandcoverExplorer from './LandcoverExplorer/reducer';
import Sentinel1 from './Sentinel1/reducer';

const reducers = combineReducers({
    Map,
    UI,
    ImageryScenes,
    Sentinel2,
    Landsat,
    LandcoverExplorer,
    Sentinel1,
    TrendTool,
    MaskTool,
    SpectralProfileTool,
    ChangeCompareTool,
    SpectralSamplingTool,
    TemporalCompositeTool,
});

export default reducers;
