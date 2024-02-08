import moment from "moment";
import 'moment-timezone';

moment.tz.setDefault("UTC");

export const toDaysMonthsYears = (timeStamp) => {
    return moment(timeStamp).format('Do MMMM YYYY')
}

export const toRelativeTime = (timeStamp) => {
    return moment(timeStamp).fromNow();
}