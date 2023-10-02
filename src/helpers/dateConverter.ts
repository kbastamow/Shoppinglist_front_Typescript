import moment from "moment";

export const dateConverter = (date: string): string => {

    return moment(date).subtract(10, 'days').calendar();
};

