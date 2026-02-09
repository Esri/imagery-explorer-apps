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

import React, { FC, useEffect, useMemo } from 'react';
import { InterestingPlaces } from '@shared/components/InterestingPlaces/InterestingPlaces';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectBookmarks,
    selectSelectedBookmarkId,
    selectSelectedProjectId,
    selectLoadingBookmarks,
} from '@shared/store/Bookmarks/selectors';
import {
    bookmarksLoaded,
    bookmarksLoadingStarted,
    bookmarkSelected,
    bookmarkDeleted,
} from '@shared/store/Bookmarks/reducer';
import { selectFirebaseUser } from '@shared/store/Firebase/selectors';
import {
    fetchProjectBookmarks,
    deleteSpatialBookmark,
} from '@shared/services/firebase/firestore';
import type { InterestingPlaceData } from '@typing/shared';
import { centerChanged, zoomChanged } from '@shared/store/Map/reducer';

// Default thumbnail for bookmarks
const DEFAULT_BOOKMARK_THUMBNAIL =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Cpath fill="%2366ccff" d="M50 10v80l-20-15.5-20 15.5V10zm-2 5H30v65.7l18-13.9 18 13.9V15z"/%3E%3C/svg%3E';

export const BookmarksList: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectFirebaseUser);
    const selectedProjectId = useAppSelector(selectSelectedProjectId);
    const bookmarks = useAppSelector(selectBookmarks);
    const selectedBookmarkId = useAppSelector(selectSelectedBookmarkId);
    const loading = useAppSelector(selectLoadingBookmarks);

    // Fetch bookmarks when project is selected
    useEffect(() => {
        if (user && selectedProjectId) {
            const loadBookmarks = async () => {
                dispatch(bookmarksLoadingStarted());
                try {
                    const projectBookmarks = await fetchProjectBookmarks(
                        selectedProjectId,
                        user.uid
                    );
                    dispatch(bookmarksLoaded(projectBookmarks));
                } catch (error) {
                    console.error('Failed to load bookmarks:', error);
                    dispatch(bookmarksLoaded([]));
                }
            };
            loadBookmarks();
        }
    }, [selectedProjectId, user, dispatch]);

    // Convert bookmarks to InterestingPlaceData format, sorted alphabetically by name
    const bookmarksAsInterestingPlaces: InterestingPlaceData[] = useMemo(() => {
        // Sort bookmarks alphabetically by name
        const sortedBookmarks = [...bookmarks].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        return sortedBookmarks.map((bookmark) => ({
            key: bookmark.id,
            name: bookmark.name,
            location: {
                center: bookmark.center,
                zoom: bookmark.zoom,
            },
            renderer: '', // No renderer for bookmarks
            thumbnail: bookmark.image || DEFAULT_BOOKMARK_THUMBNAIL,
            label: bookmark.name,
            description: `Created ${new Date(bookmark.createdAt).toLocaleDateString()}`,
        }));
    }, [bookmarks]);

    const handleBookmarkChange = (bookmarkId: string) => {
        const bookmark = bookmarks.find((b) => b.id === bookmarkId);
        if (bookmark) {
            // Update map center and zoom
            dispatch(centerChanged(bookmark.center));
            dispatch(zoomChanged(bookmark.zoom));
            // Update selected bookmark
            dispatch(bookmarkSelected(bookmarkId));
        }
    };

    const handleDeleteBookmark = async () => {
        if (!user || !selectedProjectId || !selectedBookmarkId) {
            return;
        }

        try {
            // Delete from Firestore
            await deleteSpatialBookmark(
                selectedProjectId,
                selectedBookmarkId,
                user.uid
            );

            // Update Redux state
            dispatch(bookmarkDeleted(selectedBookmarkId));

            console.log('Bookmark deleted successfully');
        } catch (error) {
            console.error('Failed to delete bookmark:', error);
            alert('Failed to delete bookmark. Please try again.');
        }
    };

    if (!user) {
        return null;
    }

    if (!selectedProjectId) {
        return null;
    }

    if (loading) {
        return (
            <div className="text-center text-sm text-custom-light-blue-50 p-4">
                Loading bookmarks...
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="text-center text-sm text-custom-light-blue-50 p-4">
                No bookmarks in this project
            </div>
        );
    }

    return (
        <InterestingPlaces
            data={bookmarksAsInterestingPlaces}
            keyOfSelectedPlace={selectedBookmarkId || ''}
            onChange={handleBookmarkChange}
            onHover={() => {}}
            onDelete={handleDeleteBookmark}
        />
    );
};
