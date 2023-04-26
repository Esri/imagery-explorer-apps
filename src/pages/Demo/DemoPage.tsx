import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { MapView } from '../../components/ArcGIS';

import { ErrorBoundary } from '../../components';
import { selectWebmapId } from '../../store/Map/selectors';
import classNames from 'classnames';
import { updateWebmap } from '../../store/Map/thunks';

const WebmapSelector = () => {
    const dispatch = useDispatch();

    const webmapId = useSelector(selectWebmapId);

    const webmapData = [
        { name: 'Topo', id: '67372ff42cd145319639a99152b15bc3' },
        { name: 'Imagery', id: '86265e5a4bbb4187a59719cf134e0018' },
    ];

    return (
        <div className="absolute right-4 top-4 flex py-2 px-3 z-10 bg-slate-900 text-sm">
            {webmapData.map(({ name, id }) => {
                return (
                    <div
                        key={id}
                        className={classNames(
                            'px-2 pb-1 cursor-pointer border-b-2',
                            {
                                'border-blue-300': id === webmapId,
                                'border-transparent': id !== webmapId,
                                'text-white': id === webmapId,
                                'text-gray-300': id !== webmapId,
                            }
                        )}
                        onClick={() => {
                            dispatch(updateWebmap(id));
                        }}
                    >
                        {name}
                    </div>
                );
            })}
        </div>
    );
};

const MapContainer: React.FC = () => {
    const webmapId = useSelector(selectWebmapId);

    return (
        <div className={'fixed top-0 left-0 w-full h-full'}>
            <MapView webmapId={webmapId} />
        </div>
    );
};

const DemoPage = () => {
    return (
        <>
            <ErrorBoundary>
                <MapContainer />
                <WebmapSelector />
            </ErrorBoundary>
        </>
    );
};

export default DemoPage;
