import { AnalysisToolHeaderText } from '@shared/components/AnalysisToolHeader/AnalysisToolHeader';
import { Tooltip } from '@shared/components/Tooltip';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DRXTemporalCompositeToolContainer = () => {
    const { t } = useTranslation();

    const tool = useAppSelector(selectActiveAnalysisTool);

    if (tool !== 'temporal composite') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
            {/* <div className="flex w-full justify-center">
                <Tooltip
                    content={t('composite_header_tooltip', { ns: APP_NAME })}
                    width={400}
                >
                    <calcite-icon scale="s" icon="information" />
                </Tooltip>

                <span className="uppercase text-sm ml-1">{t('composite')}</span>
            </div> */}

            <AnalysisToolHeaderText
                title={t('composite')}
                tooltipText={t('composite_header_tooltip', { ns: APP_NAME })}
            />

            {/* <div className="mt-2 opacity-50 text-sm text-center">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
            </div> */}

            <div className={classNames('relative mt-4')}>
                <div
                    className={classNames('relative w-full h-[10px]')}
                    style={{
                        background:
                            'linear-gradient(to right, #FF0000, #666666, #666666, #00FFFF)',
                        // 'linear-gradient(to right, #FF0000, #666666 45%, #666666 55%, #00FFFF)',
                    }}
                ></div>

                <div className="relative w-full mt-2 flex justify-between text-xs">
                    <div className="text-left max-w-[80px]">
                        <span>
                            {t('scene_a_brighter', {
                                ns: APP_NAME,
                            })}
                        </span>
                    </div>
                    {/* <span>{t('scene_a_brighter')}</span> */}

                    <div className="text-center">
                        <span>{t('no_change')}</span>
                    </div>

                    <div className="text-right max-w-[80px]">
                        <span>
                            {t('scene_b_brighter', {
                                ns: APP_NAME,
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
