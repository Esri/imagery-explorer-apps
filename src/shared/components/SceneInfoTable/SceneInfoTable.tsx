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
    return (
        <div>
            <div className="text-center">
                <h4 className="uppercase text-sm">Scene Information</h4>
            </div>

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
        </div>
    );
};
