import { combineReducers } from 'redux';
import Map from './Map/reducer';
import Landsat from './Landsat/reducer';
import Sentinel2 from './Sentinel2/reducer';
import UI from './UI/reducer';
import TrendTool from './TrendTool/reducer';
import MaskTool from './MaskTool/reducer';

const reducers = combineReducers({
    Map,
    Landsat,
    Sentinel2,
    UI,
    TrendTool,
    MaskTool,
});

export default reducers;
