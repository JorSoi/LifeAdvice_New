export const formatToMonthAndYear = (timestamp : string) : string => {
    const timeOfCreation : any = new Date(timestamp);
    const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(timeOfCreation);
    const year = timeOfCreation.getFullYear();
    return `${monthName} ${year}`
}