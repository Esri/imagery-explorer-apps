import { combineReducers } from 'redux';
import Map from './Map/reducer';
import Landsat from './Landsat/reducer';
import Sentinel2 from './Sentinel2/reducer';

const reducers = combineReducers({
    Map,
    Landsat,
    Sentinel2,
});

export default reducers;
