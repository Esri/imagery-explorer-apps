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

// import { COPIED_LINK_MESSAGE_STRING } from '@shared/constants/UI';
import { selectAnimationLinkIsCopied } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import React from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';

export const CopiedLinkMessage = () => {
    const linkIsCopied = useAppSelector(selectAnimationLinkIsCopied);

    const { t } = useTranslation();

    if (!linkIsCopied) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 right-0 w-[260px] h-[72px] px-4',
                'flex items-center',
                'theme-background text-xs'
            )}
        >
            <div className=" flex items-center">
                <calcite-icon scale="s" icon="check" />
                <span className="ml-1">{t('link_copied_to_clipboard')}</span>
            </div>
        </div>
    );
};
