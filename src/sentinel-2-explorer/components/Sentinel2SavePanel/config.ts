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

export const TAGS = [
    'Esri Sentinel-2 Explorer',
    'Sentinel-2 ',
    'Remote Sensing',
];

export const SENTINEL2_SERVICE_DESCRIPTION = `<p>The Copernicus Sentinel-2 mission from ESA and the European Commision provides optical imagery for a wide range of applications including land, water and atmospheric monitoring. Beginning in 2015, The mission is based on a constellation of two identical satellites flying in tandem and covering all of Earth’s land and coastal waters every five days.</p>
<p>Each satellite carries a multispectral sensor that generates optical images in the visible, near-infrared and shortwave-infrared part of the electromagnetic spectrum. The images contain a total of 13 spectral bands at resolutions of 10-m, 20-m and 60-m.</p>
<p>The Sentinel-2 Level-2A imagery archive is available in <a href="https://livingatlas.arcgis.com/">ArcGIS Living Atlas of
the World</a> as a dynamic time enabled image service, accessible across the ArcGIS system. For more about the service and data, see <a href="https://www.arcgis.com/home/item.html?id=255af1ceee844d6da8ef8440c8f90d00">Sentinel-2 Level-2A</a>.</p>`;

export const SENTINEL2_SERVICE_ACCESS_INFOMRATION = `Esri, ESA, European Commission, Microsoft`;

export const SENTINEL2_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE = `<p><b>Source Sentinel-2 Imagery</b> – ESA, European Commission <br /> The access and use of Copernicus Sentinel Data and Service Information is regulated under EU law. In particular, the law provides that users shall have a free, full and open access to Copernicus Sentinel Data and Service Information without any express or implied warranty, including as it regards quality and suitability for any purpose. <a href="https://sentinel.esa.int/documents/247904/690755/Sentinel_Data_Legal_Notice">More…</a></p>`;

export const SENTINEL2_SERVICE_LICENSE_INFO_WEB_MAP =
    SENTINEL2_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE +
    `<p><b>Sentinel-2 Image Service</b> - Esri <br />This work is licensed under the Esri Master License Agreement. <a href="https://downloads2.esri.com/arcgisonline/docs/tou_summary.pdf" target="_blank"><span>View Summary</span></a><span> | </span><a href="https://www.esri.com/en-us/legal/terms/full-master-agreement" target="_blank"><span>View Terms of Use</span></a></p>`;
