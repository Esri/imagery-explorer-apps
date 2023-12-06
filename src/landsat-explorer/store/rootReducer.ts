import { combineReducers } from 'redux';
import Map from '@shared/store/Map/reducer';
import ImageryScenes from '@shared/store/ImageryScene/reducer';
import UI from '@shared/store/UI/reducer';
import TrendTool from '@shared/store/TrendTool/reducer';
import MaskTool from '@shared/store/MaskTool/reducer';
import SpectralProfileTool from '@shared/store/SpectralProfileTool/reducer';
import ChangeCompareTool from '@shared/store/ChangeCompareTool/reducer';
import Landsat from '@shared/store/Landsat/reducer';

const reducers = combineReducers({
    Map,
    UI,
    ImageryScenes,
    Landsat,
    TrendTool,
    MaskTool,
    SpectralProfileTool,
    ChangeCompareTool,
});

export default reducers;
