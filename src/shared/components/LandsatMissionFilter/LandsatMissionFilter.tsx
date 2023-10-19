import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { LANDSAT_MISSIONS } from '@shared/services/landsat-level-2/config';
import React, { FC, useRef, useState } from 'react';

type LandsatMissionFilterButtonProps = {
    /**
     * title of the button
     */
    title: string;
    /**
     * if true, the dropdown list is expanded
     */
    expanded: boolean;
    /**
     *
     * @returns emits when user clicks this button
     */
    onClick: () => void;
};

type FilterListItemProps = {
    /**
     * title of the list option
     */
    title: string;
    /**
     * if true, this option is selected
     */
    checked: boolean;
    /**
     *
     * @returns emits when user clicks this button
     */
    onClick: () => void;
};

const CheckboxSize = 8;

const FilterButton: FC<LandsatMissionFilterButtonProps> = ({
    title,
    expanded,
    onClick,
}) => {
    return (
        <div
            className="relative flex items-center justify-between w-full border border-custom-light-blue-50 opacity-80 p-1 text-xs cursor-pointer "
            onClick={onClick}
        >
            <span className="mr-1 uppercase">{title}</span>

            {expanded ? (
                <calcite-icon
                    icon="chevron-up"
                    scale="s"
                    aria-hidden="true"
                    calcite-hydrated=""
                ></calcite-icon>
            ) : (
                <calcite-icon
                    icon="chevron-down"
                    scale="s"
                    aria-hidden="true"
                    calcite-hydrated=""
                ></calcite-icon>
            )}
        </div>
    );
};

const FilterListItem: FC<FilterListItemProps> = ({
    title,
    checked,
    onClick,
}) => {
    return (
        <div
            className="flex my-[2px] px-2 text-custom-light-blue-90 items-center text-xs cursor-pointer"
            onClick={onClick}
        >
            {checked ? (
                // filled square icon
                <div
                    className="bg-custom-light-blue"
                    style={{
                        width: CheckboxSize,
                        height: CheckboxSize,
                        boxShadow: `0 0 2px var(--custom-light-blue)`,
                    }}
                ></div>
            ) : (
                // empty square icon
                <div
                    className="border border-custom-light-blue"
                    style={{
                        width: CheckboxSize,
                        height: CheckboxSize,
                    }}
                ></div>
            )}

            <span className="ml-2 uppercase">{title}</span>
        </div>
    );
};

const FilterOptionsList = () => {
    return (
        <div className="absolute w-full top-[100%] left-0 z-10 border border-custom-light-blue-50 bg-custom-background">
            <FilterListItem title={'all'} checked={true} onClick={() => {}} />
            {LANDSAT_MISSIONS.map((mission) => {
                return (
                    <FilterListItem
                        key={mission}
                        title={mission.toString()}
                        checked={true}
                        onClick={() => {}}
                    />
                );
            })}
        </div>
    );
};

export const LandsatMissionFilter = () => {
    const containerRef = useRef<HTMLDivElement>();

    const [expanded, setExpanded] = useState<boolean>(false);

    useOnClickOutside(containerRef, setExpanded.bind(null, false));

    return (
        <div ref={containerRef} className="flex items-center mr-3">
            <span className="uppercase text-custom-light-blue-50 mr-1 text-xs">
                misson
            </span>

            <div className="relative w-16">
                <FilterButton
                    title="all"
                    expanded={expanded}
                    onClick={setExpanded.bind(null, !expanded)}
                />

                {expanded && <FilterOptionsList />}
            </div>
        </div>
    );
};
