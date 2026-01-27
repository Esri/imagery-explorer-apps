import { ARCGIS_REST_API_ROOT } from '@shared/config';
import { getSignedInUser, getToken } from '@shared/utils/esri-oauth';

type DeleteItemsOutput = {
    results: {
        itemId: string;
        success: boolean;
        error?: any;
    }[];
};

/**
 * Deletes multiple items from ArcGIS Online for the authenticated user.
 *
 * @param itemIds - An array of item IDs to be deleted from the user's content
 * @returns A promise that resolves to the deletion results, or undefined if no items are provided
 * @throws {Error} If the user is not authenticated (no token or user found)
 * @throws {Error} If the HTTP request fails
 * @throws {Error} If any items fail to delete, with detailed error messages for each failure
 *
 * @example
 * ```typescript
 * const itemIds = ['item1', 'item2', 'item3'];
 * const result = await deleteItems(itemIds);
 * console.log(result.results);
 * ```
 */
export const deleteItems = async (
    itemIds: string[]
): Promise<DeleteItemsOutput> => {
    if (itemIds.length === 0) {
        return;
    }

    const token = getToken();

    if (!token) {
        throw new Error('User is not authenticated');
    }

    const user = getSignedInUser();

    if (!user) {
        throw new Error('User is not authenticated');
    }

    const { username } = user;

    const requestURL = `${ARCGIS_REST_API_ROOT}/content/users/${username}/deleteItems`;

    const params = new URLSearchParams({
        f: 'json',
        token,
        items: itemIds.join(','),
    });

    const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    if (!response.ok) {
        throw new Error(`Failed to delete items: ${response.statusText}`);
    }

    const data: DeleteItemsOutput = await response.json();

    const failedDeletions = data.results.filter(
        (result) => !result.success && result.error
    );
    if (failedDeletions.length > 0) {
        const errorMessages = failedDeletions
            .map(
                (result) =>
                    `Item ID: ${result.itemId}, Error: ${JSON.stringify(result.error)}`
            )
            .join('; ');
        throw new Error(`Failed to delete some items: ${errorMessages}`);
    }

    return data;
};
