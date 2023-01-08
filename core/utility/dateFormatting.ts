import moment from "moment"

export const dateFomatting = (date: string) => {
    return moment(date).format('DD-MM-YYYY')
}