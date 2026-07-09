import { AnalysisToolHeaderText } from '@shared/components/AnalysisToolHeader/AnalysisToolHeader';
import { APP_NAME } from '@shared/config';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import { useTranslation } from 'react-i18next';
// import { DRXChangeCompareToolControls } from './DRXChangeCompareToolControls';
import { ChangeCompareToolControls } from '@shared/components/ChangeCompareTool';
import React from 'react';

export const DRXChangeCompareToolContainer = () => {
    const { t } = useTranslation();

    const tool = useAppSelector(selectActiveAnalysisTool);

    if (tool !== 'change') {
        return null;
    }

    return (
        <div className="w-full h-full">
            <AnalysisToolHeaderText
                title={t('change')}
                tooltipText={t('change_tool_header_tooltip', { ns: APP_NAME })}
            />

            {/* <DRXChangeCompareToolControls /> */}

            <ChangeCompareToolControls
                rangeSliderStep={1}
                rangeSliderCountOfTicks={9}
                legendLabelText={[
                    t('high_change'),
                    t('no_change'),
                    t('high_change'),
                ]}
                hideTotalAreaInfo={true}
            />
        </div>
    );
};
