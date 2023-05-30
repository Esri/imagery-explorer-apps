import { format } from 'date-fns';

export const MonthData = [
    {
        abbrLabel: 'J',
        days: 31,
        label: 'January',
    },
    {
        abbrLabel: 'F',
        days: 28,
        label: 'February',
    },
    {
        abbrLabel: 'M',
        days: 31,
        label: 'March',
    },
    {
        abbrLabel: 'A',
        days: 30,
        label: 'April',
    },
    {
        abbrLabel: 'M',
        days: 31,
        label: 'May',
    },
    {
        abbrLabel: 'J',
        days: 30,
        label: 'June',
    },
    {
        abbrLabel: 'J',
        days: 31,
        label: 'July',
    },
    {
        abbrLabel: 'A',
        days: 31,
        label: 'August',
    },
    {
        abbrLabel: 'S',
        days: 30,
        label: 'September',
    },
    {
        abbrLabel: 'O',
        days: 31,
        label: 'October',
    },
    {
        abbrLabel: 'N',
        days: 30,
        label: 'November',
    },
    {
        abbrLabel: 'D',
        days: 31,
        label: 'December',
    },
];

export const isLeapYear = (year: number) => {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return true;
    }

    return false;
};

// /**
//  * Get a formatted date string in the format `yyyy-MM-dd`, (e.g., `2023-05-02`).
//  *
//  * If `date` is provided, it will be used to create the formatted string.
//  * Otherwise, the function will use the year, month, and day parameters to create the date string.
//  *
//  * @param
//  * @returns
//  */
// export const getFormatedDateString = ({
//     date,
//     year,
//     month,
//     day,
// }: {
//     /**
//      * year
//      */
//     year?: number;
//     /**
//      * number of month from 1-12
//      */
//     month?: number;
//     /**
//      * number of day
//      */
//     day?: number;
//     /**
//      * date as unix timestamp or Date
//      */
//     date?: Date | number;
// }): string => {
//     if (!date && !year && !month && day) {
//         throw new Error('missing input date');
//     }

//     if (date) {
//         return format(date, 'yyyy-MM-dd');
//     }

//     if (month && (month < 1 || month > 12)) {
//         throw new Error('invalid month');
//     }

//     if (day && (day < 1 || day > 31)) {
//         throw new Error('invalid day');
//     }

//     const monthStr = month < 10 ? `0${month}` : month.toString();

//     const dayStr = day < 10 ? `0${day}` : day.toString();

//     return `${year}-${monthStr}-${dayStr}`;
// };
