import classNames from 'classnames';
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
    /**
     * if true, this Animation frame is selected
     */
    selected: boolean;
};

type Props = {
    data: AnimationFrameInfo[];
    /**
     * If ture, this component will be disabled
     */
    disabled: boolean;
    /**
     * fires when user select a frame
     * @param frameId
     * @returns
     */
    frameOnSelect: (frameId: string) => void;
    // /**
    //  * fires when user clicks on "Add A Scene" button
    //  * @returns void
    //  */
    // addButtonOnClick: () => void;
    /**
     * fires when user clicks on "Remove Scene" button
     * @param id identifier of the scene to be removed
     * @returns void
     */
    removeButtonOnClick: (frameId: string) => void;
};

export const AnimationFrames: FC<Props> = ({
    data,
    disabled,
    frameOnSelect,
    // addButtonOnClick,
    removeButtonOnClick,
}) => {
    return (
        <div
            className={classNames({
                'is-disabled': disabled,
            })}
        >
            <div className="">
                {data.map((d) => {
                    const {
                        frameId,
                        acquisitionDate,
                        rasterFunctionName,
                        selected,
                    } = d;

                    return (
                        <div
                            key={frameId}
                            className={classNames(
                                'p-1 border border-custom-light-blue-80 mb-1 flex items-center cursor-pointer',
                                {
                                    'bg-custom-light-blue': selected,
                                    'text-custom-background': selected,
                                    'drop-shadow-custom-light-blue': selected,
                                }
                            )}
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
            {/* <div className="" onClick={addButtonOnClick}>
                <span className="text-xs text-custom-light-blue uppercase border border-custom-light-blue-80 cursor-pointer p-1">
                    Add A Frame
                </span>
            </div> */}
        </div>
    );
};
