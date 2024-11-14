/**
 * Enum representing different save options available in the application.
 */
export enum SaveOption {
    PublishScene = 'Publish Scene',
    PublishIndexMask = 'Publish Index Mask',
    DownloadIndexMask = 'Download Index Mask',
    SaveWebMappingApp = 'Save Web Mapping App',
    SaveWebMap = 'Save Web Map',
}

/**
 * A lookup object that maps save options to their corresponding information.
 * Each save option is associated with an object containing a title, subtitle, and description.
 *
 * @type {Record<SaveOption, { title: string; subtitle: string; description: string }>}
 */
export const saveOptionInfoLookup: Record<
    SaveOption,
    { title: string; subtitle: string; description: string }
> = {
    'Publish Scene': {
        title: 'Scene',
        subtitle: 'as Hosted Imagery',
        description:
            'Publish a hosted imagery layer of the selected scene. This action requires a Professional Plus User Type and a Publisher role or higher.',
    },
    'Publish Index Mask': {
        title: 'Index mask',
        subtitle: 'as Hosted Imagery',
        description:
            'Publish a hosted imagery layer of the current index mask. This action requires a Professional Plus User Type and a Publisher role or higher.',
    },
    'Download Index Mask': {
        title: 'Index mask',
        subtitle: 'as GeoTIFF',
        description:
            'Download the current index mask as a black and white image in GeoTIFF format.',
    },
    'Save Web Mapping App': {
        title: 'Current State',
        subtitle: 'as Web Application',
        description:
            'Create an instance of this application in its current state as an ArcGIS Online web application.',
    },
    'Save Web Map': {
        title: 'Scene',
        subtitle: 'as ArcGIS Online Map',
        description:
            'Create an ArcGIS Online map containing the selected scene as a layer.',
    },
};
