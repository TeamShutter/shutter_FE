import useSWR from "swr";

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
  : "http://54.180.32.114:8000"

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

export const GetPhotos = (studioId, price, photoshop, sex) => {
    const {data, error} = useSWR(`${BASE_URL}/photos?studioId=${studioId}&price=${price}&photoshop=${photoshop}&sex=${sex}`, fetcher);
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