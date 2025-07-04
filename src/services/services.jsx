import axios from "axios";

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_NEWSDATA_API,
});

// latest
// news
// crypto


export const getNewsDataService = async (nextPage = null, searchQuery = '') => {
    const url = `/latest?apikey=${import.meta.env.VITE_APP_NEWSDATAAPI_KEY}&q=${searchQuery || 'immigration'}&category=tourism,education&country=us,ca,in${nextPage ? `&page=${nextPage}` : ''}`;  

    try {
        const res = await Axios.get(url);
        console.log(res);

        if (res?.data?.status === "success") {
            return res?.data;
        }
    } catch (err) {
        console.error(err);

        if (err?.response?.status === 429) {
            return err?.response?.data;
        }
    }
}