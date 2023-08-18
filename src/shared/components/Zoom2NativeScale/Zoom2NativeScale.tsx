import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import { map } from 'd3';
import MapView from 'esri/views/MapView';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    mapView?: MapView;
    tooltip?: string;
};

export const Zoom2NativeScale: FC<Props> = ({ tooltip, mapView }) => {
    const animationStatus = useSelector(selectAnimationStatus);

    const onClickHandler = () => {
        // mapView.scale = 113386;

        mapView.goTo({
            scale: 113386,
        });
    };

    return (
        <div
            className={classNames(
                'absolute left-[16px] top-[130px]  p-1 z-10',
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
