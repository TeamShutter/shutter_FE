// export const API_URL = 'http://localhost:8000';

export const API_URL = process.env.NODE_ENV === "development"
  ? "http://127.0.0.1:8000"
: "https://api.takeshutter.co.kr"

export const gtmConfig = {
  containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID
};