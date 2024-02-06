import moment from "moment";

export const toDaysMonthsYears = (timeStamp) => {
    return moment(timeStamp).format('Do MMMM YYYY')
}

export const toRelativeTime = (timeStamp) => {
    return moment(timeStamp, "YYYYMMDD").fromNow();
}