export const getMonthAbbreviation = (monthNumber: number) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
        return months[monthNumber - 1];
    }

    return 'Invalid Month';
};
