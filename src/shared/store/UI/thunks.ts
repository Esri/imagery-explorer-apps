import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { TooltipData, tooltipDataChanged } from './reducer';

const DebounceDealy = 250;

let debounceTimeOut: NodeJS.Timeout;

export const updateTooltipData =
    (data: TooltipData) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        clearTimeout(debounceTimeOut);

        if (!data) {
            dispatch(tooltipDataChanged(data));
            return;
        }

        debounceTimeOut = setTimeout(() => {
            dispatch(tooltipDataChanged(data));
        }, DebounceDealy);
    };
