import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    selectedEventUpdated,
} from '@shared/store/DisasterResponse/reducer';
import { selectSelectedEventName } from '@shared/store/DisasterResponse/selectors';
import { updateSelectedDisasterResponseEvent } from '@shared/store/DisasterResponse/thunks';
import React from 'react';

export const EventSelectorContainer = () => {
    const dispatch = useAppDispatch();

    const selectedEventName = useAppSelector(selectSelectedEventName);

    const events: DisasterResponseEvent[] = [
        {
            event: 'WildFires-LosAngeles-Jan-2025',
            title: 'Los Angeles Wildfires 2025',
            description: '',
        },
        {
            event: 'Maui-Hawaii-fires-Aug-23',
            title: 'Maui Fires',
            description:
                'A series of grassland wildfires driven by high winds broke out on the Hawaiian island of Hawaii on August 8, 2023. The fires spread to the town of Lahaina, killing at least 97 people and leaving at least 31 others missing.',
        },
    ];

    return (
        <div>
            <h3>Event Selector</h3>
            {events.map((d) => {
                const selected = selectedEventName === d.event;
                return (
                    <div
                        key={d.event}
                        className={`cursor-pointer ${selected ? ' text-white font-medium' : 'text-white/50'}`}
                    >
                        <p
                            onClick={() => {
                                console.log('selected event: ', d);
                                dispatch(
                                    updateSelectedDisasterResponseEvent(d.event)
                                );
                            }}
                        >
                            {d.title}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
