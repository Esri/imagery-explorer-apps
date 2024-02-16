import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showAboutThisAppToggled } from '@landcover-explorer/store/UI/reducer';
import { selectShowAboutThisApp } from '@landcover-explorer/store/UI/selectors';
import { CloseButton } from '@shared/components/CloseButton';
import EsriLogo from './esri-logo.png';

const About = () => {
    const dispatch = useDispatch();

    const show = useSelector(selectShowAboutThisApp);

    if (!show) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 px-4 py-10 bg-custom-background-95 z-20 text-custom-light-blue overflow-y-auto">
            <CloseButton
                onClick={() => {
                    dispatch(showAboutThisAppToggled());
                }}
            />

            <div
                className="flex justify-center mt-4 mx-auto"
                style={{
                    maxWidth: '90vw',
                }}
            >
                <div
                    className="py-10"
                    style={{
                        maxWidth: 1680,
                    }}
                >
                    <div className="flex items-center mb-8">
                        <div className=" text-custom-light-blue text-3xl pr-4 mr-4 border-r border-custom-light-blue-50">
                            <span>Sentinel-2 Land Cover Explorer</span>
                        </div>

                        <img className="" src={EsriLogo} />
                    </div>

                    <div className="mb-8 font-light">
                        <h3 className="text-2xl text-custom-light-blue mb-4">
                            About the data
                        </h3>

                        <p className="mb-4">
                            Land use land cover (LULC) maps are an increasingly
                            important tool for decision-makers in many industry
                            sectors and developing nations around the world. The
                            information provided by these maps helps inform
                            policy and land management decisions by better
                            understanding and quantifying the impacts of earth
                            processes and human activity.
                        </p>

                        <p className="mb-4">
                            <a
                                className="underline"
                                href="https://livingatlas.arcgis.com/en/home/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                ArcGIS Living Atlas of the World
                            </a>{' '}
                            provides a detailed, accurate, and timely LULC map
                            of the world. The data is the result of a three-way
                            collaboration among Esri, Impact Observatory, and
                            Microsoft. For more information about the data, see{' '}
                            <a
                                className="underline"
                                href="https://www.arcgis.com/home/item.html?id=cfcb7609de5f478eb7666240902d4d3d"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Sentinel-2 10m Land Use/Land Cover Time Series
                            </a>
                            .
                        </p>
                    </div>

                    <div className="mb-8 font-light">
                        <h3 className="text-2xl text-custom-light-blue mb-4">
                            About the app
                        </h3>

                        <p className="mb-4">
                            One of the foremost capabilities of this app is the
                            dynamic change analysis. The app provides dynamic
                            visual and statistical change by comparing annual
                            slices of the Sentinel-2 10m Land Use/Land Cover
                            data as you explore the map.
                        </p>

                        <p>Overview of capabilities:</p>

                        <ul className="list-disc list-inside">
                            <li>
                                Visual change analysis with either &#39;Step
                                Mode&#39; or &#39;Swipe Mode&#39;
                            </li>
                            <li>
                                Dynamic statistical change analysis by year, map
                                extent, and class
                            </li>
                            <li>Filter by selected land cover class</li>
                            <li>
                                Regional class statistics summarized by
                                administrative boundaries
                            </li>
                            <li>
                                Imagery mode for visual investigation and
                                validation of land cover
                            </li>
                            <li>
                                Select imagery renderings (e.g. SWIR to
                                visualize forest burn scars)
                            </li>
                            <li>Data download for offline use</li>
                        </ul>
                    </div>

                    <div className="mb-4 font-light">
                        <h3 className="text-2xl text-custom-light-blue mb-4">
                            Attribution and Terms of Use
                        </h3>

                        <div className="mb-3">
                            <p>
                                <span className="font-bold">
                                    Sentinel-2 10m Land Use/Land Cover{' '}
                                </span>{' '}
                                – Esri, Impact Observatory, and Microsoft
                            </p>
                            <p>
                                This work is licensed under a Creative Commons
                                by Attribution (CC BY 4.0) license.{' '}
                                <a
                                    className="underline"
                                    href="https://creativecommons.org/licenses/by/4.0"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View License Deed{' '}
                                </a>
                                |{' '}
                                <a
                                    className="underline"
                                    href="https://creativecommons.org/licenses/by/4.0/legalcode"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Legal Code
                                </a>
                            </p>
                        </div>

                        <div className="mb-3">
                            <p>
                                <span className="font-bold">
                                    Sentinel-2 Level-2A Imagery
                                </span>{' '}
                                – Esri, Microsoft, ESA, and the European
                                Commission
                            </p>
                            <p>
                                This work is licensed under the Esri Master
                                License Agreement.{' '}
                                <a
                                    className="underline"
                                    href="https://downloads2.esri.com/arcgisonline/docs/tou_summary.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Summary
                                </a>{' '}
                                |{' '}
                                <a
                                    className="underline"
                                    href="https://www.esri.com/en-us/legal/terms/full-master-agreement"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Terms of Use
                                </a>
                            </p>
                        </div>

                        <div className="mb-3">
                            <p>
                                <span className="font-bold">
                                    Sentinel-2 Land Cover Explorer App
                                </span>{' '}
                                - Esri
                            </p>
                            <p>
                                This app is licensed under the Esri Master
                                License Agreement.{' '}
                                <a
                                    className="underline"
                                    href="https://downloads2.esri.com/arcgisonline/docs/tou_summary.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Summary
                                </a>{' '}
                                |{' '}
                                <a
                                    className="underline"
                                    href="https://www.esri.com/en-us/legal/terms/full-master-agreement"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Terms of Use
                                </a>
                            </p>
                            <p>
                                This app is provided for informational purposes.
                                The accuracy of the information provided is
                                subject to the accuracy of the source data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
