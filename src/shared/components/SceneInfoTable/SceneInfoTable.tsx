import classNames from 'classnames';
import React, { FC } from 'react';

/**
 * data for a single row in Scene Info Table
 */
export type SceneInfoTableData = {
    /**
     * name of the field
     */
    name: string;
    /**
     * value of the field
     */
    value: string;
};

type Props = {
    data: SceneInfoTableData[];
};

const SceneInfoRow: FC<SceneInfoTableData> = ({ name, value }) => {
    return (
        <>
            <div className="text-right pr-2">
                <span className="text-custom-light-blue-50">{name}</span>
            </div>

            <div>
                <span>{value}</span>
            </div>
        </>
    );
};

export const SceneInfoTable: FC<Props> = ({ data }: Props) => {
    const getContent = () => {
        if (!data || !data.length) {
            return (
                <div className="text-xs opacity-80 text-center mx-auto max-w-[240px]">
                    <p className="my-3 mx-3">
                        Select an acquisition date in Calendar to find a scene.
                    </p>

                    <p>
                        Scenes are displayed based on their intersection with
                        the map&#39;s center.
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-2 text-xs">
                {data.map((d: SceneInfoTableData) => {
                    return (
                        <SceneInfoRow
                            key={d.name}
                            name={d.name}
                            value={d.value}
                        />
                    );
                })}
            </div>
        );
    };
    return (
        <div
            className={classNames('analyze-tool-and-scene-info-container', {
                'is-disabled': data.length === 0,
            })}
        >
            <div className="text-center mb-3 mt-1">
                <h4 className="uppercase text-sm">Scene Information</h4>
            </div>
            {getContent()}
        </div>
    );
};
