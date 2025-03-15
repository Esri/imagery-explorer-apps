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
import classNames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type SaveOptionButtonProps = {
    title: string;
    subtitle: string;
    desciprtion: string;
    estimatedCost: number;
    disabled: boolean;
    /**
     * extra message to show
     */
    message?: string;
    onClick: () => void;
};

export const SAVE_OPTION_ROW_CLASS =
    'w-full grid grid-cols-save-option-list gap-4 md:gap-12 items-center';

export const SaveOptionButton: FC<SaveOptionButtonProps> = ({
    title,
    subtitle,
    desciprtion,
    estimatedCost,
    message,
    disabled,
    onClick,
}) => {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(SAVE_OPTION_ROW_CLASS, 'my-6', {
                'opacity-50 pointer-events-none': disabled,
            })}
        >
            <div>
                <Button onClickHandler={onClick}>
                    <div className="text-center ">
                        <span className="uppercase">{title}</span>
                        <br />
                        <span className=" normal-case text-sm">{subtitle}</span>
                    </div>
                </Button>
            </div>

            <div className=" text-sm">
                <span
                    dangerouslySetInnerHTML={{
                        __html: message || desciprtion,
                    }}
                ></span>{' '}
                {estimatedCost && estimatedCost > 0 ? (
                    <span>
                        {t('estimated_cost', {
                            estimatedCost: estimatedCost.toString(),
                        })}
                    </span>
                ) : null}
            </div>
        </div>
    );
};
