import './BottomPanel.css';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectHideBottomPanel } from '../../store/UI/selectors';
import { BottomPanelToggleBtn } from '../BottomPanelToggleBtn';

type Props = {
    children: React.ReactNode;
};

const BottomPanel: FC<Props> = ({ children }) => {
    const shouldHide = useSelector(selectHideBottomPanel);

    return (
        <>
            <BottomPanelToggleBtn />

            {shouldHide === false && (
                <div className="bottom-panel absolute bottom-0 left-0 w-full h-bottom-panel-height z-10">
                    <div className="theme-background absolute top-0 left-0 w-full h-full"></div>
                    <div className="bottom-panel-top-shadow absolute top-0 left-0 w-full"></div>

                    <div className="relative flex w-full h-full p-2 pt-4 text-custom-light-blue z-10 overflow-y-auto xl:overflow-y-unset">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomPanel;
