import { Button } from '@shared/components/Button';
import classNames from 'classnames';
import React, { FC, useState } from 'react';

type Props = {
    classificationNameOnEnter: (name: string) => void;
};

export const SamplingSessionNameEditor: FC<Props> = ({
    classificationNameOnEnter,
}) => {
    const [classificationName, setClassificationName] = useState<string>('');

    return (
        <div className="relative">
            <div className="relative w-full border-b border-custom-light-blue-25 mb-3">
                <input
                    className={classNames(
                        'w-full px-1 bg-transparent text-sm',
                        'border-none outline-none ',
                        'placeholder:text-custom-light-blue-50 text-custom-light-blue-90'
                    )}
                    placeholder="Enter Classification Name"
                    type="text"
                    value={classificationName}
                    onChange={(evt) => {
                        setClassificationName(evt.target.value);
                    }}
                    onKeyUp={(evt) => {
                        if (evt.key === 'Enter') {
                            classificationNameOnEnter(classificationName);
                        }
                    }}
                />

                {classificationName && (
                    <div
                        className=" bg-custom-background absolute right-0 top-0 h-full flex items-center cursor-pointer"
                        onClick={setClassificationName.bind(null, '')}
                    >
                        <calcite-icon icon="x" scale="s" />
                    </div>
                )}
            </div>

            <div
                className={classNames({
                    'is-disabled': !classificationName,
                })}
            >
                <Button
                    scale="s"
                    onClickHandler={() => {
                        classificationNameOnEnter(classificationName);
                    }}
                >
                    Start a New Session
                </Button>
            </div>
        </div>
    );
};
