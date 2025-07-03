import axios from "axios";

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_NEWSDATA_API,
});

// latest
// news
// crypto


const REGION_COUNTRIES = {
    usa: "us",
    canada: "ca",
    eu: "gb", // you can use 'de', 'fr', etc., if you want to target specific EU countries
    australia: "au",
    new_zealand: "nz",
    middle_east: "ae", // UAE used as representative
    asia: "in", // India used as representative; add 'jp', 'cn', etc. if needed
};




// /**
//  * Fetch immigration-related news for selected region
//  * @param {string} regionKey - Region name (usa, canada, eu, etc.)
//  * @param {string} query - Search term (e.g., immigration)
//  * @param {number} nextPage - Optional pagination
//  */

export const getNewsDataService = async (nextPage = null) => {
    const url = `/news?apikey=${import.meta.env.VITE_APP_NEWSDATAAPI_KEY}&country=us&country=ca&country=gb&country=au&country=nz&country=ae&country=in&q=immigration${nextPage ? `&page=${nextPage}` : ''}`;

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