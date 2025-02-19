/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
// import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
// import { showAboutThisAppToggled } from '@shared/store/LandcoverUI/reducer';
// import { selectShowAboutThisApp } from '@shared/store/LandcoverUI/selectors';
// import { CloseButton } from '@shared/components/CloseButton';
import EsriLogo from './esri-logo.png';
import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
// import { shouldShowAboutThisAppToggled } from '@shared/store/UI/reducer';
import { About } from '@shared/components/About';

const AboutLandcoverExplorer = () => {
    // const dispatch = useAppDispatch();

    const show = useAppSelector(selectShouldShowAboutThisApp);

    if (!show) {
        return null;
    }

    return (
        <About>
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
                        information provided by these maps helps inform policy
                        and land management decisions by better understanding
                        and quantifying the impacts of earth processes and human
                        activity.
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
                        provides a detailed, accurate, and timely LULC map of
                        the world. The data is the result of a collaboration
                        between Esri and Impact Observatory. For more
                        information about the data, see{' '}
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
                        dynamic change analysis. The app provides dynamic visual
                        and statistical change by comparing annual slices of the
                        Sentinel-2 10m Land Use/Land Cover data as you explore
                        the map.
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
                            Imagery mode for visual investigation and validation
                            of land cover
                        </li>
                        <li>
                            Select imagery renderings (e.g. SWIR to visualize
                            forest burn scars)
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
                            – Esri and Impact Observatory
                        </p>
                        <p>
                            This work is licensed under a Creative Commons by
                            Attribution (CC BY 4.0) license.{' '}
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
                            – Esri, Microsoft, ESA, and the European Commission
                        </p>
                        <p>
                            This work is licensed under the Esri Master License
                            Agreement.{' '}
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
                            This app is licensed under the Esri Master License
                            Agreement.{' '}
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
                            This app is provided for informational purposes. The
                            accuracy of the information provided is subject to
                            the accuracy of the source data.
                        </p>
                    </div>
                </div>
            </div>
        </About>
    );
};

export default AboutLandcoverExplorer;
