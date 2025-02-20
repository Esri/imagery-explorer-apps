import React, { useEffect, useMemo } from 'react';

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
    const response = useMemo(() => {
        const trimmed = textValue.trim();

        if (!textValue || !trimmed) {
            return { isValid: false, message: 'Please enter a value' };
        }

        if (textValue.length > maxLength) {
            return {
                isValid: false,
                message: `The text is too long. Please keep it under ${maxLength} characters.`,
            };
        }

        // should be considered invalid if the custom term contains any of the specified special characters
        const forbiddenSpecialCharRegex = /[!@#$^&*()<>{}:;?|+=~`"/\\]/;

        if (forbiddenSpecialCharRegex.test(trimmed)) {
            return {
                isValid: false,
                message: 'Please remove invalid special characters',
            };
        }

        return { isValid: true, message: '' };
    }, [textValue]);

    return response;
};
