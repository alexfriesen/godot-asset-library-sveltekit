export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
}

export const isBetween = (value: number, min: number, max: number) => {
    return value >= min && value < max;
}
