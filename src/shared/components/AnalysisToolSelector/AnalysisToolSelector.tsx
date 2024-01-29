import React, { FC } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import { AnalysisTool } from '@shared/store/ImageryScene/reducer';

const AnalysisTools: {
    tool: AnalysisTool;
    title: string;
    subtitle: string;
}[] = [
    {
        tool: 'mask',
        title: 'Index',
        subtitle: 'mask',
    },
    {
        tool: 'trend',
        title: 'Temporal',
        subtitle: 'profile',
    },
    {
        tool: 'spectral',
        title: 'Spectral',
        subtitle: 'profile',
    },
    {
        tool: 'change',
        title: 'Change',
        subtitle: 'detection',
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
            {AnalysisTools.map(({ tool, title, subtitle }) => (
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
                        <div className="text-center text-xs">
                            <span className="uppercase">{title}</span>
                            <br />
                            <span className="lowercase">{subtitle}</span>
                        </div>
                    </Button>
                </div>
            ))}
        </>
    );
};
