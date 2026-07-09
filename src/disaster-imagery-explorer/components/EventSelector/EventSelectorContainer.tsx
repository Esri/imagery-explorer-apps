import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import type { GroupedDropdownData } from '@shared/components/Dropdown/Dropdown';
import { APP_NAME } from '@shared/config';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    selectedEventUpdated,
} from '@shared/store/DisasterImageryExplorer/reducer';
import {
    selectDisasterResponseEvents,
    selectSelectedEventName,
} from '@shared/store/DisasterImageryExplorer/selectors';
import { updateSelectedDisasterResponseEvent } from '@shared/store/DisasterImageryExplorer/thunks';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const EventSelectorContainer = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const selectedEventName = useAppSelector(selectSelectedEventName);

    const events: DisasterResponseEvent[] = useAppSelector(
        selectDisasterResponseEvents
    );

    // events grouped by the UTC year extracted from their start date, most recent year first
    // since `events` is already sorted by start date descending
    const eventDropdownOptions: GroupedDropdownData[] = useMemo(() => {
        const optionsByYear = new Map<number, DropdownData[]>();

        for (const d of events) {
            const year = new Date(d.startDate).getUTCFullYear();

            if (!optionsByYear.has(year)) {
                optionsByYear.set(year, []);
            }

            optionsByYear.get(year).push({
                label: d.title,
                value: d.event,
                selected: selectedEventName === d.event,
            });
        }

        return Array.from(optionsByYear, ([year, options]) => ({
            groupTitle: `${year}`,
            options,
        }));
    }, [events, selectedEventName]);

    return (
        <Dropdown
            title={t('select_event', {
                ns: APP_NAME,
            })}
            groupedData={eventDropdownOptions}
            onChange={(eventName) => {
                dispatch(updateSelectedDisasterResponseEvent(eventName));
            }}
        />
    );
};
