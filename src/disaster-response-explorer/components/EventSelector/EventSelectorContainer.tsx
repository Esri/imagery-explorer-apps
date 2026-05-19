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
import React from 'react';

export const EventSelectorContainer = () => {
    const dispatch = useAppDispatch();

    const selectedEventName = useAppSelector(selectSelectedEventName);

    const events: DisasterResponseEvent[] = useAppSelector(
        selectDisasterResponseEvents
    );

    return (
        <div className="max-h-60 overflow-y-auto max-w-xs">
            <h3>Event Selector</h3>
            {events.map((d) => {
                const selected = selectedEventName === d.event;
                return (
                    <div
                        key={d.event}
                        className={`cursor-pointer ${selected ? ' text-white font-medium' : 'text-white/50'}`}
                        onClick={() => {
                            console.log('selected event: ', d);
                            dispatch(
                                updateSelectedDisasterResponseEvent(d.event)
                            );
                        }}
                    >
                        <p className="text-sm">{d.title}</p>

                        {/* <p className='text-xs'>{d.description}</p> */}
                    </div>
                );
            })}
        </div>
    );
};
