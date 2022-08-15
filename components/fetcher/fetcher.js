import useSWR from "swr";

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
: "http://54.180.88.193:8000"

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

    return {
        data,
        isLoading: !error & !data,
        isError: error,
    }
}

export const GetStudio = (studioId) => {
    const {data, error} = useSWR(`${BASE_URL}/studios/${studioId}`, fetcher);

    return {
        studio: data,
        studioLoading: !error & !data,
        studioError: error,
    }
}

export const GetStudioReviews = (studioId) => {
    const {data, error} = useSWR(`${BASE_URL}/studios/${studioId}/review`, fetcher);

    return {
        reviews: data,
        reviewsLoading: !error & !data,
        reviewsError: error,
    }
}

export const GetStudioPhotos = (studioId) => {
    const {data, error} = useSWR(`${BASE_URL}/photos?studioId=${studioId}`, fetcher);

    return {
        photos: data,
        photosLoading: !error & !data,
        photosError: error,
    }
}

export const GetPhotos = (price, photoshop, sex, tags) => {
    let fetchURL;
    if(tags && tags.length > 0) {
        let tagsString = "";
        for(let i = 0; i < tags.length; i ++) {
            tagsString += `tags=${tags[i]}&`;
        }
        fetchURL = `${BASE_URL}/photos?price=${price}&photoshop=${photoshop}&sex=${sex}&${tagsString}`;
    }   else {
        fetchURL = `${BASE_URL}/photos?price=${price}&photoshop=${photoshop}&sex=${sex}`;
    }
    
    const {data, error} = useSWR(fetchURL, fetcher);

    return {
        photos: data,
        photosLoading: !error & !data,
        photosError: error,
    }
}

export const GetPhoto = (photoId) => {
    const {data, error} = useSWR(`${BASE_URL}/photos/${photoId}`, fetcher);

    return {
        data,
        isLoading: !error & !data,
        isError: error,
    }
}

export const GetTags = () => {
    const {data, error} = useSWR(`${BASE_URL}/tags`, fetcher);

    return {
        tags: data,
        tagsLoading: !error & !data,
        tagsError: error,
    }
}

export const GetProfile = (userId) => {
    const {data, error} = useSWR(`${BASE_URL}/accounts/profile/${userId}`, fetcher);

    return {
        profile: data,
        profileLoading: !error & !data,
        profileError: error,
    }
}
