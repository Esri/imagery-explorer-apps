import { Button } from '@shared/components/Button';
import { APP_NAME } from '@shared/config';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    activePanel4UrbanHeatIslandToolChanged,
    UrbanHeatIslandToolPanel,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import { selectActivePanel4UrbanHeatIslandTool } from '@shared/store/UrbanHeatIslandTool/selectors';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const UrbanHeatIslandPanelSelector = () => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const activePanel = useAppSelector(selectActivePanel4UrbanHeatIslandTool);

    const activePanelOnChange = (panel: UrbanHeatIslandToolPanel) => {
        dispatch(activePanel4UrbanHeatIslandToolChanged(panel));
    };

    return (
        <div className="relative">
            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activePanel === 'create new job'
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activePanelOnChange('create new job');
                    }}
                    decorativeIndicator={
                        activePanel === 'create new job' ? 'left' : null
                    }
                >
                    <span className="text-xs">
                        {t('new_job', { ns: APP_NAME })}
                    </span>
                </Button>
            </div>

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activePanel === 'view pending job'
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activePanelOnChange('view pending job');
                    }}
                    decorativeIndicator={
                        activePanel === 'view pending job' ? 'left' : null
                    }
                >
                    <span className="text-xs">
                        {t('pending_job', { ns: APP_NAME })}
                    </span>
                </Button>
            </div>

            <div className={classNames('relative')}>
                <Button
                    appearance={
                        activePanel === 'view previous jobs'
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activePanelOnChange('view previous jobs');
                    }}
                    decorativeIndicator={
                        activePanel === 'view previous jobs' ? 'left' : null
                    }
                >
                    <span className="text-xs">
                        {t('previous_jobs', { ns: APP_NAME })}
                    </span>
                </Button>
            </div>
        </div>
    );
};
