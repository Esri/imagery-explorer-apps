import React, { FC } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import { AnalysisTool } from '@shared/store/ImageryScene/reducer';

const AnalysisTools: {
    tool: AnalysisTool;
    label?: string;
}[] = [
    {
        tool: 'mask',
    },
    {
        tool: 'trend',
    },
    {
        tool: 'spectral',
    },
    {
        tool: 'change',
    },
];

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
            {AnalysisTools.map(({ tool, label }) => (
                <div key={tool} className={classNames('relative mb-1')}>
                    <Button
                        // fullHeight={true}
                        appearance={
                            tool === selectedTool ? 'solid' : 'transparent'
                        }
                        scale="s"
                        onClickHandler={() => {
                            onChange(tool);
                        }}
                        decorativeIndicator={
                            tool === selectedTool ? 'left' : null
                        }
                    >
                        <span className="uppercase">{label || tool}</span>
                    </Button>
                </div>
            ))}
        </>
    );
};
