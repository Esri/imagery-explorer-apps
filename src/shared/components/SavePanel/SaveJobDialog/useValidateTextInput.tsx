import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type ValidateTextInputResponse = {
    isValid: boolean;
    message: string;
};

/**
 * This hook is used to validate the text input for the title and summary
 * @param textValue {string} value of the text input
 * @param maxLength maximum length of the text input
 * @returns {isValid: boolean, message: string} response object that contains the validation result and message
 */
export const useValidateTextInput = (
    textValue: string,
    maxLength: number
): ValidateTextInputResponse => {
    const { t } = useTranslation();

    const response = useMemo(() => {
        const trimmed = textValue.trim();

        if (!textValue || !trimmed) {
            return { isValid: false, message: t('enter_a_value') };
        }

        if (textValue.length > maxLength) {
            const message = t('text_too_long').replace(
                '{maxLength}',
                maxLength.toString()
            );

            return {
                isValid: false,
                message,
            };
        }

        // should be considered invalid if the custom term contains any of the specified special characters
        const forbiddenSpecialCharRegex = /[!@#$^&*()<>{};?|+=~`"/\\]/;

        if (forbiddenSpecialCharRegex.test(trimmed)) {
            return {
                isValid: false,
                message: t('remove_special_characters'),
            };
        }

        return { isValid: true, message: '' };
    }, [textValue]);

    return response;
};
