import { DocPanel } from '@shared/components/DocPanel/DocPanel';
import React from 'react';
import Fig1 from './img/fig1.jpg';
import Fig2 from './img/fig2.jpg';

export const Sentinel1DocPanel = () => {
    return (
        <DocPanel>
            <div className=" my-8 md:my-20 md:max-w-5xl text-sm ">
                <h2 className="text-3xl mb-8">
                    Sentinel-1 SAR Quick Reference Guide
                </h2>

                <div className="mb-8">
                    <h4 className="text-lg mb-2">About This User Guide</h4>

                    <p>
                        This quick reference guide is intended to provide a
                        technical overview and context for the Sentinel-1 SAR
                        imagery you see in the Sentinel-1 Explorer. It is not
                        intended to be a comprehensive technical guide.
                    </p>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl mb-4">Sentinel-1</h3>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">Mission</h4>

                        <p className="">
                            The Sentinel-1 mission is designed as a dual
                            satellite constellation carrying advanced radar
                            sensors to collect imagery of Earth’s surface both
                            day and night and in all weather conditions.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">Coverage</h4>

                        <p>
                            Total coverage is global and includes imagery from
                            2014 to present. However, in December 2021,
                            Sentinel-1B experienced a power anomaly resulting in
                            permanent loss of data transmission. From 2022-2024,
                            the mission has continued with a single satellite,
                            Sentinel-1A affecting coverage and frequency of
                            collection. In Q4 2024, Sentinel-1C will launch and
                            the mission will once again operate as a dual
                            satellite constellation.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">Data Acquisition</h4>

                        <p className="mb-4">
                            Sentinel-1 active sensors collect data leveraging
                            C-Band synthetic aperture radar (SAR). The sensors
                            collect data by actively sending and receiving radar
                            signals that echo off the Earth’s surface. The
                            echoes returned to the sensor are known as
                            backscatter. Measurements of this backscatter
                            provides information about the characteristics of
                            the surface at any given location. More on
                            backscatter below.
                        </p>

                        <p>
                            Because radar signals are not dependent upon solar
                            illumination and are unimpeded by clouds, haze, and
                            smoke, Sentinel-1 collects imagery of the Earth’s
                            surface day and night and in all weather conditions.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">Backscatter</h4>

                        <p className="mb-4">
                            As noted in the previous section, the echoes of
                            microwave signals off the Earth’s surface are known
                            as backscatter. Two types of information are
                            obtained from backscatter: amplitude and phase. The
                            amplitude of backscatter provides information about
                            the characteristics of the surface at any given
                            location. For the purposes of this document, we are
                            only focused on the amplitude of backscatter. More
                            backscatter received = higher energy return = higher
                            amplitude = brighter pixels. More on this in the
                            Image Interpretation section.
                        </p>

                        <p>
                            One of the most important factors influencing the
                            amplitude of backscatter is surface roughness. A
                            very smooth surface, like water or pavement, results
                            in high specular reflection where the microwave
                            signals reflect away from the sensor with little to
                            no backscatter return. In contrast, a very rough
                            surface causes diffuse scattering and a relatively
                            high volume of return.
                        </p>

                        <div className="my-6 text-center">
                            <img src={Fig1} className="w-auto mx-auto mt-2" />

                            <p className="italic mt-2 text-xs">
                                Figure 1. Source:{' '}
                                <a
                                    className=" underline"
                                    target="_blank"
                                    href="https://gis1.servirglobal.net/TrainingMaterials/SAR/Chp2Content.pdf"
                                    rel="noreferrer"
                                >
                                    The SAR Handbook
                                </a>
                            </p>
                        </div>

                        <p>
                            As noted above, rougher surfaces produce diffuse
                            scattering, resulting in more energy returned to the
                            sensor. Tree canopies tend to cause volumetric
                            scattering, resulting in relatively lower returns.
                            Objects such as buildings and ships can cause what
                            is known as double bounce, resulting in very strong
                            returns with most of the original signal directed
                            back to the sensor. This effect is amplified when
                            the vertical object is adjacent to a very smooth
                            surface which would otherwise result in specular
                            reflection (e.g. a ship on smooth water).
                        </p>

                        <div className="my-6 text-center">
                            <img src={Fig2} className="w-auto mx-auto mt-2" />

                            <p className="italic mt-2 text-xs">
                                Figure 2. Source:{' '}
                                <a
                                    className=" underline"
                                    target="_blank"
                                    href="https://gis1.servirglobal.net/TrainingMaterials/SAR/Chp2Content.pdf"
                                    rel="noreferrer"
                                >
                                    The SAR Handbook
                                </a>
                            </p>
                        </div>

                        <p>
                            The polarization of the microwave signals can also
                            contribute to the overall amplitude of backscatter.
                            Sentinel-1 is a dual polarized sensor. It transmits
                            microwave signals which are vertically oriented
                            relative to the plane of the Earth’s surface. While
                            the backscatter often maintains its original
                            vertical orientation, echoed signals can change
                            orientation and return horizontally. This dual
                            polarization is expressed as VV and VH, where the
                            first character denotes the transmitted orientation
                            and the second denotes the received orientation. It
                            should be noted the scattering types described above
                            do not contribute equally to each polarization. More
                            on this in the next section.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">Image Interpretation</h4>

                        <p className="mb-4">
                            The Sentinel-1 imagery available in ArcGIS Living
                            Atlas and used in the Sentinel-1 Explorer do not
                            include the phase portion of the SAR data, which
                            includes the measurement of time it takes to
                            transmit and receive the microwave signals. Instead,
                            the image only provides the amplitude information
                            described above in terms of the amount of energy
                            returned from the transmitted signals.
                        </p>

                        <p className="mb-4">
                            The imagery here has a Radiometric Terrain
                            Correction (RTC) applied making it a mapping
                            friendly product ready for certain types of
                            analysis. These include applications such as
                            flooding, change detection, agriculture, water
                            quality, deforestation, and more.
                        </p>

                        <p>
                            As noted in the previous section, Sentinel-1 is dual
                            polarized. Each polarization, VV and VH, are stored
                            as separate bands in the RTC image product, where
                            band-1 is VV, and band-2 is VH. Each band can be
                            used independently or in conjunction with one
                            another, for visualization and analysis. VH signals
                            are most prevalent in areas of volume scattering.
                            This makes it useful in determining land cover types
                            such as forested vs non-forested areas.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            References and additional information
                        </h4>

                        <ol className=" list-disc list-inside">
                            <li className="mb-1">
                                <a
                                    className="underline"
                                    href="https://hyp3-docs.asf.alaska.edu/guides/introduction_to_sar/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    ASF – Introduction to SAR
                                </a>
                            </li>
                            <li>
                                <a
                                    className="underline"
                                    href="https://ntrs.nasa.gov/api/citations/20190002563/downloads/20190002563.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    SERVIR – The SAR Handbook
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </DocPanel>
    );
};
