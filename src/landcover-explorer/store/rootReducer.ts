import { combineReducers } from 'redux';
import Map from './Map/reducer';
import UI from './UI/reducer';

export default combineReducers({
    Map,
    UI,
});
