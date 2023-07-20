import React from 'react';
import { Dropdown } from '../Dropdown';
import { useMonthOptions } from './useMonthOptions';
import { useAnnualResolutionOptions } from './useAnnualResolutionOptions';
import { Tooltip } from '../Tooltip';

type Props = {
    /**
     * acquisition month selected by the user to query profile data
     */
    acquisitionMonth: number;
    /**
     * if true, show close button
     */
    shouldShowCloseButton: boolean;
    annualSamplingResolution: number;
    annualSamplingResolutionOnChange: (resolution: number) => void;
    /**
     * fires when user selects a new acquisition month
     * @param month
     * @returns
     */
    acquisitionMonthOnChange: (month: number) => void;
    /**
     * fires when user clicks on the close button
     * @returns
     */
    closeButtonOnClick: () => void;
};

export const ProfileToolControls = ({
    acquisitionMonth,
    shouldShowCloseButton,
    annualSamplingResolution,
    annualSamplingResolutionOnChange,
    acquisitionMonthOnChange,
    closeButtonOnClick,
}: Props) => {
    const monthDropdownMenuData = useMonthOptions(acquisitionMonth);

    const annualResolutionsMenuData = useAnnualResolutionOptions(
        annualSamplingResolution
    );

    return (
        <div className="prfile-control-tools">
            <div className="flex items-center justify-center">
                <div className="w-1/2 mx-1">
                    {/* <Tooltip content="Choose an annual sampling resolution">
                    </Tooltip> */}

                    <Dropdown
                        data={annualResolutionsMenuData}
                        tooltip="Choose an annual sampling resolution"
                        onChange={(val) => {
                            // console.log(val)
                            annualSamplingResolutionOnChange(+val);
                        }}
                    />
                </div>

                <div className="w-1/2 mx-1">
                    {/* <Tooltip content="Choose a season">
                    </Tooltip> */}

                    <Dropdown
                        data={monthDropdownMenuData}
                        tooltip="Choose a season"
                        onChange={(val) => {
                            acquisitionMonthOnChange(+val);
                        }}
                    />
                </div>

                {shouldShowCloseButton && (
                    <div
                        className="shrink-0 flex items-center cursor-pointer"
                        onClick={closeButtonOnClick}
                    >
                        <Tooltip content="Clear map selection">
                            <calcite-icon icon="x-circle" scale="s" />
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
};
