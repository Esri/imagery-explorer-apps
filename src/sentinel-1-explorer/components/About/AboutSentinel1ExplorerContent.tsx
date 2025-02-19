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

import { appConfig } from '@shared/config';
import React from 'react';

export const AboutSentinel1ExplorerContent = () => {
    return (
        <div
            className="py-10"
            style={{
                maxWidth: 1680,
            }}
        >
            <div className="flex items-center mb-8">
                <div className=" text-custom-light-blue text-3xl pr-4 mr-4">
                    <span>{appConfig.title}</span>
                </div>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    About the data
                </h3>

                <p className="mb-4">
                    Sentinel-1 is a spaceborne Synthetic Aperture Radar (SAR)
                    imaging system and mission from the European Space Agency
                    and the European Commission. The mission launched and began
                    collecting imagery in 2014.
                </p>

                <p className="mb-4">
                    The Sentinel-1 RTC data in this collection is an analysis
                    ready product derived from the Ground Range Detected (GRD)
                    Level-1 products produced by the European Space Agency.
                    Radiometric Terrain Correction (RTC) accounts for terrain
                    variations that affect both the position of a given point on
                    the Earth&#39;s surface and the brightness of the radar
                    return.
                </p>

                <p className="mb-4">
                    With the ability to see through cloud and smoke cover, and
                    because it does not rely on solar illumination of the
                    Earth&#39;s surface, Sentinel-1 is able to collect useful
                    imagery in most weather conditions, during both day and
                    night. This data is good for wide range of land and maritime
                    applications, from mapping floods, to deforestation, to oil
                    spills, and more.
                </p>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    About the app
                </h3>

                <p className="mb-4">
                    Sentinel-1 SAR imagery helps to track and document land use
                    and land change associated with climate change,
                    urbanization, drought, wildfire, deforestation, and other
                    natural processes and human activity.
                </p>

                <p className="mb-4">
                    Through an intuitive user experience, this app leverages a
                    variety of ArcGIS capabilities to explore and begin to
                    unlock the wealth of information that Sentinel-1 provides.
                    Some of the key capabilities include:
                </p>

                <ul className="list-disc list-inside">
                    <li>
                        Visual exploration of a dynamic global mosaic of the
                        latest available scenes.
                    </li>
                    <li>
                        On-the-fly band/polarization combinations and indices
                        for visualization and analysis.
                    </li>
                    <li>
                        Interactive Find a Scene by location, time, and orbit
                        direction.
                    </li>
                    <li>
                        Visual change by time and renderings with Swipe and
                        Animation modes.
                    </li>
                    <li>
                        Analysis such as threshold masking and temporal profiles
                        for vegetation, water, land surface temperature, and
                        more.
                    </li>
                </ul>
            </div>

            <div className="mb-4 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    Attribution and Terms of Use
                </h3>

                <div className="mb-4">
                    <p className="mb-1">
                        <b className="font-bold">Sentinel-1 RTC Imagery </b>–
                        Esri, Microsoft, European Space Agency, European
                        Commission
                    </p>
                    <div className="ml-8 mb-2">
                        <p>
                            <b className="font-bold">
                                Sentinel-1 RTC Source Imagery – Microsoft
                            </b>
                            <br />
                            The source imagery is hosted on Microsoft Planetary
                            Computer under an open{' '}
                            <a
                                className="underline"
                                rel="noreferrer"
                                href="https://creativecommons.org/licenses/by/4.0/"
                                target="_blank"
                            >
                                CC BY 4.0 license
                            </a>
                            .
                        </p>
                    </div>

                    <div className="ml-8">
                        <p className="font-bold">
                            Sentinel-1 RTC Image Service – Esri
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
                </div>

                <div className="mb-4">
                    <p className="font-bold mb-1">Sentinel-1 Explorer - Esri</p>
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
                        accuracy of the information provided is subject to the
                        accuracy of the source data.
                    </p>
                </div>

                <div className="mb-4 font-light">
                    <p>
                        Information contained in the Interesting Places
                        descriptions was sourced from Wikipedia.
                    </p>
                </div>
            </div>
        </div>
    );
};
