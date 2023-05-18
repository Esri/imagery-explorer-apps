import React, { FC } from 'react';

export type AnimationFrameInfo = {
    /**
     * unique identifier of this frame
     */
    frameId: string;
    /**
     * acquisition date that will be used to query Landsat Scene for this frame
     */
    acquisitionDate: string;
    /**
     * name of the raster function that will be used to render the Landsat Scene for this frame
     */
    rasterFunctionName: string;
};

type Props = {
    data: AnimationFrameInfo[];
    /**
     * fires when user select a frame
     * @param frameId
     * @returns
     */
    frameOnSelect: (frameId: string) => void;
    /**
     * fires when user clicks on "Add A Scene" button
     * @returns void
     */
    addButtonOnClick: () => void;
    /**
     * fires when user clicks on "Remove Scene" button
     * @param id identifier of the scene to be removed
     * @returns void
     */
    removeButtonOnClick: (frameId: string) => void;
};

export const AnimationFramesControl: FC<Props> = ({
    data,
    frameOnSelect,
    addButtonOnClick,
    removeButtonOnClick,
}) => {
    return (
        <div className="h-full mx-2 flex flex-col">
            <div className="flex-grow">
                {data.map((d) => {
                    const { frameId, acquisitionDate, rasterFunctionName } = d;

                    return (
                        <div
                            key={frameId}
                            className="p-1 border border-custom-light-blue-50 mb-1 flex items-center cursor-pointer"
                        >
                            <div
                                className="text-xs mr-1 text-center"
                                onClick={frameOnSelect.bind(null, frameId)}
                            >
                                <span>{acquisitionDate}</span>
                                <br />
                                <span>{rasterFunctionName}</span>
                            </div>

                            <calcite-icon
                                onClick={removeButtonOnClick.bind(
                                    null,
                                    frameId
                                )}
                                icon="x"
                                scale="s"
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="" onClick={addButtonOnClick}>
                <span className="text-xs text-custom-light-blue uppercase">
                    Add A Scene
                </span>
            </div>
        </div>
    );
};
