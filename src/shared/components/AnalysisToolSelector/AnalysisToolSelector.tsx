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

import React, { FC } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import { AnalysisTool } from '@shared/store/ImageryScene/reducer';
import { AnalyzeToolSelectorData } from './AnalysisToolSelectorContainer';

type Props = {
    data: AnalyzeToolSelectorData[];
    selectedTool: AnalysisTool;
    onChange: (tool: AnalysisTool) => void;
};

export const AnalysisToolSelector: FC<Props> = ({
    data,
    selectedTool,
    onChange,
}: Props) => {
    return (
        <>
            {data.map(({ tool, title, subtitle }) => (
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
