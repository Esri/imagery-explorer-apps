import React, { FC } from 'react';

export type AnimationFrameInfo = {
    /**
     * unique identifier of this frame
     */
    id: string;
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
     * fires when user clicks on "Add A Scene" button
     * @returns void
     */
    addSceneOnClick: () => void;
    /**
     * fires when user clicks on "Remove Scene" button
     * @param id identifier of the scene to be removed
     * @returns void
     */
    removeSceneOnClick: (id: string) => void;
};

export const AnimationFramesControl: FC<Props> = ({
    data,
    addSceneOnClick,
    removeSceneOnClick,
}) => {
    return (
        <div className="h-full mx-2 flex flex-col">
            <div className="flex-grow">
                {data.map((d) => {
                    const { id, acquisitionDate, rasterFunctionName } = d;

                    return (
                        <div
                            key={id}
                            className="p-1 border border-custom-light-blue-50 mb-1 flex items-center"
                        >
                            <div className="text-xs mr-1 text-center">
                                <span>{acquisitionDate}</span>
                                <br />
                                <span>{rasterFunctionName}</span>
                            </div>

                            <calcite-icon
                                onClick={removeSceneOnClick.bind(null, id)}
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
            <div className="" onClick={addSceneOnClick}>
                <span className="text-xs text-custom-light-blue uppercase cursor-pointer">
                    Add A Scene
                </span>
            </div>
        </div>
    );
};
