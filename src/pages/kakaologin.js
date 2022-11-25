import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loaduser } from "../actions/auth";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";
import { API_URL } from "../config";

export default function Kakaologin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code) => {
      // 백엔드에 전송
      const response = await fetch(
        `${API_URL}/accounts/kakao/login/callback?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch(loaduser());
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push("/notifications/authentication-failed");
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
}
