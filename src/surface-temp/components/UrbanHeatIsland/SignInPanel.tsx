import { CalciteLoader } from '@esri/calcite-components-react';
import { APP_NAME } from '@shared/config';
import { destroyCredentials, signIn } from '@shared/utils/esri-oauth';
import React, { FC } from 'react';
import { Trans } from 'react-i18next';

type SignInPanelProps = {
    /**
     * Indicates whether the user is not signed in
     */
    notSignedIn: boolean;
    /**
     * Indicates whether the privilege check is still loading.
     */
    isCheckingPrivileges?: boolean;
};

export const SignInPanel: FC<SignInPanelProps> = ({
    notSignedIn,
    isCheckingPrivileges,
}) => {
    if (isCheckingPrivileges) {
        return <CalciteLoader scale="s"></CalciteLoader>;
    }

    return (
        <div>
            <Trans
                i18nKey={
                    notSignedIn
                        ? 'sign_in_to_use_urban_heat_island_tool'
                        : 'sign_in_to_use_urban_heat_island_tool_with_previlige'
                }
                ns={APP_NAME}
                components={{
                    action: (
                        <span
                            className="underline font-medium cursor-pointer"
                            onClick={() => {
                                if (notSignedIn) {
                                    signIn();
                                    return;
                                }

                                // for privilege issue, sign out first then sign in again
                                destroyCredentials();
                                signIn();
                            }}
                        />
                    ),
                }}
            />
        </div>
    );
};
