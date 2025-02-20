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
import { SENTINEL_2_ITEM_URL } from '@shared/services/sentinel-2/config';
import React from 'react';

export const AboutSentinel2ExplorerContent = () => {
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
                    The Copernicus Sentinel-2 mission provides optical imagery
                    for a wide range of applications including land, water and
                    atmospheric monitoring. Beginning in 2015, The mission is
                    based on a constellation of two identical satellites flying
                    in tandem and covering all of Earth’s land and coastal
                    waters every five days.
                </p>

                <p className="mb-4">
                    Each satellite carries a multispectral sensor that generates
                    optical images in the visible, near-infrared and
                    shortwave-infrared part of the electromagnetic spectrum. The
                    images contain a total of 13 spectral bands at resolutions
                    of 10-m, 20-m and 60-m.
                </p>

                <p className="mb-4">
                    The Sentinel-2 Level-2A imagery archive is available in{' '}
                    <a
                        href="https://livingatlas.arcgis.com/en/home/"
                        target="_blank"
                        className="underline"
                        rel="noreferrer"
                    >
                        ArcGIS Living Atlas of the World
                    </a>{' '}
                    as a dynamic time enabled image service, accessible across
                    the ArcGIS system and used to power this app. For more about
                    the service and the data, see{' '}
                    <a
                        href={SENTINEL_2_ITEM_URL}
                        target="_blank"
                        className="underline"
                        rel="noreferrer"
                    >
                        Sentinel-2 Level-2A
                    </a>
                    .
                </p>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    About the app
                </h3>

                <p className="mb-4">
                    Sentinel-2 multispectral imagery helps to track and document
                    land use and land change associated with climate change,
                    urbanization, drought, wildfire, deforestation, and other
                    natural processes, disasters, and human activity.
                </p>

                <p>
                    Through an intuitive user experience, this app leverages a
                    variety of ArcGIS capabilities to explore and begin to
                    unlock the wealth of information that Sentinel-2 provides.
                    Some of the key capabilities include:
                </p>

                <ul className="list-disc list-inside">
                    <li>
                        Visual exploration of a Dynamic global mosaic of the
                        best available Sentinel-2 scenes.
                    </li>
                    <li>
                        On-the-fly multispectral band combinations and indices
                        for visualization and analysis.
                    </li>
                    <li>
                        Interactive Find a Scene by location, sensor, time, and
                        cloud cover.
                    </li>
                    <li>
                        Visual change by time, and comparison of different
                        renderings, with Swipe and Animation modes.
                    </li>
                    <li>
                        Analysis such as threshold masking and temporal profiles
                        for vegetation, water, and more.
                    </li>
                </ul>
            </div>

            <div className="mb-4 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    Attribution and Terms of Use
                </h3>

                <div className="mb-4">
                    <p className="mb-1">
                        <b className="font-bold">
                            Sentinel-2 Level-2A Imagery{' '}
                        </b>
                        – Esri, ESA, European Commission, Microsoft
                    </p>

                    <div className="ml-8 mb-2">
                        <p>
                            <b className="font-bold">
                                Source Sentinel-2 Imagery – ESA, European
                                Commission
                            </b>
                            <br />
                            The access and use of Copernicus Sentinel Data and
                            Service Information is regulated under EU law. In
                            particular, the law provides that users shall have a
                            free, full and open access to Copernicus Sentinel
                            Data and Service Information without any express or
                            implied warranty, including as regards quality and
                            suitability for any purpose.{' '}
                            <a
                                className="underline"
                                rel="noreferrer"
                                href="https://sentinel.esa.int/documents/247904/690755/Sentinel_Data_Legal_Notice"
                                target="_blank"
                            >
                                More…
                            </a>
                        </p>
                    </div>

                    <div className="ml-8">
                        <p className="font-bold">
                            Sentinel-2 Image Service - Esri
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
                    <p className="font-bold mb-1">
                        Sentinel-2 Explorer App - Esri
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
                        accuracy of the information provided is subject to the
                        accuracy of the source data.
                    </p>
                </div>
            </div>

            <div className="mb-4 font-light">
                <p>
                    Information contained in the Interesting Places descriptions
                    was sourced from Wikipedia.
                </p>
            </div>
        </div>
    );
};
