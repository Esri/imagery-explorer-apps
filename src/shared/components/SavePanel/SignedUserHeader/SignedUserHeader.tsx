import {
    getProfileSettingsURL,
    getSignedInUser,
    signOut,
} from '@shared/utils/esri-oauth';
import React, { FC } from 'react';
import './SignedUserHeader.css';

type Props = {
    onSignOut: () => void;
    onSwitchAccount: () => void;
};

export const SignedUserHeader: FC<Props> = ({ onSignOut, onSwitchAccount }) => {
    const signedInUser = getSignedInUser();

    const profileSettingsPageURL = getProfileSettingsURL();

    if (!signedInUser) {
        return null;
    }

    return (
        <div className="signed-in-user-header-container fixed top-3 left-3 flex items-center">
            {/* <div className=' w-9 h-9 rounded'
            style={{
                backgroundImage: `url(${signedInUser?.thumbnailUrl})`,
                backgroundSize: 'cover',
            }}
        ></div> */}

            {/* <calcite-avatar
                full-name={signedInUser.fullName}
                // scale="l"
                thumbnail={signedInUser.thumbnailUrl}
            /> */}

            <div
                className="w-[60px] h-[60px] border-[2px] border-custom-light-blue rounded-full z-10"
                style={{
                    backgroundImage: `url(${signedInUser?.thumbnailUrl})`,
                    backgroundSize: 'cover',
                }}
                title={signedInUser.fullName}
            ></div>

            <div className="ml-2 z-10">
                <div className=" ">
                    <h4 className="hover:underline">
                        <a
                            href={profileSettingsPageURL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {signedInUser.fullName}
                        </a>
                    </h4>
                    <h5 className="text-sm">{signedInUser.portal.name}</h5>

                    <div className="flex items-center text-sm">
                        <span
                            className="underline cursor-pointer"
                            onClick={onSignOut}
                        >
                            log out
                        </span>
                        <span
                            className="underline cursor-pointer ml-2"
                            onClick={onSwitchAccount}
                        >
                            switch account
                        </span>
                    </div>
                    {/* <calcite-icon
                        icon="sign-out"
                        scale="s"
                        class="ml-1"
                        title="switch account"
                    ></calcite-icon> */}
                </div>
            </div>
        </div>
    );
};
