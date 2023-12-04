import React, { FC } from 'react';
import { SamplingListItemData } from './useSamplingListData';
import classNames from 'classnames';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@shared/constants/UI';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';

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
    const getContent = (item: SamplingListItemData) => {
        if (!item) {
            return null;
        }

        const { acquisitionDate, location, isLoading } = item;

        if (!acquisitionDate) {
            return 'Select a Date';
        }

        if (!location) {
            return 'Select a Location';
        }

        if (isLoading) {
            return (
                <div className="flex items-center justify-center">
                    <calcite-loader inline />
                    <span className="ml-1">fetching data</span>
                </div>
            );
        }

        const formattedAcquisitionDate = format(
            formattedDateString2Unixtimestamp(acquisitionDate),
            DATE_FORMAT
        );

        return (
            <div>
                <span>{formattedAcquisitionDate}</span>
                <br />
                <span>
                    {location.longitude.toFixed(4)},{' '}
                    {location.latitude.toFixed(4)}
                </span>
            </div>
        );
    };

    if (!data || !data.length) {
        return null;
    }

    return (
        <div className="max-h-[170px] fancy-scrollbar overflow-y-auto pr-1">
            {data.map((d) => {
                const { selected, uniqueId, isLoading } = d;
                return (
                    <div
                        key={uniqueId}
                        className={classNames(
                            'relative flex items-center px-1 h-[30px] mb-1',
                            'border border-custom-light-blue-80 cursor-pointer group',
                            {
                                'bg-custom-light-blue': selected,
                                'text-custom-background': selected,
                                'drop-shadow-custom-light-blue-50': selected,
                                'is-disabled': isLoading,
                            }
                        )}
                    >
                        <div
                            className="w-full text-xs mr-1 text-center leading-[.9rem]"
                            onClick={onSelect.bind(null, uniqueId)}
                        >
                            {getContent(d)}
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
