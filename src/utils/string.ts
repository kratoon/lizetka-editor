export const isNotBlank = (value: unknown) => value != null && value !== '' && typeof value === 'string';

let idCounter = 0;
export const newId = (): string => {
    return `${idCounter++}`;
};
