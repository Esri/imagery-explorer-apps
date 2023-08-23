import './BottomPanel.css';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectHideBottomPanel } from '../../store/UI/selectors';
import { BottomPanelToggleBtn } from '../BottomPanelToggleBtn';
import { BottomPanelTooltip } from './BottomPanelTooltip';
import classNames from 'classnames';

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

                    <div
                        className={classNames(
                            'relative flex h-full p-4 pb-2 text-custom-light-blue z-10 fancy-scrollbar',
                            /**
                             * We need to set `overflow-y` to `unset` if the bottom panel has the minimum width that can make all content fit into.
                             * in this case the dropdown menu can extend to outside of the botton panel.
                             */
                            'overflow-y-auto bottom-panel-content-min-width:overflow-y-unset'
                        )}
                    >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomPanel;
