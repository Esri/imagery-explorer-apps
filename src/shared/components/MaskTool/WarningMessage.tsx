import React from 'react';

export const WarningMessage = () => {
    return (
        <div
            className={
                'w-full mt-10 flex justify-center text-center text-sm is-disabled'
            }
        >
            <p>Select a scene to calculate a mask for the selected index.</p>
        </div>
    );
};
