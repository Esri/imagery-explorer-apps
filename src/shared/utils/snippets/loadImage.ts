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
