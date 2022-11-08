import useSWR from "swr";
import { API_URL } from "../../config";

const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An Error occured while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  const data = await res.json();

  return data;
};

export const GetTowns = () => {
  // const {data, error} = useSWR(`${BASE_URL}/studio?price=${price}&distance=${distance}&latitude=${latitude}&longitude=${longitude}`, fetcher);
  const { data, error } = useSWR(`${API_URL}/town`, fetcher);
  return {
    towns: data,
    townsLoading: !error & !data,
    townsError: error,
  };
};

export const GetStudios = (town) => {
  // const {data, error} = useSWR(`${BASE_URL}/studio?price=${price}&distance=${distance}&latitude=${latitude}&longitude=${longitude}`, fetcher);
  let fetchURL;
  if (town) {
    fetchURL = `${API_URL}/studio?town=${town}`;
  } else {
    fetchURL = `${API_URL}/studio/`;
  }
  const { data, error } = useSWR(fetchURL, fetcher);

  return {
    studios: data,
    studiosLoading: !error & !data,
    studiosError: error,
  };
};

export const GetStudio = (studioId) => {
  const { data, error } = useSWR(`${API_URL}/studio/${studioId}`, fetcher);

  return {
    studioData: data,
    studioDataLoading: !error & !data,
    studioDataError: error,
  };
};

export const GetStudioReviews = (studioId) => {
  const { data, error } = useSWR(
    `${API_URL}/studios/${studioId}/review`,
    fetcher
  );

  return {
    reviews: data,
    reviewsLoading: !error & !data,
    reviewsError: error,
  };
};

export const GetStudioPhotos = (studioId) => {
  const { data, error } = useSWR(
    `${API_URL}/photo?studio_id=${studioId}`,
    fetcher
  );

  return {
    photos: data,
    photosLoading: !error & !data,
    photosError: error,
  };
};

export const GetSearch = (q) => {
  const { data, error } = useSWR(`${API_URL}/studios/search?q=${q}`, fetcher);
  return {
    search: data,
    searchLoading: !error & !data,
    searchError: error,
  };
};

// export const GetPhotos = (price, photoshop, sex, tags) => {
//     let fetchURL;
//     if(tags && tags.length > 0) {
//         let tagsString = "";
//         for(let i = 0; i < tags.length; i ++) {
//             tagsString += `tags=${tags[i]}&`;
//         }
//         fetchURL = `${API_URL}/photo?price=${price}&photoshop=${photoshop}&sex=${sex}&${tagsString}`;
//     }   else {
//         fetchURL = `${API_URL}/photo?price=${price}&photoshop=${photoshop}&sex=${sex}`;
//     }
//     const {data, error} = useSWR(fetchURL, fetcher);

//     return {
//         photos: data,
//         photosLoading: !error & !data,
//         photosError: error,
//     }
// }
export const GetPhotos = (town) => {
  let fetchURL;
  if (town) {
    fetchURL = `${API_URL}/photo?town=${town}`;
  } else {
    fetchURL = `${API_URL}/photo/`;
  }
  const { data, error } = useSWR(fetchURL, fetcher);

  return {
    photos: data,
    photosLoading: !error & !data,
    photosError: error,
  };
};

export const GetPhoto = (photoId) => {
  const { data, error } = useSWR(`${API_URL}/photo/${photoId}`, fetcher);

  return {
    photoData: data,
    photoDataLoading: !error & !data,
    photoDataError: error,
  };
};

export const GetTags = () => {
  const { data, error } = useSWR(`${API_URL}/tags`, fetcher);

  return {
    tags: data,
    tagsLoading: !error & !data,
    tagsError: error,
  };
};

export const GetProfile = (userId) => {
  const { data, error } = useSWR(
    `${API_URL}/accounts/profile/${userId}`,
    fetcher
  );

  return {
    profile: data,
    profileLoading: !error & !data,
    profileError: error,
  };
};

// export const GetProfile = () => {
//     const {data, error} = useSWR(`${API_URL}/accounts/profile`, fetcher);

//     return {
//         profile: data,
//         profileLoading: !error & !data,
//         profileError: error,
//     }
// }
