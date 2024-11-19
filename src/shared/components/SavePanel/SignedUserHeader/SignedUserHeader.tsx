import { getSignedInUser, signOut } from '@shared/utils/esri-oauth';
import React from 'react';

export const SignedUserHeader = () => {
    const signedInUser = getSignedInUser();

    if (!signedInUser) {
        return null;
    }

    return (
        <div className="absolute top-3 left-3 flex items-center">
            {/* <div className=' w-9 h-9 rounded'
            style={{
                backgroundImage: `url(${signedInUser?.thumbnailUrl})`,
                backgroundSize: 'cover',
            }}
        ></div> */}

            <calcite-avatar
                full-name={signedInUser.fullName}
                // scale="l"
                thumbnail={signedInUser.thumbnailUrl}
            />

            <div className="ml-2">
                <div
                    className="flex items-center cursor-pointer mt-1"
                    onClick={() => {
                        signOut();
                    }}
                >
                    <h4 className="">{signedInUser.fullName}</h4>
                    <calcite-icon
                        icon="sign-out"
                        scale="s"
                        class="ml-1"
                        title="switch account"
                    ></calcite-icon>
                </div>
            </div>
        </div>
    );
};
