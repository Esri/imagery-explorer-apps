import React, { useState } from 'react';

export const LandsatMissionFilter = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className="flex items-center mr-3">
            <span className="uppercase text-custom-light-blue-50 mr-1 text-xs">
                misson
            </span>

            <div className="relative w-16">
                <div
                    className="flex items-center justify-between w-full border border-custom-light-blue-50 opacity-80 p-1 text-xs cursor-pointer "
                    onClick={setExpanded.bind(null, !expanded)}
                >
                    <span className="mr-1">All</span>

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

                {/* {
                    expanded && (
                        <div className='w-full absolute top-[]'></div>
                    )
                } */}
            </div>
        </div>
    );
};
