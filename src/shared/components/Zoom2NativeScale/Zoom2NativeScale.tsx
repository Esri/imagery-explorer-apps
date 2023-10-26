import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import { map } from 'd3';
import MapView from '@arcgis/core/views/MapView';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    /**
     * native scale of the imagery service
     */
    nativeScale: number;
    mapView?: MapView;
    /**
     * tooltip text for the button
     */
    tooltip?: string;
};

export const Zoom2NativeScale: FC<Props> = ({
    tooltip,
    mapView,
    nativeScale,
}) => {
    const animationStatus = useSelector(selectAnimationStatus);

    const onClickHandler = () => {
        // mapView.scale = 113386;

        mapView.goTo({
            scale: nativeScale,
        });
    };

    return (
        <div
            className={classNames(
                'absolute left-[16px] top-[130px] w-zoom-button-size h-zoom-button-size z-10 flex items-center justify-center',
                'bg-custom-background text-custom-light-blue-90 cursor-pointer',
                {
                    hidden: animationStatus !== null,
                }
            )}
            title={tooltip}
            onClick={onClickHandler}
        >
            <span className="text-sm italic">1:1</span>
        </div>
    );
};
