jest.mock('nanoid', () => {
    return {
        nanoid: jest
            .fn()
            .mockImplementationOnce(() => '1')
            .mockImplementationOnce(() => '2')
            .mockImplementationOnce(() => '3')
            .mockImplementationOnce(() => '4')
            .mockImplementationOnce(() => '5'),
    };
});

jest.mock('@shared/i18n/getAppLanguage', () => ({
    getAppLanguage: jest.fn(() => 'en'),
    getSuggestedLocale: jest.fn(() => 'en'),
    setPreferredLocale: jest.fn(),
}));
