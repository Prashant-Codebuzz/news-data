import { format } from "date-fns";

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return format(date, "dd MMMM yyyy");
};