import './BottomPanel.css';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectHideBottomPanel } from '../../store/UI/selectors';
import { BottomPanelToggleBtn } from '../BottomPanelToggleBtn';
import { BottomPanelTooltip } from './BottomPanelTooltip';

type Props = {
    children: React.ReactNode;
};

const BottomPanel: FC<Props> = ({ children }) => {
    const shouldHide = useSelector(selectHideBottomPanel);

    return (
        <>
            <BottomPanelToggleBtn />

            <BottomPanelTooltip />

            {shouldHide === false && (
                <div className="bottom-panel absolute bottom-0 left-0 w-full h-bottom-panel-height z-10 fancy-scrollbar">
                    <div className="theme-background absolute top-0 left-0 w-full h-full"></div>
                    <div className="bottom-panel-top-shadow absolute top-0 left-0 w-full"></div>

                    <div className="relative flex h-full p-4 pb-2 text-custom-light-blue z-10 overflow-y-auto xl:overflow-y-unset fancy-scrollbar">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomPanel;
