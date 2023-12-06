import { combineReducers } from 'redux';
import Map from '@shared/store/Map/reducer';
import ImageryScenes from '@shared/store/ImageryScene/reducer';
import UI from '@shared/store/UI/reducer';
import Landsat from '@shared/store/Landsat/reducer';
import SpectralSamplingTool from '@shared/store/SpectralSamplingTool/reducer';
import ChangeCompareTool from '@shared/store/ChangeCompareTool/reducer';

const reducers = combineReducers({
    Map,
    UI,
    ImageryScenes,
    Landsat,
    SpectralSamplingTool,
    ChangeCompareTool,
});

export default reducers;
