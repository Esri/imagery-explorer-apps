/* Copyright 2024 Esri
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

import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { EMIT_MISSIONS } from '@shared/services/emit-level-2a/config';
import React, { FC, useRef, useState } from 'react';

type Props = {
    /**
     * array of landsat missions to be excluded in the query
     */
    missionsToBeExcluded: number[];
    /**
     * emits when user makes update to missionsToBeExcluded
     */
    missionsToBeExcludedOnChange: (missionsToBeExcluded: number[]) => void;
};

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
            className="relative flex items-center justify-between w-full bg-custom-light-blue-5 p-1 text-xs cursor-pointer "
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

export const LandsatMissionFilter: FC<Props> = ({
    missionsToBeExcluded,
    missionsToBeExcludedOnChange,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const [expanded, setExpanded] = useState<boolean>(false);

    useOnClickOutside(containerRef, setExpanded.bind(null, false));

    const toggleSelectLandsatMission = (mission: number) => {
        const inExclusionListAready = missionsToBeExcluded.includes(mission);

        const updatedMissionsToBeExcluded = inExclusionListAready
            ? // remove it from the list if it is already in the missions to be excluded list,
              missionsToBeExcluded.filter((d) => d !== mission)
            : // otherwise, add to the list
              [...missionsToBeExcluded, mission];

        // // abort to prohibit the user to exclude all landsat missions
        // if (updatedMissionsToBeExcluded.length === LANDSAT_MISSIONS.length) {
        //     return;
        // }

        missionsToBeExcludedOnChange(updatedMissionsToBeExcluded);
    };

    const toggleSelectAllLandsatMission = () => {
        // clicks on "ALL" button would include all missions if some of the missions
        // are not included. If all missions are already included, then clicks on "ALL" button
        // should deselect all missions.
        const updatedMissionsToBeExcluded = !missionsToBeExcluded.length
            ? EMIT_MISSIONS
            : [];

        missionsToBeExcludedOnChange(updatedMissionsToBeExcluded);
    };

    const getLabel4FilterButton = () => {
        if (missionsToBeExcluded.length === 0) {
            return 'all';
        }

        if (missionsToBeExcluded.length === EMIT_MISSIONS.length) {
            return 'none';
        }

        const missionsToBeIncluded = EMIT_MISSIONS.filter((mission) => {
            return missionsToBeExcluded.includes(mission) === false;
        });

        return missionsToBeIncluded.join(',');
    };

    return (
        <div ref={containerRef} className="flex items-center mr-3">
            <span className="uppercase text-custom-light-blue-50 mr-1 text-xs">
                misson
            </span>

            <div className="relative w-16">
                <FilterButton
                    title={getLabel4FilterButton()}
                    expanded={expanded}
                    onClick={setExpanded.bind(null, !expanded)}
                />

                {expanded && (
                    <div className="absolute w-full top-[100%] left-0 z-10 border border-custom-light-blue-5 bg-custom-background">
                        <FilterListItem
                            title={'all'}
                            checked={missionsToBeExcluded.length === 0}
                            // onClick={missionsToBeExcludedOnChange.bind(
                            //     null,
                            //     []
                            // )}
                            onClick={toggleSelectAllLandsatMission}
                        />
                        {EMIT_MISSIONS.map((mission) => {
                            return (
                                <FilterListItem
                                    key={mission}
                                    title={mission.toString()}
                                    checked={
                                        missionsToBeExcluded.includes(
                                            mission
                                        ) === false
                                    }
                                    onClick={toggleSelectLandsatMission.bind(
                                        null,
                                        mission
                                    )}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
