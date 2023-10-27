export const imageDataToBlob = (imageData: ImageData): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0); // synchronous

    return new Promise((resolve, reject) => {
        canvas.toBlob(resolve); // implied image/png format
    });
};
