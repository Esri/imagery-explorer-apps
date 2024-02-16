import classNames from 'classnames';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    showMapLabelToggled,
    showTerrainToggled,
} from '@landcover-explorer/store/Map/reducer';
import {
    selectShowMapLabel,
    selectShowTerrain,
} from '@landcover-explorer/store/Map/selectors';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';
import { SEARCH_WIDGET_WIDTH } from '../MapView/SearchWidget';

type ToggleButtonProps = {
    label: string;
    active: boolean;
    onToggle: () => void;
};

const CheckIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height="16"
        width="16"
    >
        <path
            fill="currentColor"
            d="M14.071 15a.929.929 0 0 0 .929-.929V2.93a.929.929 0 0 0-.929-.93H2.93a.929.929 0 0 0-.93.929V14.07a.929.929 0 0 0 .929.929zM3 3h11v11H3zm9.262 2l.738.738-5.443 5.43-2.822-2.822.738-.738 2.084 2.088z"
        />
        <path fill="none" d="M0 0h16v16H0z" />
    </svg>
);

const UncheckIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height="16"
        width="16"
    >
        <path
            fill="currentColor"
            d="M14.071 15a.929.929 0 0 0 .929-.929V2.93a.929.929 0 0 0-.929-.93H2.93a.929.929 0 0 0-.93.929V14.07a.929.929 0 0 0 .929.929zM3 3h11v11H3z"
        />
        <path fill="none" d="M0 0h16v16H0z" />
    </svg>
);

const ToggleButton: FC<ToggleButtonProps> = ({
    label,
    active,
    onToggle,
}: ToggleButtonProps) => {
    return (
        <div
            className="w-1/2 cursor-pointer z-10 flex items-center"
            onClick={onToggle}
        >
            {active ? CheckIcon : UncheckIcon}
            <span className="ml-1">{label}</span>
        </div>
    );
};

const LayersToggleControl = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const showMapLabel = useSelector(selectShowMapLabel);

    const showTerrain = useSelector(selectShowTerrain);

    return (
        <div
            className={classNames(
                'absolute bg-custom-background flex py-2 px-2 text-custom-light-blue text-xs top-layer-toggle-top-position-mobile md:top-layer-toggle-top-position',
                {
                    hidden: animationMode !== null,
                }
            )}
            style={{
                width: SEARCH_WIDGET_WIDTH, // this is the width of JSAPI search Widget
                right: 15, // this is the margin to right value of JSAPI search Widget
                // top: 15, // this is the margin to top value of JSAPI search Widget
            }}
        >
            <ToggleButton
                label="Map Labels"
                active={showMapLabel}
                onToggle={() => {
                    // console.log('toggle map labels');
                    dispatch(showMapLabelToggled());
                }}
            />

            <ToggleButton
                label="Terrain"
                active={showTerrain}
                onToggle={() => {
                    // console.log('toggle Terrain');
                    dispatch(showTerrainToggled());
                }}
            />
        </div>
    );
};

export default LayersToggleControl;
