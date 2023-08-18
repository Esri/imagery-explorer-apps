import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CloseButton } from '../CloseButton';
import { shouldShowAboutThisAppToggled } from '@shared/store/UI/reducer';

const AboutLandsatExplorer = lazy(
    () =>
        import(
            /* webpackChunkName: "about-landsatexplorer" */
            './AboutLandsatExplorer'
        )
);

export const About = () => {
    const dispatch = useDispatch();

    const show = useSelector(selectShouldShowAboutThisApp);

    if (!show) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 px-4 py-10 bg-custom-background-95 z-20 text-custom-light-blue overflow-y-auto fancy-scrollbar">
            <CloseButton
                onClick={() => {
                    dispatch(shouldShowAboutThisAppToggled());
                }}
            />

            <div
                className="flex justify-center mt-4 mx-auto"
                style={{
                    maxWidth: '90vw',
                }}
            >
                <Suspense fallback={<calcite-loader></calcite-loader>}>
                    {IMAGERY_SERVICE === 'landsat' && <AboutLandsatExplorer />}
                </Suspense>
            </div>
        </div>
    );
};
