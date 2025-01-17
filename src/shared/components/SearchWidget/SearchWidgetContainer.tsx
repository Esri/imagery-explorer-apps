import React, { FC } from 'react';
import { MapActionButton } from '../MapActionButton/MapActionButton';
import { useSelector } from 'react-redux';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import SearchWidget from './SearchWidget';
import MapView from '@arcgis/core/views/MapView';
import classNames from 'classnames';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';

type Props = {
    mapView?: MapView;
};

export const SearchWidgetContainer: FC<Props> = ({ mapView }) => {
    const containerRef = React.useRef<HTMLDivElement>();

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const [isSearchWidgetOpen, setIsSearchWidgetOpen] = React.useState(false);

    useOnClickOutside(containerRef, () => {
        setIsSearchWidgetOpen(false);
    });

    if (!mapView) {
        return null;
    }

    return (
        <div className="relative" ref={containerRef}>
            <MapActionButton
                tooltip="Open Search Widget"
                onClickHandler={() => {
                    setIsSearchWidgetOpen(!isSearchWidgetOpen);
                }}
            >
                <calcite-icon icon="search" scale="s"></calcite-icon>
            </MapActionButton>

            <div
                className={classNames(
                    'absolute top-0 left-full ml-[2px] w-[230px] h-map-action-button-size',
                    {
                        hidden: !isSearchWidgetOpen,
                    }
                )}
            >
                <SearchWidget mapView={mapView} hide={isAnimationPlaying} />
            </div>
        </div>
    );
};
