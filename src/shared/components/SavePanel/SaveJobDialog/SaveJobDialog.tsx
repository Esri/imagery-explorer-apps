import { Button } from '@shared/components/Button';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { SaveOptionInfo, saveOptionInfoLookup } from '../constants';
import { checkIsServiceNameAvailable } from '@shared/services/arcgis-online/checkIsServiceNameAvailable';
import { useDefaultTitleAndSummary } from './useDefaultTitleAndSummary';
import { formatHostedImageryServiceName } from '@shared/services/raster-analysis/createHostedImageryService';

type SaveJobDialogProps = {
    saveJobType: PublishAndDownloadJobType;
    sceneId: string;
    closeButtonOnClick: () => void;
    saveButtonOnClick: (title: string, summary: string) => void;
};

const TEXT_INPUT_STYLE = `w-full bg-transparent border border-custom-light-blue-50 p-2 text-sm outline-none placeholder:text-custom-light-blue-25 focus:border-custom-light-blue`;

export const SaveJobDialog: FC<SaveJobDialogProps> = ({
    saveJobType,
    sceneId,
    closeButtonOnClick,
    saveButtonOnClick,
}) => {
    const saveOptionInfo: SaveOptionInfo = saveOptionInfoLookup[saveJobType];

    const { defaultTitle, defaultSummary } = useDefaultTitleAndSummary(
        saveJobType,
        sceneId
    );

    const [title, setTitle] = useState<string>(defaultTitle);
    const [summary, setSummary] = useState<string>(defaultSummary);

    const [isTitleAvailable, setIsTitleAvailable] = useState<boolean>(true);
    const [isCheckingTitleAvailability, setIsCheckingTitleAvailability] =
        useState<boolean>(false);

    const debounceTimeOutRef = useRef<NodeJS.Timeout | null>(null);

    const checkTitleAvailability = async (title: string) => {
        clearTimeout(debounceTimeOutRef.current);

        setIsCheckingTitleAvailability(true);

        debounceTimeOutRef.current = setTimeout(async () => {
            // console.log('calling checkIsServiceNameAvailable', title);
            try {
                const foramttedTitle = formatHostedImageryServiceName(title);

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
        isTitleAvailable === false;

    useEffect(() => {
        // if the output name does not require unique name, then we can skip this step
        if (saveOptionInfo.requireUniqueOutputName === false || title === '') {
            return;
        }

        checkTitleAvailability(title);
    }, [title, saveOptionInfo.requireUniqueOutputName]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-custom-background-90 backdrop-blur-sm z-10 flex justify-center">
            <div className="mx-4 md:max-w-3xl w-full mt-48 ">
                <div className="mb-4 ">
                    <h3 className="text-xl">
                        {saveOptionInfo.action} {saveOptionInfo.inputName} as{' '}
                        {saveOptionInfo.outputName}
                    </h3>
                </div>

                <div>
                    <h4 className="mb-1 font-light text-sm">Title</h4>
                    <input
                        className={TEXT_INPUT_STYLE}
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    {isCheckingTitleAvailability && (
                        <div className="text-sm text-custom-light-blue-50 mt-2 flex items-center">
                            <calcite-loader active inline></calcite-loader>
                            <span className="ml-1">
                                Checking title availability...
                            </span>
                        </div>
                    )}
                    {isTitleAvailable === false &&
                        isCheckingTitleAvailability === false && (
                            <div className="text-sm text-red-500 mt-2">
                                This name already exists. Please choose a unique
                                name.
                            </div>
                        )}
                </div>

                <div className="mt-4">
                    <h4 className="mb-1 font-light text-sm">Summary</h4>
                    <input
                        className={TEXT_INPUT_STYLE}
                        type="textarea"
                        placeholder="Enter summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    ></input>
                </div>

                <div className=" mt-8 flex justify-end items-center">
                    <div
                        className=" mr-8 cursor-pointer"
                        onClick={closeButtonOnClick}
                    >
                        <span className="uppercase">Cancel</span>
                    </div>

                    <Button
                        onClickHandler={() => {
                            saveButtonOnClick(title, summary);
                        }}
                        scale="s"
                        appearance="transparent"
                        disabled={okButtonDisabled}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};
