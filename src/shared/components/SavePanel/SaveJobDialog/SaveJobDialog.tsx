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
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { SaveOptionInfo, saveOptionInfoLookup } from '../constants';
import { checkIsServiceNameAvailable } from '@shared/services/arcgis-online/checkIsServiceNameAvailable';
import { useDefaultTitleAndSummary } from './useDefaultTitleAndSummary';
import { formatHostedImageryServiceName } from '@shared/services/raster-analysis/createHostedImageryService';
import { useValidateTextInput } from './useValidateTextInput';
import { useTranslation } from 'react-i18next';

type SaveJobDialogProps = {
    saveJobType: PublishAndDownloadJobType;
    sceneIds: string[];
    /**
     * The satellite name used in the title and summary.
     */
    satellite: string;
    closeButtonOnClick: () => void;
    saveButtonOnClick: (title: string, summary: string) => void;
};

const TEXT_INPUT_STYLE = `w-full bg-transparent border border-custom-light-blue-50 p-2 text-sm outline-none placeholder:text-custom-light-blue-25 focus:border-custom-light-blue`;

const TITLE_MAX_LENGTH = 98;

const SUMMARY_MAX_LENGTH = 2048;

export const SaveJobDialog: FC<SaveJobDialogProps> = ({
    saveJobType,
    sceneIds,
    satellite,
    closeButtonOnClick,
    saveButtonOnClick,
}) => {
    const { t } = useTranslation();

    const saveOptionInfo: SaveOptionInfo = saveOptionInfoLookup[saveJobType];

    const { defaultTitle, defaultSummary } = useDefaultTitleAndSummary(
        saveJobType,
        sceneIds,
        satellite
    );

    const [title, setTitle] = useState<string>(defaultTitle);
    const [summary, setSummary] = useState<string>(defaultSummary);

    const [isTitleAvailable, setIsTitleAvailable] = useState<boolean>(true);
    // const [isTitleTooLong, setIsTitleTooLong] = useState<boolean>(false);
    const [isCheckingTitleAvailability, setIsCheckingTitleAvailability] =
        useState<boolean>(false);

    const validateTitleResponse = useValidateTextInput(title, TITLE_MAX_LENGTH);

    const validateSummaryResponse = useValidateTextInput(
        summary,
        SUMMARY_MAX_LENGTH
    );

    const debounceTimeOutRef = useRef<NodeJS.Timeout | null>(null);

    const checkTitleAvailability = async (title: string) => {
        clearTimeout(debounceTimeOutRef.current);

        setIsCheckingTitleAvailability(true);

        debounceTimeOutRef.current = setTimeout(async () => {
            // console.log('calling checkIsServiceNameAvailable', title);
            try {
                const foramttedTitle = formatHostedImageryServiceName(title);

                if (foramttedTitle.length > TITLE_MAX_LENGTH) {
                    // setIsCheckingTitleAvailability(false);
                    return;
                }

                if (validateTitleResponse.isValid === false) {
                    return;
                }

                const isAvailable = await checkIsServiceNameAvailable(
                    foramttedTitle
                );
                // check if the title is unique
                setIsTitleAvailable(isAvailable);
            } catch (e) {
                console.log('failed to check service name availability', e);
                setIsTitleAvailable(false);
            }

            setIsCheckingTitleAvailability(false);
        }, 1000);
    };

    const okButtonDisabled =
        title === '' ||
        summary === '' ||
        isCheckingTitleAvailability ||
        isTitleAvailable === false ||
        // isTitleTooLong ||
        validateTitleResponse.isValid === false ||
        validateSummaryResponse.isValid === false;

    useEffect(() => {
        // if the output name does not require unique name, then we can skip this step
        if (saveOptionInfo.requireUniqueOutputName === false || title === '') {
            return;
        }

        checkTitleAvailability(title);
    }, [title, saveOptionInfo.requireUniqueOutputName]);

    // useEffect(() => {
    //     const foramttedTitle = formatHostedImageryServiceName(title);
    //     setIsTitleTooLong(foramttedTitle.length > TITLE_MAX_LENGTH);
    // }, [title]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-custom-background-90 backdrop-blur-sm z-10 flex justify-center"
            data-testid="save-job-dialog"
        >
            <div className="mx-4 md:max-w-3xl w-full mt-48 ">
                <div className="mb-4 ">
                    <h3 className="text-xl">
                        {/* {saveOptionInfo.action} {saveOptionInfo.inputName} as{' '}
                        {saveOptionInfo.outputName} */}
                        {t(saveOptionInfo.title)}
                    </h3>
                </div>

                <div>
                    <h4 className="mb-1 font-light text-sm">{t('title')}</h4>
                    <input
                        className={TEXT_INPUT_STYLE}
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    {validateTitleResponse.isValid &&
                        isCheckingTitleAvailability && (
                            <div className="text-sm text-custom-light-blue-50 mt-2 flex items-center">
                                <calcite-loader active inline></calcite-loader>
                                <span className="ml-1">
                                    {t('checking_title_availability')}...
                                </span>
                            </div>
                        )}
                    {validateTitleResponse.isValid &&
                        isTitleAvailable === false &&
                        isCheckingTitleAvailability === false && (
                            <div className="text-sm text-red-500 mt-2">
                                {t('name_already_exists')}
                            </div>
                        )}
                    {validateTitleResponse.isValid === false && (
                        <div className="text-sm text-red-500 mt-2">
                            {validateTitleResponse.message}
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <h4 className="mb-1 font-light text-sm">{t('summary')}</h4>
                    <input
                        className={TEXT_INPUT_STYLE}
                        type="textarea"
                        placeholder="Enter summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    ></input>
                    {validateSummaryResponse.isValid === false && (
                        <div className="text-sm text-red-500 mt-2">
                            {validateSummaryResponse.message}
                        </div>
                    )}
                </div>

                <div className=" mt-8 flex justify-end items-center">
                    <div
                        className=" mr-8 cursor-pointer"
                        onClick={closeButtonOnClick}
                    >
                        <span className="uppercase">{t('cancel')}</span>
                    </div>

                    <Button
                        onClickHandler={() => {
                            saveButtonOnClick(title, summary);
                        }}
                        scale="s"
                        appearance="transparent"
                        disabled={okButtonDisabled}
                    >
                        {t('OK')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
