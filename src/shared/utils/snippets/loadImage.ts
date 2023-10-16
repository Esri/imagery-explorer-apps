export const loadImageAsHTMLIMageElement = async (
    imageURL: string
): Promise<HTMLImageElement> => {
    const image = new Image();
    image.src = imageURL;

    return new Promise((resolve) => {
        image.onload = () => {
            resolve(image);
        };
    });
};

/**
 * get a single image file as MEMFS
 * @param {*} fileName
 * @returns
 */
export const loadImageAsMEMFS = async (imageURL: string, fileName: string) => {
    const res = await fetch(imageURL);
    const data = await res.blob();
    console.log(data);
    const arrayBuffer = await data.arrayBuffer();

    return {
        name: fileName,
        data: arrayBuffer,
    };
};
