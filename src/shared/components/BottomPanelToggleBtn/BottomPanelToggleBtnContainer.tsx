import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import BottomPanelToggleBtn from './BottomPanelToggleBtn';
import { selectHideBottomPanel } from '../../store/UI/selectors';
import { bottomPanelToggled } from '../../store/UI/reducer';

const BottomPanelToggleBtnContainer = () => {
    const dispatch = useDispatch();

    const isHidden = useSelector(selectHideBottomPanel);

    return (
        <BottomPanelToggleBtn
            isBottomPanelHidden={isHidden}
            onClickHandler={() => {
                dispatch(bottomPanelToggled(!isHidden));
            }}
        />
    );
};

export default BottomPanelToggleBtnContainer;
