import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { APP_NAME } from '@shared/config';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    selectedEventUpdated,
} from '@shared/store/DisasterResponse/reducer';
import {
    selectDisasterResponseEvents,
    selectSelectedEventName,
} from '@shared/store/DisasterResponse/selectors';
import { updateSelectedDisasterResponseEvent } from '@shared/store/DisasterResponse/thunks';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const EventSelectorContainer = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const selectedEventName = useAppSelector(selectSelectedEventName);

    const events: DisasterResponseEvent[] = useAppSelector(
        selectDisasterResponseEvents
    );

    const eventDropdownOptions: DropdownData[] = useMemo(() => {
        return events.map((d) => ({
            label: d.title,
            value: d.event,
            selected: selectedEventName === d.event,
        }));
    }, [events, selectedEventName]);

    return (
        <Dropdown
            title={t('select_event', {
                ns: APP_NAME,
            })}
            data={eventDropdownOptions}
            onChange={(eventName) => {
                dispatch(updateSelectedDisasterResponseEvent(eventName));
            }}
        />
    );
};
