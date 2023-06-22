import React from 'react';
import { Dropdown } from '../Dropdown';
import { useMonthOptions } from './useMonthOptions';
import { useAnnualResolutionOptions } from './useAnnualResolutionOptions';

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
                <div
                    className="w-1/2 mx-1"
                    title="Choose an annual sampling resolution"
                >
                    <Dropdown
                        data={annualResolutionsMenuData}
                        onChange={(val) => {
                            // console.log(val)
                            annualSamplingResolutionOnChange(+val);
                        }}
                    />
                </div>

                <div className="w-1/2 mx-1" title="Choose a season">
                    <Dropdown
                        data={monthDropdownMenuData}
                        onChange={(val) => {
                            acquisitionMonthOnChange(+val);
                        }}
                    />
                </div>

                {shouldShowCloseButton && (
                    <div
                        className="shrink-0 flex items-center cursor-pointer"
                        onClick={closeButtonOnClick}
                        title="Clear map selection"
                    >
                        <calcite-icon icon="x-circle" scale="s" />
                    </div>
                )}
            </div>
        </div>
    );
};
