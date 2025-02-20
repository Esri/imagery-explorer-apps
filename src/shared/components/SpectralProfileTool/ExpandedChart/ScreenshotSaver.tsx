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

import React, { FC } from 'react';
import { EXPANDED_SPECTRAL_PROFILE_CHART_CONTAINER_ID } from './ExpandedSpectralProfileChart';

const resolveCSSVariablesInSVGString = (svgElement: Element) => {
    const computedStyle = getComputedStyle(svgElement);
    let svgString = new XMLSerializer().serializeToString(svgElement);

    // replace references to CSS variables
    svgString = svgString.replace(
        /var\(--([^)]*)\)/g,
        (match, variableName) => {
            // Get the computed value of the CSS variable
            const value = computedStyle.getPropertyValue(`--${variableName}`);
            return value ? value.trim() : match; // Replace if a value is found
        }
    );

    // Replace `<line>` elements with stroke set to `currentColor`
    // to make the tick line less visible
    svgString = svgString.replace(
        /<line([^>]*?)stroke="currentColor"([^>]*?)\/>/g,
        '<line$1stroke="rgba(200,200,200,0.25)"$2/>'
    );

    // Replace <path> elements with class="domain" and stroke="currentColor"
    svgString = svgString.replace(
        /<path([^>]*class="domain"[^>]*?)stroke="currentColor"([^>]*?)\/?>/g,
        '<path$1stroke="rgba(255,255,255,0.25)"$2/>'
    );

    // replace references to `currentColor`
    svgString = svgString.replace(/currentColor/g, computedStyle.color);

    return svgString;
};

const cleanSvgString = (svgString: string) => {
    // remove all <rect> and <defs> elements from the resolvedSVGString
    const cleanedSVGString = svgString
        .replace(/<rect[^>]*>[\s\S]*?<\/rect>/g, '') // Remove <rect> with content
        .replace(/<rect[^>]*\/>/g, '') // Remove self-closing <rect>
        .replace(/<defs[^>]*>[\s\S]*?<\/defs>/g, '') // Remove <defs> with content
        .replace(/<defs[^>]*\/>/g, ''); // Remove self-closing <defs>

    return cleanedSVGString;
};

const addBlackBackground = (svgString: string) => {
    // Find the opening <svg> tag
    const svgOpenTagMatch = svgString.match(/<svg[^>]*>/);
    if (svgOpenTagMatch) {
        const svgOpenTag = svgOpenTagMatch[0];
        // Create a <rect> element with a black background
        const blackBackgroundRect =
            '<rect width="100%" height="100%" fill="rgba(0,35,47,1)"/>';
        // Insert the <rect> right after the opening <svg> tag
        return svgString.replace(
            svgOpenTag,
            `${svgOpenTag}${blackBackgroundRect}`
        );
    }
    return svgString; // Return original if no <svg> tag found
};

export const ScreenshotSaver: FC = () => {
    const saveScreenshot = async () => {
        const svgElement = document.querySelector(
            `#${EXPANDED_SPECTRAL_PROFILE_CHART_CONTAINER_ID} svg`
        );
        const resolvedSVGString = resolveCSSVariablesInSVGString(svgElement);
        const cleanedSVGString = cleanSvgString(resolvedSVGString);
        const svgStringWithBlackBackground =
            addBlackBackground(cleanedSVGString);

        const svgBlob = new Blob([svgStringWithBlackBackground], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(svgBlob);
        // console.log(svgElement, cleanedSVGString);

        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = svgElement.clientWidth;
            canvas.height = svgElement.clientHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // export the canvas to an image format like PNG
            const pngData = canvas.toDataURL('image/png');

            const outputImageFileName = `Spectral_Profile_Chart.png`;

            // Optional: Download the image or use it as needed
            const downloadLink = document.createElement('a');
            downloadLink.href = pngData;
            downloadLink.download = outputImageFileName;
            downloadLink.click();

            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    return (
        <calcite-icon
            class="cursor-pointer mx-4"
            title="Save the chart as an image"
            icon="camera"
            scale="s"
            onClick={saveScreenshot}
        />
    );
};
