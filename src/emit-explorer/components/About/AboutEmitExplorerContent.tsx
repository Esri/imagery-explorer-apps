/* Copyright 2024 Esri
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
import { EMIT_LEVEL_2a_ITEM_URL } from '@shared/services/emit-level-2a/config';
import React from 'react';

const AboutEmitExplorer = () => {
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
                    Jointly managed by NASA and the USGS, Landsat is the longest
                    running spaceborne earth imaging and observation program in
                    history. The Landsat program began in 1972, with the launch
                    of Landsat 1. Beginning with Landsat 4, the program began
                    providing mission to mission data continuity.
                </p>

                <p className="mb-4">
                    Emit Collection 2 Level-2a science products, imagery from
                    1982 to present, are made publicly available by the USGS.
                    The continuity in this scientific record allows for critical
                    and reliable observation and analysis of Earth processes and
                    changes over time.
                </p>

                <p className="mb-4">
                    The Emit Level-2a multispectral imagery is available in{' '}
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
                        href={EMIT_LEVEL_2a_ITEM_URL}
                        target="_blank"
                        className="underline"
                        rel="noreferrer"
                    >
                        Emit Level-2a
                    </a>
                    .
                </p>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    About the app
                </h3>

                <p className="mb-4">
                    Emit multispectral imagery helps to track and document
                    land use and land change associated with climate change,
                    urbanization, drought, wildfire, deforestation, and other
                    natural processes and human activity.
                </p>

                <p>
                    Through an intuitive user experience, this app leverages a
                    variety of ArcGIS capabilities to explore and begin to
                    unlock the wealth of information that Landsat provides. Some
                    of the key capabilities include:
                </p>

                <ul className="list-disc list-inside">
                    <li>
                        Visual exploration of a Dynamic global mosaic of the
                        best available Landsat scenes.
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
                        <b className="font-bold">Emit Level-2a Imagery </b>–
                        Esri, USGS, NASA, Microsoft
                    </p>
                    <div className="ml-8 mb-2">
                        <p>
                            <b className="font-bold">
                                Source Image Products - USGS
                            </b>
                            <br />
                            USGS-authored or produced data and information are
                            considered to be in the U.S. Public Domain and may
                            be used without restriction.{' '}
                            <a
                                className="underline"
                                rel="noreferrer"
                                href="https://www.usgs.gov/information-policies-and-instructions/acknowledging-or-crediting-usgs"
                                target="_blank"
                            >
                                Acknowledging or Crediting USGS
                            </a>
                        </p>
                    </div>

                    <div className="ml-8">
                        <p className="font-bold">Image Service - Esri</p>
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
                        Emit Explorer App - Esri
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

export default AboutEmitExplorer;
