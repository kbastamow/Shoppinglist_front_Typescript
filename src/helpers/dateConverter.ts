export const dateConverter = (date: string): string => {
    const formattedDate = new Date(date)
    return formattedDate.toLocaleDateString('en-GB')
};

