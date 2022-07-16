import useSWR from "swr";

const BASE_URL = "http://localhost:8000/api";

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
    const {data, error} = useSWR(`${BASE_URL}/getAllStudios`, fetcher);
    // const {data, error} = useSWR(`https://api.coinpaprika.com/v1/global`, fetcher);

    return {
        data,
        isLoading: !error & !data,
        isError: error,
    }
}