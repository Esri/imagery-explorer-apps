import { data } from './data';

export const getRandomInterestingPlace = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
};
