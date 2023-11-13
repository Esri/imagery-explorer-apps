/**
 * Generates a filename for image with leading zero padding to ensure a consistent
 * file name length. If the length of the file name is shorter than the input
 * length, it adds padding zeros to the left of the index.
 *
 * @param index - The index or identifier for the image.
 * @param length - The desired length of the output name.
 * @param extension - The desired extension of the output file name.
 *
 * @returns The formatted image name as a string.
 *
 * @example
 * ```js
 * getName4OutputMEMFS(0, 3, 'jpg') // returns `000.jpg`
 * ```
 */
export const getFileName = (
    index: number,
    length: number,
    extension: string
) => {
    let name = index.toString();

    while (name.length < length) {
        name = '0' + name;
    }

    return name + '.' + extension;
};

/**
 * This function converts an `HTMLImageElement` object into a Blob object,
 * It takes an image, resizes it to specified dimensions, converts it to a JPEG blob
 *
 * @param data - The `AnimationFrameData` object representing the input image.
 * @param outputContentType - The content type of the output blob object (e.g., `image/jpeg`).
 * @param outputHeight - The height of the output image.
 * @param outputWidth - The width of the output image.
 * @param sourceImageWidth - The height of the input source image.
 * @param sourceImageHeight - The width of the input source image.
 * @returns A Promise that resolves to a blob object containing the output image data.
 */
export const getImageBlob = async (params: {
    image: HTMLImageElement;
    outputContentType: string;
    outputWidth: number;
    outputHeight: number;
    sourceImageWidth: number;
    sourceImageHeight: number;
}) => {
    const {
        image,
        outputContentType,
        outputHeight,
        outputWidth,
        sourceImageWidth,
        sourceImageHeight,
    } = params;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the desired output dimensions.
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const aspectRatio = outputWidth / outputHeight;

    // Calculate the dimensions of the portion to be selected from the source image.
    let sWidth = sourceImageHeight * aspectRatio;
    let sHeight = sourceImageHeight;

    // re-calculate sWidth and sHeight if sWidth calculated from previous step is wider that the width of the actual source image
    if (sWidth > sourceImageWidth) {
        sWidth = sourceImageWidth;
        sHeight = sourceImageWidth * (1 / aspectRatio);
    }

    sWidth = Math.floor(sWidth);
    sHeight = Math.floor(sHeight);

    // Calculate the starting point (sx, sy) for selecting the portion from the source image.
    // we should always select the center portion of it
    const sx = Math.floor(Math.abs(sWidth - sourceImageWidth) / 2);
    const sy = Math.floor(Math.abs(sHeight - sourceImageHeight) / 2);

    context.drawImage(
        image,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Export the canvas content as a JPEG blob.
    const blob: Blob = await new Promise((resolveBlob, rejectBlob) => {
        canvas.toBlob(resolveBlob, outputContentType);
    });

    return blob;
};
