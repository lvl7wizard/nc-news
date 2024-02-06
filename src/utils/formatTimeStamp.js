import moment from "moment";

export const toDaysMonthsYears = (timeStamp) => {
    return moment(timeStamp).format('Do MMMM YYYY')
}