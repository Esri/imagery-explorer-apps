import { Button } from '@shared/components/Button';
import { SaveJobType } from '@shared/store/SaveJobs/reducer';
import React, { CSSProperties, FC, useState } from 'react';
import { SaveOptionInfo, saveOptionInfoLookup } from '../constants';

type SaveJobDialogProps = {
    saveJobType: SaveJobType;
    closeButtonOnClick: () => void;
    saveButtonOnClick: (title: string, summary: string) => void;
};

const TEXT_INPUT_STYLE = `w-full bg-transparent border border-custom-light-blue-50 p-2 text-sm outline-none placeholder:text-custom-light-blue-25 focus:border-custom-light-blue`;

export const SaveJobDialog: FC<SaveJobDialogProps> = ({
    saveJobType,
    closeButtonOnClick,
    saveButtonOnClick,
}) => {
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');

    const saveOptionInfo: SaveOptionInfo = saveOptionInfoLookup[saveJobType];

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
                        disabled={title === '' || summary === ''}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};
