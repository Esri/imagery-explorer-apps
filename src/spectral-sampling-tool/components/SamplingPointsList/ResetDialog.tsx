/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Button } from '@shared/components/Button';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    cancelButtonOnClick: () => void;
    resetButtonOnClick: () => void;
};

export const ResetDialog: FC<Props> = ({
    cancelButtonOnClick,
    resetButtonOnClick,
}) => {
    const { t } = useTranslation();

    return (
        <div>
            <p className="text-xs">
                Reset current sampling session. All existing sampling points
                will be removed.
            </p>

            <div className="my-1">
                <Button scale="s" onClickHandler={cancelButtonOnClick}>
                    {t('cancel')}
                </Button>
            </div>

            <Button scale="s" onClickHandler={resetButtonOnClick}>
                Reset
            </Button>
        </div>
    );
};
