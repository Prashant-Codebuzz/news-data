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



// --- MediaStack ---


export const AxiosMediaStack = axios.create({
    baseURL: import.meta.env.VITE_APP_NEWS_API,
});

export const getMediaStackNewsService = async (page = 1, searchQuery = '') => {
    const limit = 12;
    const offset = (page - 1) * limit;

    const url = `/news?access_key=${import.meta.env.VITE_APP_NEWSAPI_KEY}&keywords=${searchQuery || 'immigration'}&languages=en&sort=published_desc&limit=12&offset=${offset}`;

    try {
        const res = await AxiosMediaStack.get(url);
        console.log(res);

        if (res?.status === 200) {
            return res?.data;
        }
    } catch (err) {
        console.error(err);


        if (err?.response?.data?.error?.code === "usage_limit_reached") {
            return err?.response?.data;
        }
    }
}








// --- Currentsapi ---


export const AxiosCurrentsapi = axios.create({
    baseURL: import.meta.env.VITE_APP_CURRENTSNEWS_API,
});

export const getCurrentsNewsService = async (searchQuery = '') => {
    const pageSize = 100;

    // const url = `/search?keywords=${searchQuery || 'immigration'}&language=en&page_number=${page}&page_size=${pageSize}`;

    const url = `https://api.currentsapi.services/v1/search?keywords=${searchQuery || 'immigration'}&language=en&&page_size=${pageSize}`;


    try {
        const res = await AxiosCurrentsapi.get(url, {
            headers: {
                Authorization: 'QwDy0bCEZF9G5hrMrroguaWHwYUcrOerMghhFQY3h_pfM86W'
            }
        });
        console.log(res);

        if (res?.data?.status === "ok") {
            return res?.data;
        }
    } catch (err) {
        console.error(err);


        if (err?.response?.status === 429) {
            return err?.response?.data;
        }
    }
}