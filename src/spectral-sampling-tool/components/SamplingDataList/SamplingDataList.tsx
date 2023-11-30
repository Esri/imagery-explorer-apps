import React, { FC } from 'react';
import { SamplingListItemData } from './useSamplingListData';
import classNames from 'classnames';

type Props = {
    data: SamplingListItemData[];
    /**
     * fires when user select a sampling point
     * @param uniqueId
     * @returns
     */
    onSelect: (uniqueId: string) => void;
    /**
     * fires when user clicks on "Remove Point" button
     * @param uniqueId identifier of the scene to be removed
     * @returns void
     */
    onRemove: (uniqueId: string) => void;
};

export const SamplingDataList: FC<Props> = ({ data, onSelect, onRemove }) => {
    if (!data || !data.length) {
        return null;
    }

    return (
        <div>
            {data.map((d) => {
                const { selected, uniqueId, acquisitionDate } = d;
                return (
                    <div
                        key={uniqueId}
                        className={classNames(
                            'relative flex items-center px-1 h-[30px] mb-1',
                            'border border-custom-light-blue-80 cursor-pointer group horizontal-indicator-on-left',
                            {
                                'bg-custom-light-blue': selected,
                                'text-custom-background': selected,
                                'drop-shadow-custom-light-blue-50': selected,
                            }
                        )}
                    >
                        <div
                            className="w-full text-xs mr-1 text-center leading-[.9rem]"
                            onClick={onSelect.bind(null, uniqueId)}
                        >
                            <span>{acquisitionDate}</span>
                            <br />
                            <span>{uniqueId}</span>
                        </div>

                        <div
                            // only show close icon when hover over the frame card, which is controlled by the `group-hover:block` class name
                            className="absolute top-0 right-0 hidden group-hover:block"
                            onClick={onRemove.bind(null, uniqueId)}
                        >
                            <calcite-icon
                                icon="x"
                                scale="s"
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
