import useSWR from "swr";

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://127.0.0.1:8000"
: "http://takeshutter.co.kr:8000"

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
    // const {data, error} = useSWR(`${BASE_URL}/studio?price=${price}&distance=${distance}&latitude=${latitude}&longitude=${longitude}`, fetcher);
    const {data, error} = useSWR(`${BASE_URL}/studio`, fetcher);

    return {
        studios: data,
        studiosLoading: !error & !data,
        studiosError: error,
    }
}

export const GetStudio = (studioId) => {
    const {data, error} = useSWR(`${BASE_URL}/studio/${studioId}`, fetcher);

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

export const GetSearch = (q) => {
    const {data, error} = useSWR(`${BASE_URL}/studios/search?q=${q}`, fetcher);
    return {
        search: data,
        searchLoading: !error & !data,
        searchError: error,
    }
}

// export const GetPhotos = (price, photoshop, sex, tags) => {
//     let fetchURL;
//     if(tags && tags.length > 0) {
//         let tagsString = "";
//         for(let i = 0; i < tags.length; i ++) {
//             tagsString += `tags=${tags[i]}&`;
//         }
//         fetchURL = `${BASE_URL}/photo?price=${price}&photoshop=${photoshop}&sex=${sex}&${tagsString}`;
//     }   else {
//         fetchURL = `${BASE_URL}/photo?price=${price}&photoshop=${photoshop}&sex=${sex}`;
//     }
//     const {data, error} = useSWR(fetchURL, fetcher);

//     return {
//         photos: data,
//         photosLoading: !error & !data,
//         photosError: error,
//     }
// }
export const GetPhotos = () => {
    const fetchURL = `${BASE_URL}/photo/`;
    const {data, error} = useSWR(fetchURL, fetcher);

    return {
        photos: data,
        photosLoading: !error & !data,
        photosError: error,
    }
}

export const GetPhoto = (photoId) => {
    const {data, error} = useSWR(`${BASE_URL}/photo/${photoId}`, fetcher);

    return {
        photoData: data,
        photoDataLoading: !error & !data,
        photoDataError: error,
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

// export const GetProfile = () => {
//     const {data, error} = useSWR(`${BASE_URL}/accounts/profile`, fetcher);

//     return {
//         profile: data,
//         profileLoading: !error & !data,
//         profileError: error,
//     }
// }
