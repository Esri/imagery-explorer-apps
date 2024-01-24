/**
 * mock `window.location` object using the input href
 * @param href
 */
export const mockWindowLocation = (href: string) => {
    delete window.location;

    Object.defineProperty(window, 'location', {
        value: new URL(href),
        configurable: true,
    });
};
