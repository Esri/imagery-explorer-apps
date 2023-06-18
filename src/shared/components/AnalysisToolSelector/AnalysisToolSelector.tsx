import React, { FC } from 'react';
import { AnalysisTool } from '@shared/store/Analysis/reducer';
import { Button } from '../Button';
import classNames from 'classnames';

const AnalysisTools: AnalysisTool[] = ['mask', 'profile'];

type Props = {
    selectedTool: AnalysisTool;
    onChange: (tool: AnalysisTool) => void;
};

export const AnalysisToolSelector: FC<Props> = ({
    selectedTool,
    onChange,
}: Props) => {
    return (
        <>
            {AnalysisTools.map((tool) => (
                <div
                    key={tool}
                    className={classNames('relative mb-1', {
                        'horizontal-indicator-on-left': tool === selectedTool,
                    })}
                >
                    <Button
                        // fullHeight={true}
                        appearance={
                            tool === selectedTool ? 'solid' : 'transparent'
                        }
                        scale="s"
                        onClickHandler={() => {
                            onChange(tool);
                        }}
                    >
                        <span className="uppercase">{tool}</span>
                    </Button>
                </div>
            ))}
        </>
    );
};
