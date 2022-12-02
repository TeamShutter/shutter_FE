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
  const { data, error } = useSWR(`${API_URL}/town`, fetcher);
  return {
    towns: data,
    townsLoading: !error & !data,
    townsError: error,
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

export const GetPhotoTags = (photoId) => {
  const { data, error } = useSWR(`${API_URL}/tags?photoId=${photoId}`, fetcher);
  return {
    photoTags: data,
    photoTagsLoading: !error & !data,
    photoTagsError: error,
  };
};

export const GetStudios = (town) => {
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

export const GetStudioPhotographer = (studioId) => {
  const { data, error } = useSWR(
    `${API_URL}/studio/${studioId}/photographer`,
    fetcher
  );
  return {
    studioPhotographersData: data,
    studioPhotographersDataLoading: !error & !data,
    studioPhotographersDataError: error,
  };
};

export const GetStudioAssignedTime = (studioId) => {
  const { data, error } = useSWR(
    `${API_URL}/studio/${studioId}/assignedtime`,
    fetcher
  );

  return {
    studioAssignedTimesData: data,
    studioAssignedTimesDataLoading: !error & !data,
    studioAssignedTimesDataError: error,
  };
};

export const GetStudioProduct = (studioId) => {
  const { data, error } = useSWR(
    `${API_URL}/studio/${studioId}/product`,
    fetcher
  );

  return {
    studioProductsData: data,
    studioProductsDataLoading: !error & !data,
    studioProductsDataError: error,
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

export const GetPhotos = (town, price, tagList, color, photoType) => {
  let fetchURL;
  if (tagList.length > 0) {
    let tagsString = "";
    for (let i = 0; i < tagList.length; i++) {
      tagsString += `&tags=${tagList[i].id}`;
    }
    fetchURL = `${API_URL}/photo?town=${town}&min_price=${price.minPrice}&max_price=${price.maxPrice}&color=${color}&photoType=${photoType}${tagsString}`;
  } else {
    fetchURL = `${API_URL}/photo?town=${town}&min_price=${price.minPrice}&max_price=${price.maxPrice}&color=${color}&photoType=${photoType}`;
  }
  const { data, error } = useSWR(fetchURL, fetcher);

  return {
    photos: data,
    photosLoading: !error & !data,
    photosError: error,
  };
};

export const GetRelatedPhotos = (photoId) => {
  const { data, error } = useSWR(
    `${API_URL}/photo/${photoId}/related_photos`,
    fetcher
  );

  return {
    photos: data,
    photosLoading: !error & !data,
    photosError: error,
  };
};

export const GetRecommendedStudios = (
  photoTypeList,
  townList,
  colorList,
  tagList
) => {
  let photoTypesString = "";
  for (let i = 0; i < photoTypeList.length; i++) {
    photoTypesString += `photoTypes=${photoTypeList[i]}`;
  }
  let townsString = "";
  for (let i = 0; i < townList.length; i++) {
    townsString += `&towns=${townList[i]}`;
  }
  let colorsString = "";
  for (let i = 0; i < colorList.length; i++) {
    colorsString += `&colors=${colorList[i]}`;
  }
  let tagsString = "";
  for (let i = 0; i < tagList.length; i++) {
    tagsString += `&tags=${tagList[i]}`;
  }
  const fetchURL = `${API_URL}/studio/recommend?${photoTypesString}${townsString}${colorsString}${tagsString}`;
  const { data, error } = useSWR(fetchURL, fetcher);

  return {
    studios: data,
    studiosLoading: !error & !data,
    studiosError: error,
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
