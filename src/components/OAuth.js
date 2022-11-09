const CLIENT_ID = "e11e17bdb8ca8dffc3d4af18676a215c";
const REDIRECT_URI = "http://localhost:3000/kakaologin";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
