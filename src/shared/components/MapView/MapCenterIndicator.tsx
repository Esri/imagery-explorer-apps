import { selectAppMode } from '@shared/store/Landsat/selectors';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import MapAnchorImage from '../../statics/img/map-anchor.png';
import { SizeOfMapAnchorImage } from '@shared/constants/UI';

type Props = {
    shouldShow: boolean;
};

export const MapCenterIndicator: FC<Props> = ({ shouldShow }) => {
    return (
        <div
            className={classNames(
                'absolute top-[50%] left-[50%] pointer-events-none z-10',
                {
                    hidden: shouldShow === false,
                }
            )}
            style={{
                transform: `translate(-${SizeOfMapAnchorImage / 2}px, -${
                    SizeOfMapAnchorImage / 2
                }px)`,
            }}
        >
            <img src={MapAnchorImage} />
        </div>
    );
};
