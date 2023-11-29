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

const reducers = combineReducers({
    Map,
    ImageryScenes,
    Sentinel2,
    UI,
    TrendTool,
    MaskTool,
    SpectralProfileTool,
    ChangeCompareTool,
    Landsat,
});

export default reducers;
