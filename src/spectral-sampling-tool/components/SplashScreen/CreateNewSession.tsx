import { CalciteInputText } from '@esri/calcite-components-react';
import { Button } from '@shared/components/Button';
import { APP_NAME } from '@shared/config';
import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const CreateNewSession = () => {
    const { t } = useTranslation();

    const [targetService, setTargetService] =
        React.useState<SpectralSamplingToolSupportedService>(null);

    const [sessionName, setSessionName] = React.useState<string>(null);

    const TargetServicesListData: {
        label: string;
        value: SpectralSamplingToolSupportedService;
        isSelected: boolean;
    }[] = useMemo(() => {
        return [
            {
                label: 'Landsat',
                value: 'landsat',
                isSelected: targetService === 'landsat',
            },
            {
                label: 'Sentinel-2',
                value: 'sentinel-2',
                isSelected: targetService === 'sentinel-2',
            },
        ];
    }, [targetService]);

    return (
        <div>
            <div className="opacity-50 mb-4">
                <h4>{t('create_new_session_header', { ns: APP_NAME })}</h4>
            </div>
            <div>
                <div className="w-full mb-6 p-1">
                    {TargetServicesListData.map((item) => (
                        <div
                            key={item.value}
                            className={classNames(`w-full mb-1`, {
                                'opacity-70': !item.isSelected,
                            })}
                        >
                            <Button
                                onClickHandler={() => {
                                    setTargetService(item.value);
                                }}
                                scale="s"
                                appearance={
                                    item.isSelected ? 'solid' : 'transparent'
                                }
                            >
                                <span className="ml-2">{item.label}</span>
                            </Button>
                        </div>
                    ))}
                </div>

                <div
                    className="w-full mb-4"
                    style={{
                        '--calcite-color-foreground-1':
                            'var(--custom-background)',
                        '--calcite-color-border-input':
                            'var(--custom-light-blue-30)',
                        '--calcite-color-text-1': 'var(--custom-light-blue)',
                    }}
                >
                    <CalciteInputText
                        value={sessionName}
                        maxLength={100}
                        clearable
                        onCalciteInputTextInput={(e) => {
                            if (!e?.target?.value) {
                                setSessionName(null);
                                return;
                            }

                            setSessionName(e.target.value || null);
                        }}
                        placeholder={t('session_name_placeholder', {
                            ns: APP_NAME,
                        })}
                    />

                    <p className="italic opacity-50 text-sm mt-1">
                        {t('session_name_description', { ns: APP_NAME })}
                    </p>
                </div>

                <Button
                    onClickHandler={() => {
                        console.log('Create new session button clicked');
                    }}
                    scale="s"
                    disabled={!targetService || !sessionName}
                >
                    {t('create_new_session', { ns: APP_NAME })}
                </Button>
            </div>
        </div>
    );
};
