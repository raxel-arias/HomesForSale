export const formatDate = (date: any) => {
    const IEstrangeCharsRegex: RegExp = /[^ -~]/g;
    const newDate: string = new Date(date).toLocaleString().replace(IEstrangeCharsRegex,'');

    return newDate;
}   