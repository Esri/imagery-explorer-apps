import React, { FC, useEffect, useMemo } from 'react';
import { SupportedLocaleData } from '../../hooks/useSupportedLocales';
import { APP_LANGUAGE, SUGGESTED_LOCALE } from '@shared/constants/UI';
import { setPreferredLocale } from '@shared/i18n/getAppLanguage';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { appHeaderDropdownPanelChanged } from '@shared/store/UI/reducer';
import { toggleDisableLocaleSuggestion } from '@shared/store/UI/thunks';

type Props = {
    /**
     * data of supported locales
     */
    data: SupportedLocaleData[];
    /**
     * whether it should suggest locale switch.
     * If true, the component can show suggestion message along with the locale switcher.
     * It also show a checkbox to allow the user to disable future locale suggestions.
     */
    shouldSuggestLocale: boolean;
};

type LocaleSwitcherStringsByLocale = {
    [locale: string]: {
        choose_language: string;
        switch_language: string;
        cancel: string;
        locale_switcher_suggestion_message: string;
        do_not_show_again: string;
    };
};

const localeSwitcherStringsByLocale: LocaleSwitcherStringsByLocale = {
    en: {
        choose_language: 'Choose Language',
        switch_language: 'Switch Language',
        cancel: 'Cancel',
        locale_switcher_suggestion_message:
            'The app is available in English. Would you like to switch?',
        do_not_show_again: "Don't show this message again",
    },
    es: {
        choose_language: 'Elegir idioma',
        switch_language: 'Cambiar idioma',
        cancel: 'Cancelar',
        locale_switcher_suggestion_message:
            'La aplicación está disponible en español. ¿Desea cambiar?',
        do_not_show_again: 'No volver a mostrar este mensaje',
    },
    zh: {
        choose_language: '选择语言',
        switch_language: '切换语言',
        cancel: '取消',
        locale_switcher_suggestion_message: '该应用程序提供中文。您想切换吗？',
        do_not_show_again: '不再显示此消息',
    },
};

export const LocaleSwitcher: FC<Props> = ({ data, shouldSuggestLocale }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [selectedLocale, setSelectedLocale] = React.useState<string>(
        SUGGESTED_LOCALE || APP_LANGUAGE
    );

    const showSuggestedLocaleMessage = useMemo(() => {
        return (
            shouldSuggestLocale &&
            SUGGESTED_LOCALE &&
            SUGGESTED_LOCALE !== APP_LANGUAGE
        );
    }, []);

    /**
     * Get strings for the suggested locale or fallback to English
     */
    const strings = useMemo(() => {
        return (
            localeSwitcherStringsByLocale[SUGGESTED_LOCALE] ||
            localeSwitcherStringsByLocale['en']
        );
    }, [APP_LANGUAGE]);

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="absolute top-full left-0 md:left-app-header-size right-0 bg-custom-background px-4 py-4 text-custom-light-blue border-t border-custom-light-blue-50">
            {showSuggestedLocaleMessage ? (
                <div className="mb-4">
                    <p className="text-sm">
                        {strings.locale_switcher_suggestion_message}
                    </p>
                </div>
            ) : null}

            <calcite-label scale="s">
                <span className="text-custom-light-blue text-sm">
                    {strings.choose_language}:
                </span>
                <calcite-select
                    oncalciteSelectChange={(event) => {
                        const selected = event.target.selectedOption;
                        setSelectedLocale(selected.value);
                    }}
                    scale="s"
                    label={selectedLocale}
                    value={selectedLocale}
                    style={{
                        '--calcite-select-text-color':
                            'var(--custom-light-blue)',
                        '--calcite-select-border-color':
                            'var(--custom-light-blue)',
                    }}
                    // value={selectedLocale}
                >
                    {data.map((locale) => {
                        return (
                            <calcite-option
                                key={locale.code}
                                value={locale.code}
                                selected={selectedLocale === locale.code}
                            >
                                {locale.label}
                            </calcite-option>
                        );
                    })}
                </calcite-select>
            </calcite-label>

            <div
                className="w-full grid grid-cols-2 gap-2"
                style={
                    {
                        '--calcite-button-border-color':
                            'var(--custom-light-blue)',
                        '--calcite-button-text-color':
                            'var(--custom-light-blue)',
                    } as React.CSSProperties
                }
            >
                <calcite-button
                    appearance="outline"
                    scale="s"
                    disabled={selectedLocale === APP_LANGUAGE}
                    // width='full'
                    onClick={() => {
                        setPreferredLocale(selectedLocale);
                    }}
                >
                    {strings.switch_language}
                </calcite-button>

                <calcite-button
                    appearance="outline"
                    scale="s"
                    // width='full'
                    onClick={() => {
                        // setPreferredLocale(selectedLocale);
                        // close the panel
                        dispatch(appHeaderDropdownPanelChanged(null));
                    }}
                >
                    {strings.cancel}
                </calcite-button>
            </div>

            {showSuggestedLocaleMessage && (
                <div className="mt-4 flex items-center">
                    <calcite-checkbox
                        scale="s"
                        label={strings.do_not_show_again}
                        oncalciteCheckboxChange={(event) => {
                            const checked = event.target.checked;
                            // console.log('disableLocaleSuggestion', checked);
                            // if (checked) {
                            //     localStorage.setItem(
                            //         'disableLocaleSuggestion',
                            //         'true'
                            //     );
                            // } else {
                            //     localStorage.removeItem(
                            //         'disableLocaleSuggestion'
                            //     );
                            // }

                            dispatch(toggleDisableLocaleSuggestion(checked));
                        }}
                    />
                    <span className="text-custom-light-blue text-sm ml-2">
                        {strings.do_not_show_again}
                    </span>
                </div>
            )}
        </div>
    );
};
