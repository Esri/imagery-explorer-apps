/**
 * Get random element from the input array
 * @param arr
 * @returns
 */
function getRandomElement<Type>(arr: Type[]): Type {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export { getRandomElement };
