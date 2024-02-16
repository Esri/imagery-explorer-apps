import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM } from '@landcover-explorer/constants/map';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapCenterAndZoom,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '@landcover-explorer/store/Map/selectors';
import { showInfoPanelToggled } from '@landcover-explorer/store/UI/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import HeaderText from '../HeaderText/HeaderText';
import TotalAreaGraph from './TotalAreaGraph/TotalAreaGraphContainer';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';
import classNames from 'classnames';

const LandCoverGraphContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const animationMode = useSelector(selectAnimationMode);

    const isAnimationControlVisible =
        animationMode !== undefined && animationMode !== null;

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useSelector(selectYear);

    const shouldShowChart = useMemo(() => {
        if (animationMode) {
            return false;
        }

        if (shouldShowSentinel2Layer) {
            return isSentinel2LayerOutOfVisibleRange === false;
        }

        return true;
    }, [
        animationMode,
        shouldShowSentinel2Layer,
        isSentinel2LayerOutOfVisibleRange,
    ]);

    const getSubtitle = () => {
        if (mode === 'swipe') {
            return `from ${year4LeadingLayer} to ${year4TrailingLayer}`;
        }

        return `at ${year}`;
    };

    return (
        <div
            className={classNames(
                'h-40 text-center mx-6 my-4 md:my-0 flex-grow',
                {
                    'md:w-64': isAnimationControlVisible,
                    'md:w-96': isAnimationControlVisible === false,
                }
            )}
        >
            <HeaderText
                title={`${
                    mode === 'swipe' ? 'Land Cover Change' : 'Land Cover Totals'
                }`}
                expandButtonTooltip={'Expanded Summary Chart'}
                subTitle={getSubtitle()}
                expandButtonOnClick={() => {
                    dispatch(showInfoPanelToggled(true));
                }}
            />

            {shouldShowChart === false && (
                <div className="w-full flex justify-center items-center text-sm opacity-50 mt-16">
                    {animationMode ? (
                        <p> Graph is disabled when animation is on</p>
                    ) : (
                        <p>
                            Zoom in to see Land Cover{' '}
                            {mode === 'swipe' ? 'Change' : 'Totals'} Graph
                        </p>
                    )}
                </div>
            )}

            {shouldShowChart && mode === 'swipe' && <ChangeCompareGraph />}

            {shouldShowChart && mode === 'step' && <TotalAreaGraph />}
        </div>
    );
};

export default LandCoverGraphContainer;
