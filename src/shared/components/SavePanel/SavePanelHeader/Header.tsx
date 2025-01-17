import React, { FC } from 'react';

type HeaderProps = {
    sceneId: string;
};

export const Header: FC<HeaderProps> = ({ sceneId }) => {
    return (
        <div className="w-full">
            <div className=" text-center mb-6">
                <h4 className=" text-2xl text-custom-light-blue mb-3">
                    Save Options
                </h4>
                {sceneId && (
                    <p className="text-sm opacity-50">Scene ID: {sceneId}</p>
                )}
            </div>

            <div className="flex justify-center">
                <ul className="list-inside text-sm opacity-50">
                    <li>
                        This dialog can safely be closed while request is
                        processed.
                    </li>
                    {/* <li>
                        Downloads are available for one hour after creation.
                    </li> */}
                </ul>
            </div>
        </div>
    );
};
