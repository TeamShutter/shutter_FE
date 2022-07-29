import useSWR from "swr";

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
: "http://15.164.100.14:8000"

const fetcher = async (...args) => {
    const res = await fetch(...args);

    if(!res.ok) {
        const error = new Error('An Error occured while fetching the data.');
        error.info = await res.json();
        error.status = res.status
        throw error
    }
    const data = await res.json();

    return data;
}

export const GetStudios = () => {
    const {data, error} = useSWR(`${BASE_URL}/studios`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        data,
        isLoading: !error & !data,
        isError: error,
    }
}

export const GetStudio = (studioId) => {
    const {data, error} = useSWR(`${BASE_URL}/studios/${studioId}`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        studio: data,
        studioLoading: !error & !data,
        studioError: error,
    }
}

export const GetStudioReviews = (studioId) => {
    const {data, error} = useSWR(`${BASE_URL}/studios/${studioId}/review`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        reviews: data,
        reviewsLoading: !error & !data,
        reviewsError: error,
    }
}

export const GetPhotos = (studioId, price, photoshop, sex, tags) => {
    let fetchURL;
    console.log("tags" , tags);
    if(tags && tags.length > 0) {
        let tagsString = "";
        for(let i = 0; i < tags.length; i ++) {
            tagsString += `tags=${tags[i]}&`;
        }
        fetchURL = `${BASE_URL}/photos?studioId=${studioId}&price=${price}&photoshop=${photoshop}&sex=${sex}&${tagsString}`;
    }   else {
        fetchURL = `${BASE_URL}/photos?studioId=${studioId}&price=${price}&photoshop=${photoshop}&sex=${sex}`;
    }
    
    const {data, error} = useSWR(fetchURL, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        photos: data,
        photosLoading: !error & !data,
        photosError: error,
    }
}

export const GetPhoto = (photoId) => {
    const {data, error} = useSWR(`${BASE_URL}/photos/${photoId}`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        data,
        isLoading: !error & !data,
        isError: error,
    }
}

export const GetTags = () => {
    const {data, error} = useSWR(`${BASE_URL}/tags`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        tags: data,
        tagsLoading: !error & !data,
        tagsError: error,
    }
}

export const GetProfile = (userId) => {
    const {data, error} = useSWR(`${BASE_URL}/accounts/profile/${userId}`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        profile: data,
        profileLoading: !error & !data,
        profileError: error,
    }
}
